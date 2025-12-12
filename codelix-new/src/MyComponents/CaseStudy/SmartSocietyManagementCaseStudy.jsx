import React, { useState, useEffect, useRef } from "react";
import "./SmartSocietyManagementCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-three.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light24.png";
import light2Image from "../Images/IMAGE GOES HERE3.png";
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

const SmartSocietyManagementCaseStudy = () => {
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
  const targetValues = { projects: 62, success: 40, years: 45 };

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
        title="Smart Society Management Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/smart-society-management-case-study"
      />
      <div className="smart-society-management-case-study-page">
        <div className="smart-society-management-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="smart-society-management-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch smart-society-management-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 smart-society-management-case-study-content-col">
                <div className="smart-society-management-case-study-content-wrapper">
                  <h1 className="smart-society-management-case-study-hero-title">
                    A Smart Society Management App for Modern Residential Communities
                  </h1>
                  <p className="smart-society-management-case-study-hero-description">
                    A comprehensive mobile and web application designed to streamline community management for modern residential societies. The platform enables residents to access essential services, manage maintenance requests, pay dues, communicate with neighbors, and stay updated with community announcements. Built to enhance resident experience and simplify administrative tasks for society management committees.
                  </p>
                  
                  {/* Tags */}
                  <div className="smart-society-management-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="smart-society-management-case-study-tag-badge">Mobile</span>
                    <span className="smart-society-management-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn smart-society-management-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="smart-society-management-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 smart-society-management-case-study-image-col">
                <div className="smart-society-management-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Smart Society Management Project" 
                    className="smart-society-management-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="smart-society-management-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="smart-society-management-case-study-section">
              <h2 className="smart-society-management-case-study-section-heading mb-5">
                Project{" "}
                <span className="smart-society-management-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="smart-society-management-case-study-underline-img" />
                </span>
              </h2>
              <p className="smart-society-management-case-study-section-paragraph">
              The Smart Society Management App is a fully functional mobile platform designed to digitize and simplify daily operations within residential communities. The app improves communication between residents and the management team, centralizes all key society services, and automates routine tasks such as maintenance requests, approvals, payments, visitor management, amenities booking, and community updates.
              Built with a clean, intuitive interface, the app helps societies operate more efficiently while giving residents a smoother, more transparent living experience. 
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="smart-society-management-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="smart-society-management-case-study-outcomes-wrapper">
              <h2 className="smart-society-management-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="smart-society-management-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="smart-society-management-case-study-underline-img" />
                </span>
              </h2>

              <p className="smart-society-management-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row smart-society-management-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="smart-society-management-case-study-outcome-card">
                    <div className="smart-society-management-case-study-outcome-number">{counts.projects}%</div>
                    <div className="smart-society-management-case-study-outcome-label">reduction in manual administrative work</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="smart-society-management-case-study-outcome-card">
                    <div className="smart-society-management-case-study-outcome-number">{counts.success}%</div>
                    <div className="smart-society-management-case-study-outcome-label">faster processing of maintenance requests </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="smart-society-management-case-study-outcome-card">
                    <div className="smart-society-management-case-study-outcome-number">{counts.years}%</div>
                    <div className="smart-society-management-case-study-outcome-label">decrease in communication gaps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="smart-society-management-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="smart-society-management-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="smart-society-management-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row smart-society-management-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="smart-society-management-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="smart-society-management-case-study-challenges-text-wrapper">
                  <h3 className="smart-society-management-case-study-challenges-heading">Challenges</h3>
                  <ul className="smart-society-management-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating a unified platform that serves diverse needs of residents, management committees, and service providers.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Implementing secure payment processing for maintenance dues and other community fees.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Building an efficient system for managing maintenance requests, complaints, and service tracking.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Ensuring effective communication channels between residents and management while maintaining privacy and security.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="smart-society-management-case-study-solutions-text-wrapper">
                  <h3 className="smart-society-management-case-study-solutions-heading">Solutions</h3>
                  <ul className="smart-society-management-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Designed role-based interfaces with personalized dashboards for residents, committee members, and administrators to access relevant features.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Integrated secure payment gateways with multiple payment options, automated reminders, and transparent billing systems.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Created a comprehensive request management system with status tracking, priority assignment, and automated notifications.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Implemented communication features including announcements, messaging, and community forums with privacy controls and moderation tools.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="smart-society-management-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="smart-society-management-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="smart-society-management-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="smart-society-management-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="smart-society-management-case-study-tools-wrapper">
              <h2 className="smart-society-management-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="smart-society-management-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="smart-society-management-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="smart-society-management-case-study-tools-grid">
                {/* Top Row */}
                <div className="smart-society-management-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="smart-society-management-case-study-tool-logo" />
                  <p className="smart-society-management-case-study-tool-name">Figma</p>
                </div>
                <div className="smart-society-management-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="smart-society-management-case-study-tool-logo" />
                  <p className="smart-society-management-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="smart-society-management-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="smart-society-management-case-study-tool-logo" />
                  <p className="smart-society-management-case-study-tool-name">Sketch</p>
                </div>
                <div className="smart-society-management-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="smart-society-management-case-study-tool-logo" />
                  <p className="smart-society-management-case-study-tool-name">Framer</p>
                </div>
                <div className="smart-society-management-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="smart-society-management-case-study-tool-logo" />
                  <p className="smart-society-management-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="smart-society-management-case-study-tool-item smart-society-management-case-study-tool-empty"></div>
                <div className="smart-society-management-case-study-tool-item smart-society-management-case-study-tool-empty"></div>
                <div className="smart-society-management-case-study-tool-item smart-society-management-case-study-tool-empty"></div>
                <div className="smart-society-management-case-study-tool-item smart-society-management-case-study-tool-empty"></div>
                <div className="smart-society-management-case-study-tool-item smart-society-management-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="smart-society-management-case-study-component5-section py-7">
          <div className="container">
            <div className="row smart-society-management-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="smart-society-management-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="smart-society-management-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="smart-society-management-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SmartSocietyManagementCaseStudy;

