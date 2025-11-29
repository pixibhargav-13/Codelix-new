import React, { useState, useEffect } from "react";
import "./Services.css";
import { Navbar } from "../Navbar/Navbar";
import Ourwork from "../OurWork/Ourwork";
import { HowWeWork } from "../Service-How-We-Work/HowWeWork";
import { ToolsAndTechUsedWeb } from "../ToolsAndTechUsedWeb/ToolsAndTechUsedWeb";
import { ChooseUs } from "../ReasonToChooseUs/ChooseUs";
import { WhatWeProvide } from "../WhatWeProvide/WhatWeProvide";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import Footer from "../Footer/Footer";
import blackArrow from "../Images/blackArrow.png";
import whiteArrow from "../Images/whiteArrow.png";
import heroOne from "../Images/homepage-hero-web-dev.png";
import client1 from "../Images/homepage-client-one.png";
import client2 from "../Images/homepage-client-two.png";
import client3 from "../Images/homepage-client-three.png";
import client4 from "../Images/homepage-client-four.png";
import client5 from "../Images/homepage-client-five.png";
import client6 from "../Images/homepage-client-six.png";
import client7 from "../Images/homepage-client-seven.png";
import client8 from "../Images/homepage-client-eight.png";
import client9 from "../Images/homepage-client-nine.png";
import client10 from "../Images/homepage-client-ten.png";
import client11 from "../Images/homepage-client-eleven.png";
import client12 from "../Images/homepage-client-twelve.png";
import { SEO } from "../../components/SEO";

const Services = () => {
  const heroimages = [heroOne];
  const [index, setIndex] = useState(0);
  const [currentHero, setCurrentHero] = useState(heroimages[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        const newIndex = (index + 1) % heroimages.length;
        setIndex(newIndex);
        setCurrentHero(heroimages[newIndex]);
        setFade(true); // fade-in
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  const clientLogos = [
    client1,
    client2,
    client3,
    client4,
    client5,
    client6,
    client7,
    client8,
    client9,
    client10,
    client11,
    client12,
  ];
  return (
    <>
      <SEO
        title="Web Development Services | Custom Solutions | Codelix"
        description="Professional web development services combining modern design, optimized coding, and intelligent automation for high-performance websites and applications."
        keywords="web development, web design, custom web solutions, professional web services, responsive design"
        canonical="https://codelix.com/services"
      />
      <div className="service-hero-section">
        <Navbar />
        <section className="text-white py-5">
          <div className="container">
            {/* TOP SECTION */}
            <div className="row g-4 align-items-stretch">
              {/* Left Text */}
              <div className="col-lg-7 ">
                <div className="p-4 border border-secondary h-100  d-flex flex-column justify-content-between">
                  <div className="top">
                    <h1 className="fw-bold display-6 hanken-grotesk">
                      Web Development
                    </h1>
                    <p className="mt-3 light-gray inter">
                      Our AI-powered web development services focus on building
                      and maintaining high-quality websites enhanced with
                      intelligent automation. We combine modern design,
                      optimized coding, and smart server management to ensure
                      top-tier performance and user engagement.
                    </p>
                  </div>

                  <div className="d-flex gap-3 hero-buttons">
                    {/* Blue Button */}
                    <button className="btn blue-common-btn d-flex align-items-center justify-content-between free-quote-btn">
                      <span>Schedule A Call</span>
                      <img
                        src={whiteArrow}
                        alt="arrow"
                        className="arrow-icon"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-5 h-100">
                <div className="border border-secondary d-flex justify-content-center align-items-center h-100 no-spacing homepage-hero-slideshow-wrapper">
                  <img
                    src={currentHero}
                    alt="hero"
                    className={`img-fluid right-image homepage-hero-fade-image ${
                      fade ? "homepage-hero-fade-in" : "homepage-hero-fade-out"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="services-page">
        <div className="how-we-work">
          <HowWeWork />
        </div>

        <div className="tools-and-tech-we-use">
          <ToolsAndTechUsedWeb />
        </div>

        <div className="choose-us">
          <ChooseUs />
        </div>

        <div className="what-we-provide">
          <WhatWeProvide />
        </div>

        <div className="lets-build-something">
          <LetsBuildSomething />
        </div>

        <div className="our-work">
          <Ourwork />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Services;
