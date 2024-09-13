import axios from "axios";

export const baseURL = "http://localhost:8081/api/users";

export const AxiosConfig = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const AxiosConfigPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default {
  baseURL,
  AxiosConfig,
  AxiosConfigPrivate,
};
