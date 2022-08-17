import React, { useState, useContext } from "react";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import { Label } from "../../components/Titles";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/api";
import { AccountContext } from "../../AppContext/AppProvider";
import PasswordInput from "../../components/inputs/PasswordInput";
import { HashLoader } from "react-spinners";
import DropdownInput from "../../components/inputs/DropdownInput";

const CreateUsers = () => {
  const { userData } = useContext(AccountContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
    name: "",
    status: "",
    created_by: userData["datos_sesion"].id,
  });
  console.log(user);
  const saveChanges = () => {
    setIsLoading(true);
    if (
      !user.email ||
      !user.name ||
      !user.status ||
      !user.password ||
      !user.user_name
    ) {
      setError("Todos los campos son obligatorios");
      setIsLoading(false);
    } else {
      if (user.password !== repeatPassword) {
        setError("Las contraseñas no son iguales");
        setIsLoading(false);
      } else {
        createUser(user)
          .then((data) => {
            setError("");
            setIsLoading(false);
            console.log(data);
            if (data.users) {
              navigate(-1);
            } else {
              setError(
                "Se ha producido un error al guardar la información intente más tarde."
              );
            }
          })
          .catch((err) => {
            console.log("Failed to create user", err);
            setError(
              "Se ha producido un error al guardar la información intente más tarde."
            );
            setIsLoading(false);
          });
      }
    }
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
        <div className="border-2 rounded-md border-dark p-5 grid gap-5">
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
          <DropdownInput
            data={["Inactivo", "Activo"]}
            label={"Estatus"}
            value={user.status}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          />
          <PasswordInput
            label={"Contraseña"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
          <PasswordInput
            label={"Repetir Contraseña"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
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
      {error && (
        <div className="text-center p-5">
          <Label size={"12px"} text={error} color={"#EA5656"} />
        </div>
      )}
      <span className="flex justify-center">
        <HashLoader color={"#0063C9"} size={25} loading={isLoading} />
      </span>
    </Container>
  );
};

export default CreateUsers;
