import axios from "axios";
import config from "../../config/config";

const PostUserGroup = async (formData) => {
  const result = await axios.post(`${config.baseURL}/usergroup`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result;
};

export default PostUserGroup;
