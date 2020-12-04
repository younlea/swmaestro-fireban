import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as videoAPI from "../../lib/api/video";

const CHANGE_TIC = "video/CHANGE_TIC";


const [
  GET_TIC_INFO,
  GET_TIC_INFO_SUCCESS,
  GET_TIC_INFO_FAILURE
] = createRequestActionTypes("video/GET_TIC_INFO");

const [
  GET_STREAM_INFO,
  GET_STREAM_INFO_SUCCESS,
  GET_STREAM_INFO_FAILURE
] = createRequestActionTypes("video/GET_STREAM_INFO");


const [
  GET_TIC_INFO_MORE,
  GET_TIC_INFO_MORE_SUCCESS,
  GET_TIC_INFO_MORE_FAILURE
] = createRequestActionTypes("video/GET_TIC_INFO_MORE");

const [
  GET_STREAM_INFO_MORE,
  GET_STREAM_INFO_MORE_SUCCESS,
  GET_STREAM_INFO_MORE_FAILURE
] = createRequestActionTypes("video/GET_STREAM_INFO_MORE");


const [
  GET_TIC_DETAIL,
  GET_TIC_DETAIL_SUCCESS,
  GET_TIC_DETAIL_FAILURE
] = createRequestActionTypes("video/GET_TIC_DETAIL")

const [
  GET_STREAM_DETAIL,
  GET_STREAM_DETAIL_SUCCESS,
  GET_STREAM_DETAIL_FAILURE
] = createRequestActionTypes("video/GET_STREAM_DETAIL")


const [GET_TARGET_GPS,
  GET_TARGET_GPS_SUCCESS,
  GET_TARGET_GPS_FAILURE
] = createRequestActionTypes("video/GE_TARGET_GPS")


export const changeTic = createAction(CHANGE_TIC)

export const getTicDetail = createAction(GET_TIC_DETAIL, (target) => (target))
export const getStreamDetail = createAction(GET_STREAM_DETAIL, (target) => (target))


export const getTICInfo = createAction(GET_TIC_INFO, (page) => (page));
export const getStreamInfo = createAction(GET_STREAM_INFO, (page) => (page));

export const getTICInfoMore = createAction(GET_TIC_INFO_MORE, (page) => (page));
export const getStreamInfoMore = createAction(GET_STREAM_INFO_MORE, (page) => (page));

export const getTargetGps = createAction(GET_TARGET_GPS, (mac, createdAt) => ({mac, createdAt}))

const getTicInfoSaga = createRequestSaga(
  GET_TIC_INFO,
  videoAPI.getTicRecordInfo
);

const getStreamInfoSaga = createRequestSaga(
  GET_STREAM_INFO,
  videoAPI.getStreamRecordInfo
);


const getTicInfoMoreSaga = createRequestSaga(
  GET_TIC_INFO_MORE,
  videoAPI.getTicRecordInfo
);

const getStreamInfoMoreSaga = createRequestSaga(
  GET_STREAM_INFO_MORE,
  videoAPI.getStreamRecordInfo
);

const getTicDetailSaga = createRequestSaga(
  GET_TIC_DETAIL,
  videoAPI.getTicDetail
)
const getStreamDetailSaga = createRequestSaga(
  GET_STREAM_DETAIL,
  videoAPI.getStreamDetail
)

const getTargetGpsSaga = createRequestSaga(GET_TARGET_GPS, videoAPI.getTargetGps)

export function* videoSaga() {
  yield takeLatest(GET_TIC_INFO, getTicInfoSaga);
  yield takeLatest(GET_STREAM_INFO, getStreamInfoSaga);
  yield takeLatest(GET_TIC_INFO_MORE, getTicInfoMoreSaga);
  yield takeLatest(GET_STREAM_INFO_MORE, getStreamInfoMoreSaga);
  yield takeLatest(GET_TIC_DETAIL, getTicDetailSaga);
  yield takeLatest(GET_STREAM_DETAIL, getStreamDetailSaga);
  yield takeLatest(GET_TARGET_GPS, getTargetGpsSaga);

}

export const initialState = {
  video: null,
  error: {
    type: null,
    description: null
  },
  target: null,
  gpsInfo: "",
  page:1,
  isTic: true,
  targetGps: null,
};

const video = handleActions(
  {
    [GET_TARGET_GPS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      targetGps: data.message,
      error: initialState.error
    }),
    [GET_TARGET_GPS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      targetGps: initialState.targetGps,
      error: { type: "detailGps", description: error }
    }),


    [GET_TIC_DETAIL_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      target: data.message,
      error: initialState.error
    }),
    [GET_TIC_DETAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      target: initialState.video,
      error: { type: "detail", description: error }
    }),

    [GET_STREAM_DETAIL_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      target: data.message,
      error: initialState.error
    }),
    [GET_STREAM_DETAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      target: initialState.video,
      error: { type: "detail", description: error }
    }),


    [CHANGE_TIC]: (state) => ({
      ...state,
      isTic: !state.isTic
    }),
    [GET_TIC_INFO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      video: data.message,
      page:data.page,
      error: initialState.error
    }),
    [GET_TIC_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      video: initialState.video,
      error: { type: "ticInfo", description: error }
    }),
    [GET_STREAM_INFO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      video: data.message,
      page:data.page,
      error: initialState.error
    }),
    [GET_STREAM_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      video: initialState.video,
      error: { type: "streamInfo", description: error }
    }),
    [GET_TIC_INFO_MORE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      video: state.video.concat(data.message),
      page:data.page,
      error: initialState.error
    }),
    [GET_TIC_INFO_MORE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "ticInfoMore", description: error }
    }),
    [GET_STREAM_INFO_MORE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      video: state.video.concat(data.message),
      page:data.page,
      error: initialState.error
    }),
    [GET_STREAM_INFO_MORE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "streamInfoMore", description: error }
    }),
  },
  initialState
);

export default video;
