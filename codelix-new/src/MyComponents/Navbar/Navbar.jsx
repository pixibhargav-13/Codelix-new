import React, { useState, useRef, useEffect } from "react";
import codelixlogo from "../Images/codelix-logo.png";
import whiteArrow from "../Images/whiteArrow.png";
import { Menu, X, ChevronDown } from "lucide-react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false); // Mobile dropdown toggle
  const [desktopServiceOpen, setDesktopServiceOpen] = useState(false); // Desktop dropdown
  const dropdownRef = useRef(null);
  const closeTimerRef = useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopServiceOpen(false);
      }
    };

    if (desktopServiceOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [desktopServiceOpen]);

  // Helpers to keep dropdown open while moving cursor from trigger to panel
  const handleDesktopEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setDesktopServiceOpen(true);
  };

  const handleDesktopLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setDesktopServiceOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg pt-4">
        <div className="container">
          {/* Logo */}
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
          >
            <img src={logo || codelixlogo} alt="Codelix Logo" height="40" />
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
                <NavLink
                  to="/work"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                  }
                >
                  Work
                </NavLink>
              </li>

              {/* Desktop Services Dropdown */}
              <li
                className="nav-item dropdown-desktop"
                ref={dropdownRef}
                onMouseEnter={handleDesktopEnter}
                onMouseLeave={handleDesktopLeave}
              >
                <span className="nav-link text-white dropdown-toggle-custom">
                  Services <ChevronDown size={18} />
                </span>

                {desktopServiceOpen && (
                  <div 
                    className="desktop-dropdown-menu"
                    onMouseEnter={handleDesktopEnter}
                    onMouseLeave={handleDesktopLeave}
                  >
                    <div className="dropdown-menu-container">
                      <Link to="/services/web-development" onClick={() => setDesktopServiceOpen(false)} className="service-item">
                        <h4 className="service-title">Web Development</h4>
                        <p className="service-description">Build responsive, high-performance websites and web applications with modern technologies.</p>
                      </Link>
                      <Link to="/services/application-development" onClick={() => setDesktopServiceOpen(false)} className="service-item">
                        <h4 className="service-title">Application Development</h4>
                        <p className="service-description">Create powerful mobile and desktop applications for iOS, Android, and cross-platform solutions.</p>
                      </Link>
                      <Link to="/services/ui-ux-design" onClick={() => setDesktopServiceOpen(false)} className="service-item">
                        <h4 className="service-title">UI/UX Design</h4>
                        <p className="service-description">Design intuitive, beautiful user interfaces that enhance user experience and drive engagement.</p>
                      </Link>
                      <Link to="/services/e-commerce-solutions" onClick={() => setDesktopServiceOpen(false)} className="service-item">
                        <h4 className="service-title">E-Commerce Solutions</h4>
                        <p className="service-description">Launch and scale your online store with custom e-commerce platforms and integrations.</p>
                      </Link>
                      <Link to="/services/custom-software-development" onClick={() => setDesktopServiceOpen(false)} className="service-item">
                        <h4 className="service-title">Custom Software Development</h4>
                        <p className="service-description">Develop tailored software solutions that streamline your business operations and workflows.</p>
                      </Link>
                      <Link to="/services/ai-development" onClick={() => setDesktopServiceOpen(false)} className="service-item">
                        <h4 className="service-title">AI Development</h4>
                        <p className="service-description">Integrate AI and machine learning capabilities to automate processes and enhance decision-making.</p>
                      </Link>
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                  }
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                  }
                >
                  Blog
                </NavLink>
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
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/work"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Work
          </NavLink>

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
              <Link to="/services/web-development" onClick={() => setIsMenuOpen(false)}>
                Web Development
              </Link>
              <Link to="/services/application-development" onClick={() => setIsMenuOpen(false)}>
                Application Development
              </Link>
              <Link to="/services/ui-ux-design" onClick={() => setIsMenuOpen(false)}>
                UI/UX Design
              </Link>
              <Link to="/services/e-commerce-solutions" onClick={() => setIsMenuOpen(false)}>
                E-Commerce Solutions
              </Link>
              <Link to="/services/custom-software-development" onClick={() => setIsMenuOpen(false)}>
                Custom Software Development
              </Link>
              <Link to="/services/ai-development" onClick={() => setIsMenuOpen(false)}>
                AI Development
              </Link>
            </div>
          )}

          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Blog
          </NavLink>

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