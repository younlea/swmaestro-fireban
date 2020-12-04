import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import SidebarContainer from "../SidebarContainer.js";
import NavbarContainer from "../NavbarContainer.js";
import RecordPlayer from "../../components/Record/RecordPlayer.js";
import { useDispatch, useSelector } from "react-redux";
import { getStreamDetail } from "../../store/modules/video.js";
import CardHeader from "../../components/Common/CardHeader.js";
const mainPanel = React.createRef();


const cardStyles = {
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

function RecordStreamContainer({ match }) {
  const dispatch = useDispatch();
  const key = match.params.key;
  const ticStream = "/record/stream/" + key;

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const targetInfo = useSelector(state => state.video.target);
  const error = useSelector(state => state.video.error);
  if (targetInfo === null && error.type !== "detail"){
    dispatch(getStreamDetail(key))
  }
  const cardStyleds = makeStyles(cardStyles);
  const cardClasses = cardStyleds();

  return (
    <div className={classes.wrapper}>
      

      <SidebarContainer></SidebarContainer>
      <div className={classes.mainPanel} ref={mainPanel}>
        <NavbarContainer />
        <div className={classes.content}>
          {targetInfo && <>
          <CardHeader color="warning">
            <h4 className={cardClasses.cardTitleWhite}>[실화상] 녹화영상</h4>
            <p className={cardClasses.cardCategoryWhite}>
              <p>장비 : {targetInfo.target.name}</p>
              <p>일시 : {targetInfo.createdAt}</p>
            </p>
          </CardHeader>
          <RecordPlayer streamUrl={ticStream} targetInfo={targetInfo}></RecordPlayer> </>}
        </div>
      </div>
    </div>
  );
}

export default RecordStreamContainer;
