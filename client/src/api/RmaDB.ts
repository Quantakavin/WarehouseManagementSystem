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

  export const GetRMADetails = async (RMANo: number) => {
    return await axios.get(`${config.baseURL}/RMADetails/${RMANo}`, {
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

  export const AcceptRMA = async (RMANo: number) => {
    return await axios.put(`${config.baseURL}/user/${RMANo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const RejectRMA = async (RMANo: number) => {
    return await axios.put(`${config.baseURL}/user/${RMANo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const ReceiveRMA = async (RMANo: number) => {
    return await axios.put(`${config.baseURL}/RMA/reject/${RMANo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const VerifyRMA = async (formData, RMANo: number) => {
    return await axios.put(`${config.baseURL}/RMA/verify/${RMANo}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const UpdateCOA = async (formData, RMANo: number) => {
    return await axios.put(`${config.baseURL}/RMA/COA/${RMANo}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  