import axios from "axios";
import { BASE_URL } from "./../app-endpoint";

let currentMethod = "";
let errorMessage = "";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    currentMethod = config.method.toUpperCase();
    const formData = config.data instanceof FormData;
    if (formData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = `${user?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (currentMethod === "GET") {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          // window.location.href = "/";
        } else if (
          error.response.status === 404 ||
          error.response.status === 500 ||
          error.response.status === 400
        ) {
          console.log("Server Error:", error.response.data.message);
        }
      } else {
        console.log("Error:", error.message);
      }
    } else {
      if (error.response) {
        if (
          error.response.status === 400 ||
          error.response.status === 500 ||
          error.response.status === 409
        ) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 404) {
          errorMessage = error.response.data.message ?? "Api Not Found.";
        } else if (
          error.response.status === 501 ||
          error.response.status === 510
        ) {
          errorMessage = error.response.data.message;
        } else if (
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          errorMessage = error.response.data.message;
          // window.location.href = "/";
        }
      } else {
        errorMessage = error.message;
        console.log("Error:", errorMessage);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, errorMessage };
