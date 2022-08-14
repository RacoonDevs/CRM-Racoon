import React from "react";
import { FaUserCircle, FaPen } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import { Label } from "../../components/Titles";

const Profile = () => {
  return (
    <Container
      _isHeaderButtons={true}
      height={"auto"}
      nameSection={"Mi perfil"}
    >
      <div className="flex gap-x-10">
        <div className="w-1/2 flex flex-col items-center gap-3 ">
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
        <div className="w-1/2 grid gap-y-5">
          <TextInput label={"Nombre"} />
          <TextInput label={"Correo electrónico"} />
          <TextInput label={"Telefono"} />
          <TextInput label={"Domicilio"} />
          <TextInput label={"Correo electrónico"} />
        </div>
      </div>
    </Container>
  );
};

export default Profile;
