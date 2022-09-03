import React, { useReducer, useEffect } from "react";
import qs from "qs";
import axios from "axios";
import Context from "./Context";
import Reducer from "./Reducer";
import {
  GET_PROFILE,
  GET_PROFILE_DETAILS,
  GET_USERS,
  GET_USER_DETAILS,
  LOGOUT,
  SELECT_BG,
} from "./Types";

export const UrlEnv = process.env.REACT_APP_API_URL;

const AppProvider = (props) => {
  const initialState = {
    profile: { sesion: null },
    profileDetails: [],
    users: [],
    bgSelected: 0,
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile"));
    if (data) {
      dispatch({ type: GET_PROFILE, payload: data });
      console.log(data.datos_sesion.id);
      getProfileDetails(data.datos_sesion.id);
    } else {
      initialState.profile.sesion = false;
    }
    if (JSON.parse(localStorage.getItem("bgSelected")) !== null) {
      getBgSelected(JSON.parse(localStorage.getItem("bgSelected")));
    } else {
      localStorage.setItem("bgSelected", JSON.stringify({ bgSelected: 0 }));
    }
  }, []);

  const getProfileDetails = async (info) => {
    try {
      const response = await axios.post(
        `${UrlEnv}usersDetails/getUsersDetails`,
        qs.stringify({ id: info })
      );
      const data = await response.data.users[0];
      dispatch({ type: GET_PROFILE_DETAILS, payload: data });
    } catch (err) {
      console.log("Ocurrio un error inesperado (profileDetails): ", err);
    }
  };

  const getProfile = async (data) => {
    dispatch({ type: GET_PROFILE, payload: data });
  };

  const getAllUsers = async (info) => {
    try {
      const res = await axios.post(
        `${UrlEnv}users/getUsers`,
        qs.stringify({ id: info })
      );
      const data = await res.data.data.users;
      console.log("all users: ", data);
      dispatch({ type: GET_USERS, payload: data });
    } catch (err) {
      console.log("Ocurrio un error inesperado: ", err);
    }
  };

  const getUsersDetails = async (info) => {
    try {
      const response = await axios.post(
        `${UrlEnv}usersDetails/getUsersDetails`,
        qs.stringify(info)
      );
      const data = await response.data.users;
      console.log("user details: ", data);
      dispatch({ type: GET_USER_DETAILS, payload: data });
    } catch (err) {
      console.log("Ocurrio un error inesperado (userDetails): ", err);
    }
  };

  const getBgSelected = (data) => {
    dispatch({ type: SELECT_BG, payload: data });
    localStorage.setItem("bgSelected", JSON.stringify(data));
  };

  const authenticate = async (email, pass) => {
    try {
      const response = await axios.post(
        `${UrlEnv}auth/login`,
        qs.stringify({ email: email, password: pass })
      );
      const data = await response.data;
      dispatch({ type: GET_PROFILE, payload: data });
      localStorage.setItem("profile", JSON.stringify(data));
      getProfileDetails(data.datos_sesion.id);
    } catch (err) {
      console.log("Ocurrio un error inesperado: ", err);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${UrlEnv}auth/logout`);
      const data = await response.data;
      dispatch({ type: LOGOUT, payload: initialState });
      localStorage.removeItem("profile");
      console.log("auth: ", data);
    } catch (err) {
      console.log("Ocurrio un error inesperado: ", err);
    }
  };

  return (
    <Context.Provider
      value={{
        logout,
        authenticate,
        getProfileDetails,
        getAllUsers,
        getUsersDetails,
        getProfile,
        profile: state.profile,
        profileDetails: state.profileDetails,
        getBgSelected,
        bgSelected: state.bgSelected,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;

// useEffect(() => {
//   const items = JSON.parse(localStorage.getItem("sesion"));
//   if (items) {
//     setUserData(items);
//   }
//   if (JSON.parse(localStorage.getItem("bgSelected")) !== null) {
//     setBgSelected(JSON.parse(localStorage.getItem("bgSelected")));
//   } else {
//     localStorage.setItem("bgSelected", JSON.stringify({ bgSelected: 0 }));
//   }
// }, []);
