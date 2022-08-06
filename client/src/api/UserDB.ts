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

export const GetProfile = async (id: string) => {
  return axios.get(`${config.baseURL}/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetUsernames = async (name: string) => {
  return axios.get(`${config.baseURL}/usernames?name=${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetAllUsers = async () => {
  return axios.get(`${config.baseURL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const FilterUsers = async ({ pageParam = 0, queryKey }) => {
  const response = await axios.get(
    `${config.baseURL}/users?pageSize=5&pageNo=${pageParam * 5}&sortColumn=${
      queryKey[1]
    }&sortOrder=${queryKey[2]}&name=${queryKey[3]}`,
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

export const Update2FA = async (formData, id: string) => {
  return axios.put(`${config.baseURL}/user2fa/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const Resend2FAToken = async (formData) => {
  return axios.post(`${config.baseURL}/resend2fatoken`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const Verify2FAToken = async (formData, code: number | string) => {
  return axios.post(`${config.baseURL}/verify2fatoken?mobileno=${code}`, formData, {
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
