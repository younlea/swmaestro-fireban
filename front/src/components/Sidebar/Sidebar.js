/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import FindInPage from "@material-ui/icons/FindInPage";
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import Videocam from "@material-ui/icons/Videocam";
import bgImage from "../../assets/img/sidebar-2.jpg";
import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { colors } from "@material-ui/core";

const useStyles = makeStyles(styles);

const dashboardRoutes = [
  {
    path: "/stream",
    name: "스트리밍",
    rtlName: "dashboard",
    icon: Dashboard,
    component: "DashboardPage",
    layout: ""
  },
  {
    path: "/video",
    name: "녹화자료",
    rtlName: "video",
    icon: Videocam,
    component: "VideoPage",
    layout: ""
  },
  {
    path: "/detect",
    name: "탐지결과",
    rtlName: "detect",
    icon: FindInPage,
    component: "DetectPage",
    layout: ""
  },
  {
    path: "/edit",
    name: "탐지 수정",
    rtlName: "edit",
    icon: FindReplaceIcon,
    component: "EditPage",
    layout: ""
  },
  {
    path: "/user",
    name: "사용자 정보",
    rtlName: "profile",
    icon: Person,
    component: "UserProfile",
    layout: ""
  }
];

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    // console.log(window.location.href.indexOf(routeName));
    // window.location.pathname.split("/")[1]
    // return window.location.href.indexOf(routeName) > -1 ? true : false;
    return window.location.pathname.split("/")[1].indexOf(routeName.replace("/", "")) > -1 ? true : false;
  }
  const { color, image, userInfo, onLogout, onNavClick } = props;

  var links = (
    <List className={classes.list}>
      {dashboardRoutes.map((dashboardRoutes, key) => {
        var activePro = " ";
        var listItemClasses;

        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(dashboardRoutes.path)
        });

        const whiteFontClasses = classNames({
          [" " + classes.blackFont]: activeRoute(dashboardRoutes.path)
        });
        return (
          <NavLink
            to={dashboardRoutes.path}
            onClick={onNavClick}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof dashboardRoutes.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: dashboardRoutes.rtlActive
                  })}
                >
                  {dashboardRoutes.icon}
                </Icon>
              ) : (
                <dashboardRoutes.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: dashboardRoutes.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={
                  dashboardRoutes.rtlActive
                    ? dashboardRoutes.rtlName
                    : dashboardRoutes.name
                }
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: dashboardRoutes.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  var brand = (
    <div className={classes.logo} style={{ color: "#fff", textAlign: "right" }}>
      {userInfo && userInfo.name} 님
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.logout}>
            <ExitToApp
              onClick={onLogout}
              style={{ cursor: "pointer" }}
            ></ExitToApp>
          </div>

          <div
            className={classes.background}
            // style={{ backgroundImage: "url(" + bgImage + ")" }}
            style={{ backgroundColor: "#d4d4d4" }}
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.logout}>
            <ExitToApp
              onClick={onLogout}
              style={{ cursor: "pointer" }}
            ></ExitToApp>
          </div>

          <div
            className={classes.background}
            // style={{ backgroundImage: "url(" + bgImage + ")" }}
            style={{ backgroundColor: "#d4d4d4" }}
          />
        </Drawer>
      </Hidden>
    </div>
  );
}
