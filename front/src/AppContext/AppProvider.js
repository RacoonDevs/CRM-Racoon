import React, { useState, useEffect, createContext } from "react";
import qs from "qs";
import axios from "axios";
import { getAllUsers } from "../api/api";

const AccountContext = createContext();

const AppProvider = (props) => {
  const [userData, setUserData] = useState({ sesion: false });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("sesion"));
    if (items) {
      setUserData(items);
      getData(items.datos_sesion.id);
    }
  }, [userData.sesion === true]);

  // useEffect(() => {
  //   if (userData.sesion ===true) {
  //     getData(userData.datos_sesion.id);
  //   }
  // }, [userData.sesion == true]);

  const getData = async (id) => {
    const response = await getAllUsers({ id: id });
    setUsers(response);
  };

  const authenticate = async (email, pass) =>
    await new Promise((resolve, reject) => {
      const data = {
        email: email,
        password: pass,
      };

      axios
        .post("http://localhost:8080/auth/login", qs.stringify(data))
        .then(({ data }) => {
          setUserData(data);
          localStorage.setItem("sesion", JSON.stringify(data));
          resolve(data);
        })
        .catch((err) => reject(err));
    });

  const logout = async () => {
    await new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8080/auth/logout")
        .then(() => {
          setUserData({ sesion: false });
          localStorage.removeItem("sesion");
          resolve(true);
        })
        .catch((err) => reject(err));
    });
  };

  return (
    <AccountContext.Provider value={{ authenticate, userData, users, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { AppProvider, AccountContext };
