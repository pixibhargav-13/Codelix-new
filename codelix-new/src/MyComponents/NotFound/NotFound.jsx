import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/SEO";
import NavbarV2 from "../Shared/NavbarV2";
import FooterV2 from "../Shared/FooterV2";
import "../HomepageV2/HomepageV2.css";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found | Codelix IT Solutions"
        description="The page you're looking for doesn't exist or has been moved. Browse our services or return to the homepage."
        keywords="404, page not found"
        robots="noindex, follow"
      />
      <div className="v2 not-found-page">
        <div className="not-found-hero-section">
          <NavbarV2 />

      <main>
          <div className="not-found-content">
            <h1 className="not-found-code">404</h1>
            <h2 className="not-found-title">Page Not Found</h2>
            <p className="not-found-description">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>
            <div className="not-found-actions">
              <Link to="/" className="not-found-home-btn">
                Go to Homepage
              </Link>
              <Link to="/contact" className="not-found-contact-btn">
                Contact Us
              </Link>
            </div>
          </div>
          </main>
        </div>

        <FooterV2 />
      </div>
    </>
  );
};

export default NotFound;
