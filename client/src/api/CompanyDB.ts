import axios from "axios";
import config from "../config/config";

export const GetCompanies = () => {
  return async () => await axios.get(`${config.baseURL}/companies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};