import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-1 sticky bottom-0 right-0 left-0">
      <p>&copy; {new Date().getFullYear()} Makes Easy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
