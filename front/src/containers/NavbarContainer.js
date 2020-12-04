import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/NavBar/Navbar.js";
import { chagneSidebar } from "../store/modules/sidebar";

function NavbarContainer() {
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    dispatch(chagneSidebar());
  };

  return <Navbar handleDrawerToggle={handleDrawerToggle} />;
}

export default NavbarContainer;
