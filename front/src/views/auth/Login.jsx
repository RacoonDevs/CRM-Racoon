import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import ContainerForm from "../../components/containers/ContainerForm";
import TextInputAuth from "../../components/inputs/TextInputAuth";
import ContainerAuth from "../../components/containers/ContainerAuth";
import BasicButton from "../../components/buttons/BasicButton";
import { H1 } from "../../components/Titles";
import Logo from "../../assets/img/Logo_Blanco.png";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    email: email,
    password: pass,
  };

  const auth = () => {
    setIsLoading(true);
    setIsError(false);
    if (!data.email || !data.password) {
      setError("Todos los campos son obligatorios");
      setIsError(true);
      setIsLoading(false);
    } else {
      axios
        .post("http://localhost:8080/auth/login", qs.stringify(data))
        .then(({ data }) => {
          console.log(data);
          setIsLoading(false);
        })
        .catch(
          (err) => (
            console.log("Failed to login", err),
            setIsLoading(false),
            setError("El correo y/o la contraseña son incorrectos"),
            setIsError(true)
          )
        );
      navigate("/dashboard");
    }
  };

  return (
    <ContainerAuth>
      <ContainerForm>
        <img src={Logo} alt="logo_racoon" width={75} />
        <H1 text={"Identificate"} color={"#fff"} />
        <TextInputAuth
          type={"mail"}
          text={"Correo electrónico"}
          setValue={setEmail}
          value={email}
        />
        <TextInputAuth
          type={"password"}
          text={"Contraseña"}
          setValue={setPass}
          value={pass}
        />
        {isError && <p className="text-red-600 text-sm">{error}</p>}
        {!isLoading && <BasicButton text={"Iniciar sesión"} onClick={auth} />}
        <HashLoader color={"#9013FE"} size={32} loading={isLoading} />
      </ContainerForm>
    </ContainerAuth>
  );
};

export default Login;
