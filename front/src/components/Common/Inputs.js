import React from "react";
import styled, { css } from "styled-components";

const CustomInput = styled.input`
    background: #F5F5F5;
    font-size: 0.8rem;
    border: none;
    border-bottom: 1px solid #adb5bd;
    padding-bottom: 0.5rem;
    outline: none;
    width: calc(98%);

    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid #495057;
    }
    & + & {
        margin-top: 1rem;
    }

    ${props =>
      props.login &&
      css`
        background: #fff;
        width: calc(98% - 2rem);
        margin-left: 1rem;
        margin-right: 1rem;
      `}

    ${props =>
      props.mypage &&
      css`
        background: #fff;
        width: calc(98% - 2rem);
        margin-left: 1rem;
        margin-right: 1rem;
      `}

    ${props =>
      props.tag &&
      css`
        background: #fff;
        width: calc(98% - 2rem);
        margin-top: 2rem;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
      `}
`;

const Input = props => <CustomInput {...props} />;

export default Input;
