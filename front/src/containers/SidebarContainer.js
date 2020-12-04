import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/config";
import { chagneSidebar, closeSidebar } from "../store/modules/sidebar";
import Sidebar from "../components/Sidebar/Sidebar";

function SidebarContainer() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isClose = useSelector(state => state.sidebar.isClose);
  const [userInfo, setUserInfo] = useState("");
  const userData = useSelector(state => state.user.user);
  // const userInfo = useSelector(state => state.user.user);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
    } else if (!JSON.parse(localStorage.getItem("user")) && userData) {
      setUserInfo(userData);
    } else {
    }
  }, [userData]);
  const handleDrawerToggle = () => {
    dispatch(chagneSidebar());
  };

  const onNavClick = e => {
    dispatch(closeSidebar());
    // dispatch()
  };

  const onLogout = e => {
    try {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem("user");
      history.push("/auth/login");
    } catch (e) {}
  };

  return (
    <>
      <Sidebar
        userInfo={userInfo}
        handleDrawerToggle={handleDrawerToggle}
        open={isClose}
        color="red"
        onLogout={onLogout}
        onNavClick={onNavClick}
      />
    </>
  );
}

export default SidebarContainer;
