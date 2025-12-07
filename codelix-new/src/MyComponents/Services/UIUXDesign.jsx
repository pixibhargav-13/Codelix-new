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
import heroOne from "../Images/homepage-hero-app-dev.png";
import { SEO } from "../../components/SEO";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";

const UIUXDesign = () => {
  const heroimages = [heroOne];
  const [index, setIndex] = useState(0);
  const [currentHero, setCurrentHero] = useState(heroimages[0]);
  const [fade, setFade] = useState(true);

  // UI/UX Design specific technologies
  const uiuxTechnologies = [
    { name: "Figma", img: figmaLogo },
    { name: "Adobe XD", img: adobeXdLogo },
    { name: "Sketch", img: sketchLogo },
    { name: "Framer", img: framerLogo },
    { name: "Canva", img: canvaLogo },
  ];

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
        title="UI/UX Design Services | User Experience Design | Codelix"
        description="Professional UI/UX design services that create intuitive, beautiful, and user-centered digital experiences. We design interfaces that users love and businesses trust."
        keywords="UI design, UX design, user interface design, user experience, digital design, interface design"
        canonical="https://codelix.com/services/ui-ux-design"
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
                      UI/UX Design
                    </h1>
                    <p className="mt-3 light-gray inter fs-5">
                    Our UI/UX design service focuses on creating visually stunning, user-friendly, and high-performing digital experiences. We blend creativity, strategy, and technology to design interfaces that engage users, enhance usability, and drive conversions. From research to pixel-perfect execution, we craft designs that tell your brand story effectively.
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
                    alt="UI/UX Design"
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
          <HowWeWork customSteps={[
            {
              number: "01",
              title: "Requirement Analysis",
              desc: "We begin by understanding your business objectives, audience behavior, and market landscape. Through in-depth research, we identify user pain points and opportunities to create meaningful design solutions.",
            },
            {
              number: "02",
              title: "Research & Strategy",
              desc: "Once insights are gathered, we create wireframes and user flows that define the app or website's structure, ensuring logical navigation and smooth user journeys.",
            },
            {
              number: "03",
              title: "Wireframing",
              desc: "We bring your brand to life through modern, aesthetic, and intuitive interface designs. Every visual element is crafted with precision to align with your brand identity and enhance user engagement.",
            },
            {
              number: "04",
              title: "UI Design",
              desc: "Before development, we build interactive prototypes to visualize the end experience. This allows stakeholders to test interactions and ensure the design meets both business and user expectations.",
            },
            {
              number: "05",
              title: "UX Design",
              desc: "Our UX experts conduct user testing sessions to validate design decisions, ensuring the interface is easy to use, accessible, and aligned with user needs.",
            },
            {
              number: "06",
              title: "Prototyping & Testing",
              desc: "Once finalized, we hand off production-ready design assets and guidelines to the development team, ensuring a smooth transition. We also provide ongoing design support during and after launch.",
            },
          ]} />
        </div>

        <div className="tools-and-tech-we-use">
          <ToolsAndTechUsedWeb showTabs={false} customTechnologies={uiuxTechnologies} />
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

export default UIUXDesign;

