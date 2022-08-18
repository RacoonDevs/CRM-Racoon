import React, { useState, useContext, useEffect } from "react";
import Container from "../../components/containers/Container";
import TextInput from "../../components/inputs/TextInput";
import { Label } from "../../components/Titles";
import { useNavigate, useParams } from "react-router-dom";
import { changePasswordUsers, updateUsers } from "../../api/api";
import { AccountContext } from "../../AppContext/AppProvider";
import PasswordInput from "../../components/inputs/PasswordInput";
import { HashLoader } from "react-spinners";
import DropdownInput from "../../components/inputs/DropdownInput";
import IconButton from "../../components/buttons/IconButton";
import { FaLock } from "react-icons/fa";

const EditUsers = () => {
  const { id } = useParams();
  const { userData, users } = useContext(AccountContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    name: "",
    status: "",
    updated_by: userData["datos_sesion"].id,
  });

  useEffect(() => {
    if (users) {
      const findUser = users.filter((item) => item.id === id);

      if (findUser.length <= 1) {
        setUser({
          user_name: findUser[0].user_name ?? "",
          email: findUser[0].email ?? "",
          name: findUser[0].name ?? "",
          status: findUser[0].status ?? "",
          updated_by: userData["datos_sesion"].id ?? "",
        });
      }
    }
  }, [users, id, userData]);

  const saveChanges = () => {
    setIsLoading(true);
    if (!user.email || !user.name || !user.status || !user.user_name) {
      setError("Todos los campos son obligatorios");
      setIsLoading(false);
    } else {
      updateUsers(id, user)
        .then((data) => {
          setError("");
          setIsLoading(false);
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
  };

  const changePassword = () => {
    setIsLoading(true);
    if (newPassword !== repeatPassword) {
      setError("Las contraseñas no son iguales");
      setIsLoading(false);
    } else {
      const params = {
        password: newPassword,
        updated_by: userData["datos_sesion"].id,
      };
      changePasswordUsers(id, params)
        .then((data) => {
          setError("");
          setIsLoading(false);
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
  };

  return (
    <Container
      _isHeaderButtons={true}
      height={"auto"}
      nameSection={"Editar usuario"}
      _onCancel={() => navigate(-1)}
      _onSave={saveChanges}
    >
      <div className="justify-center grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border-2 rounded-md border-dark p-5 flex flex-col gap-5">
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
        </div>
        <div className="border-2 rounded-md border-dark p-5  flex flex-col items-center gap-5">
          <PasswordInput
            label={"Contraseña"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          <IconButton
            onClick={changePassword}
            bgColor={"#019707"}
            text={"Cambiar contraseña"}
          >
            <FaLock />
          </IconButton>
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

export default EditUsers;
