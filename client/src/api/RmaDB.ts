import axios from "axios";
import config from "../config/config";

export const GetAllRma = async (RmaID: string) => {
  return axios.get(`${config.baseURL}/AllRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetRMAByRmaID = async (RmaID: string) => {
  return axios.get(`${config.baseURL}/RMA/${RmaID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetRMAProductByID = async (RmaID: string) => {
  return axios.get(`${config.baseURL}/RMA/Product/${RmaID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetRMADetails = async (RmaID: string) => {
  return axios.get(`${config.baseURL}/RMADetails/${RmaID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetSalesmanPendingRMA = async (userid: string) => {
  return axios.get(`${config.baseURL}/myPendingRMA/${userid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetSalesmanAcceptedRMA = async (userid: string) => {
  return axios.get(`${config.baseURL}/myAcceptedRMA/${userid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetSalesmanRejectedRMA = async (userid: string) => {
  return axios.get(`${config.baseURL}/myRejectedRMA/${userid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetPendingRMA = async () => {
  return axios.get(`${config.baseURL}/pendingRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetAcceptedRMA = async () => {
  return axios.get(`${config.baseURL}/acceptedRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetChecklistRMA = async () => {
  return axios.get(`${config.baseURL}/checklistRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetRejectedRMA = async () => {
  return axios.get(`${config.baseURL}/rejectedRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetReceivedRMA = async () => {
  return axios.get(`${config.baseURL}/receivedRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetVerifiedRMA = async (userid: string) => {
  return axios.get(`${config.baseURL}/verifiedRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetIPRMA = async (userid: string) => {
  return axios.get(`${config.baseURL}/inprogressRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetClosedRMA = async (userid: string) => {
  return axios.get(`${config.baseURL}/closedRMA`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const PostRMA = async (rmadetails) => {
  return axios.post(`${config.baseURL}/newRMA`, rmadetails, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const AcceptRMA = async (RmaID: number) => {
  return axios.put(`${config.baseURL}/acceptRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const RejectRMA = async (RmaID: number) => {
  return axios.put(`${config.baseURL}/rejectRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const UpdateRmaChecklist = async (RmaID: number) => {
  return axios.put(`${config.baseURL}/updatechecklistRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const ReceiveRMA = async (RmaID: number) => {
  return axios.put(`${config.baseURL}/receiveRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const VerifyRMA = async (rmabody, RmaID: number) => {
  return axios.put(`${config.baseURL}/verifyRMA/${RmaID}`, rmabody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const UpdateCOA = async (rmabody, RmaID: number) => {
  return axios.put(`${config.baseURL}/COARMA/${RmaID}`, rmabody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const CloseRMA = async (RmaID: number) => {
  return axios.put(`${config.baseURL}/closeRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};