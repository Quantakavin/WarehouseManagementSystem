import axios from "axios";
import config from "../../config/config";

const GetAllUsers = () => {
  return axios.get(`${config.baseURL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default GetAllUsers;
