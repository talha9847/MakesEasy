import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="nav flex flex-col lg:flex-row justify-between bg-black text-white sticky top-0 right-0 left-0 z-50">
      {/* Top bar with logo and hamburger */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        <div className="logo flex justify-center items-center gap-2 p-3">
          <img
            className="hover:scale-125 transition-transform duration-100 hover:cursor-pointer"
            src={logo}
            alt="Logo"
          />
          <span className="text-xl sm:text-2xl hover:cursor-pointer hover:scale-110 transition-transform duration-200 hover:ml-1 hover:font-bold">
            Makes Easy
          </span>
        </div>
        
        {/* Hamburger menu button - visible on mobile/tablet */}
        <button
          className="lg:hidden p-3 hover:bg-gray-800 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>
      </div>

      {/* Navigation links */}
      <ul className={`
        flex flex-col lg:flex-row gap-3 lg:gap-5 
        p-3 lg:pr-8 lg:p-3 
        text-base sm:text-lg
        lg:flex
        ${isMenuOpen ? 'flex border-t border-gray-700' : 'hidden'}
        transition-all duration-300 ease-in-out
      `}>
        <Link 
          to="/" 
          className="hover:text-lg lg:hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 py-2 lg:py-0 px-2 lg:px-0 hover:bg-gray-800 lg:hover:bg-transparent rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/aboutus"
          className="hover:text-lg lg:hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 py-2 lg:py-0 px-2 lg:px-0 hover:bg-gray-800 lg:hover:bg-transparent rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          to="/contactus"
          className="hover:text-lg lg:hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 py-2 lg:py-0 px-2 lg:px-0 hover:bg-gray-800 lg:hover:bg-transparent rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact Us
        </Link>
        <Link
          to="/login"
          className="hover:text-lg lg:hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 py-2 lg:py-0 px-2 lg:px-0 hover:bg-gray-800 lg:hover:bg-transparent rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="hover:text-lg lg:hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 py-2 lg:py-0 px-2 lg:px-0 hover:bg-gray-800 lg:hover:bg-transparent rounded"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign Up
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;