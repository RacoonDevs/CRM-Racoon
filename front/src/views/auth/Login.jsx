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

const Login = () => {
  const navigate = useNavigate();
  const { getLogin } = useContext(Context);
  const [body, setBody] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // const autofill = () => {
  //   setBody({ title: "racoon@racoon.mx", description: "racoonadmin" });
  // };

  const onLogin = async (body) => {
    setIsLoading(true);
    setIsError(false);
    if (!body.email || !body.password) {
      setError("Todos los campos son obligatorios");
      setIsError(true);
      setIsLoading(false);
    } else {
      const result = await getLogin(body);
      if (result?.response.data.message === "Something went wrong") {
        setError("Se ha producido un error mientra se iniciaba sesión.");
        setIsLoading(false);
        return;
      }
      setError(null);
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <ContainerAuth>
      <Formik
        enableReinitialize={true}
        initialValues={body}
        onSubmit={async (values) => {
          await onLogin(values);
          setBody({ title: "", description: "" });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmiting }) => (
          <ContainerForm onSubmit={handleSubmit}>
            <img
              src={Logo}
              alt="logo_racoon"
              width={75}
              // onClick={() => autofill()}
            />
            <H1 text={"Identificate"} color={"#fff"} />
            <TextInputAuth
              name={"email"}
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
                // onClick={onLogin}
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

export default Login;
