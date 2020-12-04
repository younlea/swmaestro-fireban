import React from "react";
import styled from "styled-components";
import { MdPowerSettingsNew, MdHighlightOff } from "react-icons/md";

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
  const {
    active,
    location,
    start_date,
    finish_date,
    name,
    onStream,
    data_index,
    data_active
  } = props;

  return (
    <StreamContainer
      key={data_index}
      data-index={data_index}
      data-active={data_active}
      onClick={onStream}
    >
      <StatusComponent>
        {active === false ? (
          <MdHighlightOff fontSize="2rem" color="red"></MdHighlightOff>
        ) : (
          <MdPowerSettingsNew fontSize="2rem" color="red"></MdPowerSettingsNew>
        )}
      </StatusComponent>
      <TextLayoutComponet>
        <TextComponent>
          위치 : {location && location.location ? location.location : "X"}
        </TextComponent>
        {active === false ? (
          <TextComponent>
            시간 : {finish_date ? finish_date : "X"}
          </TextComponent>
        ) : (
          <TextComponent>시간 : {start_date ? start_date : "X"}</TextComponent>
        )}
        <TextComponent>장비명 : {name ? name : "X"}</TextComponent>
      </TextLayoutComponet>
    </StreamContainer>
  );
}

export default StreamComponent;
