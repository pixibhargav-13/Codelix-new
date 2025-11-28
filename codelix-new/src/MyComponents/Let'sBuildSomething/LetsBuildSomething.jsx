import React from "react";
import "./LetsBuildSomething.css";
import rightArrow from "../Images/whiteArrow.png";
import buildSomething from "../Images/Build-something.png";
import buildSomethingMobile from "../Images/lets-build-mobile-screen.png"; // Add your round circle image

export const LetsBuildSomething = () => {
  return (
    <section className="lets-build-section">
      {/* Desktop curves */}
      <div className="overlay-curves desktop-curves">
        <img
          src={buildSomething}
          alt="decorative curves"
          className="curve-background"
        />
      </div>

      {/* Mobile round circle */}
      <div className="overlay-curves mobile-curves">
        <img
          src={buildSomethingMobile}
          alt="decorative circle"
          className="curve-background-mobile"
        />
      </div>

      <div className="content-wrapper text-center">
        <h2 className="lets-build-main-title">
          Let's build something that <br /> works beautifully.
        </h2>

        <p className="lets-build-subtitle">
          Tell us about your idea, and we'll help you make it real, faster and
          better.
        </p>

        <div className="text-center">
          <button className="btn explore-btn consult-btn mt-5 d-inline-flex align-items-center gap-3">
            Get Free Consultation
            <img src={rightArrow} alt="arrow" className="arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};