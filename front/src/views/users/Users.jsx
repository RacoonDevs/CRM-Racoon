import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../AppContext/AppProvider";
import Container from "../../components/containers/Container";
import { useNavigate } from "react-router-dom";
import Table from "../../components/tables/Table";

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
  const { users } = useContext(AccountContext);

  const editUser = (id) => {
    navigate(`/usuarios/editar_usuario/${id}`);
  };
  // const normalizr = (data) =>
  //   data.map((element, index) => ({
  //     vehiclePictures: element.vehicle.vehiclePictures[0],
  //     id: element.id,
  //     folio: index + 1,
  //     vehicle_licensePlate: element.vehicle.licensePlate,
  //     vehicle_vehicleType: element.vehicle.vehicleType,
  //     vehicle_brand: element.vehicle.brand,
  //     vehicle_model: element.vehicle.model,
  //     ...element,
  //   }));

  return (
    <Container nameSection={"Todos los usuarios"}>
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
      />
    </Container>
  );
};

export default Users;
