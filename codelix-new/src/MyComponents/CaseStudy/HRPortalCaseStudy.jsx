import React, { useState, useEffect, useRef } from "react";
import "./HRPortalCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-seven.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light12.png";
import light2Image from "../Images/Light13.png";
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

const HRPortalCaseStudy = () => {
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
  const targetValues = { projects: 47, success: 90, years: 99 };

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
        title="HR Portal Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/hr-portal-case-study"
      />
      <div className="hr-portal-case-study-page">
        <div className="hr-portal-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="hr-portal-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch hr-portal-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 hr-portal-case-study-content-col">
                <div className="hr-portal-case-study-content-wrapper">
                  <h1 className="hr-portal-case-study-hero-title">
                    Modern HR Portal for Employee Benefits - Web Development
                  </h1>
                  <p className="hr-portal-case-study-hero-description">
                    A modern, responsive web platform developed to simplify employee benefits, claims, and HR administration. The website includes a clean dashboard for employees to view benefits, submit claims, track approvals, and access important HR resources with ease.
                  </p>
                  
                  {/* Tags */}
                  <div className="hr-portal-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="hr-portal-case-study-tag-badge">Mobile</span>
                    <span className="hr-portal-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn hr-portal-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="hr-portal-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 hr-portal-case-study-image-col">
                <div className="hr-portal-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="HR Portal Project" 
                    className="hr-portal-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hr-portal-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="hr-portal-case-study-section">
              <h2 className="hr-portal-case-study-section-heading mb-5">
                Project{" "}
                <span className="hr-portal-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="hr-portal-case-study-underline-img" />
                </span>
              </h2>
              <p className="hr-portal-case-study-section-paragraph">
              The Modern HR Portal for Employee Benefits is a responsive, user-friendly web platform designed to streamline employee benefits, claims, approvals, and HR-related communication. Built for both HR teams and employees, the portal enables users to view their benefits, submit claims, track approval status, and access essential HR resources through a clean and intuitive interface.
              </p>
              <p className="hr-portal-case-study-section-paragraph">
              This platform eliminates manual paperwork and scattered communication, allowing companies to improve transparency, reduce HR workload, and deliver a better employee experience.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="hr-portal-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="hr-portal-case-study-outcomes-wrapper">
              <h2 className="hr-portal-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="hr-portal-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="hr-portal-case-study-underline-img" />
                </span>
              </h2>

              <p className="hr-portal-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row hr-portal-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="hr-portal-case-study-outcome-card">
                    <div className="hr-portal-case-study-outcome-number">{counts.projects}%</div>
                    <div className="hr-portal-case-study-outcome-label">faster claim submission and processing workflow</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="hr-portal-case-study-outcome-card">
                    <div className="hr-portal-case-study-outcome-number">{counts.success}%</div>
                    <div className="hr-portal-case-study-outcome-label">adoption rate among employees in the first month</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="hr-portal-case-study-outcome-card">
                    <div className="hr-portal-case-study-outcome-number">{counts.years}%</div>
                    <div className="hr-portal-case-study-outcome-label">responsive performance across devices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="hr-portal-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="hr-portal-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="hr-portal-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row hr-portal-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="hr-portal-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="hr-portal-case-study-challenges-text-wrapper">
                  <h3 className="hr-portal-case-study-challenges-heading">Challenges</h3>
                  <ul className="hr-portal-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating a user-friendly interface that simplifies complex HR processes and benefits management.
                    </li>
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Ensuring secure handling of sensitive employee data while maintaining easy access for authorized users.
                    </li>
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Building a responsive platform that works seamlessly across desktop and mobile devices for on-the-go access.
                    </li>
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Implementing efficient claim submission and tracking workflows that reduce administrative burden.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="hr-portal-case-study-solutions-text-wrapper">
                  <h3 className="hr-portal-case-study-solutions-heading">Solutions</h3>
                  <ul className="hr-portal-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Designed an intuitive dashboard with clear navigation and organized sections for easy access to benefits and claims information.
                    </li>
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Implemented robust security measures including authentication, encryption, and role-based access control to protect sensitive data.
                    </li>
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Developed a fully responsive design that ensures optimal functionality and user experience on all devices and screen sizes.
                    </li>
                    <li className={bulletPointsVisible ? "hr-portal-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Created streamlined workflows for claim submission and tracking with real-time status updates and notification systems.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="hr-portal-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="hr-portal-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="hr-portal-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="hr-portal-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="hr-portal-case-study-tools-wrapper">
              <h2 className="hr-portal-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="hr-portal-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="hr-portal-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="hr-portal-case-study-tools-grid">
                {/* Top Row */}
                <div className="hr-portal-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="hr-portal-case-study-tool-logo" />
                  <p className="hr-portal-case-study-tool-name">Figma</p>
                </div>
                <div className="hr-portal-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="hr-portal-case-study-tool-logo" />
                  <p className="hr-portal-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="hr-portal-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="hr-portal-case-study-tool-logo" />
                  <p className="hr-portal-case-study-tool-name">Sketch</p>
                </div>
                <div className="hr-portal-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="hr-portal-case-study-tool-logo" />
                  <p className="hr-portal-case-study-tool-name">Framer</p>
                </div>
                <div className="hr-portal-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="hr-portal-case-study-tool-logo" />
                  <p className="hr-portal-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="hr-portal-case-study-tool-item hr-portal-case-study-tool-empty"></div>
                <div className="hr-portal-case-study-tool-item hr-portal-case-study-tool-empty"></div>
                <div className="hr-portal-case-study-tool-item hr-portal-case-study-tool-empty"></div>
                <div className="hr-portal-case-study-tool-item hr-portal-case-study-tool-empty"></div>
                <div className="hr-portal-case-study-tool-item hr-portal-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="hr-portal-case-study-component5-section py-7">
          <div className="container">
            <div className="row hr-portal-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="hr-portal-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="hr-portal-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="hr-portal-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HRPortalCaseStudy;

