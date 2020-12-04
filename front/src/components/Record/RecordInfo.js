import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "../Common/CardHeader.js";
import LoadingSpinner from "../Common/LoadingSpinner.js";
import RecordComponent from "./RecordComponent.js";
import SubNavContainer from "../Common/SubNavContainer.js";
import SubNavComponent from "../Common/SubNavComponent.js";
import ItemError from "../Common/ItemError.js";
import More from "../Common/More.js";
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

function RecordInfo({
  info,
  loading,
  onRefresh,
  onStream,
  onChangeViedoType,
  SubNavContents,
  isTic,
  onRecordMore
}) {
  const cardClasses = cardStyleds();
  console.log(info && info.length);

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
        <SubNavComponent onClick={onChangeViedoType}>영상 변경</SubNavComponent>
      </SubNavContainer>
      {loading && <LoadingSpinner></LoadingSpinner>}
      <InfiniteScroll
          dataLength={info ? info.length : 0}
          next={onRecordMore}
          hasMore={true}>
      
      {
        info &&
        info.map(item => (
          <RecordComponent
            key={item.name}
            target={item.target.mac}
            data_index={item.name}
            data-index={item.name}
            onStream={onStream}
            createdAt={item.createdAt}
            name={item.target.name}
            color={SubNavContents.color}
          ></RecordComponent>
        ))}
        </InfiniteScroll>

        {!loading && <More onClick={onRecordMore} >더 보기</More>}

      {!loading && info && info.length === 0 && <ItemError></ItemError>}
    </>
  );
}

export default RecordInfo;
