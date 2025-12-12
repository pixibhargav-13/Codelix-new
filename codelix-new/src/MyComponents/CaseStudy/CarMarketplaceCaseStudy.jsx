import React, { useState, useEffect, useRef } from "react";
import "./CarMarketplaceCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-four.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light23.png";
import light2Image from "../Images/IMAGE GOES HERE2.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import component5Image from "../Images/Component 5.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CarMarketplaceCaseStudy = () => {
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
  const targetValues = { projects: 55, success: 38, years: 30 };

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
        title="Car Marketplace Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/car-marketplace-case-study"
      />
      <div className="car-marketplace-case-study-page">
        <div className="car-marketplace-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="car-marketplace-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch car-marketplace-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 car-marketplace-case-study-content-col">
                <div className="car-marketplace-case-study-content-wrapper">
                  <h1 className="car-marketplace-case-study-hero-title">
                    A Feature-Rich Mobile Marketplace for Buying & Selling Cars
                  </h1>
                  <p className="car-marketplace-case-study-hero-description">
                    A user-friendly automotive mobile application designed to make the car buying and selling process simple, transparent, and efficient. The platform allows users to browse a wide range of vehicles with detailed specifications, list their own cars for sale in just a few steps, and compare different options side-by-side to make confident decisions. With secure flows, smart search filters, real-time updates, and an intuitive interface, the app streamlines the entire journey, from discovery to final transaction, making it effortless for buyers, sellers, and dealers alike.
                  </p>
                  
                  {/* Tags */}
                  <div className="car-marketplace-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="car-marketplace-case-study-tag-badge">Android</span>
                    <span className="car-marketplace-case-study-tag-badge">iOS</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn car-marketplace-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="car-marketplace-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 car-marketplace-case-study-image-col">
                <div className="car-marketplace-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Car Marketplace Project" 
                    className="car-marketplace-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="car-marketplace-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="car-marketplace-case-study-section">
              <h2 className="car-marketplace-case-study-section-heading mb-5">
                Project{" "}
                <span className="car-marketplace-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="car-marketplace-case-study-underline-img" />
                </span>
              </h2>
              <p className="car-marketplace-case-study-section-paragraph">
              This mobile marketplace application is designed to make the process of buying and selling cars simple, transparent, and efficient for users and dealers. The app enables users to browse a wide range of vehicles with detailed specifications, compare options side-by-side, shortlist favorites, and list their own cars for sale in just a few easy steps.
              </p>
              <p className="car-marketplace-case-study-section-paragraph">
              With secure flows, advanced search filters, real-time updates, price insights, and an intuitive mobile-first interface, the platform streamlines the entire journey—from initial discovery to final transaction. It provides a seamless experience for buyers, sellers, and dealerships, making vehicle trading accessible and hassle-free.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="car-marketplace-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="car-marketplace-case-study-outcomes-wrapper">
              <h2 className="car-marketplace-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="car-marketplace-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="car-marketplace-case-study-underline-img" />
                </span>
              </h2>

              <p className="car-marketplace-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row car-marketplace-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="car-marketplace-case-study-outcome-card">
                    <div className="car-marketplace-case-study-outcome-number">{counts.projects}%</div>
                    <div className="car-marketplace-case-study-outcome-label">increase in user engagement</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="car-marketplace-case-study-outcome-card">
                    <div className="car-marketplace-case-study-outcome-number">{counts.success}%</div>
                    <div className="car-marketplace-case-study-outcome-label">faster search and browsing experience</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="car-marketplace-case-study-outcome-card">
                    <div className="car-marketplace-case-study-outcome-number">{counts.years}%</div>
                    <div className="car-marketplace-case-study-outcome-label">growth in seller listings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="car-marketplace-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="car-marketplace-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="car-marketplace-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row car-marketplace-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="car-marketplace-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="car-marketplace-case-study-challenges-text-wrapper">
                  <h3 className="car-marketplace-case-study-challenges-heading">Challenges</h3>
                  <ul className="car-marketplace-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating a user-friendly interface that simplifies the complex process of buying and selling cars.
                    </li>
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Implementing smart search filters and comparison features that help users find the right vehicle quickly.
                    </li>
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Ensuring secure transaction flows and building trust between buyers, sellers, and dealers.
                    </li>
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Designing an intuitive listing process that makes it easy for sellers to post their vehicles with all necessary details.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="car-marketplace-case-study-solutions-text-wrapper">
                  <h3 className="car-marketplace-case-study-solutions-heading">Solutions</h3>
                  <ul className="car-marketplace-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Designed an intuitive interface with clear navigation and organized sections that guide users through the buying and selling process effortlessly.
                    </li>
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Implemented advanced search filters, comparison tools, and detailed vehicle specifications to help users make informed decisions.
                    </li>
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Integrated secure payment processing, verification systems, and transparent communication channels to build trust and ensure safe transactions.
                    </li>
                    <li className={bulletPointsVisible ? "car-marketplace-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Created a streamlined listing workflow with step-by-step guidance, photo uploads, and comprehensive vehicle information forms.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="car-marketplace-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="car-marketplace-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="car-marketplace-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="car-marketplace-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="car-marketplace-case-study-tools-wrapper">
              <h2 className="car-marketplace-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="car-marketplace-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="car-marketplace-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="car-marketplace-case-study-tools-grid">
                {/* Top Row */}
                <div className="car-marketplace-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="car-marketplace-case-study-tool-logo" />
                  <p className="car-marketplace-case-study-tool-name">Figma</p>
                </div>
                <div className="car-marketplace-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="car-marketplace-case-study-tool-logo" />
                  <p className="car-marketplace-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="car-marketplace-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="car-marketplace-case-study-tool-logo" />
                  <p className="car-marketplace-case-study-tool-name">Sketch</p>
                </div>
                <div className="car-marketplace-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="car-marketplace-case-study-tool-logo" />
                  <p className="car-marketplace-case-study-tool-name">Framer</p>
                </div>
                <div className="car-marketplace-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="car-marketplace-case-study-tool-logo" />
                  <p className="car-marketplace-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="car-marketplace-case-study-tool-item car-marketplace-case-study-tool-empty"></div>
                <div className="car-marketplace-case-study-tool-item car-marketplace-case-study-tool-empty"></div>
                <div className="car-marketplace-case-study-tool-item car-marketplace-case-study-tool-empty"></div>
                <div className="car-marketplace-case-study-tool-item car-marketplace-case-study-tool-empty"></div>
                <div className="car-marketplace-case-study-tool-item car-marketplace-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="car-marketplace-case-study-component5-section py-7">
          <div className="container">
            <div className="row car-marketplace-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="car-marketplace-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="car-marketplace-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="car-marketplace-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CarMarketplaceCaseStudy;

