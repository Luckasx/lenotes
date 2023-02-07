import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 403) {
      throw { data: {message: "Invalid Token"}}
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
