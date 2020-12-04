import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../lib/config";
import * as userAPI from "../../lib/api/user";

//================================================

const [
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
] = createRequestActionTypes("user/GET_USER_INFO");

//================================================

// action

export const getUser = createAction(GET_USER_INFO);
//================================================»

// saga 생성

const getUserInfoSaga = createRequestSaga(GET_USER_INFO, userAPI.userInfo);

function getUserFailureSaga() {
  try {
    localStorage.removeItem(ACCESS_TOKEN); // localStorage 에서 user 제거하고
    localStorage.removeItem(REFRESH_TOKEN);
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(GET_USER_INFO, getUserInfoSaga);
  yield takeLatest(GET_USER_INFO_FAILURE, getUserFailureSaga);
}

//================================================

// 초기화
export const initialState = {
  user: null,
  error: {
    type: null,
    description: null
  }
};

//================================================

const user = handleActions(
  {
    [GET_USER_INFO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      user: data.message,
      error: initialState.error
    }),
    [GET_USER_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error: { type: "userInfo", description: error }
    })
  },
  initialState
);

export default user;
