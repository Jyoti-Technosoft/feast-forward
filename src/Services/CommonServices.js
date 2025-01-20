import { axiosInstance } from "./axiosinstance";

export const getFeedback = () => axiosInstance.get("/feedback");

export const upsertContactUs = (postData) =>
  axiosInstance.post("/contactUs", postData);

export const upsertDonate = (postData) =>
  axiosInstance.post("/donate", postData);

export const upsertFeedback = (postData) =>
  axiosInstance.post("/feedback", postData);

export const upsertFeedbackUpload = (postData) =>
  axiosInstance.post("/upload-images", postData);

export const upsertJoinUser = (postData) =>
  axiosInstance.post("/joinNowUsers", postData);

export const getJoinNowUsers = () => axiosInstance.get("/joinNowUsers");

export const getContributor = () => axiosInstance.get("/contributor");
