import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "../Common/CardHeader.js";
import LoadingSpinner from "../Common/LoadingSpinner.js";
import More from "../Common/More.js";
import InfiniteScroll from "react-infinite-scroll-component";
import SubNavContainer from "../Common/SubNavContainer.js";
import SubNavComponent from "../Common/SubNavComponent.js";
import ItemError from "../Common/ItemError.js";
import DetectComponent from "./DetectComponent.js";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

function DetectInfo({ info, loading, onRefresh, onDetect, SubNavContents, getDetectMore, type }) {
  const cardClasses = cardStyleds();
  return (
    <>
    
      <CardHeader color="warning">
        <h4 className={cardClasses.cardTitleWhite}>{SubNavContents.title}</h4>
        <p className={cardClasses.cardCategoryWhite}>
          {SubNavContents.description}
        </p>
      </CardHeader>
      <SubNavContainer>
        <SubNavComponent onClick={onRefresh}>목록 갱신</SubNavComponent>
      </SubNavContainer>
      {loading && <LoadingSpinner></LoadingSpinner>}
      
      {info &&
      (<InfiniteScroll
          dataLength={info.length}
          next={getDetectMore}
          hasMore={true}
          scrollableTarget="scrollableDiv"
          >
            <Wrapper>
      {
        info &&
        info.map(item => (
          <DetectComponent
            key={item.pk}
            onDetect={onDetect}
            target={item.pk}
            data_index={item.pk}
            data-index={item.name}
            createdAt={item.createdAt}
            name={item.target.name}
            color={SubNavContents.color}
            type={type}
            updatedAt={item.isUpdated}
          ></DetectComponent>
        ))}
        </Wrapper>
        </InfiniteScroll>
      )}
      
      {!loading && <More onClick={getDetectMore} >더 보기</More>}
      
        
      {!loading && info && info.length === 0 && <ItemError></ItemError>}
      
    </>
  );
}

export default DetectInfo;
