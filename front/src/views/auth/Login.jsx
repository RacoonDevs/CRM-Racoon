import React, { useState, useContext } from "react";
import Context from "../../AppContext/Context";
import { useNavigate } from "react-router-dom";
import ContainerForm from "../../components/containers/ContainerForm";
import TextInputAuth from "../../components/inputs/TextInputAuth";
import ContainerAuth from "../../components/containers/ContainerAuth";
import BasicButton from "../../components/buttons/BasicButton";
import { H1 } from "../../components/Titles";
import Logo from "../../assets/img/Logo_Blanco.png";
import { HashLoader } from "react-spinners";
import PasswordTextAuth from "../../components/inputs/PasswordTextAuth";

const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useContext(Context);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const autofill = () => {
    setEmail("racoon@racoon.mx");
    setPass("racoonadmin");
  };

  const auth = () => {
    setIsLoading(true);
    setIsError(false);
    if (!email || !pass) {
      setError("Todos los campos son obligatorios");
      setIsError(true);
      setIsLoading(false);
    } else {
      authenticate(email, pass)
        .then((data) => {
          console.log(data);
          navigate("/dashboard");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Failed to login", err);
          setIsLoading(false);
          setError("El correo y/o la contraseña son incorrectos");
          setIsError(true);
        });
    }
  };

  return (
    <ContainerAuth>
      <ContainerForm>
        <img
          src={Logo}
          alt="logo_racoon"
          width={75}
          onClick={() => autofill()}
        />
        <H1 text={"Identificate"} color={"#fff"} />
        <TextInputAuth
          type={"mail"}
          text={"Correo electrónico"}
          setValue={setEmail}
          value={email}
        />
        <PasswordTextAuth
          text={"Contraseña"}
          setValue={setPass}
          value={pass}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        {isError && <p className="text-red-600 text-sm">{error}</p>}
        {!isLoading && <BasicButton text={"Iniciar sesión"} onClick={auth} />}
        <HashLoader color={"#0063C9"} size={25} loading={isLoading} />
        {/* <HashLoader color={"#9013FE"} size={32} loading={isLoading} /> */}
      </ContainerForm>
    </ContainerAuth>
  );
};

export default Login;
