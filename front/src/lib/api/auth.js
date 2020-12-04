import { client, refreshClient } from "./client";
import { REFRESH_TOKEN } from "../config";

// 유저 로그인
export const userLogin = ({ userid, password }) =>
  client.post("/auth/login", { userid, password });

export const userRegister = ({ userid, password, name }) =>
  client.post("/auth/register", {
    userid,
    password,
    name
  });

export const refresh = () =>
  refreshClient.post("/auth/refresh", {
    refresh: localStorage.getItem(REFRESH_TOKEN)
  });
