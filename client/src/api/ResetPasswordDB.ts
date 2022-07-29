import axios from "axios";
import config from "../config/config";

export const ForgotPassword = async (formData) => {
    return axios.post(`${config.baseURL}/forgotPassword`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const ResetPassword = async (formData) => {
    return axios.post(`${config.baseURL}/resetPassword`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};