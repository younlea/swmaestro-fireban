import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as authAPI from "../../lib/api/auth";

//================================================

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const PASSWORD_VERIFY_ERROR = "auth/REGISTER_PASSWORD_VERIFY_ERROR";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN"
);

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "auth/REGITSER"
);

//================================================

// 액션
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);

export const passwordVerifyError = createAction(
  PASSWORD_VERIFY_ERROR,
  error => error
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const userLogin = createAction(LOGIN, ({ userid, password }) => ({
  userid,
  password
}));

export const userRegister = createAction(
  REGISTER,
  ({ userid, password, name }) => ({
    userid,
    password,
    name
  })
);

//================================================»

// saga 생성
const userLoginSaga = createRequestSaga(LOGIN, authAPI.userLogin);
const userRegisterSaga = createRequestSaga(REGISTER, authAPI.userRegister);

export function* authSaga() {
  yield takeLatest(LOGIN, userLoginSaga);
  yield takeLatest(REGISTER, userRegisterSaga);
}

//================================================

// 초기화
export const initialState = {
  login: {
    userid: "",
    password: ""
  },
  register: {
    userid: "",
    password: "",
    password_check: "",
    name: "",
    result: null
  },
  token: null,
  refreshToken: null,
  error: {
    type: null,
    description: null
  },
  user: null
};

//================================================

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      error: initialState.error
    }),
    [PASSWORD_VERIFY_ERROR]: (state, { payload: error }) => ({
      ...state,
      error: { type: "register", description: error }
    }),
    [LOGIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      error: initialState.error,
      token: data.access,
      refresh: data.refresh
      // refreshToken: data.refreshToken
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "login", description: error }
    }),
    [REGISTER_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      error: initialState.error,
      register: { result: result.message }
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "register", description: error },
      register: initialState.register
    })
  },
  initialState
);

export default auth;
