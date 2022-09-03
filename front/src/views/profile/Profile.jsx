import React, { useState, useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../AppContext/Context";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import { Label } from "../../components/Titles";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { updateUsers, updateUsersDetails } from "../../api/api";
import CalendarInput from "../../components/inputs/CalendarInput";
import { deleteProfileImage, uploadFile } from "../../firebase/config";
import { GET_PROFILE, GET_PROFILE_DETAILS } from "../../AppContext/Types";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Profile = () => {
  const { profile, profileDetails, getProfileDetails, dispatch } =
    useContext(Context);
  const { name, email, id, status, user_name } = profile["datos_sesion"];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [localPhoto, setLocalPhoto] = useState(null);

  const [user, setUser] = useState({
    name: name ?? "",
    email: email ?? "",
    phone: profileDetails.phone ?? "",
    address: profileDetails.address ?? "",
    birthdate: profileDetails.birthdate ?? "",
    photo_url: profileDetails.photo_url ?? null,
    idDetails: profileDetails.id,
  });

  useEffect(() => {
    getProfileDetails(id);
  }, []);

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
  console.log(profile);
  const saveChanges = async () => {
    setIsLoading(true);
    const send = {
      name: user.name,
      email: user.email,
      updated_by: id,
      user_name: user_name,
      status: status ? 1 : 0,
    };

    let profile = null;

    if (newPhoto) {
      try {
        // if (user.photo_url) {
        //   deleteProfileImage(user.photo_url);
        // }
        const result = await uploadFile(newPhoto);
        setUser({ ...user, photo_url: result });
        profile = result;
      } catch (err) {
        console.log(err);
      }
    }
    const userDetails = {
      photo_url: profile ?? user.photo_url,
      address: user.address,
      phone: user.phone,
      birthdate: user.birthdate,
      updated_by: id,
    };

    updateUsers(id, send)
      .then((data) => {
        console.log("esta data:", data);
        notify(data.users);
        const oldData = JSON.parse(localStorage.getItem("profile"));
        oldData["datos_sesion"].name = user.name;
        oldData["datos_sesion"].email = user.email;

        localStorage.setItem("profile", JSON.stringify(oldData));

        updateUsersDetails(user.idDetails, userDetails)
          .then(() => {
            const concatData = profile.datos_sesion.concat(send);
            console.log("concat", concatData);
            dispatch({ type: GET_PROFILE_DETAILS, payload: userDetails });
            // dispatch({
            //   type: GET_PROFILE,
            //   payload: concatData,
            // });
            setIsLoading(false);
          })
          .catch((err) => {
            notifyError(
              "Se ha producido un error al guardar los cambios intente más tarde.",
              err
            );
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log("Failed to update data", err);
        notifyError(
          "Se ha producido un error al guardar los cambios intente más tarde."
        );
        setIsLoading(false);
      });
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleSelectPhoto = (file) => {
    setNewPhoto(file);
    setLocalPhoto(URL.createObjectURL(file));
  };

  return (
    <Container
      _isHeaderButtons={true}
      height={"auto"}
      nameSection={"Mi perfil"}
      _onCancel={() => navigate(-1)}
      _onSave={saveChanges}
    >
      <div className="justify-center gap-10 grid grid-cols-1 lg:grid-cols-2">
        <div className=" flex flex-col items-center p-5 gap-3 border-4 rounded-md border-slate-200">
          <Label text={"Foto de perfil"} size={"16px"} />
          <div>
            {!user.photo_url && !newPhoto && (
              <FaUserCircle
                onClick={handleClick}
                size={150}
                fill={"#58585F"}
                className={` cursor-pointer duration-500 rounded-full`}
              />
            )}
            {user.photo_url && !newPhoto && (
              <div
                onClick={handleClick}
                className=" h-44 w-44 cursor-pointer rounded-full"
              >
                <img
                  className={
                    "inline-block w-full h-full object-cover rounded-full ring-4 ring-slate-200"
                  }
                  src={user.photo_url}
                  alt={"foto_perfil"}
                />
              </div>
            )}
            {newPhoto && (
              <div
                onClick={handleClick}
                className=" h-44 w-44 cursor-pointer rounded-full"
              >
                <img
                  src={localPhoto}
                  alt={"local foto"}
                  className={
                    "inline-block w-full h-full object-cover rounded-full ring-2 ring-white"
                  }
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
            onChange={(e) => handleSelectPhoto(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <div className="border-4 rounded-md border-slate-200 p-5 grid gap-5">
          <TextInput
            label={"Nombre"}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextInput
            label={"Correo electrónico"}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextInput
            label={"Telefono"}
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            type={"tel"}
          />
          <TextInput
            label={"Domicilio"}
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          <CalendarInput
            label={"Fecha de nacimiento"}
            value={user.birthdate}
            onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
          />
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
