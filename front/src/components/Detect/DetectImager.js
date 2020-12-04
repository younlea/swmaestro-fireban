import React from "react";
import styled from "styled-components";
import CardHeader from "../Common/CardHeader";
import SubNavContainer from "../Common/SubNavContainer";
import Canvas from "./Canvas";
import { makeStyles } from "@material-ui/core/styles";
import DefaultCanvas from "./DefaultCanvas";
import KakaoMap from "../KakaoMap/KakaoMap";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "#525151",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#525151"
    }
  },
  cardTitleWhite: {
    color: "#000000",
    fontWeight: "400",
    marginTop: "0px",
    minHeight: "auto",
    marginBottom: "1rem",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    // marginBottom: "0.5rem",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
const cardStyleds = makeStyles(styles);

const DetectImage = styled.img`
  width:640px;
  height:480px;
  position: absolute;
`;

function DetectImager({ targetImage, targetDetectInfo, onReload, targetKey, type, gpsInfo }) {
  const cardClasses = cardStyleds();

  return (
    <>
      <CardHeader color="warning">
        <h4 className={cardClasses.cardTitleWhite}>
          일시 : {targetImage && targetImage.createdAt}
        </h4>
        <p className={cardClasses.cardCategoryWhite}>
          장비명 : {targetImage && targetImage.target.name}
        </p>
        {type === "default" && gpsInfo ?
        <p className={cardClasses.cardCategoryWhite}>위치 : {gpsInfo.location}</p> : ""}
      </CardHeader>
      <SubNavContainer>
      </SubNavContainer>
      {targetDetectInfo && (
        <>
          <DetectImage
            id="target-img"
            src={"http://www.fireban.kr/" + targetImage.path}
            alt="detect"
            // onLoad={onImgLoad}
          ></DetectImage>

          {type === "default" ? <DefaultCanvas initialState={targetDetectInfo} targetKey={targetKey}></DefaultCanvas> : <Canvas initialState={targetDetectInfo} targetKey={targetKey}></Canvas>}

          {type === "default" && gpsInfo ? <KakaoMap
            cordinateX={
              gpsInfo && gpsInfo.cordinateX ? gpsInfo.cordinateX : "37.504234"
            }
            cordinateY={
              gpsInfo && gpsInfo.cordinateY ? gpsInfo.cordinateY : "127.047812"
            }
          ></KakaoMap> : ""}
          
        </>
      )}
    </>
  );
}

export default DetectImager;
