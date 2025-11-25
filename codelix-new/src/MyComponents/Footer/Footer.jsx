import React from "react";
import "./Footer.css";
import codelixText from "../Images/codelix-footer-logo.png";
import footerDot from "../Images/footer-dot.png";
const Footer = () => {
  const footerData = {
    info: [
      { label: "Codelix", link: "#" },
      { label: "Work", link: "#" },
      { label: "About", link: "#" },
      { label: "Services", link: "#" },
      { label: "Blog", link: "#" },
      { label: "Contact", link: "#" },
    ],
    services: [
      { label: "Web Development", link: "#" },
      { label: "Mobile Development", link: "#" },
      { label: "UI/UX Design", link: "#" },
      { label: "Custom Software dev.", link: "#" },
      { label: "E-Commerce Solutions", link: "#" },
      { label: "AI Development", link: "#" },
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

  return (
    <footer className="codelix-footer">
      {/* Marquee Section */}
      {/* <div className="marquee-container">
        <div className="marquee-content">
          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>
          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>

          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>

          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>

          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>

          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>

          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>

          <span>WE LIVE IN IT</span>
          <span className="dot">
            <img src={footerDot} />
          </span>
        </div>
      </div> */}

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
                    <a href={item.link}>{item.label}</a>
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
                    <a href={item.link}>{item.label}</a>
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
                  <i class="fa-regular fa-copyright"></i>
                </span>{" "}
                2025 Codelix — All Copyright Reserved
              </p>
              <div className="footer-links-bottom">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of service</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large CODELIX Text */}
      <div className="codelix-large-text">
        <div className="codelix-text">
          <img src={codelixText} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
