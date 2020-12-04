import axios from "axios";
import { API_END_POINT, ACCESS_TOKEN, REFRESH_TOKEN } from "../config";
import https from "https";

export const client = axios.create({
  baseURL: API_END_POINT,
  timeout: 180000,
  withCredentials: false,

  responseType: "json",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),

  headers: {
    "Content-Type": "application/json"
  }
});

export const refreshClient = axios.create({
  baseURL: API_END_POINT,
  timeout: 180000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`
  }
});

export const accessClient = axios.create({
  baseURL: API_END_POINT,
  timeout: 180000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
  }
});

accessClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  config.headers.Authorization = "Bearer " + token;

  return config;
});

accessClient.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      if (
        err.response.status === 401 &&
        err.config &&
        !err.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        let res = fetch(API_END_POINT + "/auth/refresh", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
          },
          redirect: "follow",
          referrer: "no-referrer",
          body: JSON.stringify({
            refresh: localStorage.getItem(REFRESH_TOKEN)
          })
        })
          .then(res => res.json())
          .then(res => {
            localStorage.setItem(ACCESS_TOKEN, res.access);
            originalReq.headers["Authorization"] = "Bearer " + res.access;

            return axios(originalReq);
          });

        resolve(res);
      }

      return reject(err);
    });
  }
);
