import axios from "axios";
import config from "../../config/config";

const LoginUser = (formData) => {
  return axios.post(`${config.baseURL}/login`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default LoginUser;
