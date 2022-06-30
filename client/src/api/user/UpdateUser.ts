import axios from "axios";
import config from "../../config/config";

const UpdateUser = (formData, id: number) => {
  return axios.put(`${config.baseURL}/user/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default UpdateUser;
