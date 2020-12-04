import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import stream, { streamSaga } from "./stream";
import video, { videoSaga } from "./video";
import detect, { detectSaga } from "./detect";
import sidebar from "./sidebar";
// import sidebar from "./sidebar";

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  stream,
  sidebar,
  video,
  detect
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), streamSaga(), videoSaga(), detectSaga()]);
}

export default rootReducer;
