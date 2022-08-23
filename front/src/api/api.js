import qs from "qs";
import axios from "axios";

export const UrlEnv = process.env.REACT_APP_API_URL;

export const createUser = async (data) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${UrlEnv}users/create`, qs.stringify(data))
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });

export const updateUsers = async (id, data) => {
  const peticion = axios.post(
    `${UrlEnv}users/update/${id}`,
    qs.stringify(data)
  );
  const response = await peticion.then((data) => {
    return data;
  });
  const info = await response.data;
  return info;
};

export const updateUsersDetails = async (id, data) => {
  const peticion = axios.post(
    `${UrlEnv}usersDetails/update/${id}`,
    qs.stringify(data)
  );
  const response = await peticion.then((data) => {
    return data;
  });
  const info = await response.data;
  return info;
};

export const changePasswordUsers = async (id, data) => {
  const peticion = axios.post(
    `${UrlEnv}users/updatePassword/${id}`,
    qs.stringify(data)
  );
  const response = await peticion.then((data) => {
    return data;
  });
  const info = await response.data;
  return info;
};

export const deleteUSer = async (id, params) => {
  const peticion = axios.post(
    `${UrlEnv}users/delete/${id}`,
    qs.stringify(params)
  );
  const response = await peticion.then((data) => {
    return data;
  });
  const info = await response.data;
  return info;
};

export const getAllUsers = async (data) => {
  const peticion = axios.post(`${UrlEnv}users/getUsers`, qs.stringify(data));
  const response = await peticion.then((data) => {
    return data;
  });
  const info = await response.data["users"];
  return info;
};

export const getUserData = async (route, data) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${UrlEnv}${route}`, qs.stringify(data))
      .then(({ data }) => {
        localStorage.setItem("userData", JSON.stringify(data));
        resolve(data);
      })
      .catch((err) => reject(err));
  });
