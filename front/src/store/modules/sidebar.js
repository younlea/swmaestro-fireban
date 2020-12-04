import { createAction, handleActions } from "redux-actions";

//================================================

const CHANGE_SIDEBAR = "sidebar/CHANGE_SIDEBAR";
const CLOSE_SIDEBAR = "sidebar/CLOSE_SIDEBAR";
const INIT_SIDEBAR = "sidebar/INIT_SIDEBAR";
const CHANGE_ACTIVE = "sidebar/CHANGE_ACTIVE";

//================================================

// 액션
export const chagneSidebar = createAction(CHANGE_SIDEBAR);
export const closeSidebar = createAction(CLOSE_SIDEBAR);
export const initSidebar = createAction(INIT_SIDEBAR);
export const changeActive = createAction(CHANGE_ACTIVE, path => path);

//================================================

//================================================

// 초기화

export const initialState = {
  isClose: false,
  active: ""
};
//================================================

const sidebar = handleActions(
  {
    [CLOSE_SIDEBAR]: state => ({
      ...state,
      isClose: false
    }),
    [CHANGE_SIDEBAR]: state => ({
      ...state,
      isClose: !state.isClose
    }),
    [INIT_SIDEBAR]: state => ({
      ...state,
      isClose: true
    }),
    [CHANGE_ACTIVE]: (state, { payload: path }) => ({
      ...state,
      active: path
    })
  },
  initialState
);

export default sidebar;
