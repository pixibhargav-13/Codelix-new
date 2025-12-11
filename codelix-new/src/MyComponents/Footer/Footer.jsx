import React from "react";
import "./Footer.css";
import codelixText from "../Images/codelix-footer-logo.png";
import footerDot from "../Images/footer-dot.png";

import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

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
  const footerData = {
    info: [
      { label: "Codelix", link: "/" },
      { label: "Work", link: "/work" },
      { label: "About", link: "#" },
      { label: "Services", link: "/services" },
      { label: "Blog", link: "#" },
      { label: "Contact", link: "/contact" },
    ],
    services: [
      { label: "Web Development", link: "/services/web-development" },
      { label: "Mobile Development", link: "/services/application-development" },
      { label: "UI/UX Design", link: "/services/ui-ux-design" },
      { label: "Custom Software dev.", link: "/services/custom-software-development" },
      { label: "E-Commerce Solutions", link: "/services/e-commerce-solutions" },
      { label: "AI Development", link: "/services/ai-development" },
    ],
    social: [
      { label: "Linkedin", link: "#" },
      { label: "Upwork", link: "#" },
      { label: "Instagram", link: "#" },
    ],
    contact: [
      {
        label: "Sales@codelixitsolution.com",
        link: "mailto:Sales@codelixitsolution.com",
      },
      { label: "+91 94292 69295", link: "tel:+919429269295" },
      { label: "+91 74909 09686", link: "tel:+917490909686" },
    ],
  };

  // Create marquee items array
  const marqueeItems = [
    { text: "WE LIVE IN IT", dot: footerDot },
    { text: "WE LIVE IN IT", dot: footerDot },
    { text: "WE LIVE IN IT", dot: footerDot },
    { text: "WE LIVE IN IT", dot: footerDot },
    { text: "WE LIVE IN IT", dot: footerDot },
    { text: "WE LIVE IN IT", dot: footerDot },
  ];

  return (
    <footer className="codelix-footer">
      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, index) => (
            <React.Fragment key={index}>
              <span>{item.text}</span>
              <span className="dot">
                <img src={item.dot} alt="dot" />
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        <div className="container">
          <div className="row justify-content-center">
            {/* INFO Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 footer-column">
              <h4 className="footer-heading">INFO</h4>
              <ul className="footer-links">
                {footerData.info.map((item, index) => (
                  <li key={index}>
                    {item.link.startsWith("/") ? (
                      <Link to={item.link} onClick={(e) => handleNavClick(e, item.link)}>
                        {item.label}
                      </Link>
                    ) : (
                      <Link to={item.link}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 footer-column">
              <h4 className="footer-heading">SERVICES</h4>
              <ul className="footer-links">
                {footerData.services.map((item, index) => (
                  <li key={index}>
                    {item.link.startsWith("/") ? (
                      <Link to={item.link} onClick={(e) => handleNavClick(e, item.link)}>
                        {item.label}
                      </Link>
                    ) : (
                      <Link to={item.link}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* SOCIAL Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 footer-column">
              <h4 className="footer-heading">SOCIAL</h4>
              <ul className="footer-links">
                {footerData.social.map((item, index) => (
                  <li key={index}>
                    <a href={item.link}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 footer-column">
              <h4 className="footer-heading">CONTACT</h4>
              <ul className="footer-links">
                {footerData.contact.map((item, index) => (
                  <li key={index}>
                    <a href={item.link}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p className="copyright">
                <span>
                  <i className="fa-regular fa-copyright"></i>
                </span>{" "}
                2025 Codelix — All Copyright Reserved
              </p>
              <div className="footer-links-bottom">
                <Link to="/privacy-policy" onClick={(e) => handleNavClick(e, "/privacy-policy")}>
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" onClick={(e) => handleNavClick(e, "/terms-of-service")}>
                  Terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large CODELIX Text */}
      <div className="codelix-large-text">
        <div className="codelix-text">
          <img src={codelixText} alt="Codelix" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;