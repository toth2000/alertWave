export const API_URL = "http://localhost:7671";

// AUTH ROUTE

export const LOGIN_ROUTE_URL = "/auth/login";
export const REGISTER_ROUTE_URL = "/auth/register";
export const REFRESH_TOKEN_ROUTE_URL = "/auth/refresh";

// STOCK ROUTE

export const SEARCH_STOCK_ROUTE_URL = "/stock/search"; // /stock/search/:company_name

// SUBSCRIPTION ROUTE

export const GET_USER_SUBSCRIPTION_ROUTE = "/subscription"; ///subscription/:userId
export const CREATE_USER_SUBSCRIPTION_ROTUE = "/subscription/create";
export const DELETE_USER_SUBSCRIPTION_ROUTE = "/subscription/delete";
export const REGISTER_DEVICE_ROUTE = "/subscription/fcm/register";
