import axios from "axios";
import { StorageKeys } from "@/constants/storageKeys";
import { ApiConstants } from "@/constants/apiConstants";
import toast from "react-hot-toast";
import { ROUTES } from "@/constants/routes";

export const request = axios.create({
  baseURL: ApiConstants.BASE_URL,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (!error.request.responseURL.includes("login")) {
        toast.error("Пожалуйста авторизуйтесь");
        window.location.replace(ROUTES.LOGIN);
      }
      localStorage.removeItem(StorageKeys.TOKEN);
    } else if (error.response.status === 403) {
      toast.error("У вас нет доступа к данному ресурсу");
      window.location.replace(ROUTES.DASHBOARD);
    }

    return Promise.reject(error.response || error.message);
  }
);
