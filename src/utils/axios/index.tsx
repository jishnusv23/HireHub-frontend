import axios, { AxiosError } from "axios";
export const BASE_URL = "http://localhost:2001";

export const CLIENT_API = axios.create({
  baseURL: BASE_URL,
});

CLIENT_API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    console.log(error.message);
    throw error;
  }
);
