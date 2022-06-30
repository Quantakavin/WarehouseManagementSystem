import axios from "axios";
import config from "../../config/config";

const SearchUser = (name: string) => {
  return axios.get(`${config.baseURL}/user?name=${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default SearchUser;
