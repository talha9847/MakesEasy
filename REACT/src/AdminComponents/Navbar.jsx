import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import about from "../assets/about.svg";
import contact from "../assets/contact.svg";
import logout from "../assets/logout.svg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white shadow-lg z-50 ">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            className="h-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
            src={logo}
            alt="Logo"
          />
          <span className="text-2xl text-white font-semibold tracking-wide hover:scale-105 transition-transform duration-300">
            Makes Easy
          </span>
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-8 text-lg">
          {[
            { to: "/", img: home, text: "Home" },
            { to: "/", img: about, text: "About" },
            { to: "/contactus", img: contact, text: "Contact" },
            { to: "/", img: logout, text: "Logout" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="relative flex flex-col items-center group"
            >
              {/* Icon */}
              <img
                className="h-6 w-6 transition-transform duration-300 group-hover:scale-125"
                src={item.img}
                alt={item.text}
              />
              {/* Hover Tooltip */}
              <span className="absolute bottom-[-30px] px-3 py-1 text-xs font-medium rounded-md bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.text}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
