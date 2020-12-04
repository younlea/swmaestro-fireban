import React, { useEffect, useCallback } from "react";
import NotFound from "./NotFound";
import Login from "../components/Auth/Login";
import Template from "../components/Auth/Template";
import styled from "styled-components";
import Register from "../components/Auth/Register";
import { useSelector, useDispatch } from "react-redux";
import {
  initialState,
  changeField,
  userLogin,
  userRegister
} from "../store/modules/auth";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function AuthContainer({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(state => state.auth.token || initialState.token);
  useEffect(() => {
    if (token) {
      window.location.reload();
    }
  }, [token]);

  const loginForm = useSelector(state => state.auth.login);
  const registerForm = useSelector(state => state.auth.register);

  const loginLoading = useSelector(state => state.loading["auth/LOGIN"]);
  const registerLoading = useSelector(state => state.loading["auth/REGISTER"]);

  const error = useSelector(state => state.auth.error || initialState.error);

  const onLoginChange = e => {
    //input change
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value: value
      })
    );
  };

  const onRegisterChange = e => {
    //input change
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value: value
      })
    );
  };

  const loginSubmit = useCallback(
    //submit
    async e => {
      e.preventDefault();
      try {
        dispatch(userLogin(loginForm));
        // dispatch(getUserInfo());
      } catch (e) {}
    },
    [dispatch, loginForm]
  );

  const registerSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        dispatch(userRegister(registerForm));
      } catch (e) {}
    },
    [dispatch, registerForm]
  );

  const goRegister = e => {
    e.preventDefault();
    history.push("/auth/register");
  };
  const goLogin = e => {
    e.preventDefault();
    history.push("/auth/login");
  };

  const path = match.params.sub;

  switch (path) {
    case "login":
      return (
        <Container>
          <Template>
            <Login
              loading={loginLoading}
              error={error}
              onChange={onLoginChange}
              submit={loginSubmit}
              form={loginForm}
              goRegister={goRegister}
            ></Login>
          </Template>
        </Container>
      );

    case "register":
      return (
        <Container>
          <Template>
            <Register
              loading={registerLoading}
              error={error}
              onChange={onRegisterChange}
              submit={registerSubmit}
              form={registerForm}
              goLogin={goLogin}
            ></Register>
          </Template>
        </Container>
      );

    default:
      return <NotFound></NotFound>;
  }
}

export default AuthContainer;
