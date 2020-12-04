import React from "react";
import styled, { css } from "styled-components";

const MoreButton = styled.button`
    border-radius: 4px;
    border: none;
    font-size: 0.75rem;
    font-weight: bold;
    color: white;
    outline: none;
    cursor: pointer;
    background: #526AE5;
    width: 100%;
    font-size: 1.125rem;
    height:3rem;

    ${props =>
      props.submit &&
      css`
        width: calc(30%);
        max-width: 200px;
        height: 30px;
        background: #000;
        border-radius: 8px;
        font-style: normal;
        font-weight: bold;
        font-size: 1rem;
        line-height: 1.5rem;
        color: #fff;
        margin-left: 1rem;
      `} 

    ${props =>
      props.counter &&
      css`
        background: #000000;
        border-radius: 8px;
        font-style: normal;
        font-weight: bold;
        font-size: 1.125rem;
        color: #ffffff;
      `}  

    ${props =>
      props.header &&
      css`
        background: #ffffff;
        border-radius: 16px;
        font-style: normal;
        font-weight: bold;
        font-size: 1rem;
        color: #000000;
      `}

    ${props =>
      props.login &&
      css`
        border-radius: 4px;
        background-color: #a1a6ad;
        font-weight: 700;
        font-size: 0.8rem;
        width: 110px;
        height: 40px;
        color: #ffffff;
      `}

    ${props =>
      props.register &&
      css`
        border-radius: 4px;
        background-color: #a1a6ad;
        font-weight: 700;
        font-size: 0.8rem;
        width: 110px;
        height: 40px;
        color: #ffffff;
      `}
`;

const More = props => <MoreButton {...props} />;

export default More;
