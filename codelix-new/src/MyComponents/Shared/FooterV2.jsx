import React from 'react';
import { Link } from "react-router-dom";
import codelixLogo from "../Images/codelix-logo.webp";
import { FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS, FOOTER_PRODUCTS, FOOTER_COMPANY, FOOTER_HIRE } from "../HomepageV2/footerData";
import RatingsStrip from "./RatingsStrip";

export default function FooterV2() {
  return (
    <footer className="v2-footer">
      {/* tagline header */}
      <div className="v2-footer-tagline">
        <h2 className="v2-footer-wordmark-small">
          WE LIVE
          <br />
          IN <span className="v2-footer-wordmark-accent">IT</span>
        </h2>
        <p className="v2-footer-tagline-body">
          We design and build web, mobile, and AI systems for businesses that
          intend to still be running them in five years.
        </p>
      </div>

      {/* dense keyword strips */}
      <div className="v2-footer-keywords-row">
        <p className="v2-footer-keywords-label">Services</p>
        <div className="v2-footer-keywords-list">
          {FOOTER_ALL_SERVICES.map((k, i) => (
            <Link to={k.path} className="v2-footer-keyword" key={i}>{k.label}</Link>
          ))}
        </div>
      </div>
      <div className="v2-footer-keywords-row">
        <p className="v2-footer-keywords-label">Industries</p>
        <div className="v2-footer-keywords-list">
          {FOOTER_INDUSTRY_KEYWORDS.map((k, i) => (
            <Link to={k.path} className="v2-footer-keyword" key={i}>{k.label}</Link>
          ))}
        </div>
      </div>
      <div className="v2-footer-keywords-row">
        <p className="v2-footer-keywords-label">Hire Developers</p>
        <div className="v2-footer-keywords-list">
          {FOOTER_HIRE.map((k, i) => (
            <Link to={k.path} className="v2-footer-keyword" key={i}>{k.label}</Link>
          ))}
        </div>
      </div>
      <div className="v2-footer-keywords-row">
        <p className="v2-footer-keywords-label">Products</p>
        <div className="v2-footer-keywords-list">
          {FOOTER_PRODUCTS.map((k, i) => (
            <Link to={k.path} className="v2-footer-keyword" key={i}>{k.label}</Link>
          ))}
        </div>
      </div>
      <div className="v2-footer-keywords-row">
        <p className="v2-footer-keywords-label">Company</p>
        <div className="v2-footer-keywords-list">
          {FOOTER_COMPANY.map((k, i) => (
            <Link to={k.path} className="v2-footer-keyword" key={i}>{k.label}</Link>
          ))}
        </div>
      </div>

      {/* office / contact info */}
      <div className="v2-footer-cards v2-footer-cards--four">
        <a
          className="v2-footer-card"
          href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.009586,72.5203036,17z/data=!3m1!4b1!4m6!3m5!1s0x395e856f394696fd:0x69f60cf69bf7dd43!8m2!3d23.0095811!4d72.5228785!16s%2Fg%2F11z61zmnv5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>India (HQ)</h3>
          <p className="v2-footer-card-addr">
            A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015
          </p>
        </a>
        <div className="v2-footer-card">
          <h3>Phone</h3>
          <a className="v2-footer-card-strong" href="tel:+919429269295">+91 94292 69295</a>
          <a className="v2-footer-card-strong" href="tel:+917490909686">+91 74909 09686</a>
        </div>
        <div className="v2-footer-card">
          <h3>Looking For Jobs</h3>
          <Link className="v2-footer-card-strong" to="/careers">View openings →</Link>
        </div>
        <div className="v2-footer-card">
          <h3>HR</h3>
          <a className="v2-footer-card-strong" href="mailto:hr@codelixitsolutions.com">
            hr@codelixitsolutions.com
          </a>
        </div>
        <div className="v2-footer-card">
          <h3>General</h3>
          <a className="v2-footer-card-strong" href="mailto:info@codelixitsolutions.com">
            info@codelixitsolutions.com
          </a>
        </div>
        <div className="v2-footer-card">
          <h3>For Sales</h3>
          <a className="v2-footer-card-strong" href="mailto:sales@codelixitsolutions.com">
            sales@codelixitsolutions.com
          </a>
        </div>
      </div>

      {/* socials + back-to-top */}
      <div className="v2-footer-social">
        <div className="v2-footer-social-links">
          <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61561748130641" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.behance.net/kushalmungalp" target="_blank" rel="noopener noreferrer">Behance</a>
        </div>
        <div className="v2-footer-actions">
          <div className="v2-desktop-only">
            <RatingsStrip />
          </div>
          <button
            type="button"
            className="v2-footer-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑
          </button>
        </div>
      </div>
      <div className="v2-footer-social v2-mobile-only" style={{ borderTop: "none", paddingTop: "20px", paddingBottom: "20px", justifyContent: "center", flexWrap: "wrap", gap: "10px", width: "100%" }}>
        <RatingsStrip />
      </div>
      <div className="v2-footer-bottom">
        <Link to="/" className="v2-footer-bottom-brand" aria-label="Codelix — home">
          <img src={codelixLogo} alt="Codelix" width="544" height="188" />
        </Link>
        <span className="v2-footer-bottom-copy">© 2026 Codelix IT Solutions — All Copyright Reserved</span>
        <div className="v2-footer-legal">
          <Link to="/sitemap">Sitemap</Link>
          <Link to="/refund-policy">Refund Policy</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
