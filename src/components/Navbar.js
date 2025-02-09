import React from "react";
import "./../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/image copy 2.png" alt="Flare Escrow Logo" /> {/* Add your logo image path here */}
      </div>
      <div className="navbar-links">
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;