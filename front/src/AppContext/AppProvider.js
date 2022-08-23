import React, { useState, useEffect, createContext } from "react";
import { getAllUsers, getUserDataDetails, UrlEnv } from "../api/api";
import qs from "qs";
import axios from "axios";

const AccountContext = createContext();

const AppProvider = (props) => {
  const [userData, setUserData] = useState({ sesion: false });
  const [userDetails, setUserDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [bgSelected, setBgSelected] = useState({ bgSelected: 0 });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("sesion"));
    if (items) {
      setUserData(items);
    }
    if (JSON.parse(localStorage.getItem("bgSelected")) !== null) {
      setBgSelected(JSON.parse(localStorage.getItem("bgSelected")));
    } else {
      localStorage.setItem("bgSelected", JSON.stringify({ bgSelected: 0 }));
    }
    if (userData.sesion === true) {
      getMyUsers(items.datos_sesion.id);
      getUserDetails(items.datos_sesion.id);
    }
  }, [userData.sesion, !userDetails]);

  // useEffect(() => {
  //   if (userData.sesion === true) {
  //     getMyUsers(userData.datos_sesion.id);
  //     getUserDetails(userData.datos_sesion.id);
  //   }
  // }, [userData.sesion && userData.datos_sesion.id]);

  const getMyUsers = async (id) => {
    const response = await getAllUsers({ id: id });
    setUsers(response);
  };

  const getUserDetails = async (id) => {
    const response = await getUserDataDetails({ id: id });
    setUserDetails(response[0]);
  };

  const authenticate = async (email, pass) => {
    await new Promise((resolve, reject) => {
      const data = {
        email: email,
        password: pass,
      };
      axios
        .post(`${UrlEnv}auth/login`, qs.stringify(data))
        .then(({ data }) => {
          setUserData(data);
          localStorage.setItem("sesion", JSON.stringify(data));
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  const logout = async () => {
    await new Promise((resolve, reject) => {
      axios
        .post(`${UrlEnv}auth/logout`)
        .then(() => {
          setUserData({ sesion: false });
          localStorage.removeItem("sesion");
          resolve(true);
        })
        .catch((err) => reject(err));
    });
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        userData,
        setUserData,
        users,
        setUsers,
        userDetails,
        setUserDetails,
        getUserDetails,
        bgSelected,
        setBgSelected,
        logout,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AppProvider, AccountContext };
