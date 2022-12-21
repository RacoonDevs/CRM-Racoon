import React, { useState, useContext } from "react";
import Context from "../../AppContext/Context";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import ContainerForm from "../../components/containers/ContainerForm";
import TextInputAuth from "../../components/inputs/TextInputAuth";
import ContainerAuth from "../../components/containers/ContainerAuth";
import BasicButton from "../../components/buttons/BasicButton";
import { H1 } from "../../components/Titles";
import Logo from "../../assets/img/Logo_Blanco.png";
import { HashLoader } from "react-spinners";
import PasswordTextAuth from "../../components/inputs/PasswordTextAuth";

const Register = () => {
  const navigate = useNavigate();
  const { getRegister } = useContext(Context);
  const [body, setBody] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onRegister = async (body) => {
    setIsLoading(true);
    setIsError(false);
    if (
      !body.email ||
      !body.password ||
      !body.userName ||
      !body.firstName ||
      !body.lastName
    ) {
      setError("Todos los campos son obligatorios");
      setIsError(true);
      setIsLoading(false);
    } else {
      const result = await getRegister(body);
      if (result?.response.data.message === "Something went wrong") {
        setIsLoading(false);
        setError("Se ha producido un error mientra se iniciaba sesión.");
        return;
      }
      setIsLoading(false);
      setError(null);
      navigate("/");
    }
  };

  return (
    <ContainerAuth>
      <Formik
        enableReinitialize={true}
        initialValues={body}
        onSubmit={async (values) => {
          await onRegister(values);
          setBody({
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmiting }) => (
          <ContainerForm onSubmit={handleSubmit}>
            <img src={Logo} alt="logo_racoon" width={75} />
            <H1 text={"Identificate"} color={"#fff"} />
            <TextInputAuth
              name={"firstName"}
              type={"text"}
              text={"Nombre"}
              onChange={handleChange}
              value={values.firstName}
            />
            <TextInputAuth
              name="lastName"
              type={"text"}
              text={"Apellido"}
              onChange={handleChange}
              value={values.lastName}
            />
            <TextInputAuth
              name="userName"
              type={"text"}
              text={"Username"}
              onChange={handleChange}
              value={values.userName}
            />
            <TextInputAuth
              name="email"
              type={"email"}
              text={"Correo electrónico"}
              onChange={handleChange}
              value={values.email}
            />
            <PasswordTextAuth
              name="password"
              text={"Contraseña"}
              onChange={handleChange}
              value={values.password}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
            {isError && <p className="text-red text-sm">{error}</p>}
            {!isLoading && (
              <BasicButton
                onClick={handleSubmit}
                text={isSubmiting ? "Saving..." : "Save"}
                type="submit"
                disabled={isSubmiting}
                // onClick={onRegister}
              />
            )}
            <HashLoader color={"#0063C9"} size={28} loading={isLoading} />
            {/* <HashLoader color={"#9013FE"} size={32} loading={isLoading} /> */}
          </ContainerForm>
        )}
      </Formik>
    </ContainerAuth>
  );
};

export default Register;
