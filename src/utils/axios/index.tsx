// import axios, { AxiosError } from "axios";
// export const BASE_URL = "http://localhost:2001";

// export const CLIENT_API = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// CLIENT_API.interceptors.response.use(
//   (response) => {
    
//     return response;
//   },
//   (error: AxiosError) => {
//     console.log(error.message, "error interceptors");
//     throw error;
//   }
// );

import axios from "axios";

const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "4.188.113.7";

export const BASE_URL = isDevelopment
  ? "http://localhost:2001"
  : "http://trend-vista.shop";

console.log(BASE_URL, "hee");

export const CLIENT_API = axios.create({
  baseURL: BASE_URL,
});