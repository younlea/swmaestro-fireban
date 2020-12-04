import React from "react";
import styled from "styled-components";
import FindInPage from "@material-ui/icons/FindInPage";

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

function DetectComponent(props) {
  const { createdAt, name, onDetect, data_index, updatedAt, type } = props;
  return (
    <StreamContainer
      key={data_index}
      data-index={data_index}
      onClick={onDetect}
    >
      <StatusComponent>
        {type !== "edit" && <FindInPage style={{ fontSize: "2rem", color: "blue" }}></FindInPage>}
  {type === "edit" && updatedAt && <FindInPage style={{ fontSize: "2rem", color: "green" }}></FindInPage>}
  {type === "edit" && !updatedAt &&
   <FindInPage style={{ fontSize: "2rem", color: "red" }}></FindInPage>}
      </StatusComponent>
      <TextLayoutComponet>
        <TextComponent>장비명 : {name ? name : "X"}</TextComponent>
        <TextComponent>탐지 시간 : {createdAt ? createdAt : "X"}</TextComponent>
        {type === "edit" && updatedAt && <TextComponent>상태 : 확인완료</TextComponent>}
        {type === "edit" && !updatedAt && <TextComponent>상태 : 확인대기</TextComponent>}
      </TextLayoutComponet>
    </StreamContainer>
  );
}

export default DetectComponent;
