import axios from "axios";
import config from "../../config/config";

const DeleteUser = (id: number) => {
  return axios.delete(`${config.baseURL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default DeleteUser;
