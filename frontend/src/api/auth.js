import { API } from ".";
import {
  LOGIN_ROUTE_URL,
  REFRESH_TOKEN_ROUTE_URL,
  REGISTER_ROUTE_URL,
} from "../constant/apiUrl";

export const login = ({ email, password }) => {
  return API.post(`${LOGIN_ROUTE_URL}`, {
    email: email,
    password: password,
  });
};

export const register = ({ name, email, password }) => {
  return API.post(`${REGISTER_ROUTE_URL}`, {
    name: name,
    email: email,
    password: password,
  });
};

export const refreshToken = (refreshToken) => {
  return API.post(`${REFRESH_TOKEN_ROUTE_URL}`, {
    refreshToken: refreshToken,
  });
};
