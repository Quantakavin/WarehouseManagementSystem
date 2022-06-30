import axios from "axios";
import config from "../config/config";

export const GetUserGroups = () => {
  return async () => await axios.get(`${config.baseURL}/usergroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const PostUserGroup = () => {
    return async (formData) => await axios.post(`${config.baseURL}/usergroup`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  

