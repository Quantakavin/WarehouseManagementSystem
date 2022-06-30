import axios from "axios";
import config from "../config/config";

export const GetUserGroups = async () => {
  return await axios.get(`${config.baseURL}/usergroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const PostUserGroup = async (formData) => {
    return await axios.post(`${config.baseURL}/usergroup`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  

