import axios from "axios";
import { API_URL } from "../constants";
import qs from "qs";

// Authentication
export const fetchAdmins = () => axios.get(`${API_URL}/admin`);
export const login = (payload) => axios.post(`${API_URL}/admin/login`, payload);
export const register = (payload) =>
  axios.post(`${API_URL}/admin/register`, payload);

// CRUD operations
export const fetchShoes = () => axios.get(`${API_URL}/shoes`);
export const fetchShoe = (id) => axios.get(`${API_URL}/shoes/${id}`);
export const deleteShoe = (id) => axios.delete(`${API_URL}/shoes/delete/${id}`);
export const fetchShoesBySearch = (query) =>
  axios.get(`${API_URL}/shoes/search?${query}`);
export const createShoe = (payload) =>
  axios.post(`${API_URL}/shoes/create`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
export const updateShoe = (payload) =>
  axios.put(`${API_URL}/shoes/update/${payload._id}`, qs.stringify(payload), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });
