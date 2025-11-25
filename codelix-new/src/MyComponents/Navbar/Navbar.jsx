import React, { useState } from "react";
import codelixlogo from "../images/codelix-logo.png";
import whiteArrow from "../images/whiteArrow.png";
import { Menu, X } from "lucide-react";  
import "./Navbar.css";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define navigation links with paths
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="navbar navbar-expand-lg pt-4">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={codelixlogo} alt="Codelix Logo" height="40" />
        </Link>

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
              <li className="nav-item" key={link.name}>
                <Link className="nav-link text-white" to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-contact-wrapper mt-3">
            <Link to="/contact">
              <button className="btn navbar-button">
                <span>Contact Us</span>
                <img src={whiteArrow} alt="arrow" className="arrow-icon" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
