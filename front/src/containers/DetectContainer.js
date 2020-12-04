import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
// import InfoContainer from "./Record/InfoContainer.js";
import { useHistory } from "react-router-dom";
import SidebarContainer from "./SidebarContainer.js";
import NavbarContainer from "./NavbarContainer.js";
import InfoContainer from "./Detect/InfoContainer.js";

function DetectContainer() {
  const mainPanel = React.createRef();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const history = useHistory();

  const onDetect = useCallback(
    async e => {
      e.preventDefault();
      try {
        const target = e.currentTarget.dataset.index;

        history.push("/detect/" + target);
      } catch (e) {
        alert("잠시 후 다시 시도해주세요.");
      }
    },
    [history]
  );

  return (
    <div className={classes.wrapper}>
      <SidebarContainer></SidebarContainer>
      <div className={classes.mainPanel} ref={mainPanel}>
        <NavbarContainer />
        <div className={classes.content}>
          <InfoContainer onDetect={onDetect}></InfoContainer>
        </div>
      </div>
    </div>
  );
}

export default DetectContainer;
