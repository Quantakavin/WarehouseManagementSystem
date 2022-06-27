import axios from "axios";
import config from "../../config/config";

const PostUser = async (formData) => {
    const result = await axios.post(`${config.baseURL}/user`, formData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return result;
};

export default PostUser;