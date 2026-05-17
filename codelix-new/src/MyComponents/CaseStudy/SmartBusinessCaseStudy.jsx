import React, { useState, useEffect, useRef } from "react";
import "./SmartBusinessCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-fourteen.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light3.png";
import light2Image from "../Images/Dashboard mobile.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import springbootLogo from "../Images/springboot.png";
import reactLogo from "../Images/react.png";
import expressLogo from "../Images/Express.png";
import postgresqlLogo from "../Images/postgresql.png";
import awsLogo from "../Images/AWS.png";
import swaggerLogo from "../Images/Swagger.png";
import projectTen from "../Images/work-best-project-ten.png";
import projectTwo from "../Images/work-best-project-two.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const SmartBusinessCaseStudy = () => {
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
  const targetValues = { projects: 40, success: 95, years: 2 };

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
        title="Smart Business Case Study | Codelix IT Solutions"
        description="Explore how Codelix IT Solutions created a smart business management platform with AI-powered insights, workflow automation, and data-driven decision tools."
        keywords="smart business case study, business management platform, AI analytics, workflow automation, Codelix portfolio"
      />
      <div className="smart-business-case-study-page">
        <div className="smart-business-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="smart-business-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch smart-business-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 smart-business-case-study-content-col">
                <div className="smart-business-case-study-content-wrapper">
                  <h1 className="smart-business-case-study-hero-title">
                    Smart Business Operations System - Custom Software
                  </h1>
                  <p className="smart-business-case-study-hero-description">
                    A fully customized software system developed to help businesses manage their operations more efficiently. The platform includes a clean web dashboard and a mobile-friendly interface, offering seamless access to core business modules such as order tracking, inventory management, staff workflows, and real-time reporting.
                  </p>
                  
                  {/* Tags */}
                  <div className="smart-business-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="smart-business-case-study-tag-badge">Spring Boot</span>
                    <span className="smart-business-case-study-tag-badge">ReactJS</span>
                    <span className="smart-business-case-study-tag-badge">Figma</span>
                    <span className="smart-business-case-study-tag-badge">ExpressJS</span>
                    <span className="smart-business-case-study-tag-badge">Postgres</span>
                    <span className="smart-business-case-study-tag-badge">AWS</span>
                    <span className="smart-business-case-study-tag-badge">Swagger</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <Link to="/contact#contact-form" className="btn smart-business-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="" className="smart-business-case-study-arrow-icon" />
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 smart-business-case-study-image-col">
                <div className="smart-business-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Smart Business Project" 
                    className="smart-business-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="smart-business-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="smart-business-case-study-section">
              <h2 className="smart-business-case-study-section-heading mb-5">
                Project{" "}
                <span className="smart-business-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="" className="smart-business-case-study-underline-img" />
                </span>
              </h2>
              <p className="smart-business-case-study-section-paragraph">
              The Smart Business Operations System is a fully customized software solution designed to simplify and automate day-to-day business activities for small and medium enterprises. The platform includes a modern web dashboard and a mobile-friendly application that together provide smooth control over all operational modules, including order tracking, inventory management, staff workflows, approval processes, and real-time reporting. This solution was engineered to replace manual paperwork, Excel-based processes, and communication gaps that slowed down decision-making. With a centralized system in place, the business now runs with improved accuracy, transparency, and speed.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="smart-business-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="smart-business-case-study-outcomes-wrapper">
              <h2 className="smart-business-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="smart-business-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="" className="smart-business-case-study-underline-img" />
                </span>
              </h2>

              <p className="smart-business-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row smart-business-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="smart-business-case-study-outcome-card">
                    <div className="smart-business-case-study-outcome-number">{counts.projects}+</div>
                    <div className="smart-business-case-study-outcome-label">Reduction in manual operations</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="smart-business-case-study-outcome-card">
                    <div className="smart-business-case-study-outcome-number">{counts.success}%</div>
                    <div className="smart-business-case-study-outcome-label">Faster tracking & reporting across departments</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="smart-business-case-study-outcome-card">
                    <div className="smart-business-case-study-outcome-number">{counts.years}x</div>
                    <div className="smart-business-case-study-outcome-label">Accuracy in inventory and order management</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="smart-business-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="smart-business-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="smart-business-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row smart-business-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="smart-business-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="smart-business-case-study-challenges-text-wrapper">
                  <h3 className="smart-business-case-study-challenges-heading">Challenges</h3>
                  <ul className="smart-business-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Orders, inventory, requests, and staff tasks were tracked manually, resulting in mistakes, delays, and missing data.
                    </li>
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Decision-makers didn't have instant access to updated information, causing slow approvals and bottlenecks.
                    </li>
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Different teams handled interconnected processes, but there was no unified system to manage order status, inventory movement, or staff responsibilities.
                    </li>
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Reports and records were scattered across Excel sheets, WhatsApp messages, and files — causing miscommunication.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="smart-business-case-study-solutions-text-wrapper">
                  <h3 className="smart-business-case-study-solutions-heading">Solutions</h3>
                  <ul className="smart-business-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      A single dashboard to manage end-to-end order flow: Pending → Approved → Completed → Returned
                    </li>
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Real-time stock updates, low-stock alerts, and automatic validation to prevent entry errors.
                    </li>
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Role-based access, task assignment, approvals, and activity logs for accountability.
                    </li>
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Dashboard widgets and downloadable reports allow management to take faster, data-backed decisions.
                    </li>
                    <li className={bulletPointsVisible ? "smart-business-bullet-visible" : ""} style={{ transitionDelay: "0.9s" }}>
                      Robust authentication, permission layers, and encrypted data flows ensure safety and compliance.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="smart-business-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="smart-business-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="smart-business-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="smart-business-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="smart-business-case-study-tools-wrapper">
              <h2 className="smart-business-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="smart-business-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="" className="smart-business-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="smart-business-case-study-tools-grid">
                {/* Top Row - 5 items */}
                <div className="smart-business-case-study-tool-item">
                  <img src={springbootLogo} alt="Spring Boot" className="smart-business-case-study-tool-logo" />
                  <p className="smart-business-case-study-tool-name">Spring Boot</p>
                </div>
                <div className="smart-business-case-study-tool-item">
                  <img src={reactLogo} alt="ReactJS" className="smart-business-case-study-tool-logo" />
                  <p className="smart-business-case-study-tool-name">ReactJS</p>
                </div>
                <div className="smart-business-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="smart-business-case-study-tool-logo" />
                  <p className="smart-business-case-study-tool-name">Figma</p>
                </div>
                <div className="smart-business-case-study-tool-item">
                  <img src={expressLogo} alt="ExpressJS" className="smart-business-case-study-tool-logo" />
                  <p className="smart-business-case-study-tool-name">ExpressJS</p>
                </div>
                <div className="smart-business-case-study-tool-item">
                  <img src={postgresqlLogo} alt="Postgres" className="smart-business-case-study-tool-logo" />
                  <p className="smart-business-case-study-tool-name">Postgres</p>
                </div>
                
                {/* Bottom Row - 5 items (2 tools + 3 empty) */}
                <div className="smart-business-case-study-tool-item">
                  <img src={awsLogo} alt="AWS" className="smart-business-case-study-tool-logo" />
                  <p className="smart-business-case-study-tool-name">AWS</p>
                </div>
                <div className="smart-business-case-study-tool-item">
                  <img src={swaggerLogo} alt="Swagger" className="smart-business-case-study-tool-logo" />
                  <p className="smart-business-case-study-tool-name">Swagger</p>
                </div>
                <div className="smart-business-case-study-tool-item smart-business-case-study-tool-empty"></div>
                <div className="smart-business-case-study-tool-item smart-business-case-study-tool-empty"></div>
                <div className="smart-business-case-study-tool-item smart-business-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Best Projects Section */}
        <div className="smart-business-case-study-best-projects-section py-7">
          <div className="container">
            <div className="smart-business-case-study-best-projects-wrapper">
              {/* Project 1: Payroll */}
              <div className="smart-business-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectTen}
                      alt="Custom Payroll Management System – Web & Mobile"
                      className="smart-business-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 smart-business-case-study-best-project-content-col">
                    <div className="smart-business-case-study-best-project-content">
                      <h3 className="smart-business-case-study-best-project-title">
                        Custom Payroll Management System – Web & Mobile
                      </h3>
                      <p className="smart-business-case-study-best-project-desc">
                        A comprehensive payroll management system developed for web and mobile platforms, featuring employee management, salary processing, tax calculations, and detailed reporting. The system provides a seamless experience for HR teams to manage payroll efficiently across all devices.
                      </p>
                      <div className="smart-business-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="smart-business-case-study-best-project-tag-badge">Spring Boot</span>
                        <span className="smart-business-case-study-best-project-tag-badge">AngularJS</span>
                        <span className="smart-business-case-study-best-project-tag-badge">Figma</span>
                        <span className="smart-business-case-study-best-project-tag-badge">ExpressJS</span>
                        <span className="smart-business-case-study-best-project-tag-badge">MySQL</span>
                        <span className="smart-business-case-study-best-project-tag-badge">AWS</span>
                        <span className="smart-business-case-study-best-project-tag-badge">Swagger</span>
                      </div>
                    </div>
                    <button
                      className="btn smart-business-case-study-read-case-study-btn smart-business-case-study-project-btn"
                      onClick={() => navigate("/payroll-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="smart-business-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: ERP */}
              <div className="smart-business-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectTwo}
                      alt="A Custom ERP Solution Designed for Industrial & Financial Workflows"
                      className="smart-business-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 smart-business-case-study-best-project-content-col">
                    <div className="smart-business-case-study-best-project-content">
                      <h3 className="smart-business-case-study-best-project-title">
                        A Custom ERP Solution Designed for Industrial & Financial Workflows
                      </h3>
                      <p className="smart-business-case-study-best-project-desc">
                        A comprehensive ERP solution developed to streamline industrial and financial workflows, featuring integrated modules for inventory management, financial reporting, supply chain management, and business analytics. The platform provides a unified system for managing complex business operations.
                      </p>
                      <div className="smart-business-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="smart-business-case-study-best-project-tag-badge">Spring Boot</span>
                        <span className="smart-business-case-study-best-project-tag-badge">ReactJS</span>
                        <span className="smart-business-case-study-best-project-tag-badge">Figma</span>
                        <span className="smart-business-case-study-best-project-tag-badge">ExpressJS</span>
                        <span className="smart-business-case-study-best-project-tag-badge">MySQL</span>
                        <span className="smart-business-case-study-best-project-tag-badge">AWS</span>
                        <span className="smart-business-case-study-best-project-tag-badge">Swagger</span>
                      </div>
                    </div>
                    <button
                      className="btn smart-business-case-study-read-case-study-btn smart-business-case-study-project-btn"
                      onClick={() => navigate("/erp-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="smart-business-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="smart-business-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SmartBusinessCaseStudy;

