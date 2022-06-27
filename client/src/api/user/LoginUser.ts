import axios from "axios";
import config from "../../config/config";

const LoginUser = async (formData) => {
    const result = await axios.post(`${config.baseURL}/login`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return result;
};

export default LoginUser;