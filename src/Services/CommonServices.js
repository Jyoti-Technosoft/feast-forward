import { axiosInstance } from "./axiosinstance";

export const getFeedback = () => axiosInstance.get("/feedback");

export const upsertContactUs = (postData) =>
  axiosInstance.post("/contactUs", postData);
