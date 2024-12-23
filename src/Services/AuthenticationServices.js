import { axiosInstance } from "./axiosinstance";

export const upsertLogin = (postData) => axiosInstance.post("/login", postData);

export const upsertRegister = (postData) =>
  axiosInstance.post("/register", postData);

export const upsertLogout = (email) => axiosInstance.delete("/logout/" + email);
