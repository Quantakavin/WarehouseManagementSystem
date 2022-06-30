import axios from "axios";
import config from "../../config/config";

const GetUserGroups = () => {
  return axios.get(`${config.baseURL}/usergroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default GetUserGroups;
