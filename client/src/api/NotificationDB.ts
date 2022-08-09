import axios from "axios";
import config from "../config/config";

export const GetNotifications = async (id: string) => {
    return axios.get(`${config.baseURL}/notifications/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
};

export const MarkNotificationsAsRead = async (id: string) => {
    return axios.put(`${config.baseURL}/marknotificationsasread/${id}`, null ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });
  };