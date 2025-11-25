import React, { useState } from "react";
import codelixlogo from "../images/codelix-logo.png";
import whiteArrow from "../images/whiteArrow.png";
import { Menu, X } from "lucide-react"; // you can remove this if you want Bootstrap toggler icon
import "./Navbar.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ["Home", "Work", "Services", "About", "Blog"];

  return (
    <nav className="navbar navbar-expand-lg pt-4">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={codelixlogo} alt="Codelix Logo" height="40" />
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler text-white"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">
            {navLinks.map((link) => (
              <li className="nav-item" key={link}>
                <a
                  className="nav-link text-white"
                  href={"#" + link.toLowerCase()}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-contact-wrapper mt-3">
            <button className="btn navbar-button">
              <span>Contact Us</span>
              <img src={whiteArrow} alt="arrow" className="arrow-icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
