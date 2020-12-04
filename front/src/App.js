import React from "react";
// import logo from "./logo.svg";
import MainContainer from "./containers/MainContainer";
import { DefaultRoutes } from "./lib/routes/DefaultRoutes";
import { AuthRoutes } from "./lib/routes/AuthRoutes";
import AuthContainer from "./containers/AuthContainer";
import NotFound from "./containers/NotFound";
import { Redirect, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import StreamContainer from "./containers/StreamContainer";
import RecordContainer from "./containers/RecordContainer";
import RecordTICContainer from "./containers/Record/RecordTICContainer";
import RecordStreamContainer from "./containers/Record/RecordStreamContainer";
import DetectContainer from "./containers/DetectContainer";
import DetailContainer from "./containers/Detect/DetailContainer";
import EditContainer from "./containers/EditContainer";
import DefaultDetailContainer from "./containers/Detect/DefaultDetailContainer";

const DefaultComponent = createGlobalStyle`
    ${reset};
    body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    }
    a {
        text-decoration: none;
    }
`;

function App() {
  return (
    <>
      <DefaultComponent />
      <Switch>
        <Route exact path="/">
          <Redirect to="/stream" />
        </Route>
        <AuthRoutes exact path="/stream" component={MainContainer}></AuthRoutes>
        <AuthRoutes
          exact
          path="/stream/:key"
          component={StreamContainer}
        ></AuthRoutes>
        <DefaultRoutes
          exact
          path="/auth/:sub"
          component={AuthContainer}
        ></DefaultRoutes>
        <AuthRoutes
          exact
          path="/video"
          component={RecordContainer}
        ></AuthRoutes>
        <AuthRoutes
          exact
          path="/video/tic/:key"
          component={RecordTICContainer}
        ></AuthRoutes>
        <AuthRoutes
          exact
          path="/video/stream/:key"
          component={RecordStreamContainer}
        ></AuthRoutes>
        <AuthRoutes
          exact
          path="/detect"
          component={DetectContainer}
        ></AuthRoutes>
        <AuthRoutes
          exact
          path="/detect/:key"
          component={DefaultDetailContainer}
        ></AuthRoutes>

        <AuthRoutes
          exact
          path="/edit"
          component={EditContainer}
        ></AuthRoutes>
        <AuthRoutes
          exact
          path="/edit/:key"
          component={DetailContainer}
        ></AuthRoutes>


        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
