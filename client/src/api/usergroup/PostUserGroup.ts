import axios from "axios";
import config from "../../config/config";

const PostUserGroup = (formData) => {
  return axios.post(`${config.baseURL}/usergroup`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default PostUserGroup;
