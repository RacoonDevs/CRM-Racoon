import React, { useState } from "react";
import ContainerForm from "../../components/containers/ContainerForm";
import TextInputAuth from "../../components/inputs/TextInputAuth";
import ContainerAuth from "../../components/containers/ContainerAuth";
import BasicButton from "../../components/buttons/BasicButton";
import { H1 } from "../../components/Titles";
import Logo from "../../assets/img/Logo_Blanco.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onChange = (value) => {
    setEmail(value);
  };
  const onClick = () => {
    console.log(email, pass);
  };

  return (
    <ContainerAuth>
      <ContainerForm>
        <img src={Logo} alt="logo_racoon" width={100} />
        <H1 text={"Identificate"} color={"#fff"} />
        <TextInputAuth
          type={"mail"}
          text={"Username"}
          setValue={onChange}
          value={email}
        />
        <TextInputAuth type={"password"} text={"Password"} setValue={setPass} />
        <BasicButton text={"Iniciar sesión"} onClick={onClick} />
      </ContainerForm>
    </ContainerAuth>
  );
};

export default Login;
