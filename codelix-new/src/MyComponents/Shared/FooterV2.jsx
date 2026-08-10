import React from 'react';
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import GoogleReviewButton from "./GoogleReviewButton";
import ClutchWidget from "./ClutchWidget";

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
            <a href={k.path} className="v2-footer-keyword" key={i}>{k.label}</a>
          ))}
        </div>
      </div>
      <div className="v2-footer-keywords-row">
        <p className="v2-footer-keywords-label">Industries</p>
        <div className="v2-footer-keywords-list">
          {FOOTER_INDUSTRY_KEYWORDS.map((k, i) => (
            <a href={k.path} className="v2-footer-keyword" key={i}>{k.label}</a>
          ))}
        </div>
      </div>

      {/* office / contact info */}
      <div className="v2-footer-cards v2-footer-cards--four">
        <a
          className="v2-footer-card"
          href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.009586,72.5203036,17z/data=!3m1!4b1!4m6!3m5!1s0x395e856f394696fd:0x69f60cf69bf7dd43!8m2!3d23.0095811!4d72.5228785!16s%2Fg%2F11z61zmnv5?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>India (HQ)</h5>
          <p className="v2-footer-card-addr">
            A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015
          </p>
        </a>
        <div className="v2-footer-card">
          <h5>Phone</h5>
          <a className="v2-footer-card-strong" href="tel:+919429269295">+91 94292 69295</a>
          <a className="v2-footer-card-strong" href="tel:+917490909686">+91 74909 09686</a>
        </div>
        <div className="v2-footer-card">
          <h5>Looking For Jobs</h5>
          <a className="v2-footer-card-strong" href="/careers">View openings →</a>
        </div>
        <div className="v2-footer-card">
          <h5>HR</h5>
          <a className="v2-footer-card-strong" href="mailto:hr@codelixitsolutions.com">
            hr@codelixitsolutions.com
          </a>
        </div>
        <div className="v2-footer-card">
          <h5>General</h5>
          <a className="v2-footer-card-strong" href="mailto:info@codelixitsolutions.com">
            info@codelixitsolutions.com
          </a>
        </div>
        <div className="v2-footer-card">
          <h5>For Sales</h5>
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
          <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Dribbble</a>
        </div>
        <div className="v2-footer-actions">
          <ClutchWidget className="v2-desktop-only" />
          <GoogleReviewButton className="v2-desktop-only" />
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
      <div className="v2-footer-social v2-mobile-only" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "20px", justifyContent: "center" }}>
        <ClutchWidget />
        <GoogleReviewButton />
      </div>
      <div className="v2-footer-bottom">
        <a href="/" className="v2-footer-bottom-brand" aria-label="Codelix — home">
          <img src={codelixLogo} alt="Codelix" />
        </a>
        <span className="v2-footer-bottom-copy">© 2026 Codelix IT Solutions — All Copyright Reserved</span>
        <div className="v2-footer-legal">
          <a href="/sitemap">Sitemap</a>
          <a href="/refund-policy">Refund Policy</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms-of-service">Terms</a>
        </div>
      </div>
    </footer>
  );
}
