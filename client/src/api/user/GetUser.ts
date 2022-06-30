import axios from "axios";
import config from "../../config/config";

const GetUser = (id: number) => {
  return axios.get(`${config.baseURL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default GetUser;
