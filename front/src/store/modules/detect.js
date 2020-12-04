import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes
} from "../../lib/createRequestSaga";
import * as detectAPI from "../../lib/api/detect";

const [
  GET_DETECT_INFO,
  GET_DETECT_INFO_SUCCESS,
  GET_DETECT_INFO_FAILURE
] = createRequestActionTypes("detect/GET_DETECT_INFO");



const [
  GET_DETECT_INFO_MORE,
  GET_DETECT_INFO_MORE_SUCCESS,
  GET_DETECT_INFO_MORE_FAILURE
] = createRequestActionTypes("detect/GET_DETECT_INFO_MORE");

const [
  GET_DETECT_DETAIL,
  GET_DETECT_DETAIL_SUCCESS,
  GET_DETECT_DETAIL_FAILURE
] = createRequestActionTypes("detect/GET_DETECT_DETAIL");


const CHANGE_DETECT_INFO = "detect/CHANGE_DETECT_INFO";
const DELETE_DETECT_INFO = "detect/DELETE_DETECT_INFO";
const [UPDATE_DETECT, UPDATE_DETECT_SUCCESS, UPDATE_DETECT_FAILURE] = createRequestActionTypes("detect/UPDATE_DETECT");

const ADD_DETECT_INFO = "detect/ADD_DETECT_INFO";


export const updateDetectInfo = createAction(UPDATE_DETECT, ({target, targetKey}) => ({target, targetKey}))

export const changeDetectInfo = createAction(CHANGE_DETECT_INFO, (target) => (target))

export const addDetectInfo = createAction(ADD_DETECT_INFO, (id) => (id))

export const deleteDetectInfo = createAction(DELETE_DETECT_INFO, (target) => (target))

export const getDetectInfo = createAction(GET_DETECT_INFO, (page) => (page));

export const getDetectInfoMore = createAction(GET_DETECT_INFO_MORE, (page) => (page));

export const getDetectDetail = createAction(
  GET_DETECT_DETAIL,
  target => target
);

const updateDetectInfoSaga = createRequestSaga(UPDATE_DETECT, detectAPI.updateDetectInfoDetail);

const getDetectInfoSaga = createRequestSaga(
  GET_DETECT_INFO,
  detectAPI.getDetectInfoList
);

const getDetectInfoMoreSaga = createRequestSaga(
  GET_DETECT_INFO_MORE,
  detectAPI.getDetectInfoList
);

const getDetectDetailSaga = createRequestSaga(
  GET_DETECT_DETAIL,
  detectAPI.getDetectInfoDetail
);

export function* detectSaga() {
  yield takeLatest(GET_DETECT_INFO, getDetectInfoSaga);
  yield takeLatest(GET_DETECT_DETAIL, getDetectDetailSaga);
  yield takeLatest(GET_DETECT_INFO_MORE, getDetectInfoMoreSaga);
  yield takeLatest(UPDATE_DETECT, updateDetectInfoSaga);
}

export const initialState = {
  imageList: null,
  error: {
    type: null,
    description: null
  },
  targetImage: null,
  targetDetectInfo: null,
  gpsInfo: "",
  page:1
};

const detect = handleActions(
  {

    [ADD_DETECT_INFO]: (state, {payload: id}) => ({
      ...state,
      targetDetectInfo: state.targetDetectInfo.concat({id:id, x:0,y:0,width:50,height:50,type:0})
    }),
    [CHANGE_DETECT_INFO]: (state, {payload: target}) => ({
      ...state,
      targetDetectInfo: state.targetDetectInfo.map((item) => (
        item.id === target.id ? item = target : item
      ) )
    }),

    [DELETE_DETECT_INFO]: (state, {payload: target}) => ({
      ...state,
      targetDetectInfo: state.targetDetectInfo.filter(item => item.id !== target)
       
    }),
    [GET_DETECT_INFO_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      imageList: data.message,
      page:data.page,
      error: initialState.error
    }),
    [GET_DETECT_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      imageList: initialState.imageList,
      error: { type: "detectInfo", description: error }
    }),
    [GET_DETECT_DETAIL_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      targetImage: data.message,
      gpsInfo: data.gps,
      targetDetectInfo: data.message.target_detection,
      error: initialState.error
    }),
    [GET_DETECT_DETAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      targetImage: initialState.targetImage,
      gpsInfo: initialState.gpsInfo,
      error: { type: "detectDetail", description: error }
    }),
    [GET_DETECT_INFO_MORE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      imageList: state.imageList.concat(data.message),
      page:data.page,
      error: initialState.error      
    }),
    [GET_DETECT_INFO_MORE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "detectInfoMore", description: error }
    }),

    [UPDATE_DETECT_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      targetDetectInfo: data.message.target_detection,
      error: initialState.error      
    }),
    [UPDATE_DETECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: { type: "updateDetect", description: error }
    }),
  },
  initialState
);

export default detect;
