import React from "react";
import { FaUserPlus } from "react-icons/fa";
import IconButton from "../../components/buttons/IconButton";
import Container from "../../components/containers/Container";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  return (
    <Container nameSection={"Todos los usuarios"}>
      <IconButton
        onClick={() => navigate("/agregar_usuarios")}
        text={"Agregar usuario"}
      >
        <FaUserPlus size={24} />
      </IconButton>
    </Container>
  );
};

export default Users;
