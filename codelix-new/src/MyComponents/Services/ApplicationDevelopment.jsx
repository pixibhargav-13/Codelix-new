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
import flutterLogo from "../Images/flutter.png";
import reactLogo from "../Images/react.png";
import androidLogo from "../Images/android.png";
import swiftLogo from "../Images/swift.png";

const ApplicationDevelopment = () => {
  const heroimages = [heroOne];
  const [index, setIndex] = useState(0);
  const [currentHero, setCurrentHero] = useState(heroimages[0]);
  const [fade, setFade] = useState(true);

  // Application Development specific technologies
  const appDevTechnologies = [
    { name: "React Native", img: reactLogo },
    { name: "Flutter", img: flutterLogo },
    { name: "Android", img: androidLogo },
    { name: "Swift", img: swiftLogo },
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
        title="Application Development Services | Mobile & Desktop Apps | Codelix"
        description="Expert application development services for mobile and desktop platforms. We build scalable, high-performance applications using cutting-edge technologies and best practices."
        keywords="application development, mobile app development, desktop applications, cross-platform apps, software development"
        canonical="https://codelix.com/services/application-development"
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
                      Application Development
                    </h1>
                    <p className="mt-3 light-gray inter fs-5">
                      Transform your ideas into powerful applications with our
                      comprehensive application development services. We specialize
                      in creating scalable, high-performance mobile and desktop
                      applications that deliver exceptional user experiences
                      across all platforms.
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
                    alt="Application Development"
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
              title: "Project Ideation",
              desc: "We begin by understanding your business needs, challenges, and goals for the application. We analyze your target audience and the problem your app aims to solve, setting the foundation for a successful digital product.",
            },
            {
              number: "02",
              title: "Planning",
              desc: "After defining your goals, we create a detailed roadmap outlining app features, timelines, and milestones. We ensure that every stage of the project aligns with your objectives and provides measurable value.",
            },
            {
              number: "03",
              title: "Design",
              desc: "We transform your vision into an engaging user experience through modern, intuitive, and visually appealing designs. Our focus is on usability, accessibility, and aesthetics that enhance user satisfaction.",
            },
            {
              number: "04",
              title: "Agile Development",
              desc: "Using an agile methodology, we develop your app in iterative sprints. This ensures continuous testing, flexibility, and faster delivery while maintaining code quality and performance standards.",
            },
            {
              number: "05",
              title: "Testing",
              desc: "Our QA experts conduct comprehensive testing, covering performance, usability, compatibility, and security, ensuring that the app functions flawlessly across devices and platforms.",
            },
            {
              number: "06",
              title: "Deployment",
              desc: "Once the application is tested and approved, we deploy it to the live environment. We also provide support during app launch and ensure smooth integration with your existing systems.",
            },
          ]} />
        </div>

        <div className="tools-and-tech-we-use">
          <ToolsAndTechUsedWeb showTabs={false} customTechnologies={appDevTechnologies} />
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

export default ApplicationDevelopment;

