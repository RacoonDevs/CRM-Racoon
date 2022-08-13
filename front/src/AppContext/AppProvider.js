import React, { useState, useEffect, createContext } from "react";
import qs from "qs";
import axios from "axios";

const AccountContext = createContext();

const AppProvider = (props) => {
  const [userData, setUserData] = useState([]);

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
          resolve(data);
        })
        .catch((err) => reject(err));
    });

  return (
    <AccountContext.Provider value={{ authenticate, userData }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { AppProvider, AccountContext };
