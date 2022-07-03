import axios from "axios";
import config from "../config/config";

export const GetRMAByRMANo = async (id: string) => {
    return await axios.get(`${config.baseURL}/RMA/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

export const GetAllRMA = async () => {
    return await axios.get(`${config.baseURL}/RMA`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  
export const PostRMA = async (formData) => {
    return await axios.post(`${config.baseURL}/newRMA`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const AcceptRMA = async (id: string) => {
    return await axios.put(`${config.baseURL}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const RejectRMA = async (id: string) => {
    return await axios.put(`${config.baseURL}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const ReceiveRMA = async (id: string) => {
    return await axios.put(`${config.baseURL}/RMA/reject/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const VerifyRMA = async (formData, id: string) => {
    return await axios.put(`${config.baseURL}/RMA/verify/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const UpdateCOA = async (formData, id: string) => {
    return await axios.put(`${config.baseURL}/RMA/COA/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  