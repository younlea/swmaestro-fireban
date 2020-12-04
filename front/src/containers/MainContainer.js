import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import InfoContainer from "./Stream/InfoContainer.js";
import { useHistory } from "react-router-dom";
import SidebarContainer from "./SidebarContainer.js";
import NavbarContainer from "./NavbarContainer.js";
import { streamCheck } from "../lib/api/stream.js";

function MainContainer({ match }) {
  const mainPanel = React.createRef();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const history = useHistory();

  const onStream = useCallback(
    //submit
    async e => {
      e.preventDefault();
      try {
        const target = e.currentTarget.dataset.index;
        const isActive = e.currentTarget.dataset.active;
        if (isActive === "true") {
          streamCheck(target)
            .then(result => {
              console.log("this is result", result);
              if (result.status !== 200) {
                alert("잠시 후 다시 시도해주세요.");
              } else {
                history.push("/stream/" + target);
              }
            })
            .catch(e => {
              alert("잠시 후 다시 시도해주세요.");
            });
        } else {
          alert("스트리밍 중이 아닙니다.");
        }
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
          <InfoContainer onStream={onStream}></InfoContainer>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
