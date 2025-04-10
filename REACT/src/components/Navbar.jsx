import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="nav flex flex-row justify-between bg-black text-white sticky top-0 right-0 left-0">
      <div className="logo flex justify-center items-center gap-2 p-3">
        <img
          className="hover:scale-125 transition-transform duration-100 hover:cursor-pointer"
          src={logo}
          alt="Logo"
        />
        <span className="text-2xl hover:cursor-pointer hover:scale-110 transition-transform duration-200 hover:ml-1 hover:font-bold">
          Makes Easy
        </span>
      </div>
      <ul className="flex gap-5 pr-8 p-3 text-lg">
        <Link to="/" className="hover:text-xl cursor-pointer hover:font-bold">
          Home
        </Link>
        <Link
          to="/aboutus"
          className="hover:text-xl cursor-pointer hover:font-bold"
        >
          About Us
        </Link>
        <Link
          to="/contactus"
          className="hover:text-xl cursor-pointer hover:font-bold"
        >
          Contact Us
        </Link>
        <Link
          to="/login"
          className="hover:text-xl cursor-pointer hover:font-bold"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="hover:text-xl cursor-pointer hover:font-bold"
        >
          Sign Up
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
