import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../AppContext/Context";
import Container from "../../components/containers/Container";
import { useNavigate } from "react-router-dom";
import Table from "../../components/tables/Table";
import { HashLoader } from "react-spinners";

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
    <Container nameSection={"Todos los usuarios"}>
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
      <Toaster />
    </Container>
  );
};

export default Users;
