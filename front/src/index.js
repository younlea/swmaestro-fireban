import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import createSagaMiddleware from "redux-saga";
import authMiddleware from "./lib/authMiddleware";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./store/modules";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import { ACCESS_TOKEN } from "./lib/config";
import { getUser } from "./store/modules/user";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__,
  composeWithDevTools(applyMiddleware(sagaMiddleware, authMiddleware))
  // composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  try {
    // const user = store.getState().user.user;
    // console.log(user);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token && !user) return;
    if (token) {
      store.dispatch(getUser());
    }
  } catch (e) {
    console.log(e);
  }
}

sagaMiddleware.run(rootSaga);
loadUser();
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
