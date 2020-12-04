import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as streamAPI from "../../lib/api/stream";

//================================================

const [
  GET_STREAM_INFO,
  GET_STREAM_INFO_SUCCESS,
  GET_STREAM_INFO_FAILURE
] = createRequestActionTypes("stream/GET_STREAM_INFO");

const [
  GET_GPS_INFO,
  GET_GPS_INFO_SUCCESS,
  GET_GPS_INFO_FAILURE
] = createRequestActionTypes("stream/GET_GPS_INFO");

const CHANGE_GPS_TARGET = "stream/CHANGE_GPS_TARGET";

//================================================

// action

export const getStreamInfo = createAction(GET_STREAM_INFO);
export const getGpsInfo = createAction(GET_GPS_INFO, target => ({ target }));

export const changeGpsTarget = createAction(CHANGE_GPS_TARGET, key => key);

//================================================»

// saga 생성

const getStreamInfoSaga = createRequestSaga(
  GET_STREAM_INFO,
  streamAPI.streamInfo
);

const getGpsInfoSaga = createRequestSaga(GET_GPS_INFO, streamAPI.getGpsInfo);

export function* streamSaga() {
  yield takeLatest(GET_STREAM_INFO, getStreamInfoSaga);
  yield takeLatest(GET_GPS_INFO, getGpsInfoSaga);
}

//================================================

// 초기화
export const initialState = {
  stream: null,
  error: {
    type: null,
    description: null
  },
  target: null,
  gpsInfo: ""
};

//================================================

const stream = handleActions(
  {
    [GET_STREAM_INFO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      stream: data.message,
      error: initialState.error
    }),
    [GET_STREAM_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      stream: null,
      error: { type: "streamInfo", description: error }
    }),
    [CHANGE_GPS_TARGET]: (state, { payload: key }) => ({
      ...state,
      target: key
    }),
    [GET_GPS_INFO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      gpsInfo: data.messgae,
      error: initialState.error
    }),
    [GET_GPS_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      gpsInfo: null,
      error: { type: "gpsInfo", description: error }
    })
  },
  initialState
);

export default stream;
