import axios from "axios";
import config from "../config/config";

export const GetNotificationFeatures = async () => {
  return axios.get(`${config.baseURL}/notificationfeatures`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetNotificationTypes = async () => {
  return axios.get(`${config.baseURL}/notificationtypes`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
