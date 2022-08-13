import React, { useState, useEffect, createContext } from "react";
import qs from "qs";
import axios from "axios";

const AccountContext = createContext();

const AppProvider = (props) => {
  const [userData, setUserData] = useState([]);
  console.log("userdata", userData);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("sesion"));
    if (items) {
      setUserData(items);
    }
  }, [userData]);

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
        .then((data) => {
          setUserData("");
          localStorage.removeItem("sesion");
          resolve(true);
        })
        .catch((err) => reject(err));
    });
  };

  return (
    <AccountContext.Provider value={{ authenticate, userData, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { AppProvider, AccountContext };
