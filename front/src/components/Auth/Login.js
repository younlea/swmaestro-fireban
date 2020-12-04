import React from "react";
import Input from "../Common/Inputs";
import { FormBlock, ButtonWithMarginTop, Error } from "./Common";
import LoadingSpinner from "../Common/LoadingSpinner";

function Login({ loading, error, onChange, submit, form, goRegister }) {
  return (
    <FormBlock>
      <form onSubmit={submit}>
        <Input
          login
          autoComplete="userid"
          name="userid"
          type="text"
          onChange={onChange}
          value={form.userid}
          placeholder="아이디"
        />
        <Input
          login
          autoComplete="current-password"
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={form.password}
        />
        {/* {error.type === "login" && <Error>{error.description}</Error>} */}

        <ButtonWithMarginTop login onClick={submit}>
          로그인
        </ButtonWithMarginTop>
        <ButtonWithMarginTop login onClick={goRegister}>
          회원가입
        </ButtonWithMarginTop>
        {loading && loading.type === "login" && (
          <LoadingSpinner></LoadingSpinner>
        )}
        {error && error.type === "login" && <Error>{error.description}</Error>}
      </form>
    </FormBlock>
  );
}

export default Login;
