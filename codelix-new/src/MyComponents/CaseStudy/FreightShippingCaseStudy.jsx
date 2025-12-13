import React, { useState, useEffect, useRef } from "react";
import "./FreightShippingCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-thirteen.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light10.png";
import light2Image from "../Images/Light11.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import projectSeven from "../Images/work-best-project-seven.png";
import projectNine from "../Images/work-best-project-nine.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FreightShippingCaseStudy = () => {
  const navigate = useNavigate();
  const outcomesRef = useRef(null);
  const challengesRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ projects: 1, success: 1, years: 1 });
  const [bulletPointsVisible, setBulletPointsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateNumbers();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (outcomesRef.current) {
      observer.observe(outcomesRef.current);
    }

    return () => {
      if (outcomesRef.current) {
        observer.unobserve(outcomesRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !bulletPointsVisible) {
            setBulletPointsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (challengesRef.current) {
      observer.observe(challengesRef.current);
    }

    return () => {
      if (challengesRef.current) {
        observer.unobserve(challengesRef.current);
      }
    };
  }, [bulletPointsVisible]);

  // Target values for animation
  const targetValues = { projects: 45, success: 28, years: 96 };

  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animateNumbers = () => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      // Animate Projects (starting from 1)
      setCounts((prev) => ({
        ...prev,
        projects: Math.floor(1 + (targetValues.projects - 1) * easedProgress),
      }));

      // Animate Success Rate (starting from 1)
      setCounts((prev) => ({
        ...prev,
        success: Math.floor(1 + (targetValues.success - 1) * easedProgress),
      }));

      // Animate Years (starting from 1)
      setCounts((prev) => ({
        ...prev,
        years: Math.floor(1 + (targetValues.years - 1) * easedProgress),
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final values are set
        setCounts(targetValues);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <SEO
        title="Freight & Shipping Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/freight-shipping-case-study"
      />
      <div className="freight-shipping-case-study-page">
        <div className="freight-shipping-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="freight-shipping-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch freight-shipping-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 freight-shipping-case-study-content-col">
                <div className="freight-shipping-case-study-content-wrapper">
                  <h1 className="freight-shipping-case-study-hero-title">
                    Freight & Shipping Web Platform – Modern Development
                  </h1>
                  <p className="freight-shipping-case-study-hero-description">
                    A fully responsive and modern website developed for an international ocean freight and logistics service provider. The platform showcases global cargo solutions, shipment tracking features, service categories, and detailed logistics information through a clean, intuitive interface.
                  </p>
                  
                  {/* Tags */}
                  <div className="freight-shipping-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="freight-shipping-case-study-tag-badge">Mobile</span>
                    <span className="freight-shipping-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn freight-shipping-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="freight-shipping-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 freight-shipping-case-study-image-col">
                <div className="freight-shipping-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Freight & Shipping Project" 
                    className="freight-shipping-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="freight-shipping-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="freight-shipping-case-study-section">
              <h2 className="freight-shipping-case-study-section-heading mb-5">
                Project{" "}
                <span className="freight-shipping-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="freight-shipping-case-study-underline-img" />
                </span>
              </h2>
              <p className="freight-shipping-case-study-section-paragraph">
              The Freight & Shipping Web Platform is a fully responsive and modern website designed for an international ocean freight and logistics provider. The system highlights global cargo solutions, service categories, shipment tracking options, and essential logistics information through a clean, professional, and highly intuitive interface.
              </p>
              <p className="freight-shipping-case-study-section-paragraph">
              Built to support both enterprise clients and global traders, the platform simplifies how users explore freight services, request quotes, and access shipment-related information — all in a visually organized and efficient manner. It elevates the company’s digital presence and enhances customer trust through a world-class user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="freight-shipping-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="freight-shipping-case-study-outcomes-wrapper">
              <h2 className="freight-shipping-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="freight-shipping-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="freight-shipping-case-study-underline-img" />
                </span>
              </h2>

              <p className="freight-shipping-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row freight-shipping-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="freight-shipping-case-study-outcome-card">
                    <div className="freight-shipping-case-study-outcome-number">{counts.projects}%</div>
                    <div className="freight-shipping-case-study-outcome-label">increase in service inquiries and quote requests</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="freight-shipping-case-study-outcome-card">
                    <div className="freight-shipping-case-study-outcome-number">{counts.success}%</div>
                    <div className="freight-shipping-case-study-outcome-label">faster browsing and page load performance</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="freight-shipping-case-study-outcome-card">
                    <div className="freight-shipping-case-study-outcome-number">{counts.years}%</div>
                    <div className="freight-shipping-case-study-outcome-label">responsive performance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="freight-shipping-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="freight-shipping-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="freight-shipping-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row freight-shipping-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="freight-shipping-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="freight-shipping-case-study-challenges-text-wrapper">
                  <h3 className="freight-shipping-case-study-challenges-heading">Challenges</h3>
                  <ul className="freight-shipping-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Users struggled to understand service categories, routes, and freight options due to unclear structure.
                    </li>
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      A lack of modern branding and visuals made the services appear less professional than competitors.
                    </li>
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Important details like tariffs, shipping routes, transit times, and service types were buried or missing.
                    </li>
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Slow loading and inconsistencies in responsiveness caused users to leave the website early.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="freight-shipping-case-study-solutions-text-wrapper">
                  <h3 className="freight-shipping-case-study-solutions-heading">Solutions</h3>
                  <ul className="freight-shipping-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Clean, Enterprise-Grade UI/UX- Professional global freight aesthetic, Powerful visuals of cargo operations, Clear hierarchy for all service categories
                    </li>
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Service-Centric Navigation- Ocean freight services, Cargo solutions, Container details, Routes & transit timelines, Documentation and compliance
                    </li>
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Quote Request Optimization- Simple form, Better information prompts, Faster submissions, Improved conversion rate
                    </li>
                    <li className={bulletPointsVisible ? "freight-shipping-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Responsive, Mobile-Friendly Structure- Perfectly optimized for tablets, mobile devices, and large screens, Faster load speeds for global users
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="freight-shipping-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="freight-shipping-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="freight-shipping-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="freight-shipping-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="freight-shipping-case-study-tools-wrapper">
              <h2 className="freight-shipping-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="freight-shipping-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="freight-shipping-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="freight-shipping-case-study-tools-grid">
                {/* Top Row */}
                <div className="freight-shipping-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="freight-shipping-case-study-tool-logo" />
                  <p className="freight-shipping-case-study-tool-name">Figma</p>
                </div>
                <div className="freight-shipping-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="freight-shipping-case-study-tool-logo" />
                  <p className="freight-shipping-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="freight-shipping-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="freight-shipping-case-study-tool-logo" />
                  <p className="freight-shipping-case-study-tool-name">Sketch</p>
                </div>
                <div className="freight-shipping-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="freight-shipping-case-study-tool-logo" />
                  <p className="freight-shipping-case-study-tool-name">Framer</p>
                </div>
                <div className="freight-shipping-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="freight-shipping-case-study-tool-logo" />
                  <p className="freight-shipping-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="freight-shipping-case-study-tool-item freight-shipping-case-study-tool-empty"></div>
                <div className="freight-shipping-case-study-tool-item freight-shipping-case-study-tool-empty"></div>
                <div className="freight-shipping-case-study-tool-item freight-shipping-case-study-tool-empty"></div>
                <div className="freight-shipping-case-study-tool-item freight-shipping-case-study-tool-empty"></div>
                <div className="freight-shipping-case-study-tool-item freight-shipping-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Best Projects Section */}
        <div className="freight-shipping-case-study-best-projects-section py-7">
          <div className="container">
            <div className="freight-shipping-case-study-best-projects-wrapper">
              {/* Project 1: HR Portal */}
              <div className="freight-shipping-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectSeven}
                      alt="Modern HR Portal for Employee Benefits - Web Development"
                      className="freight-shipping-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 freight-shipping-case-study-best-project-content-col">
                    <div className="freight-shipping-case-study-best-project-content">
                      <h3 className="freight-shipping-case-study-best-project-title">
                        Modern HR Portal for Employee Benefits - Web Development
                      </h3>
                      <p className="freight-shipping-case-study-best-project-desc">
                        A modern, responsive web platform developed to simplify employee benefits, claims, and HR administration. The website includes a clean dashboard for employees to view benefits, submit claims, track approvals, and access important HR resources with ease.
                      </p>
                      <div className="freight-shipping-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="freight-shipping-case-study-best-project-tag-badge">Mobile</span>
                        <span className="freight-shipping-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn freight-shipping-case-study-read-case-study-btn freight-shipping-case-study-project-btn"
                      onClick={() => navigate("/hr-portal-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="freight-shipping-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: EdTech */}
              <div className="freight-shipping-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectNine}
                      alt="Modern EdTech Website for Online Courses"
                      className="freight-shipping-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 freight-shipping-case-study-best-project-content-col">
                    <div className="freight-shipping-case-study-best-project-content">
                      <h3 className="freight-shipping-case-study-best-project-title">
                        Modern EdTech Website for Online Courses
                      </h3>
                      <p className="freight-shipping-case-study-best-project-desc">
                        A modern web platform developed for an online learning experience, featuring smooth navigation, structured course pages, and a clean, welcoming interface. The website is built with fast performance, mobile responsiveness, and a user-friendly flow to make online education simple and engaging.
                      </p>
                      <div className="freight-shipping-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="freight-shipping-case-study-best-project-tag-badge">Mobile</span>
                        <span className="freight-shipping-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn freight-shipping-case-study-read-case-study-btn freight-shipping-case-study-project-btn"
                      onClick={() => navigate("/edtech-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="freight-shipping-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="freight-shipping-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FreightShippingCaseStudy;

