import React, { useState, useContext } from "react";
import Context from "../../AppContext/Context";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Toaster, toast } from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // const autofill = () => {
  //   setBody({ title: "racoon@racoon.mx", description: "racoonadmin" });
  // };

  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const onLogin = async (body) => {
    setIsLoading(true);
    if (!body.email || !body.password) {
      notifyError("Todos los campos son obligatorios");
      setIsLoading(false);
    } else {
      const result = await getLogin(body);
      if (result?.error) {
        notifyError(result.error);
        setIsLoading(false);
        return;
      }
      if (result?.data) {
        notify(`Bienvenido de nuevo ${result.data.user.name}.`);
        setIsLoading(false);
      }
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <ContainerAuth>
      <Formik
        initialValues={body}
        onSubmit={async (values) => {
          await onLogin(values);
          setBody({ email: body.email, password: body.password });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmiting }) => (
          <ContainerForm>
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
            {!isLoading && (
              <BasicButton
                onClick={handleSubmit}
                text={isSubmiting ? "Login..." : "Iniciar sesión"}
                type="submit"
                disabled={isSubmiting}
                // onClick={onLogin}
              />
            )}
            <div className="flex gap-2 items-center">
              <p className="text-white font-bold">¿Aun no tienes una cuenta?</p>
              <Link
                className="text-blue font-bold hover:underline hover:cursor-pointer"
                to={"/register"}
              >
                Registrate
              </Link>
            </div>
            <HashLoader color={"#0063C9"} size={28} loading={isLoading} />
            {/* <HashLoader color={"#9013FE"} size={32} loading={isLoading} /> */}
          </ContainerForm>
        )}
      </Formik>
      <Toaster />
    </ContainerAuth>
  );
};

export default Login;
