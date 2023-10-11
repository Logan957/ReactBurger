export enum SliceNames {
  INGREDIENTS = "INGREDIENTS",
  ORDER = "ORDER",
  WS ="WS",
  USER = "USER",
}

export enum PageRoutes {
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  PROFILE ="/profile",
  PROFILE_ORDERS ="/profile/orders",
  PROFILE_ORDERS_DETAILS ="/profile/orders/:id",
  ORDER_FEED ="/feed",
  ORDER_FEED_DETAILS ="/feed/:id"
}


export const BASE_URL = "https://norma.nomoreparties.space/api"

export const API_URL_INGREDIENTS = `${BASE_URL}/ingredients`;

export const WSS_HISTORY_ORDER = `wss://norma.nomoreparties.space/orders`;

export const WSS_FEED_ORDER = `wss://norma.nomoreparties.space/orders/all`;

export const API_URL_USER = `${BASE_URL}/auth/user`;
export const API_URL_LOGIN = `${BASE_URL}/auth/login`;
export const API_URL_REGISTER = `${BASE_URL}/auth/register`;
export const API_URL_LOGOUT = `${BASE_URL}/auth/logout`;
export const API_URL_TOKEN = `${BASE_URL}/auth/token`;


export const API_URL_RESET_PASSWORD = `${BASE_URL}/password-reset`;

export const API_URL_RESET_PASSWORD_RESET = `${BASE_URL}/password-reset/reset`;

export const API_URL_ORDERS = `${BASE_URL}/orders`;
