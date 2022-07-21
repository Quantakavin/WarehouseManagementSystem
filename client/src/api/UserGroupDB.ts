import axios from "axios";
import config from "../config/config";

export const FilterUserGroups = async ({pageParam = 0, queryKey}) => {
  const response = await axios.get(`${config.baseURL}/filterusergroups?pageSize=5&pageNo=${pageParam * 5}&sortColumn=${queryKey[1]}&sortOrder=${queryKey[2]}&name=${queryKey[3]}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return {response, nextPage: pageParam + 1, totalPages: Math.ceil(response.data[0].full_count/5)}
};

export const GetUserGroups = async () => {
  return await axios.get(`${config.baseURL}/usergroups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


export const GetUserGroupNames = async (name: string) => {
  return await axios.get(`${config.baseURL}/usergroupnames?name=${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetUserGroup = async (id: string) => {
  return await axios.get(`${config.baseURL}/usergroup/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


export const PostUserGroup = async (formData) => {
    return await axios.post(`${config.baseURL}/usergroup`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const UpdateUserGroup = async (formData, id: string) => {
    return await axios.put(`${config.baseURL}/usergroup/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const DeleteUserGroup = async (id: string) => {
    return await axios.delete(`${config.baseURL}/usergroup/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  

