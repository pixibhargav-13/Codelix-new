import React, { useState, useEffect, useRef } from "react";
import "./EdTechCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-nine.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light14.png";
import light2Image from "../Images/Light15.png";
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

const EdTechCaseStudy = () => {
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
  const targetValues = { projects: 41, success: 34, years: 98 };

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
        title="EdTech Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/edtech-case-study"
      />
      <div className="edtech-case-study-page">
        <div className="edtech-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="edtech-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch edtech-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 edtech-case-study-content-col">
                <div className="edtech-case-study-content-wrapper">
                  <h1 className="edtech-case-study-hero-title">
                    Modern EdTech Website for Online Courses
                  </h1>
                  <p className="edtech-case-study-hero-description">
                    A modern web platform developed for an online learning experience, featuring smooth navigation, structured course pages, and a clean, welcoming interface. The website is built with fast performance, mobile responsiveness, and a user-friendly flow to make online education simple and engaging.
                  </p>
                  
                  {/* Tags */}
                  <div className="edtech-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="edtech-case-study-tag-badge">Mobile</span>
                    <span className="edtech-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn edtech-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="edtech-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 edtech-case-study-image-col">
                <div className="edtech-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="EdTech Project" 
                    className="edtech-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="edtech-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="edtech-case-study-section">
              <h2 className="edtech-case-study-section-heading mb-5">
                Project{" "}
                <span className="edtech-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="edtech-case-study-underline-img" />
                </span>
              </h2>
              <p className="edtech-case-study-section-paragraph">
              The Modern EdTech Website for Online Courses is a responsive, user-friendly platform built to support structured online learning. Designed for educators, institutes, and independent creators, the system allows users to explore courses, view lesson structures, engage with educational content, and seamlessly navigate between modules.
              </p>
              <p className="edtech-case-study-section-paragraph">
              The website focuses on performance, clean design, intuitive course browsing, and a smooth user journey — making learning feel simple, engaging, and accessible across all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="edtech-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="edtech-case-study-outcomes-wrapper">
              <h2 className="edtech-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="edtech-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="edtech-case-study-underline-img" />
                </span>
              </h2>

              <p className="edtech-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row edtech-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="edtech-case-study-outcome-card">
                    <div className="edtech-case-study-outcome-number">{counts.projects}%</div>
                    <div className="edtech-case-study-outcome-label">increase in course enquiries and sign-ups</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="edtech-case-study-outcome-card">
                    <div className="edtech-case-study-outcome-number">{counts.success}%</div>
                    <div className="edtech-case-study-outcome-label">improvement in user retention through faster page</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="edtech-case-study-outcome-card">
                    <div className="edtech-case-study-outcome-number">{counts.years}%</div>
                    <div className="edtech-case-study-outcome-label">mobile responsiveness score across devices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="edtech-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="edtech-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="edtech-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row edtech-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="edtech-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="edtech-case-study-challenges-text-wrapper">
                  <h3 className="edtech-case-study-challenges-heading">Challenges</h3>
                  <ul className="edtech-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating an engaging and intuitive platform that makes online learning accessible and enjoyable for students.
                    </li>
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Organizing multiple courses and learning materials in a way that's easy to navigate and discover.
                    </li>
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Ensuring fast page load times and smooth performance, especially when handling video content and course materials.
                    </li>
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Building a responsive design that works seamlessly across all devices for learners accessing courses on various platforms.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="edtech-case-study-solutions-text-wrapper">
                  <h3 className="edtech-case-study-solutions-heading">Solutions</h3>
                  <ul className="edtech-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Designed a clean, welcoming interface with clear course categorization and intuitive navigation to enhance the learning experience.
                    </li>
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Implemented a structured course organization system with search and filtering capabilities to help students find relevant courses easily.
                    </li>
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Optimized performance with efficient content loading, lazy loading techniques, and optimized media delivery for fast page speeds.
                    </li>
                    <li className={bulletPointsVisible ? "edtech-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Developed a fully responsive design that ensures optimal viewing and interaction on desktop, tablet, and mobile devices.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="edtech-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="edtech-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="edtech-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="edtech-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="edtech-case-study-tools-wrapper">
              <h2 className="edtech-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="edtech-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="edtech-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="edtech-case-study-tools-grid">
                {/* Top Row */}
                <div className="edtech-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="edtech-case-study-tool-logo" />
                  <p className="edtech-case-study-tool-name">Figma</p>
                </div>
                <div className="edtech-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="edtech-case-study-tool-logo" />
                  <p className="edtech-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="edtech-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="edtech-case-study-tool-logo" />
                  <p className="edtech-case-study-tool-name">Sketch</p>
                </div>
                <div className="edtech-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="edtech-case-study-tool-logo" />
                  <p className="edtech-case-study-tool-name">Framer</p>
                </div>
                <div className="edtech-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="edtech-case-study-tool-logo" />
                  <p className="edtech-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="edtech-case-study-tool-item edtech-case-study-tool-empty"></div>
                <div className="edtech-case-study-tool-item edtech-case-study-tool-empty"></div>
                <div className="edtech-case-study-tool-item edtech-case-study-tool-empty"></div>
                <div className="edtech-case-study-tool-item edtech-case-study-tool-empty"></div>
                <div className="edtech-case-study-tool-item edtech-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="edtech-case-study-component5-section py-7">
          <div className="container">
            <div className="row edtech-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="edtech-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="edtech-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="edtech-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EdTechCaseStudy;

