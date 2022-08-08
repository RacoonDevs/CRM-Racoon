import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContainerForm from "../../components/containers/ContainerForm";
import TextInputAuth from "../../components/inputs/TextInputAuth";
import ContainerAuth from "../../components/containers/ContainerAuth";
import BasicButton from "../../components/buttons/BasicButton";
import { H1 } from "../../components/Titles";
import Logo from "../../assets/img/Logo_Blanco.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setisError] = useState(false);

  const data = {
    email: email,
    password: pass,
  };

  const auth = () => {
    const url = "http://localhost:8080/auth/login";
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => console.log(response))
    //   .catch((err) => {
    //     console.log("Failed to login", err);
    //     setisError(true);
    //   });
    axios
      .post(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ContainerAuth>
      <ContainerForm>
        <img src={Logo} alt="logo_racoon" width={75} />
        <H1 text={"Identificate"} color={"#fff"} />
        <TextInputAuth
          type={"mail"}
          text={"Username"}
          setValue={setEmail}
          value={email}
        />
        <TextInputAuth
          type={"password"}
          text={"Password"}
          setValue={setPass}
          value={pass}
        />
        {isError && <p>Error</p>}
        <BasicButton text={"Iniciar sesión"} onClick={auth} />
      </ContainerForm>
    </ContainerAuth>
  );
};

export default Login;
