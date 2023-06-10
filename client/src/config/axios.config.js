//axios.config.js

import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      let res = (await refreshToken(error.response)).data;

      if (res !== []) {
        processQueue(null);
        return Promise.resolve(axios(originalRequest));
      }

      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  let data = JSON.parse(localStorage.getItem("user"));

  if (!data) {
    return [];
  }
  return axiosInstance.post("/api/user/refreshtoken", data);
};

export default axiosInstance;
