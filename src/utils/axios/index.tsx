import axios, { AxiosError } from "axios";
export const BASE_URL = "http://localhost:2001";

export const CLIENT_API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

CLIENT_API.interceptors.response.use(
  (response) => {
    // console.log(response.data, "interceptor");
    return response;
  },
  (error: AxiosError) => {
    console.log(error.message, "error interceptors");
    throw error;
  }
);
