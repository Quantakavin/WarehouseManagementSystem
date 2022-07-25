import axios from "axios";
import config from "../config/config";

export const GetNotificationGroup = async (id: string) => {
  return axios.get(`${config.baseURL}/notificationgroup/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetNotificationGroupNames = async (name: string) => {
  return axios.get(`${config.baseURL}/notificationgroupnames?name=${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetNotificationGroups = async () => {
  return axios.get(`${config.baseURL}/notificationgroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const FilterNotificationGroups = async ({ pageParam = 0, queryKey }) => {
  const response = await axios.get(
    `${config.baseURL}/filternotificationgroups?pageSize=5&pageNo=${
      pageParam * 5
    }&sortColumn=${queryKey[1]}&sortOrder=${queryKey[2]}&name=${queryKey[3]}`,
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

export const PostNotificationGroup = async (formData) => {
  return axios.post(`${config.baseURL}/notificationgroup`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const UpdateNotificationGroup = async (formData, id: string) => {
  return axios.put(`${config.baseURL}/notificationgroup/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const DeleteNotificationGroup = async (id: string) => {
  return axios.delete(`${config.baseURL}/notificationgroup/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
