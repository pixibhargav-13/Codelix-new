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
import pythonLogo from "../Images/python.png";
import javaLogo from "../Images/java.png";
import nodeLogo from "../Images/node.png";
import dockerLogo from "../Images/docker.png";
import reactLogo from "../Images/react.png";
import n8nLogo from "../Images/n8n.png";
import zapierLogo from "../Images/zapier.png";
import makeLogo from "../Images/make.png";

const AIDevelopment = () => {
  const heroimages = [heroOne];
  const [index, setIndex] = useState(0);
  const [currentHero, setCurrentHero] = useState(heroimages[0]);
  const [fade, setFade] = useState(true);

  // AI Development specific technologies
  const aiTechnologies = [
    { name: "n8n", img: n8nLogo },
    { name: "Zapier", img: zapierLogo },
    { name: "Make", img: makeLogo },
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
        title="AI Development Services | Artificial Intelligence Solutions | Codelix"
        description="Cutting-edge AI development services that leverage machine learning, natural language processing, and intelligent automation to transform your business operations."
        keywords="AI development, artificial intelligence, machine learning, NLP, intelligent automation, AI solutions"
        canonical="https://codelix.com/services/ai-development"
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
                      AI Development
                    </h1>
                    <p className="mt-3 light-gray inter fs-5">
                    Our AI development services focus on creating intelligent, scalable, and high-performance solutions that automate workflows, enhance decision-making, and improve business efficiency. We build tailored AI tools and agents that combine smart data processing, seamless integration, and reliable performance, helping your business operate faster and smarter.
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
                    alt="AI Development"
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
              desc: "We begin by understanding your business workflows, data sources, and automation needs. This helps us identify the right AI model, use case, and integration approach to deliver meaningful and measurable results.",
            },
            {
              number: "02",
              title: "Planning & Strategy",
              desc: "We create a clear AI roadmap that includes model selection, data preparation, workflow logic, automation steps, and integration strategy. This ensures your AI solution is accurate, scalable, and aligned with real operational goals.",
            },
            {
              number: "03",
              title: "Model Design & Training",
              desc: "Our team designs and configures the AI model based on your needs—whether it's an AI agent, chatbot, automation engine, or predictive system. We fine-tune the model for relevance, accuracy, and optimal performance.",
            },
            {
              number: "04",
              title: "Development & Integration",
              desc: "We build your AI solution using modern frameworks and seamlessly integrate it with your existing tools, CRMs, apps, or workflows. This ensures your AI system works smoothly across your entire digital ecosystem.",
            },
            {
              number: "05",
              title: "Testing & QA",
              desc: "We rigorously test the AI model for accuracy, reliability, workflow stability, and real-world performance. This includes edge case handling, hallucination control, and stress testing to ensure dependable output.",
            },
            {
              number: "06",
              title: "Deployment & Maintenance",
              desc: "After launch, we deploy your AI solution securely and provide ongoing monitoring, updates, and optimization.",
            },
          ]} />
        </div>

        <div className="tools-and-tech-we-use">
          <ToolsAndTechUsedWeb showTabs={false} customTechnologies={aiTechnologies} />
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

export default AIDevelopment;

