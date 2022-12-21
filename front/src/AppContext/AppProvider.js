import React, { useReducer, useEffect } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import { GET_LOGOUT, GET_SIGNIN, GET_SIGNUP, SET_BG } from "./Types";
import {
  deleteUserRequest,
  handleIsAuth,
  handleLoginUser,
  handleRegisterUser,
  handleUpdatePassword,
  handleUpdateUser,
} from "../api/api";

const AppProvider = (props) => {
  const initialState = {
    user: [],
    employees: [],
    bgSelected: 0,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      if (!data?.user) {
        return localStorage.removeItem("user");
      }
      dispatch({ type: GET_SIGNIN, payload: data });
      dispatch({ type: SET_BG, payload: data.user.bgSelected });
      verifyAuth(data.token);
    } else {
      dispatch({ type: GET_LOGOUT });
    }
  }, []);

  const verifyAuth = (token) => {
    try {
      if (token) {
        handleIsAuth(token)
          .then((response) => {
            if (response.data.message !== "isAuth") {
              localStorage.removeItem("user");
              dispatch({ type: GET_LOGOUT });
              window.location.reload();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRegister = async (body) => {
    try {
      const res = await handleRegisterUser(body);

      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: GET_SIGNUP, payload: res.data });

      if (window.location.pathname === "/auth") {
        const url = window.localStorage.getItem("route");
        if (url) {
          window.location.replace(url);
        }
      }
    } catch (err) {
      console.log("Ocurrio un error inesperado: ", err);
      return err.response.data;
    }
  };

  const getLogin = async (body) => {
    try {
      const res = await handleLoginUser(body);

      dispatch({ type: GET_SIGNIN, payload: res.data });
      localStorage.setItem("user", JSON.stringify(res.data));

      if (window.location.pathname === "/auth") {
        const url = window.localStorage.getItem("route");
        if (url) {
          window.location.replace(url);
        }
      }
    } catch (err) {
      console.log("Ocurrio un error inesperado: ", err);
      return err.response.data;
    }
  };

  const getUpdateUser = async (body) => {
    try {
      const res = await handleUpdateUser(
        state.user.token,
        body,
        state.user.user.id
      )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({ type: GET_SIGNIN, payload: response.data });
          if (response.data.user.bgSelected !== state.bgSelected) {
            dispatch({
              type: SET_BG,
              payload: response.data.user.bgSelected,
            });
          }
          return response;
        })
        .catch((err) => {
          console.error(err);
          return err.response.data;
        });
      return res;
    } catch (err) {
      console.log("Ocurrio un error inesperado: ", err);
      return err.response.data;
    }
  };

  const getUpdatePassword = async (body) => {
    try {
      const res = await handleUpdatePassword(
        state.user.token,
        body,
        state.user.user.id
      )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.error(err.response.data);
          return err.response.data;
        });
      return res;
    } catch (err) {
      console.log("Ocurrio un error inesperado: ", err);
      return err.response.data;
    }
  };

  const getDeleteUser = async (id) => {
    try {
      const response = await deleteUserRequest(state.user.token, id);
      console.log(response);
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  };

  const getChangePassword = () => {
    console.log("changin password");
  };

  const getCloseSesion = () => {
    localStorage.removeItem("user");
    dispatch({ type: GET_LOGOUT });
    window.location.reload();
  };

  return (
    <Context.Provider
      value={{
        getLogin,
        getRegister,
        getUpdateUser,
        getUpdatePassword,
        getCloseSesion,
        getChangePassword,
        getDeleteUser,
        user: state.user,
        bgSelected: state.bgSelected,
        employees: state.employees,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
