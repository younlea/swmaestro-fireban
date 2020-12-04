import { ACCESS_TOKEN, REFRESH_TOKEN } from "./config";
// import { check } from "../store/modules/user";

// const token = localStorage.getItem(ACCESS_TOKEN);

const authMiddleware = store => next => action => {
  console.log(action.type);
  if (action.type === "auth/LOGIN_SUCCESS") {
    // localStorage.setItem("accessToken", action.payload);
    try {
      localStorage.setItem(ACCESS_TOKEN, action.payload.access);
      localStorage.setItem(REFRESH_TOKEN, action.payload.refresh);
    } catch (e) {}
  }

  if (action.type === "user/GET_USER_INFO_SUCCESS") {
    
    try {
      localStorage.setItem("user", JSON.stringify(action.payload.message));
    } catch (e) {}
  }

  window.addEventListener("storage", e => console.log("event", e));
  // if (action.type === "tmp/ADD_TMP_SUCCESS") {
  //     store.dispatch(getUserInfo());
  // }
  // if (action.type === "tmp/DEL_TMP_SUCCESS") {
  //     store.dispatch(getUserInfo());
  // }

  const result = next(action);

  return result;
};

export default authMiddleware;
