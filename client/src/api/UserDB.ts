import axios from "axios";
import config from "../config/config";


// export const LoginUser = async (formData) => {
//     return await axios.post(`${config.baseURL}/login`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };
  
  export const LoginUser = () => {
    return async (formData) => await axios.post(`${config.baseURL}/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  

export const GetUser = (id: string) => {
    return async () => await axios.get(`${config.baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

export const GetAllUsers = () => {
    return async () => await axios.get(`${config.baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  
export const PostUser = () => {
    return async (formData) => await axios.post(`${config.baseURL}/user`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const UpdateUser = (id: string) => {
    return async (formData) => await axios.put(`${config.baseURL}/user/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const DeleteUser = (id: string) => {
    return async() => await axios.delete(`${config.baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  

export const SearchUser = (name: string) => {
    return async () => await axios.get(`${config.baseURL}/user?name=${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  