import axios from "axios";
import config from "../config/config";

export const GetRMAByRmaID = async (RmaID: string) => {
  return await axios.get(`${config.baseURL}/RMA/${RmaID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetSalesmanAcceptedRMA = async (userid: string) => {
  return await axios.get(`${config.baseURL}/myAcceptedRMA/${userid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetSalesmanRejectedRMA = async (userid: string) => {
  return await axios.get(`${config.baseURL}/myRejectedRMA/${userid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetAllRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/AllRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetPendingRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/pendingRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetApprovedRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/acceptedRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetRejectedRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/rejectedRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetReceivedRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/receivedRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetVerifiedRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/verifiedRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetIPRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/inprogressRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetClosedRMA = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/closedRMA?limit=5&page=${pageParam * 5}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    response,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data[0].full_count / 5),
  };
};

export const GetRMADetails = async (RmaID: number) => {
  return await axios.get(`${config.baseURL}/RMADetails/${RmaID}`, {
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

export const AcceptRMA = async (RmaID: number) => {
  return await axios.put(`${config.baseURL}/acceptRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const RejectRMA = async (RmaID: number) => {
  return await axios.put(`${config.baseURL}/rejectRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const ReceiveRMA = async (RmaID: number) => {
  return await axios.put(`${config.baseURL}/receiveRMA/${RmaID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const VerifyRMA = async (formData, RmaID: number) => {
  return await axios.put(`${config.baseURL}/verifyRMA/${RmaID}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const UpdateCOA = async (formData, RmaID: number) => {
  return await axios.put(`${config.baseURL}/COARMA/${RmaID}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
