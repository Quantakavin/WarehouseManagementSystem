import axios from "axios";
import config from "../config/config";

export const GetBrandNames = async (name: string) => {
  return axios.get(`${config.baseURL}/brandnames?name=${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetEmptyBins = async () => {
  return axios.get(`${config.baseURL}/emptybins`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


export const GetBinsByBrand = async (name: string) => {
  return axios.get(`${config.baseURL}/brand/${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
