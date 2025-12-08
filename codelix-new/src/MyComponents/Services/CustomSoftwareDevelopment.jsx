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

const CustomSoftwareDevelopment = () => {
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
        title="Custom Software Development | Tailored Solutions | Codelix"
        description="Bespoke software development services tailored to your unique business needs. We build custom solutions that streamline operations, improve efficiency, and drive growth."
        keywords="custom software development, bespoke software, enterprise software, business software, tailored solutions"
        canonical="https://codelix.com/services/custom-software-development"
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
                      Custom Software Development
                    </h1>
                    <p className="mt-3 light-gray inter fs-5">
                    Our AI-powered custom software development services help businesses build smart, efficient, and future-ready systems. From workflow automation to real-time insights, we create software that adapts to your operations, reduces manual effort, and delivers a seamless experience for both teams and customers.
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
                    alt="Custom Software Development"
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
              desc: "We begin by understanding your business processes, user needs, and system requirements. This helps us define the right features, workflows, and technical direction for your custom software.",
            },
            {
              number: "02",
              title: "Planning & Strategy",
              desc: "We prepare a structured development roadmap with detailed architecture, user flows, integrations, and milestones to ensure your software is built efficiently and aligned with your goals.",
            },
            {
              number: "03",
              title: "UI/UX Design",
              desc: "Our team designs intuitive, user-friendly interfaces that simplify complex tasks, improve usability, and create a smooth experience for both internal teams and end users.",
            },
            {
              number: "04",
              title: "Development",
              desc: "Using modern frameworks and best coding practices, we build secure, scalable, and high-performance custom software tailored to your business operations and long-term growth.",
            },
            {
              number: "05",
              title: "Testing & Quality Assurance",
              desc: "We conduct thorough testing across functionality, performance, and security to ensure your software runs flawlessly and delivers a reliable experience in real-world use.",
            },
            {
              number: "06",
              title: "Deployment & Maintenance",
              desc: "After launch, we deploy your software safely and provide continuous updates, monitoring, and support to keep the system optimized, stable, and ready for future enhancements.",
            },
          ]} />
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

export default CustomSoftwareDevelopment;

