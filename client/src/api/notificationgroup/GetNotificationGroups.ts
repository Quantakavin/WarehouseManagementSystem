import axios from "axios";
import config from "../../config/config";

const GetNotificationGroups = async () => {
  const result = await axios.get(`${config.baseURL}/notificationgroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result;
};

export default GetNotificationGroups;
