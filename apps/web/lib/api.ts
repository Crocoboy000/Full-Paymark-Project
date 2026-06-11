import axios from "axios";
import { useAuthStore } from "../store/auth.store";


export const api = axios.create({
  baseURL: "http://localhost:8000",

  headers: {
    "Content-Type":
      "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);



export const getAccessToken = () =>
  useAuthStore.getState().accessToken;