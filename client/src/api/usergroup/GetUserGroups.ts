import axios from "axios";
import config from "../../config/config";

const GetUserGroups = async () => {
  const result = await axios.get(`${config.baseURL}/usergroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result;
};

export default GetUserGroups;
