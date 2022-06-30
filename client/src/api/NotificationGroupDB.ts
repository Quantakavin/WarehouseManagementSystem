import axios from "axios";
import config from "../config/config";

export const GetNotificationGroups = async () => {
  return await axios.get(`${config.baseURL}/notificationgroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};