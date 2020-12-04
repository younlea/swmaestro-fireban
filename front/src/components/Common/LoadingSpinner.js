import React from "react";
import { css } from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "block",
        zIndex: "101",
        position: "fixed",
        bottom: "50%",
        left: "50%"
      }}
    >
      <ClipLoader css={override} size={50} color={"#000000"} />
    </div>
  );
};

export default LoadingSpinner;
