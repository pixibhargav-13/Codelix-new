import React, { useState, useEffect, useRef } from "react";
import "./ElegantCreativeAgencyCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-eleven.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light16.png";
import light2Image from "../Images/Light17.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import projectSix from "../Images/work-best-project-six.png";
import projectTwelve from "../Images/work-best-project-twelve.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElegantCreativeAgencyCaseStudy = () => {
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
  const targetValues = { projects: 50, success: 36, years: 98 };

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
        title="Elegant Creative Agency Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/elegant-creative-agency-case-study"
      />
      <div className="elegant-creative-agency-case-study-page">
        <div className="elegant-creative-agency-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="elegant-creative-agency-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch elegant-creative-agency-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 elegant-creative-agency-case-study-content-col">
                <div className="elegant-creative-agency-case-study-content-wrapper">
                  <h1 className="elegant-creative-agency-case-study-hero-title">
                    Elegant Creative Agency Website – UI/UX Design
                  </h1>
                  <p className="elegant-creative-agency-case-study-hero-description">
                    A high-end UI/UX design created for a modern creative studio website. The interface uses dark-mode aesthetics, clean grids, and strong typography to showcase projects in a bold and visually engaging way. Designed to highlight creativity while keeping the experience smooth and intuitive across all devices.
                  </p>
                  
                  {/* Tags */}
                  <div className="elegant-creative-agency-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="elegant-creative-agency-case-study-tag-badge">Mobile</span>
                    <span className="elegant-creative-agency-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn elegant-creative-agency-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="elegant-creative-agency-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 elegant-creative-agency-case-study-image-col">
                <div className="elegant-creative-agency-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Elegant Creative Agency Project" 
                    className="elegant-creative-agency-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="elegant-creative-agency-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="elegant-creative-agency-case-study-section">
              <h2 className="elegant-creative-agency-case-study-section-heading mb-5">
                Project{" "}
                <span className="elegant-creative-agency-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="elegant-creative-agency-case-study-underline-img" />
                </span>
              </h2>
              <p className="elegant-creative-agency-case-study-section-paragraph">
              The Elegant Creative Agency Website is a high-end UI/UX design created for a modern digital studio looking to showcase its work with impact. The interface features dark-mode aesthetics, bold typography, clean grids, and immersive visuals to highlight creative projects in a visually compelling manner.
              </p>
              <p className="elegant-creative-agency-case-study-section-paragraph">
              The website is built to feel premium, intuitive, and highly interactive — giving visitors a smooth browsing experience while enhancing the agency’s brand identity. It balances artistic expression with functional clarity to ensure both inspiration and usability.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="elegant-creative-agency-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="elegant-creative-agency-case-study-outcomes-wrapper">
              <h2 className="elegant-creative-agency-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="elegant-creative-agency-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="elegant-creative-agency-case-study-underline-img" />
                </span>
              </h2>

              <p className="elegant-creative-agency-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row elegant-creative-agency-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="elegant-creative-agency-case-study-outcome-card">
                    <div className="elegant-creative-agency-case-study-outcome-number">{counts.projects}%</div>
                    <div className="elegant-creative-agency-case-study-outcome-label">increase in portfolio engagement and project views</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="elegant-creative-agency-case-study-outcome-card">
                    <div className="elegant-creative-agency-case-study-outcome-number">{counts.success}%</div>
                    <div className="elegant-creative-agency-case-study-outcome-label">faster page transitions and performance</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="elegant-creative-agency-case-study-outcome-card">
                    <div className="elegant-creative-agency-case-study-outcome-number">{counts.years}%</div>
                    <div className="elegant-creative-agency-case-study-outcome-label">mobile responsiveness score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="elegant-creative-agency-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="elegant-creative-agency-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="elegant-creative-agency-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row elegant-creative-agency-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="elegant-creative-agency-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="elegant-creative-agency-case-study-challenges-text-wrapper">
                  <h3 className="elegant-creative-agency-case-study-challenges-heading">Challenges</h3>
                  <ul className="elegant-creative-agency-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      The previous layout lacked personality, failing to reflect the studio's design capabilities.
                    </li>
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Portfolio pieces weren't displayed in a visually engaging or structured way.
                    </li>
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Earlier versions attempted dark themes but lacked contrast and readability.
                    </li>
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Users had difficulty understanding services, categories, and project types.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="elegant-creative-agency-case-study-solutions-text-wrapper">
                  <h3 className="elegant-creative-agency-case-study-solutions-heading">Solutions</h3>
                  <ul className="elegant-creative-agency-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Dark-Mode Visual Identity- Elegant, high-contrast dark theme, Strong, expressive typography, Premium visual style for artistic impact
                    </li>
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Modern Portfolio Showcase- Grid-based project layouts, Smooth animations, Large imagery for deep visual storytelling
                    </li>
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Clear, Minimal Navigation- Service categories organized logically, Faster access to projects and contact forms, Reduced visual clutter
                    </li>
                    <li className={bulletPointsVisible ? "elegant-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Mobile-Optimized Creative Experience- Responsive grids, Smooth animations on mobile, Tablet-friendly layouts for presentations
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="elegant-creative-agency-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="elegant-creative-agency-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="elegant-creative-agency-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="elegant-creative-agency-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="elegant-creative-agency-case-study-tools-wrapper">
              <h2 className="elegant-creative-agency-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="elegant-creative-agency-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="elegant-creative-agency-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="elegant-creative-agency-case-study-tools-grid">
                {/* Top Row */}
                <div className="elegant-creative-agency-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="elegant-creative-agency-case-study-tool-logo" />
                  <p className="elegant-creative-agency-case-study-tool-name">Figma</p>
                </div>
                <div className="elegant-creative-agency-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="elegant-creative-agency-case-study-tool-logo" />
                  <p className="elegant-creative-agency-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="elegant-creative-agency-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="elegant-creative-agency-case-study-tool-logo" />
                  <p className="elegant-creative-agency-case-study-tool-name">Sketch</p>
                </div>
                <div className="elegant-creative-agency-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="elegant-creative-agency-case-study-tool-logo" />
                  <p className="elegant-creative-agency-case-study-tool-name">Framer</p>
                </div>
                <div className="elegant-creative-agency-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="elegant-creative-agency-case-study-tool-logo" />
                  <p className="elegant-creative-agency-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="elegant-creative-agency-case-study-tool-item elegant-creative-agency-case-study-tool-empty"></div>
                <div className="elegant-creative-agency-case-study-tool-item elegant-creative-agency-case-study-tool-empty"></div>
                <div className="elegant-creative-agency-case-study-tool-item elegant-creative-agency-case-study-tool-empty"></div>
                <div className="elegant-creative-agency-case-study-tool-item elegant-creative-agency-case-study-tool-empty"></div>
                <div className="elegant-creative-agency-case-study-tool-item elegant-creative-agency-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Best Projects Section */}
        <div className="elegant-creative-agency-case-study-best-projects-section py-7">
          <div className="container">
            <div className="elegant-creative-agency-case-study-best-projects-wrapper">
              {/* Project 1: Modern Creative Agency */}
              <div className="elegant-creative-agency-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectSix}
                      alt="Modern Website UI/UX Design for a Creative Agency"
                      className="elegant-creative-agency-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 elegant-creative-agency-case-study-best-project-content-col">
                    <div className="elegant-creative-agency-case-study-best-project-content">
                      <h3 className="elegant-creative-agency-case-study-best-project-title">
                        Modern Website UI/UX Design for a Creative Agency
                      </h3>
                      <p className="elegant-creative-agency-case-study-best-project-desc">
                        This project showcases the complete UI/UX design for a modern creative agency website. The design focuses on a bold visual identity, clean layout structures, and a smooth user journey across all pages.
                      </p>
                      <div className="elegant-creative-agency-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="elegant-creative-agency-case-study-best-project-tag-badge">Mobile</span>
                        <span className="elegant-creative-agency-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn elegant-creative-agency-case-study-read-case-study-btn elegant-creative-agency-case-study-project-btn"
                      onClick={() => navigate("/modern-creative-agency-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="elegant-creative-agency-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: AI Powered Design */}
              <div className="elegant-creative-agency-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectTwelve}
                      alt="AI-Powered Design Platform – UI/UX Concept"
                      className="elegant-creative-agency-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 elegant-creative-agency-case-study-best-project-content-col">
                    <div className="elegant-creative-agency-case-study-best-project-content">
                      <h3 className="elegant-creative-agency-case-study-best-project-title">
                        AI-Powered Design Platform – UI/UX Concept
                      </h3>
                      <p className="elegant-creative-agency-case-study-best-project-desc">
                        This project showcases a futuristic UI/UX concept created for an AI-powered design platform. The interface focuses on bold visuals, modern gradients, and a clean layout that highlights the platform's innovative features.
                      </p>
                      <div className="elegant-creative-agency-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="elegant-creative-agency-case-study-best-project-tag-badge">Mobile</span>
                        <span className="elegant-creative-agency-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn elegant-creative-agency-case-study-read-case-study-btn elegant-creative-agency-case-study-project-btn"
                      onClick={() => navigate("/ai-powered-design-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="elegant-creative-agency-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="elegant-creative-agency-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ElegantCreativeAgencyCaseStudy;

