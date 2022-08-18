import React, { useState, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
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

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const saveChanges = () => {
    setIsLoading(true);
    if (
      !user.email ||
      !user.name ||
      !user.status ||
      !user.password ||
      !user.user_name
    ) {
      notifyError("Todos los campos son obligatorios");
      setIsLoading(false);
    } else {
      if (user.password !== repeatPassword) {
        notifyError("Las contraseñas no son iguales");
        setIsLoading(false);
      } else {
        createUser(user)
          .then((data) => {
            setIsLoading(false);
            console.log(data);
            if (data.users) {
              notify("Usuario creado con exito");
              setUser({
                email: "",
                name: "",
                password: "",
                status: "",
                user_name: "",
              });
              setRepeatPassword("");
            } else {
              notifyError(
                "Se ha producido un error al guardar la información intente más tarde."
              );
            }
          })
          .catch((err) => {
            console.log("Failed to create user", err);
            notifyError(
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
      <span className="flex justify-center">
        <HashLoader color={"#0063C9"} size={25} loading={isLoading} />
      </span>
      <Toaster />
    </Container>
  );
};

export default CreateUsers;
