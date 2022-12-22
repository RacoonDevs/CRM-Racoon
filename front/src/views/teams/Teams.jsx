import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../AppContext/Context";
import Container from "../../components/containers/Container";
import { HashLoader } from "react-spinners";
import { H2, H3, H4 } from "../../components/Titles";
import { Formik, Form } from "formik";
import { async } from "@firebase/util";
import TextInput from "../../components/inputs/TextInput";
import BasicButton from "../../components/buttons/BasicButton";
import astronaut from "../../assets/img/astronaut_moon.png";
import { FaUpload, FaUserCircle } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import { uploadLogoTeam } from "../../firebase/config";
import Modal from "../../components/modal/modal";

const Teams = () => {
  const { getCreateTeam, team, user, getTeam, getUpdateUser, getUpdateTeam } =
    useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", code: "" });
  const [logoURL, setLogoURL] = useState("");
  const [active, setActive] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    getTeam();
  }, [user, team]);

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const onCreateTeam = async (data) => {
    setIsLoading(true);
    if (!data.name || !data.code) {
      notifyError("Todos los campos son obligatorios");
    }
    if (data.code.length <= 4 || data.code.length >= 11) {
      notifyError("El codigo debe tener un minimo 5 caracteres y maximo 10");
    }

    const body = {
      name: data.name,
      code: data.code,
      logoURL: await uploadLogoTeam(logoURL),
    };

    const res = await getCreateTeam(body);
    if (res?.error) {
      setIsLoading(false);
      notifyError(res.error);
    }
    if (res?.data) {
      setIsLoading(false);
      notify(`El TEAM  ${res.data.team.name} ha sido creado con exito.`);
      await getUpdateUser({ team_id: res.data.team.id, rol: 5 });
    }
    setIsLoading(false);
  };

  const onUpdatePhoto = async (newPhoto) => {
    setIsLoading(true);

    const result = await uploadLogoTeam(newPhoto);
    const data = { logoURL: result };
    const res = await getUpdateTeam(data);
    if (res?.error) {
      setIsLoading(false);
      notifyError(
        "Ha ocurrido un error al guardar los cambios. Intente más tarde."
      );
    }
    if (res?.status === 200) {
      setIsLoading(false);
      notify("Los cambios se han guardado con exito.");
    }
    setIsLoading(false);
  };

  const toggle = () => {
    setActive(!active);
  };
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  return (
    <Container nameSection={"Mi Team"}>
      {team?.id === 1 ? (
        <div className="grid lg:grid-cols-2 gap-4 border-4 rounded-md border-slate-200">
          <Formik
            initialValues={newTeam}
            enableReinitialize={true}
            onSubmit={async (values) => {
              await onCreateTeam(values);
              setNewTeam({ name: "", code: "" });
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmiting }) => (
              <Form className=" p-10 flex flex-col gap-5 h-full">
                <H2 text={"Crear un Team"} />
                <TextInput
                  name="name"
                  type={"text"}
                  label={"Nombre del Team"}
                  onChange={handleChange}
                  value={values.name}
                />
                <TextInput
                  name="code"
                  type={"text"}
                  label={"CODE"}
                  onChange={handleChange}
                  value={values.code}
                />
                <div className="flex flex-col gap-3 items-center justify-center ">
                  {!logoURL ? (
                    <FaUserCircle
                      onClick={handleClick}
                      size={150}
                      fill={"#58585F"}
                      className={` cursor-pointer duration-500 rounded-full`}
                    />
                  ) : (
                    <div onClick={handleClick} className="h-32 w-32">
                      <img
                        src={URL.createObjectURL(logoURL)}
                        alt="logoURL"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <IconButton onClick={handleClick} text={"Cambiar foto"}>
                    <FaUpload />
                  </IconButton>
                  <input
                    type={"file"}
                    ref={hiddenFileInput}
                    accept=".jpeg,.png,.jpg"
                    onChange={(e) => setLogoURL(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <H4
                  color={"#a3a3a3"}
                  text={
                    "El CODE es una identificador unico de tu Team que debe contener un minimo 5 y maximo 10 caracteres alfanumericos."
                  }
                />
                <div className="text-center">
                  {isLoading ? (
                    <BasicButton
                      text={isSubmiting ? "Saving..." : "Guardar cambios"}
                      type="submit"
                      disabled={isSubmiting}
                      onClick={handleSubmit}
                    />
                  ) : (
                    <span className="flex justify-center">
                      <HashLoader
                        color={"#0063C9"}
                        size={25}
                        loading={isLoading}
                      />
                    </span>
                  )}
                </div>
              </Form>
            )}
          </Formik>
          <div className="text-center flex flex-col items-center p-5">
            <H2 text={"¿Aun no tienes un Team?"} />
            <H4
              text={
                "Crea un equipo y añade participantes para interactuar con tus colegas."
              }
            />
            <img src={astronaut} alt="astronaut" className="max-h-80" />
          </div>
        </div>
      ) : (
        <div>
          <div className=" flex flex-col items-center p-5 gap-3 border-4 rounded-md border-slate-200">
            <div className="text-center">
              <H3 text={"Mi Team"} />
              <H2 size={"25px"} color={"#0063c9"} text={team.name} />
              <p className="text-slate-600 font-bold">
                {`Codigo del team: #${team.code}`}
              </p>
            </div>
            <div>
              {!team.logoURL && (
                <FaUserCircle
                  onClick={handleClick}
                  size={150}
                  fill={"#58585F"}
                  className={` cursor-pointer duration-500 rounded-full`}
                />
              )}
              {team.logoURL && (
                <div
                  onClick={() => setActive(!active)}
                  onMouseEnter={() => setShowText(true)}
                  onMouseLeave={() => setShowText(false)}
                  className="relative flex items-center justify-center h-44 w-44 cursor-pointer rounded-full bg-black hover:opacity-90 transition-all ease-in-out"
                >
                  <p
                    className={`absolute text-white pointer-events-none ${
                      showText ? null : "hidden z-10"
                    } hover:flex z-10 transition-all ease-in-out`}
                  >
                    Ver foto
                  </p>
                  <img
                    className={
                      "inline-block w-full h-full object-cover rounded-full ring-4 ring-slate-200 hover:opacity-50 hover:blur-sm transition-all ease-in-out"
                    }
                    src={team.logoURL}
                    alt={"team_logo"}
                  />
                </div>
              )}
            </div>
            <IconButton onClick={handleClick} text={"Cambiar foto"}>
              <FaUpload />
            </IconButton>
            <input
              type={"file"}
              ref={hiddenFileInput}
              accept=".jpeg,.png,.jpg"
              onChange={(e) => onUpdatePhoto(e.target.files[0])}
              style={{ display: "none" }}
            />
            <Modal active={active} toggle={toggle}>
              <div className="w-[100%] max-w-[325px] md:max-w-[600px] lg:max-w-[800px] text-center flex flex-col items-center gap-4">
                <H4 size={"20px"} color={"#0063c9"} text={`${team.name} `} />
                <img
                  className="max-h-[75vh]"
                  src={team.logoURL}
                  alt="team_logo"
                />
              </div>
            </Modal>
          </div>
        </div>
      )}

      <Toaster />
    </Container>
  );
};

export default Teams;
