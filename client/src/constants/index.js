export const API_URL =
  process.env.NODE_ENV !== "production" ? "http://localhost:3007/api" : "";

export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const AUTHENTICATION = "AUTHENTICATION";

export const LOAD_SUCCESS = "LOAD_SUCCESS";
export const LOAD_ERROR = "LOAD_ERROR";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DETAILS_PRODUCT = "DETAILS_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
