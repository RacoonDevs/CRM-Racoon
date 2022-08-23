import React, { useState, useEffect, createContext } from "react";
import qs from "qs";
import axios from "axios";
import { getAllUsers, getUserDataDetails, UrlEnv } from "../api/api";

const AccountContext = createContext();

const AppProvider = (props) => {
  const [userData, setUserData] = useState({ sesion: false });
  const [userDetails, setUserDetails] = useState("");
  const [users, setUsers] = useState([]);
  const [bgSelected, setBgSelected] = useState({ bgSelected: 0 });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("sesion"));
    if (items) {
      setUserData(items);
      getMyUsers(items.datos_sesion.id);
      getUserDetails(items.datos_sesion.id);
    }
    const oldBg = JSON.parse(localStorage.getItem("bgSelected"));
    if (oldBg !== null) {
      setBgSelected(oldBg);
    } else {
      localStorage.setItem("bgSelected", JSON.stringify({ bgSelected: 0 }));
    }
  }, [userData.sesion === true]);

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
        users,
        setUsers,
        bgSelected,
        logout,
        setBgSelected,
        setUserData,
        userDetails,
        setUserDetails,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AppProvider, AccountContext };
