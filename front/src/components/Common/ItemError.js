import React from "react";
import styled from "styled-components";
import CancelIcon from "@material-ui/icons/Cancel";

const StreamContainer = styled.div`
  width: 100%;
  height: 5rem;
  box-shadow: 1px 1px 1px 1px #dcdcdc;
  display: flex;
  cursor: pointer;

  box-shadow: offset-x offset-y blur-radius black;
`;

const StatusComponent = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-around;
  align-items: center;
  max-width: 6rem;
  flex-grow: 1;
`;
const TextLayoutComponet = styled.div`
  display: flex;
  padding-left: 0.5rem;
  justify-content: center;
  flex-direction: column;
  flex-grow: 5;
  height: 100%;
  font-size: 1rem;
`;

const TextComponent = styled.div`
  color: gray;
`;

function ItemError() {
  return (
    <StreamContainer key="1">
      <StatusComponent>
        <CancelIcon style={{ fontSize: "2rem", color: "red" }}></CancelIcon>
      </StatusComponent>
      <TextLayoutComponet>
        <TextComponent>데이터가 존재하지 않습니다.</TextComponent>
      </TextLayoutComponet>
    </StreamContainer>
  );
}

export default ItemError;
