import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "../Common/CardHeader.js";
import LoadingSpinner from "../Common/LoadingSpinner.js";
import StreamComponent from "./StreamComponent.js";
import SubNavContainer from "../Common/SubNavContainer.js";
import SubNavComponent from "../Common/SubNavComponent.js";
import ItemError from "../Common/ItemError.js";

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

function StreamInfo({ info, loading, onRefresh, onStream }) {
  const cardClasses = cardStyleds();

  return (
    <>
      <CardHeader color="warning">
        <h4 className={cardClasses.cardTitleWhite}>스트리밍 정보</h4>
        <p className={cardClasses.cardCategoryWhite}>
          현제 스트리밍 되는 카메라를 확인할 수 있습니다.
        </p>
      </CardHeader>
      <SubNavContainer>
        <SubNavComponent onClick={onRefresh}>목록 갱신</SubNavComponent>
      </SubNavContainer>
      {loading && <LoadingSpinner></LoadingSpinner>}

      {!loading &&
        info &&
        info.map(item => (
          <StreamComponent
            key={item.key}
            target={item.target.mac}
            data_index={item.key}
            data-index={item.key}
            data_active={item.isActive}
            data_mac={item.key}
            active={item.isActive}
            onStream={onStream}
            location={item.target.location}
            start_date={item.start_date}
            finish_date={item.finish_date}
            name={item.target.name}
          ></StreamComponent>
        ))}
      {!loading && info && info.length === 0 && <ItemError></ItemError>}
    </>
  );
}

export default StreamInfo;
