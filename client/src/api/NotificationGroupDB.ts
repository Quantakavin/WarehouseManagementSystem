import axios from "axios";
import config from "../config/config";

export const GetNotificationGroups = async ({pageParam = 0}) => {
  const response = await axios.get(`${config.baseURL}/notificationgroups?limit=5&page=${pageParam * 5}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return {response, nextPage: pageParam + 1, totalPages: Math.ceil(response.data[0].full_count/5)}
};
