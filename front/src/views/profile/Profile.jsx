import React, { useState, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../AppContext/Context";
import { Form, Formik } from "formik";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import { H3, H4 } from "../../components/Titles";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import CalendarInput from "../../components/inputs/CalendarInput";
import { uploadFile } from "../../firebase/config";
import BasicButton from "../../components/buttons/BasicButton";
import PasswordInput from "../../components/inputs/PasswordInput";
import Modal from "../../components/modal/modal";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Profile = () => {
  const { user, getUpdateUser, getUpdatePassword } = useContext(Context);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [body, setBody] = useState({
    userName: user.user.userName ?? "",
    firstName: user.user.firstName ?? "",
    lastName: user.user.lastName ?? "",
    email: user.user.email ?? "",
    country: user.user.country ?? "",
    address: user.user.address ?? "",
    phone: user.user.phone ?? "",
    bornDate: user.user.bornDate ?? "",
    photoURL: user.user.photoURL ?? "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [showText, setShowText] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const onUpdatePhoto = async (newPhoto) => {
    setIsLoading(true);

    const result = await uploadFile(newPhoto);
    const data = { photoURL: result };
    const res = await getUpdateUser(data);
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

  const onUpdateUser = async (data) => {
    setIsLoading(true);
    const parseDate = data.bornDate.substring(0, 10);
    data.bornDate = parseDate;
    if (
      data.userName === user.user.userName &&
      data.firstName === user.user.firstName &&
      data.lastName === user.user.lastName &&
      data.email === user.user.email &&
      data.phone === user.user.phone &&
      data.country === user.user.country &&
      data.address === user.user.address &&
      data.bornDate === user.user.bornDate.substring(0, 10)
    ) {
      setIsLoading(false);
      return notifyError("No se detectaron cambios en la informacón.");
    }

    const res = await getUpdateUser(data);
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

  const onUpdatePassword = async (data) => {
    setIsLoading(true);
    if (!data.currentPassword || !data.newPassword || !data.repeatNewPassword) {
      setIsLoading(false);
      return notifyError("Todos los campos son obligatorios.");
    }
    if (data.newPassword.length <= 7) {
      setIsLoading(false);
      return notifyError(
        "La nueva contraseña debe contener al menos 8 caracteres."
      );
    }
    if (data.newPassword !== data.repeatNewPassword) {
      setIsLoading(false);
      return notifyError("La nueva contraseña no coincide.");
    }
    const res = await getUpdatePassword(data);
    if (res?.error) {
      setIsLoading(false);
      notifyError(res.error);
    }
    if (res?.message) {
      setIsLoading(false);
      notify(res.message);
    }
    setIsLoading(false);
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  return (
    <Container
      _isHeaderButtons={true}
      height={"auto"}
      nameSection={"Mi perfil"}
      _needCancel={true}
      _onCancel={() => navigate(-1)}
    >
      <div className="justify-center gap-10 grid grid-cols-1 lg:grid-cols-2">
        <Formik
          enableReinitialize={true}
          initialValues={body}
          onSubmit={async (values) => {
            await onUpdateUser(values);
            setBody({
              userName: user.user.userName ?? "",
              firstName: user.user.firstName ?? "",
              lastName: user.user.lastName ?? "",
              email: user.user.email ?? "",
              country: user.user.country ?? "",
              address: user.user.address ?? "",
              phone: user.user.phone ?? "",
              bornDate: user.user.bornDate ?? "",
              photoURL: user.user.photoURL ?? "",
            });
          }}
        >
          {({ handleChange, handleSubmit, values, isSubmiting }) => (
            <Form>
              <div className="border-4 rounded-md border-slate-200 p-5 grid gap-7">
                <H3 text={"Mi información"} />
                <div className="grid md:grid-cols-2 gap-4 ">
                  <TextInput
                    name="firstName"
                    type={"text"}
                    label={"Nombre"}
                    onChange={handleChange}
                    value={values.firstName}
                  />
                  <TextInput
                    name="lastName"
                    type={"text"}
                    label={"Apellido"}
                    onChange={handleChange}
                    value={values.lastName}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 ">
                  <TextInput
                    name="userName"
                    type={"text"}
                    label={"Username"}
                    onChange={handleChange}
                    value={values.userName}
                  />
                  <TextInput
                    name="email"
                    type={"email"}
                    label={"Correo electronico"}
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 ">
                  <TextInput
                    name="phone"
                    type={"phone"}
                    label={"Telefono"}
                    onChange={handleChange}
                    value={values.phone}
                  />
                  <TextInput
                    name="country"
                    type={"text"}
                    label={"País"}
                    onChange={handleChange}
                    value={values.country}
                  />
                </div>
                <TextInput
                  name="address"
                  type={"text"}
                  label={"Dirección"}
                  onChange={handleChange}
                  value={values.address}
                />
                <CalendarInput
                  name="bornDate"
                  label={"Fecha de nacimiento"}
                  value={values.bornDate.substring(0, 10)}
                  onChange={handleChange}
                />
                <div className="text-center">
                  <BasicButton
                    text={isSubmiting ? "Saving..." : "Guardar cambios"}
                    type="submit"
                    disabled={isSubmiting}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col gap-4">
          <div className=" flex flex-col items-center p-5 gap-3 border-4 rounded-md border-slate-200">
            <H3 text={"Foto de perfil"} />
            <div>
              {!user.user.photoURL && (
                <FaUserCircle
                  onClick={handleClick}
                  size={150}
                  fill={"#58585F"}
                  className={` cursor-pointer duration-500 rounded-full`}
                />
              )}
              {user.user.photoURL && (
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
                    src={user.user.photoURL}
                    alt={"foto_perfil"}
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
                <H4
                  size={"20px"}
                  color={"#0063c9"}
                  text={`${user.user.firstName} ${user.user.lastName} `}
                />
                <img
                  className="max-h-[75vh]"
                  src={user.user.photoURL}
                  alt="photo_profile"
                />
              </div>
            </Modal>
          </div>
          <div>
            <Formik
              enableReinitialize={true}
              initialValues={password}
              onSubmit={async (values) => {
                await onUpdatePassword(values);
                setPassword({
                  currentPassword: "",
                  newPassword: "",
                  repeatNewPassword: "",
                });
              }}
            >
              {({ handleChange, handleSubmit, values, isSubmiting }) => (
                <Form className="flex flex-col gap-7 p-5 border-4 rounded-md border-slate-200">
                  <H3 text={"Cambiar contraseña"} />
                  <PasswordInput
                    name="currentPassword"
                    label={"Contraseña actual"}
                    value={values.currentPassword}
                    onChange={handleChange}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                  <div className="grid md:grid-cols-2 gap-4 ">
                    <PasswordInput
                      name="newPassword"
                      label={"Nueva Contraseña"}
                      value={values.newPassword}
                      onChange={handleChange}
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                    />
                    <PasswordInput
                      name="repeatNewPassword"
                      label={"Repetir Contraseña"}
                      value={values.repeatNewPassword}
                      onChange={handleChange}
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                    />
                  </div>
                  <div className="text-center">
                    <BasicButton
                      text={isSubmiting ? "Saving..." : "Cambiar contraseña"}
                      type="submit"
                      disabled={isSubmiting}
                      onClick={handleSubmit}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <span className="flex justify-center">
        <HashLoader color={"#0063C9"} size={25} loading={isLoading} />
      </span>
      <Toaster />
    </Container>
  );
};

export default Profile;
