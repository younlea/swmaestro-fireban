import React from "react";
import styled from "styled-components";
import CameraIcon from "@material-ui/icons/Camera";

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

function StreamComponent(props) {
  const { createdAt, name, onStream, data_index, color } = props;
  return (
    <StreamContainer
      key={data_index}
      data-index={data_index}
      onClick={onStream}
    >
      <StatusComponent>
        <CameraIcon style={{ fontSize: "2rem", color: color }}></CameraIcon>
      </StatusComponent>
      <TextLayoutComponet>
        <TextComponent>시간 : {createdAt ? createdAt : "X"}</TextComponent>

        <TextComponent>장비명 : {name ? name : "X"}</TextComponent>
      </TextLayoutComponet>
    </StreamContainer>
  );
}

export default StreamComponent;
