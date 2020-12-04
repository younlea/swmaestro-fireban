import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../config";

export const AuthRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const jwt = localStorage.getItem(ACCESS_TOKEN);
      if (!jwt) {
        return <Redirect to="/auth/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);
