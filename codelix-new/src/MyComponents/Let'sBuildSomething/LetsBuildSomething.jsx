import React from "react";
import "./LetsBuildSomething.css";

import buildSomething from "../images/Build-something.png"; // Curved left/right SVG or PNG

export const LetsBuildSomething = () => {
  return (
    <section className="lets-build-section">
      <div className="overlay-curves">
        <img src={buildSomething} alt="curve-left" className="curve curve-left" />
      </div>

      <div className="content-wrapper text-center">
        <h2 className="lets-build-main-title">
          Let’s build something that <br /> works beautifully.
        </h2>

        <p className="lets-build-subtitle">
          Tell us about your idea, and we’ll help you make it real, faster and better.
        </p>

        <button className="consult-btn">
          Get Free Consultation <span className="arrow"><i class="fa-solid fa-arrow-right"></i></span>
        </button>
      </div>
    </section>
  );
};
