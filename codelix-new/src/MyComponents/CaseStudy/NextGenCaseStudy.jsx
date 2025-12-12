import React, { useState, useEffect, useRef } from "react";
import "./NextGenCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-one.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light.png";
import light2Image from "../Images/Light7.png";
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

const NextGenCaseStudy = () => {
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
  const targetValues = { projects: 42, success: 29, years: 20 };

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
        title="NextGen Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/nextgen-case-study"
      />
      <div className="nextgen-case-study-page">
        <div className="nextgen-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="nextgen-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch nextgen-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 nextgen-case-study-content-col">
                <div className="nextgen-case-study-content-wrapper">
                  <h1 className="nextgen-case-study-hero-title">
                    NextGen – Modern Fashion E-Commerce Website
                  </h1>
                  <p className="nextgen-case-study-hero-description">
                    A modern and fully responsive e-commerce website built for a fashion and lifestyle brand offering clothing, eyewear, and accessories. This platform features a clean user interface, intuitive navigation, and a seamless shopping experience designed to maximize user engagement and conversions.
                  </p>
                  
                  {/* Tags */}
                  <div className="nextgen-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="nextgen-case-study-tag-badge">Mobile</span>
                    <span className="nextgen-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn nextgen-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="nextgen-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 nextgen-case-study-image-col">
                <div className="nextgen-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="NextGen Project" 
                    className="nextgen-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nextgen-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="nextgen-case-study-section">
              <h2 className="nextgen-case-study-section-heading mb-5">
                Project{" "}
                <span className="nextgen-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="nextgen-case-study-underline-img" />
                </span>
              </h2>
              <p className="nextgen-case-study-section-paragraph">
               The NextGen Fashion E-Commerce Website is a modern, fully responsive online storefront created for a lifestyle brand selling clothing, eyewear, and accessories. The platform delivers a clean and elegant interface with intuitive navigation, ensuring that users can browse categories, explore product details, and complete purchases effortlessly.
              </p>
              <p className="nextgen-case-study-section-paragraph">
                With a strong focus on conversion optimization, the website includes smooth transitions, fast load speeds, and visually appealing product layouts that highlight the brand’s unique style. Built for both mobile and web users, the platform ensures a seamless shopping experience across all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="nextgen-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="nextgen-case-study-outcomes-wrapper">
              <h2 className="nextgen-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="nextgen-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="nextgen-case-study-underline-img" />
                </span>
              </h2>

              <p className="nextgen-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row nextgen-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="nextgen-case-study-outcome-card">
                    <div className="nextgen-case-study-outcome-number">{counts.projects}%</div>
                    <div className="nextgen-case-study-outcome-label"> increase in product views</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="nextgen-case-study-outcome-card">
                    <div className="nextgen-case-study-outcome-number">{counts.success}%</div>
                    <div className="nextgen-case-study-outcome-label">faster average browsing speed</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="nextgen-case-study-outcome-card">
                    <div className="nextgen-case-study-outcome-number">{counts.years}%</div>
                    <div className="nextgen-case-study-outcome-label">improvement in checkout completion rates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="nextgen-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="nextgen-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="nextgen-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row nextgen-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="nextgen-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="nextgen-case-study-challenges-text-wrapper">
                  <h3 className="nextgen-case-study-challenges-heading">Challenges</h3>
                  <ul className="nextgen-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating an engaging online shopping experience that reflects the brand's modern fashion identity.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Ensuring the website performs seamlessly across all devices, especially mobile, where most fashion shoppers browse.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Organizing multiple product categories (clothing, eyewear, accessories) in an intuitive way that encourages exploration.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Building trust and maximizing conversions through clear product presentation, secure checkout, and smooth user flow.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text (just after Challenges Image) */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="nextgen-case-study-solutions-text-wrapper">
                  <h3 className="nextgen-case-study-solutions-heading">Solutions</h3>
                  <ul className="nextgen-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Designed a clean, modern interface with high-quality product imagery and elegant layouts that showcase fashion items beautifully.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Implemented a fully responsive design that ensures optimal viewing and shopping experience on desktop, tablet, and mobile devices.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Created an intuitive navigation system with clear category organization and filtering options to help customers find products easily.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Integrated secure payment processing, detailed product pages, and streamlined checkout flow to enhance user trust and increase conversions.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="nextgen-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="nextgen-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="nextgen-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="nextgen-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="nextgen-case-study-tools-wrapper">
              <h2 className="nextgen-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="nextgen-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="nextgen-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="nextgen-case-study-tools-grid">
                {/* Top Row */}
                <div className="nextgen-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Figma</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Sketch</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Framer</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="nextgen-case-study-component5-section py-7">
          <div className="container">
            <div className="row nextgen-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="nextgen-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="nextgen-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="nextgen-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NextGenCaseStudy;

