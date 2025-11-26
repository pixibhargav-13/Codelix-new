import React from "react";
import "./LetsBuildSomething.css";
import rightArrow from "../Images/whiteArrow.png";
import buildSomething from "../Images/Build-something.png"; // Curved left/right SVG or PNG

export const LetsBuildSomething = () => {
  return (
    <section className="lets-build-section">
      <div className="overlay-curves">
        <img
          src={buildSomething}
          alt="curve-left"
          className="curve curve-left"
        />
        <img
          src={buildSomething}
          alt="curve-left"
          className="curve curve-right"
        />
      </div>

      <div className="content-wrapper text-center">
        <h2 className="lets-build-main-title">
          Let’s build something that <br /> works beautifully.
        </h2>

        <p className="lets-build-subtitle">
          Tell us about your idea, and we’ll help you make it real, faster and
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
