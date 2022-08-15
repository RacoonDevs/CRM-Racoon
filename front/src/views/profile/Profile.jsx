import React, { useState, useContext } from "react";
import { AccountContext } from "../../AppContext/AppProvider";
import { FaUserCircle, FaPen } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import { Label } from "../../components/Titles";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/api";
import CalendarInput from "../../components/inputs/CalendarInput";

const Profile = () => {
  const { userData } = useContext(AccountContext);
  const { name, email, phone, address, birthdate } = userData["datos_sesion"];
  const navigate = useNavigate();
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: name ?? "",
    email: email ?? "",
    phone: phone ?? "",
    address: address ?? "",
    birthdate: birthdate ?? "",
  });

  console.log(user);

  const saveChanges = () => {
    updateUser(userData["datos_sesion"].id, user)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Failed to login", err);
        // setIsLoading(false);
        setError(
          "Se ha producido un error al guardar los cambios intente más tarde."
        );
        setIsError(true);
      });
  };

  return (
    <Container
      _isHeaderButtons={true}
      height={"auto"}
      nameSection={"Mi perfil"}
      _onCancel={() => navigate(-1)}
      _onSave={saveChanges}
    >
      <div className=" justify-center gap-x-10 grid grid-cols-1 md:grid-cols-2">
        <div className=" flex flex-col items-center p-5 gap-3 border-2 rounded-md border-dark">
          <Label text={"Foto de perfil"} size={"16px"} />
          <p>
            <FaUserCircle
              size={150}
              fill={"#58585F"}
              className={` cursor-pointer duration-500 rounded-full`}
            />
          </p>
          <IconButton text={"Cambiar foto"}>
            <FaPen />
          </IconButton>
        </div>
        <div className=" border-2 rounded-md border-dark p-5 grid gap-y-5">
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
      {isError && (
        <div className="text-center p-5">
          <Label size={"12px"} text={error} color={"#EA5656"} />
        </div>
      )}
    </Container>
  );
};

export default Profile;
