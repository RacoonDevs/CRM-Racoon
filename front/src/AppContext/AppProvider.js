import React, { useReducer, useEffect } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import {
  GET_CREATE_TEAM,
  GET_LOGOUT,
  GET_SIGNIN,
  GET_SIGNUP,
  SET_BG,
} from "./Types";
import {
  deleteUserRequest,
  handleCreateTeamRequest,
  handleGetTeamRequest,
  handleIsAuth,
  handleLoginUser,
  handleRegisterUser,
  handleUpdatePassword,
  handleUpdateTeamRequest,
  handleUpdateUser,
} from "../api/api";

const AppProvider = (props) => {
  const initialState = {
    user: [],
    team: [],
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
      const res = await handleRegisterUser(body)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({ type: GET_SIGNUP, payload: response.data });
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

  const getLogin = async (body) => {
    try {
      const res = await handleLoginUser(body)
        .then((response) => {
          dispatch({ type: GET_SIGNIN, payload: response.data });
          dispatch({ type: SET_BG, payload: response.data.user.bgSelected });
          localStorage.setItem("user", JSON.stringify(response.data));
          // await getTeam();
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

  const getUpdateUser = async (body) => {
    console.log(body);
    try {
      const res = await handleUpdateUser(
        state.user.token,
        body,
        state.user.user.id
      )
        .then(async (response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({ type: GET_SIGNIN, payload: response.data });
          if (response.data.user.bgSelected !== state.bgSelected) {
            dispatch({
              type: SET_BG,
              payload: response.data.user.bgSelected,
            });
          }
          await getTeam();
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

  const getTeam = async () => {
    try {
      const res = await handleGetTeamRequest(
        state.user.token,
        state.user.user.team_id
      )
        .then((response) => {
          dispatch({ type: GET_CREATE_TEAM, payload: response.data });
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

  const getCreateTeam = async (body) => {
    try {
      const res = await handleCreateTeamRequest(state.user.token, body)
        .then((response) => {
          dispatch({ type: GET_CREATE_TEAM, payload: response.data });
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

  const getUpdateTeam = async (body) => {
    try {
      const res = await handleUpdateTeamRequest(
        state.user.token,
        body,
        state.team.id
      )
        .then((response) => {
          dispatch({ type: GET_CREATE_TEAM, payload: response.data });
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
        getCreateTeam,
        getUpdateTeam,
        getDeleteUser,
        getTeam,
        user: state.user,
        bgSelected: state.bgSelected,
        employees: state.employees,
        team: state.team,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
