import React, { useState, useEffect, useRef } from "react";
import "./MakhanaStoreCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-eight.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light8.png";
import light2Image from "../Images/Order WC 2.png";
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

const MakhanaStoreCaseStudy = () => {
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
  const targetValues = { projects: 38, success: 99, years: 19 };

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
        title="Makhana Store Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/makhana-store-case-study"
      />
      <div className="makhana-store-case-study-page">
        <div className="makhana-store-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="makhana-store-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch makhana-store-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 makhana-store-case-study-content-col">
                <div className="makhana-store-case-study-content-wrapper">
                  <h1 className="makhana-store-case-study-hero-title">
                    Organic Makhana Store – Responsive E-Commerce Platform
                  </h1>
                  <p className="makhana-store-case-study-hero-description">
                    A clean and responsive e-commerce website designed for a premium makhana brand. The platform showcases multiple product categories with high-quality visuals, clear structure, and an effortless shopping experience. Built with a mobile-first layout, smooth navigation, and optimised product pages, it enhances customer trust and supports strong conversion flow.
                  </p>
                  
                  {/* Tags */}
                  <div className="makhana-store-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="makhana-store-case-study-tag-badge">Mobile</span>
                    <span className="makhana-store-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn makhana-store-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="makhana-store-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 makhana-store-case-study-image-col">
                <div className="makhana-store-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Makhana Store Project" 
                    className="makhana-store-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="makhana-store-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="makhana-store-case-study-section">
              <h2 className="makhana-store-case-study-section-heading mb-5">
                Project{" "}
                <span className="makhana-store-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="makhana-store-case-study-underline-img" />
                </span>
              </h2>
              <p className="makhana-store-case-study-section-paragraph">
              The Organic Makhana Store is a clean, responsive, and modern e-commerce platform built for a premium packaged food brand. The website highlights multiple product categories with high-quality visuals, clear product details, and a smooth, user-friendly shopping flow.
              </p>
              <p className="makhana-store-case-study-section-paragraph">
              Designed with a mobile-first approach, the platform ensures fast browsing, intuitive navigation, and optimized product pages that build customer trust and support higher conversions. The system handles the complete store experience — from product exploration to checkout — making it simple for customers to discover and purchase organic makhana products seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="makhana-store-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="makhana-store-case-study-outcomes-wrapper">
              <h2 className="makhana-store-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="makhana-store-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="makhana-store-case-study-underline-img" />
                </span>
              </h2>

              <p className="makhana-store-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row makhana-store-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="makhana-store-case-study-outcome-card">
                    <div className="makhana-store-case-study-outcome-number">{counts.projects}%</div>
                    <div className="makhana-store-case-study-outcome-label">increase in product discovery across categories</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="makhana-store-case-study-outcome-card">
                    <div className="makhana-store-case-study-outcome-number">{counts.success}%</div>
                    <div className="makhana-store-case-study-outcome-label">responsive compatibility across all devices</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="makhana-store-case-study-outcome-card">
                    <div className="makhana-store-case-study-outcome-number">{counts.years}%</div>
                    <div className="makhana-store-case-study-outcome-label">increase in checkout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="makhana-store-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="makhana-store-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="makhana-store-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row makhana-store-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="makhana-store-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="makhana-store-case-study-challenges-text-wrapper">
                  <h3 className="makhana-store-case-study-challenges-heading">Challenges</h3>
                  <ul className="makhana-store-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating a visually appealing platform that reflects the premium and organic nature of the makhana products.
                    </li>
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Ensuring the website performs well on mobile devices since a significant portion of customers shop on smartphones.
                    </li>
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Organizing multiple product categories and variants in a way that's easy to navigate and understand.
                    </li>
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Building trust and credibility through clear product information, secure checkout, and professional design.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="makhana-store-case-study-solutions-text-wrapper">
                  <h3 className="makhana-store-case-study-solutions-heading">Solutions</h3>
                  <ul className="makhana-store-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Designed a clean, modern interface with high-quality product imagery and elegant typography that conveys premium quality.
                    </li>
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Implemented a mobile-first responsive design that ensures optimal viewing and shopping experience across all devices.
                    </li>
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Created an intuitive category structure with clear navigation and filtering options to help customers find products quickly.
                    </li>
                    <li className={bulletPointsVisible ? "makhana-store-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Integrated secure payment gateways, detailed product descriptions, and trust badges to enhance customer confidence and conversion rates.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="makhana-store-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="makhana-store-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="makhana-store-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="makhana-store-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="makhana-store-case-study-tools-wrapper">
              <h2 className="makhana-store-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="makhana-store-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="makhana-store-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="makhana-store-case-study-tools-grid">
                {/* Top Row */}
                <div className="makhana-store-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="makhana-store-case-study-tool-logo" />
                  <p className="makhana-store-case-study-tool-name">Figma</p>
                </div>
                <div className="makhana-store-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="makhana-store-case-study-tool-logo" />
                  <p className="makhana-store-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="makhana-store-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="makhana-store-case-study-tool-logo" />
                  <p className="makhana-store-case-study-tool-name">Sketch</p>
                </div>
                <div className="makhana-store-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="makhana-store-case-study-tool-logo" />
                  <p className="makhana-store-case-study-tool-name">Framer</p>
                </div>
                <div className="makhana-store-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="makhana-store-case-study-tool-logo" />
                  <p className="makhana-store-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="makhana-store-case-study-tool-item makhana-store-case-study-tool-empty"></div>
                <div className="makhana-store-case-study-tool-item makhana-store-case-study-tool-empty"></div>
                <div className="makhana-store-case-study-tool-item makhana-store-case-study-tool-empty"></div>
                <div className="makhana-store-case-study-tool-item makhana-store-case-study-tool-empty"></div>
                <div className="makhana-store-case-study-tool-item makhana-store-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="makhana-store-case-study-component5-section py-7">
          <div className="container">
            <div className="row makhana-store-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="makhana-store-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="makhana-store-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="makhana-store-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MakhanaStoreCaseStudy;

