import React from "react";
import ContainerForm from "../../components/containers/ContainerForm";
import TextInputAuth from "../../components/inputs/TextInputAuth";
import ContainerAuth from "../../components/containers/ContainerAuth";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { H1 } from "../../components/Titles";
import Logo from "../../assets/img/Logo_Blanco.png";

const Login = () => {
  return (
    <div>
      <ContainerAuth>
        <ContainerForm>
          <img src={Logo} width={100} />
          <H1 text={"Identificate"} color={"#fff"} />
          <TextInputAuth type={"mail"} text={"Username"} />
          <TextInputAuth type={"password"} text={"Password"} />
          <PrimaryButton text={"Iniciar sesión"} />
        </ContainerForm>
      </ContainerAuth>
    </div>
  );
};

export default Login;
