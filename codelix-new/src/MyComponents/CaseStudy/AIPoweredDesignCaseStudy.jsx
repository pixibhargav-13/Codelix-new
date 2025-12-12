import React, { useState, useEffect, useRef } from "react";
import "./AIPoweredDesignCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-twelve.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light20.png";
import light2Image from "../Images/Light21.png";
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

const AIPoweredDesignCaseStudy = () => {
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
  const targetValues = { projects: 52, success: 40, years: 35 };

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
        title="AI-Powered Design Platform Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/ai-powered-design-case-study"
      />
      <div className="ai-powered-design-case-study-page">
        <div className="ai-powered-design-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="ai-powered-design-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch ai-powered-design-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 ai-powered-design-case-study-content-col">
                <div className="ai-powered-design-case-study-content-wrapper">
                  <h1 className="ai-powered-design-case-study-hero-title">
                    AI-Powered Design Platform – UI/UX Concept
                  </h1>
                  <p className="ai-powered-design-case-study-hero-description">
                    This project showcases a futuristic UI/UX concept created for an AI-powered design platform. The interface focuses on bold visuals, modern gradients, and a clean layout that highlights the platform's innovative features. The goal was to craft an immersive user experience centered around simplicity, intuitive navigation, and high visual impact. Every section—from the hero banner to the feature highlights—is designed to communicate advanced technology while staying user-friendly and accessible.
                  </p>
                  
                  {/* Tags */}
                  <div className="ai-powered-design-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="ai-powered-design-case-study-tag-badge">Mobile</span>
                    <span className="ai-powered-design-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn ai-powered-design-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="ai-powered-design-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 ai-powered-design-case-study-image-col">
                <div className="ai-powered-design-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="AI-Powered Design Platform Project" 
                    className="ai-powered-design-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-powered-design-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="ai-powered-design-case-study-section">
              <h2 className="ai-powered-design-case-study-section-heading mb-5">
                Project{" "}
                <span className="ai-powered-design-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="ai-powered-design-case-study-underline-img" />
                </span>
              </h2>
              <p className="ai-powered-design-case-study-section-paragraph">
              The AI-Powered Design Platform showcases a futuristic UI/UX concept built to demonstrate the possibilities of AI-assisted creative workflows. The interface blends bold visuals, modern gradients, soft lighting, and clean layout structures to highlight the platform’s advanced features, including AI-driven automation, smart recommendations, and interactive design tools.
              </p>
              <p className="ai-powered-design-case-study-section-paragraph">
              The goal was to craft an immersive user experience centered around simplicity, intuitive navigation, and visual impact. Each section — from the hero module to the feature screens — is designed to communicate innovation while ensuring the interface remains accessible, user-friendly, and aligned with modern design trends.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="ai-powered-design-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="ai-powered-design-case-study-outcomes-wrapper">
              <h2 className="ai-powered-design-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="ai-powered-design-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="ai-powered-design-case-study-underline-img" />
                </span>
              </h2>

              <p className="ai-powered-design-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row ai-powered-design-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="ai-powered-design-case-study-outcome-card">
                    <div className="ai-powered-design-case-study-outcome-number">{counts.projects}%</div>
                    <div className="ai-powered-design-case-study-outcome-label">increase in concept engagement</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="ai-powered-design-case-study-outcome-card">
                    <div className="ai-powered-design-case-study-outcome-number">{counts.success}%</div>
                    <div className="ai-powered-design-case-study-outcome-label">improvement in usability</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="ai-powered-design-case-study-outcome-card">
                    <div className="ai-powered-design-case-study-outcome-number">{counts.years}%</div>
                    <div className="ai-powered-design-case-study-outcome-label">stronger visual impact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="ai-powered-design-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="ai-powered-design-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="ai-powered-design-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row ai-powered-design-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="ai-powered-design-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="ai-powered-design-case-study-challenges-text-wrapper">
                  <h3 className="ai-powered-design-case-study-challenges-heading">Challenges</h3>
                  <ul className="ai-powered-design-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating a futuristic design aesthetic that communicates advanced AI technology without feeling intimidating or overly complex.
                    </li>
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Balancing bold visual elements and modern gradients with clean layouts to maintain clarity and usability.
                    </li>
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Designing an interface that feels innovative and cutting-edge while remaining accessible and user-friendly.
                    </li>
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Ensuring the design effectively highlights platform features and capabilities while maintaining intuitive navigation.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="ai-powered-design-case-study-solutions-text-wrapper">
                  <h3 className="ai-powered-design-case-study-solutions-heading">Solutions</h3>
                  <ul className="ai-powered-design-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Developed a modern design language using strategic gradients, dynamic visual elements, and futuristic aesthetics that communicate innovation.
                    </li>
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Created clean, organized layouts with clear information hierarchy that balance bold visuals with functional design principles.
                    </li>
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Designed an intuitive navigation system and user flow that makes advanced features feel approachable and easy to understand.
                    </li>
                    <li className={bulletPointsVisible ? "ai-powered-design-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Implemented engaging visual storytelling through hero sections, feature highlights, and interactive elements that showcase platform capabilities effectively.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="ai-powered-design-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="ai-powered-design-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="ai-powered-design-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="ai-powered-design-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="ai-powered-design-case-study-tools-wrapper">
              <h2 className="ai-powered-design-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="ai-powered-design-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="ai-powered-design-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="ai-powered-design-case-study-tools-grid">
                {/* Top Row */}
                <div className="ai-powered-design-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="ai-powered-design-case-study-tool-logo" />
                  <p className="ai-powered-design-case-study-tool-name">Figma</p>
                </div>
                <div className="ai-powered-design-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="ai-powered-design-case-study-tool-logo" />
                  <p className="ai-powered-design-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="ai-powered-design-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="ai-powered-design-case-study-tool-logo" />
                  <p className="ai-powered-design-case-study-tool-name">Sketch</p>
                </div>
                <div className="ai-powered-design-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="ai-powered-design-case-study-tool-logo" />
                  <p className="ai-powered-design-case-study-tool-name">Framer</p>
                </div>
                <div className="ai-powered-design-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="ai-powered-design-case-study-tool-logo" />
                  <p className="ai-powered-design-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="ai-powered-design-case-study-tool-item ai-powered-design-case-study-tool-empty"></div>
                <div className="ai-powered-design-case-study-tool-item ai-powered-design-case-study-tool-empty"></div>
                <div className="ai-powered-design-case-study-tool-item ai-powered-design-case-study-tool-empty"></div>
                <div className="ai-powered-design-case-study-tool-item ai-powered-design-case-study-tool-empty"></div>
                <div className="ai-powered-design-case-study-tool-item ai-powered-design-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="ai-powered-design-case-study-component5-section py-7">
          <div className="container">
            <div className="row ai-powered-design-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="ai-powered-design-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="ai-powered-design-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="ai-powered-design-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AIPoweredDesignCaseStudy;

