import React, { useState } from "react";
import codelixlogo from "../Images/codelix-logo.png";
import whiteArrow from "../Images/whiteArrow.png";
import { Menu, X, ChevronDown } from "lucide-react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false); // Mobile dropdown toggle
  const [desktopServiceOpen, setDesktopServiceOpen] = useState(false); // Desktop dropdown

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg pt-4">
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={codelixlogo} alt="Codelix Logo" height="40" />
          </Link>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="navbar-toggler text-white custom-mobile-toggle"
            type="button"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* DESKTOP NAVBAR LINKS */}
          <div className="collapse navbar-collapse desktop-nav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">

              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/work">
                  Work
                </Link>
              </li>

              {/* Desktop Services Dropdown */}
              <li
                className="nav-item dropdown-desktop"
                onMouseEnter={() => setDesktopServiceOpen(true)}
                onMouseLeave={() => setDesktopServiceOpen(false)}
              >
                <span className="nav-link text-white dropdown-toggle-custom">
                  Services <ChevronDown size={18} />
                </span>

                {desktopServiceOpen && (
                  <div className="desktop-dropdown-menu">
                    <Link to="/mobile-app">Mobile App Development</Link>
                    <Link to="/saas-development">SaaS Development</Link>
                    <Link to="/web-development">Web Development</Link>
                  </div>
                )}
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Blog
                </Link>
              </li>

            </ul>

            {/* Desktop Contact Button */}
            <div className="navbar-contact-wrapper">
              <Link to="/contact">
                <button className="btn navbar-button">
                  <span>Contact Us</span>
                  <img src={whiteArrow} alt="arrow" className="arrow-icon mx-3" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SLIDE MENU */}
      <div className={`mobile-slide-panel ${isMenuOpen ? "open" : ""}`}>

        <div className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
          <X size={30} color="#fff" />
        </div>

        <div className="mobile-menu-links">

          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/work" onClick={() => setIsMenuOpen(false)}>Work</Link>

          {/* Mobile Services Dropdown */}
          <div
            className="mobile-dropdown-header"
            onClick={() => setServiceOpen(!serviceOpen)}
          >
            <span>Services</span>
            <ChevronDown
              size={26}
              className={serviceOpen ? "rotate-icon" : ""}
            />
          </div>

          {serviceOpen && (
            <div className="mobile-dropdown-content">
              <Link to="/mobile-app" onClick={() => setIsMenuOpen(false)}>
                Mobile App Development
              </Link>
              <Link to="/saas-development" onClick={() => setIsMenuOpen(false)}>
                SaaS Development
              </Link>
              <Link to="/web-development" onClick={() => setIsMenuOpen(false)}>
                Web Development
              </Link>
            </div>
          )}

          <Link to="/" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Blog</Link>

          <Link
            to="/contact"
            className="mobile-contact-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};
