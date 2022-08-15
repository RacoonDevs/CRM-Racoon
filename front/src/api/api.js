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
