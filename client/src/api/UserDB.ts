import axios from "axios";
import config from "../config/config";

// export const LoginUser = async (formData) => {
//     return await axios.post(`${config.baseURL}/login`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };

export const LoginUser = async (formData) => {
  return axios.post(`${config.baseURL}/login`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetUser = async (id: string) => {
  return axios.get(`${config.baseURL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetAllUsers = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `${config.baseURL}/users?limit=5&page=${pageParam * 5}`,
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

export const PostUser = async (formData) => {
  return axios.post(`${config.baseURL}/user`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const UpdateUser = async (formData, id: string) => {
  return axios.put(`${config.baseURL}/user/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const DeleteUser = async (id: string) => {
  return axios.delete(`${config.baseURL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const SearchUser = async (name: string) => {
  return axios.get(`${config.baseURL}/user?name=${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
