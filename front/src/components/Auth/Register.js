import React from "react";
import Input from "../Common/Inputs";
import { FormBlock, ButtonWithMarginTop, Error } from "./Common";
import LoadingSpinner from "../Common/LoadingSpinner";

function Register({ loading, error, onChange, submit, form, goLogin }) {
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
          autoComplete="password"
          name="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={form.password}
          type="password"
        />
        <Input
          login
          autoComplete="password"
          name="password_check"
          placeholder="비밀번호 검사"
          onChange={onChange}
          value={form.password_check}
          type="password"
        />
        <Input
          login
          autoComplete="name"
          name="name"
          placeholder="이름"
          onChange={onChange}
          value={form.name}
          type="text"
        />

        {/* {error.type === "login" && <Error>{error.description}</Error>} */}

        <ButtonWithMarginTop login onClick={submit}>
          회원가입
        </ButtonWithMarginTop>
        <ButtonWithMarginTop login onClick={goLogin}>
          로그인
        </ButtonWithMarginTop>
        {loading && loading.type === "login" && (
          <LoadingSpinner></LoadingSpinner>
        )}
        {error && error.type === "register" && (
          <Error>{error.description}</Error>
        )}
        {form.result && <Error>{form.result}</Error>}
      </form>
    </FormBlock>
  );
}

export default Register;
