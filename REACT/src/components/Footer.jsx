import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-1 sm:py-3 md:py-3 sticky bottom-0 right-0 left-0 z-10">
      <div className="container mx-auto px-3">
        <p className="text-xs sm:text-sm md:text-base">
          &copy; {new Date().getFullYear()} Makes Easy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;