import React, { useState, useContext } from "react";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import { Label } from "../../components/Titles";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/api";
import { AccountContext } from "../../AppContext/AppProvider";

const CreateUsers = () => {
  const { userData } = useContext(AccountContext);
  console.log(userData);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
    name: "",
    status: 1,
    created_by: userData["datos_sesion"].id,
  });

  const saveChanges = () => {
    console.log("before to send: ", user);
    createUser(user)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Failed to create user", err);
        // setIsLoading(false);
        setError(
          "Se ha producido un error al guardar la información intente más tarde."
        );
        setIsError(true);
      });
  };

  return (
    <Container
      _isHeaderButtons={true}
      height={"auto"}
      nameSection={"Agregar usuario"}
      _onCancel={() => navigate(-1)}
      _onSave={saveChanges}
    >
      <div className="justify-center grid grid-cols-1 md:grid-cols-2">
        <div className="border-2 rounded-md border-dark p-5 grid gap-2">
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
            label={"Nombre de usuario"}
            value={user.user_name}
            onChange={(e) => setUser({ ...user, user_name: e.target.value })}
          />
          <TextInput
            label={"Contraseña"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <TextInput
            label={"Repetir Contraseña"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <img
            src={require("../../assets/img/img_create.png")}
            alt="create"
            width={350}
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

export default CreateUsers;
