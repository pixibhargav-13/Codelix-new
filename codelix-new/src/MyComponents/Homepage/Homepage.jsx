import React from "react";
import hero from "../Images/homepage-hero-image.png";
import client1 from "../Images/heroClientOne.png";
import client2 from "../Images/heroClientTwo.png";
import client3 from "../Images/heroClientThree.png";
import client4 from "../Images/heroClientFour.png";
import client5 from "../Images/heroClientFive.png";
import blackArrow from "../Images/blackArrow.png";
import whiteArrow from "../Images/whiteArrow.png";
import { Navbar } from "../Navbar/Navbar";
import "./Homepage.css";
import { WhatWeBuild } from "../WhatWeBuild/WhatWeBuild";
import { WhatMakesUsDifferent } from "../WhatMakesUsDifferent/WhatMakesUsDifferent";
import { WhatWeProvide } from "../WhatWeProvide/WhatWeProvide";
import Ourwork from "../OurWork/Ourwork";
import { ChooseUs } from "../ReasonToChooseUs/ChooseUs";
import { ExploreProducts } from "../ExploreProducts/ExploreProducts";

export const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <div className="hero-section">
          <div className="wrapper">
            <Navbar />
            <section className="text-white py-5">
              <div className="container">
                {/* TOP SECTION */}
                <div className="row g-4 align-items-stretch">
                  {/* Left Text */}
                  <div className="col-lg-7 h-100">
                    <div className="p-4 border border-secondary h-100">
                      <h1 className="fw-bold display-6 hanken-grotesk">
                        AI-Powered Tech for Ambitious Businesses
                      </h1>
                      <p className="mt-3 light-gray inter">
                        We craft AI-powered Web, App & SaaS solutions that
                        empower businesses with performance, precision, and
                        design excellence through world-class UI/UX design.
                      </p>

                      <div className="d-flex gap-3 mt-4 hero-buttons">
                        {/* Blue Button */}
                        <button className="btn blue-common-btn d-flex align-items-center justify-content-between">
                          <span>Get a Free Quote</span>
                          <img
                            src={whiteArrow}
                            alt="arrow"
                            className="arrow-icon"
                          />
                        </button>

                        {/* White Button */}
                        <button className="btn explore-work-btn d-flex align-items-center justify-content-between">
                          <span>Explore Our Work</span>
                          <img
                            src={blackArrow}
                            alt="arrow"
                            className="arrow-icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="col-lg-5 h-100">
                    <div className="border border-secondary d-flex justify-content-center align-items-center h-100 no-spacing">
                      <img
                        src={hero}
                        alt="hero"
                        className="img-fluid right-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* BOTTOM LOGOS */}
          <p className="text-center mt-5 mb-3 text-light small opacity-75">
            Trusted by 25+ Companies and Growing
          </p>

          <div className="d-flex justify-content-center flex-wrap">
            <img src={client1} className="img-fluid client-logo" />
            <img src={client2} className="img-fluid client-logo" />
            <img src={client3} className="img-fluid client-logo" />
            <img src={client4} className="img-fluid client-logo" />
            <img src={client5} className="img-fluid client-logo" />
            <img src={client5} className="img-fluid client-logo" />
            <img src={client5} className="img-fluid client-logo" />
            <img src={client5} className="img-fluid client-logo" />
            <img src={client5} className="img-fluid client-logo" />
            <img src={client5} className="img-fluid client-logo" />
          </div>
        </div>

        <div className="what-we-build">
          <WhatWeBuild />
        </div>

        <div className="what-makes-us-different">
          <WhatMakesUsDifferent />
        </div>

        <div className="what-makes-us-different">
          <WhatWeProvide />
        </div>

        <div className="explore-products">
          <ExploreProducts />
        </div>

        <div className="Choose-us">
          <ChooseUs />
        </div>
        
        <div className="our-work">
          <Ourwork />
        </div>
      </div>
    </>
  );
};
