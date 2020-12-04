import { accessClient } from "./client";

// 유저 정보 가져오기
export const userInfo = () => accessClient.get("/auth/user", {});
