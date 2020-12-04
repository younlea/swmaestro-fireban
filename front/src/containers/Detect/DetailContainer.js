import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import SidebarContainer from "../SidebarContainer.js";
import NavbarContainer from "../NavbarContainer.js";
import { getDetectDetail } from "../../store/modules/detect.js";
import { useDispatch, useSelector } from "react-redux";
import DetectImager from "../../components/Detect/DetectImager.js";
const mainPanel = React.createRef();

function DetailContainer({ match }) {
  const dispatch = useDispatch();
  const key = match.params.key;
  const targetImage = useSelector(state => state.detect.targetImage);

  const targetDetectInfo = useSelector(state => state.detect.targetDetectInfo)
  // const error = useSelector(state => state.detect.error);
  // const loading = useSelector(
  //   state => state.loading["detect/GET_DETECT_DETAIL"]
  // );
  const [check, setCheck] = useState(false);
  // dispatch(getDetectDetail(key));

  if (!check) {
    dispatch(getDetectDetail(key));
    setCheck(true);
  }

  const onReload = e => {
    e.preventDefault();
    // history.go();
    dispatch(getDetectDetail(key));
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <>
      {targetImage && (
        <div className={classes.wrapper}>
          <SidebarContainer></SidebarContainer>
          <div className={classes.mainPanel} ref={mainPanel}>
            <NavbarContainer />
            <div className={classes.content}>
              <DetectImager
                targetImage={targetImage}
                targetDetectInfo={targetDetectInfo}
                onReload={onReload}
                targetKey={key}
                type="edit"
              ></DetectImager>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailContainer;
