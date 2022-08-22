import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AccountContext } from "../../AppContext/AppProvider";
import Container from "../../components/containers/Container";
import { useNavigate } from "react-router-dom";
import Table from "../../components/tables/Table";
import { deleteUSer } from "../../api/api";
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
  const { users, userData, setUsers } = useContext(AccountContext);
  const { id } = userData["datos_sesion"];

  const [isLoading, setIsLoading] = useState(false);

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const editUser = (id) => {
    navigate(`/usuarios/editar_usuario/${id}`);
  };

  const userDelete = (user) => {
    setIsLoading(true);
    const params = { delete_user: 1, updated_by: id };
    deleteUSer(user, params)
      .then((data) => {
        notify(data.users);
        setUsers(users.filter((item) => item.id !== user));
        setIsLoading(false);
      })
      .catch((err) => {
        notifyError(err?.users);
        setIsLoading(false);
      });
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
        body={users}
        doDelete={true}
        doEdit={true}
        doShow={true}
        onEdit={editUser}
        onDelete={userDelete}
      />
      <Toaster />
    </Container>
  );
};

export default Users;
