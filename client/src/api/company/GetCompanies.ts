import axios from "axios";
import config from "../../config/config";

const GetCompanies = async () => {
    const result = await axios.get(`${config.baseURL}/companies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result;
};

export default GetCompanies;