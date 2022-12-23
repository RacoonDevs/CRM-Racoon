import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../AppContext/Context";
import Container from "../../components/containers/Container";
import { useNavigate } from "react-router-dom";
import Table from "../../components/tables/Table";
import { HashLoader } from "react-spinners";
import { Label } from "../../components/Titles";
import imgForbiden from "../../assets/img/astronaut.png";
import { FaArrowRight } from "react-icons/fa";

const headers = [
  ["ID", "id"],
  ["Nombre", "name"],
  ["Correo", "email"],
  ["Nombre de usuario", "user_name"],
  ["Fecha de creación", "created_at"],
  ["Estatus", "status"],
];

const Users = () => {
  const navigate = useNavigate();
  const { user, employees, getDeleteUser } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const editUser = (id) => {
    navigate(`/usuarios/editar_usuario/${id}`);
  };

  const onUserDelete = (id) => {
    setIsLoading(true);
    getDeleteUser(id);
    notifyError(
      "Se ha producido un error al guardar los cambios intente más tarde."
    );
    notify("Los cambios se han guardado correctamente");
  };

  return (
    <Container
      nameSection={"Todos los usuarios"}
      _isHeaderButtons={true}
      _onOptionalButton={() => navigate("/teams")}
      _needOptionalButton={true}
      _optionalButtonLabel={
        <div className="flex gap-2 items-center">
          {"Ir a Teams"}
          <FaArrowRight />
        </div>
      }
    >
      {user.user.rol !== 5 ? (
        <div>
          <div className="flex flex-col items-center justify-center w-[100%]">
            <img src={imgForbiden} width={"350px"} alt="working_in_progress" />

            <div className="w-80 text-center">
              <Label
                size={"18px"}
                color={"#349EFF"}
                text={
                  "Parece que aun no has creado un TEAM, esta caracterisitca es exclusiva para usuarios que administran un TEAM."
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <span className="flex justify-center">
            <HashLoader color={"#0063C9"} size={25} loading={isLoading} />
          </span>
          <Table
            headers={headers}
            _isAddButton={true}
            onClickAddButton={() => navigate("/usuarios/agregar_usuarios")}
            textAddButton={"Agregar usuario"}
            body={employees}
            doDelete={true}
            doEdit={true}
            doShow={true}
            onEdit={editUser}
            onDelete={onUserDelete}
          />
        </>
      )}
      <Toaster />
    </Container>
  );
};

export default Users;
