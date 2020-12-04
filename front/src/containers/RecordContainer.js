import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import InfoContainer from "./Record/InfoContainer.js";

import SidebarContainer from "./SidebarContainer.js";
import NavbarContainer from "./NavbarContainer.js";

function RecordContainer({ match }) {
  const mainPanel = React.createRef();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <SidebarContainer></SidebarContainer>
      <div className={classes.mainPanel} ref={mainPanel}>
        <NavbarContainer />
        <div className={classes.content}>
          <InfoContainer></InfoContainer>
        </div>
      </div>
    </div>
  );
}

export default RecordContainer;
