import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Services/Services.css";
import { Navbar } from "../Navbar/Navbar";
import Ourwork from "../OurWork/Ourwork";
import { HowWeWork } from "../Service-How-We-Work/HowWeWork";
import { ToolsAndTechUsedWeb } from "../ToolsAndTechUsedWeb/ToolsAndTechUsedWeb";
import { ChooseUs } from "../ReasonToChooseUs/ChooseUs";
import { WhatWeProvide } from "../WhatWeProvide/WhatWeProvide";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import Footer from "../Footer/Footer";
import whiteArrow from "../Images/whiteArrow.png";
import heroOne from "../Images/homepage-hero-web-dev.png";
import { SEO } from "../../components/SEO";
const WebDevelopment = () => {
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
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
      <SEO
        title="Web Development Services | Custom Web Solutions | Codelix"
        description="Professional web development services combining modern design, optimized coding, and intelligent automation for high-performance websites and applications."
        keywords="web development, web design, custom web solutions, professional web services, responsive design, modern websites"
        canonical="https://codelix.com/services/web-development"
      />
      <div className="service-hero-section">
        <Navbar />
        <section className="text-white py-5">
          <div className="container">
            <div className="row g-4 align-items-stretch">
              <div className="col-lg-7">
                <div className="p-4 border border-secondary h-100 d-flex flex-column justify-content-between">
                  <div className="top">
                    <h1 className="fw-bold display-6 hanken-grotesk">
                      Web Development
                    </h1>
                    <p className="mt-3 light-gray inter fs-5">
                      Our AI-powered web development services focus on building
                      and maintaining high-quality websites enhanced with
                      intelligent automation. We combine modern design,
                      optimized coding, and smart server management to ensure
                      top-tier performance and user engagement.
                    </p>
                  </div>

                  <div className="d-flex gap-3 hero-buttons">
                    <Link to="/contact#contact-form" className="btn blue-common-btn d-flex align-items-center justify-content-between free-quote-btn">
                      <span>Schedule A Call</span>
                      <img
                        src={whiteArrow}
                        alt="arrow"
                        className="arrow-icon"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="border border-secondary d-flex justify-content-center align-items-center h-100 no-spacing homepage-hero-slideshow-wrapper">
                  <img
                    src={currentHero}
                    alt="Web Development"
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
          <ToolsAndTechUsedWeb showGeneralTech={false} />
        </div>

        <div className="choose-us">
          <ChooseUs />
        </div>

        <div className="what-we-provide">
          <WhatWeProvide showOtherServices={true} />
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

export default WebDevelopment;

