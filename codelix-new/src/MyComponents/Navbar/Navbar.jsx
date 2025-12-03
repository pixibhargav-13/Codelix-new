import React, { useState } from "react";
import codelixlogo from "../Images/codelix-logo.png";
import whiteArrow from "../Images/whiteArrow.png";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Define navigation links with paths
  const navLinks = [
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  // Handle navigation with refresh if on same page
  const handleNavClick = (e, path) => {
    // Check if we're already on this page
    const currentPath = location.pathname;
    const targetPath = path === "/" ? "/" : path;
    
    if (currentPath === targetPath) {
      e.preventDefault();
      // Refresh the page
      window.location.reload();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg pt-4">
      <div className="container">
        {/* Logo */}
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
          onClick={(e) => handleNavClick(e, "/")}
        >
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
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                  }
                  onClick={(e) => handleNavClick(e, link.path)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar-contact-wrapper mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
            <Link 
              to="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
            >
              <button className="btn navbar-button d-flex align-items-center">
                <span>Contact Us</span>
                <img src={whiteArrow} alt="arrow" className="arrow-icon mx-3" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};