import { API } from ".";
import {
  CREATE_USER_SUBSCRIPTION_ROTUE,
  DELETE_USER_SUBSCRIPTION_ROUTE,
  GET_USER_SUBSCRIPTION_ROUTE,
  REGISTER_DEVICE_ROUTE,
} from "../constant/apiUrl";

export const getUserSubscription = (userId) => {
  if (userId) return API.get(`${GET_USER_SUBSCRIPTION_ROUTE}/${userId}`);
};

export const createUserSubscription = (userId, stock) => {
  return API.post(CREATE_USER_SUBSCRIPTION_ROTUE, {
    userId,
    stock,
  });
};

export const deleteUserSubscription = (userId, stock) => {
  return API.post(DELETE_USER_SUBSCRIPTION_ROUTE, { userId, stock });
};

export const registerDevice = (userId, fcmToken) => {
  return API.post(REGISTER_DEVICE_ROUTE, { userId, fcmToken });
};
