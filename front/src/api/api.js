import qs from "qs";
import axios from "axios";

export const updateUser = async (id, data) =>
  await new Promise((resolve, reject) => {
    axios
      .post(
        `http://localhost:8080/userDetails/update/${id}`,
        qs.stringify(data)
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });

export const createUser = async (data) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`http://localhost:8080/users/create`, qs.stringify(data))
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });

export const updateUsers = async (id, data) => {
  const peticion = axios.post(
    `http://localhost:8080/users/update/${id}`,
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
    `http://localhost:8080/users/updatePassword/${id}`,
    qs.stringify(data)
  );
  const response = await peticion.then((data) => {
    return data;
  });
  const info = await response.data;
  return info;
};

export const getAllUsers = async (data) => {
  const peticion = axios.post(
    `http://localhost:8080/users/getUsers`,
    qs.stringify(data)
  );
  const response = await peticion.then((data) => {
    return data;
  });
  const info = await response.data["users"];
  return info;
};

export const getUserData = async (route, data) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`http://localhost:8080/${route}`, qs.stringify(data))
      .then(({ data }) => {
        localStorage.setItem("userData", JSON.stringify(data));
        resolve(data);
      })
      .catch((err) => reject(err));
  });
