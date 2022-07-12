import axios from "axios";
import config from "../config/config";

export const GetCurrent = async ({pageParam = 0}) => {
    const response = await axios.get(`${config.baseURL}/tloan/current?limit=5&page=${pageParam * 5}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return {response, nextPage: pageParam + 1, totalPages: Math.ceil(response.data[0].full_count/5)}
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
    return await axios.put(`${config.baseURL}/acceptRMA/${RMANo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const RejectRMA = async (RMANo: number) => {
    return await axios.put(`${config.baseURL}/rejectRMA/${RMANo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const ReceiveRMA = async (RMANo: number) => {
    return await axios.put(`${config.baseURL}/receiveRMA/${RMANo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const VerifyRMA = async (formData, RMANo: number) => {
    return await axios.put(`${config.baseURL}/verifyRMA/${RMANo}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const UpdateCOA = async (formData, RMANo: number) => {
    return await axios.put(`${config.baseURL}/COARMA/${RMANo}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  