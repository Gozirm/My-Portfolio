import React from "react";
import logo from "../assets/My_logo_grid-1-removebg-preview.png";
import menu from "../assets/menu_51dp_CCCCCC_FILL0_wght400_GRAD0_opsz48.svg"
import Offcanvas from "./Offcanvas";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0  px-5 py-1 bg-transparent  backdrop-blur-md shadow-lg z-10 w-screen">
        <a href="/" className="justify-center flex">
          <img src={logo} alt="" className="w-11" />
        </a>
      </nav>
    </>
  );
};

export default Navbar;
