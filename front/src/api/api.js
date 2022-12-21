import qs from "qs";
import axios from "axios";

export const urlEnv = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const handleRegisterUser = (body) =>
  axios.post(`${urlEnv}auth/signUp`, body, config);

export const handleLoginUser = (body) =>
  axios.post(`${urlEnv}auth/signIn`, body, config);

export const handleIsAuth = (token) => {
  config.headers["x-access-token"] = token;
  return axios.get(`${urlEnv}auth/pingAuth`, config);
};

export const handleUpdateUser = (token, body, id) => {
  config.headers["x-access-token"] = token;
  return axios.put(`${urlEnv}auth/${id}`, body, config);
};
export const handleUpdatePassword = (token, body, id) => {
  config.headers["x-access-token"] = token;
  return axios.put(`${urlEnv}auth/updatePassword/${id}`, body, config);
};

export const deleteUserRequest = async (token, id) => {
  config.headers["x-access-token"] = token;
  await axios.delete(`${urlEnv}user/${id}`, config);
};
