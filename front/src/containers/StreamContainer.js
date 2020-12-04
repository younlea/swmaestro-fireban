import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import SidebarContainer from "./SidebarContainer.js";
import NavbarContainer from "./NavbarContainer.js";
import StreamPlayer from "../components/Stream/StreamPlayer.js";
import KakaoMap from "../components/KakaoMap/KakaoMap.js";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changeGpsTarget, getGpsInfo } from "../store/modules/stream.js";
import SubNavContainer from "../components/Common/SubNavContainer.js";
import SubNavComponent from "../components/Common/SubNavComponent.js";
const mainPanel = React.createRef();

const VideoContainer = styled.div`
  ${props =>
    props.visible
      ? css`
          display: inline;
        `
      : css`
          display: none;
        `};
`;

function StreamContainer({ match }) {
  const dispatch = useDispatch();
  const target = useSelector(state => state.stream.target);
  const gpsInfo = useSelector(state => state.stream.gpsInfo);
  const [isTic, setIsTic] = useState(true);
  const history = useHistory();
  const key = match.params.key;

  useEffect(() => {
    if (target !== key) {
      console.log(target, key);
      dispatch(changeGpsTarget(key));
      setInterval(() => dispatch(getGpsInfo(key)), 5000);
    }
  }, [dispatch, key, target]);

  if (!key) {
    // 통신 안되면 뒤로 가기
    history.push("/stream");
  }

  const ticStream = "/api/stream/tic/" + key + "/index.m3u8";
  const hlsStream = "/api/stream/live/" + key + "/index.m3u8";

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const onChangeSteam = e => {
    dispatch(getGpsInfo(key));
    setIsTic(!isTic);
  };

  return (
    <div className={classes.wrapper}>
      <SidebarContainer></SidebarContainer>
      <div className={classes.mainPanel} ref={mainPanel}>
        <NavbarContainer />

        <div className={classes.content}>
          <SubNavContainer>
            <SubNavComponent onClick={onChangeSteam}>
              {isTic ? "일반 영상으로" : "열화상 영상으로"} 변경
            </SubNavComponent>
          </SubNavContainer>
          <VideoContainer visible={isTic}>
            <StreamPlayer streamUrl={ticStream}></StreamPlayer>
          </VideoContainer>
          <VideoContainer visible={!isTic}>
            <StreamPlayer streamUrl={hlsStream}></StreamPlayer>
          </VideoContainer>
          <KakaoMap
            className={classes.mainPanel}
            cordinateX={
              gpsInfo && gpsInfo.cordinateX ? gpsInfo.cordinateX : "37.504234"
              // gpsInfo.cordinateX
            }
            cordinateY={
              gpsInfo && gpsInfo.cordinateY ? gpsInfo.cordinateY : "127.047812"
              // gpsInfo.cordinateY
            }
          ></KakaoMap>
        </div>
      </div>
    </div>
  );
}

export default StreamContainer;
