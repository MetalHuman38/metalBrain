import axios from "axios";

const baseURL = "http://localhost:8081/api/users";

const AxiosConfig = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const AxiosConfigPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { AxiosConfig, AxiosConfigPrivate };
