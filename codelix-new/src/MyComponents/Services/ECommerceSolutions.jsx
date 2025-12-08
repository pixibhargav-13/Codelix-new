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
import shopifyLogo from "../Images/shopify.png";
import woocommerceLogo from "../Images/woocommerce.png";
import webflowLogo from "../Images/webflow.png";

const ECommerceSolutions = () => {
  const heroimages = [heroOne];
  const [index, setIndex] = useState(0);
  const [currentHero, setCurrentHero] = useState(heroimages[0]);
  const [fade, setFade] = useState(true);

  // E-Commerce Solutions specific technologies
  const ecommerceTechnologies = [
    { name: "Shopify", img: shopifyLogo },
    { name: "WooCommerce", img: woocommerceLogo },
    { name: "Webflow", img: webflowLogo },
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
        title="E-Commerce Solutions | Online Store Development | Codelix"
        description="Complete e-commerce solutions that drive sales and growth. We build secure, scalable online stores with seamless payment integration and exceptional user experiences."
        keywords="e-commerce development, online store, ecommerce solutions, shopping cart, payment integration, online retail"
        canonical="https://codelix.com/services/e-commerce-solutions"
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
                      E-Commerce Solutions
                    </h1>
                    <p className="mt-3 light-gray inter fs-5">
                    Our AI-powered e-commerce development services focus on building powerful, scalable, and high-performance online stores that convert visitors into loyal customers. With intelligent automation, smooth user experience, and secure payment integrations, we create tailored digital commerce platforms that help your business grow in a competitive online marketplace.
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
                    alt="E-Commerce Solutions"
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
              desc: "We begin by understanding your business model, target audience, and product range. This helps us define the right strategy and platform for your online store — whether it's B2B, B2C, or D2C.",
            },
            {
              number: "02",
              title: "Planning & Strategy",
              desc: "Our experts design a project roadmap that includes store architecture, payment systems, shipping logic, and marketing integrations to ensure a seamless buying experience.",
            },
            {
              number: "03",
              title: "UI/UX Design",
              desc: "We craft visually appealing and conversion-focused designs that build trust, simplify navigation, and enhance user engagement across all devices.",
            },
            {
              number: "04",
              title: "Development",
              desc: "Using modern technologies and frameworks, we build your e-commerce platform with secure databases, optimized performance, and custom features tailored to your needs.",
            },
            {
              number: "05",
              title: "Testing & Quality Assurance",
              desc: "Before launch, we rigorously test your store for performance, functionality, and security. This ensures your customers enjoy a smooth, bug-free shopping experience.",
            },
            {
              number: "06",
              title: "Deployment & Maintenance",
              desc: "After final approval, we deploy your e-commerce solution and provide post-launch support, updates, and optimization to keep your store running flawlessly.",
            },
          ]} />
        </div>

        <div className="tools-and-tech-we-use">
          <ToolsAndTechUsedWeb showTabs={false} customTechnologies={ecommerceTechnologies} />
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

export default ECommerceSolutions;

