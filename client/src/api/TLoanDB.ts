import axios from "axios";
import config from "../config/config";

export const GetCurrent = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/tloan/current?limit=5&page=${pageParam * 5}`,
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

export const GetPending = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/tloan/pending?limit=5&page=${pageParam * 5}`,
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

export const GetDraft = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/tloan/drafts?limit=5&page=${pageParam * 5}`,
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

export const GetHistory = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/tloan/history?limit=5&page=${pageParam * 5}`,
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

export const GetDetails = async () => {
  const response = await axios.get(`${config.baseURL}/tloan/:TLoanNumber`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};
