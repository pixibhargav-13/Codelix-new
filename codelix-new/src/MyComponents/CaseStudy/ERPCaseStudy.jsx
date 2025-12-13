import React, { useState, useEffect, useRef } from "react";
import "./ERPCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-two.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light6.png";
import light2Image from "../Images/Dashboard mobile3.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import projectFourteen from "../Images/work-best-project-fourteen.png";
import projectTen from "../Images/work-best-project-ten.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ERPCaseStudy = () => {
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
  const targetValues = { projects: 70, success: 2, years: 95 };

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
        title="ERP Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/erp-case-study"
      />
      <div className="erp-case-study-page">
        <div className="erp-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="erp-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch erp-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 erp-case-study-content-col">
                <div className="erp-case-study-content-wrapper">
                  <h1 className="erp-case-study-hero-title">
                    A Custom ERP Solution Designed for Industrial & Financial Workflows
                  </h1>
                  <p className="erp-case-study-hero-description">
                    A robust and scalable ERP system designed to handle complex industrial workflows, streamline financial processes, and support high-volume operational activities with ease. Ensures accuracy, transparency, and smooth coordination across departments.
                  </p>
                  
                  {/* Tags */}
                  <div className="erp-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="erp-case-study-tag-badge">AWS</span>
                    <span className="erp-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn erp-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="erp-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 erp-case-study-image-col">
                <div className="erp-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="ERP Project" 
                    className="erp-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="erp-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="erp-case-study-section">
              <h2 className="erp-case-study-section-heading mb-5">
                Project{" "}
                <span className="erp-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="erp-case-study-underline-img" />
                </span>
              </h2>
              <p className="erp-case-study-section-paragraph">
              This Custom ERP Solution was created to streamline complex industrial and financial operations for a high-volume enterprise. The system centralizes all core business processes—procurement, production, inventory, sales, finance, and compliance—into a unified platform capable of handling thousands of daily transactions.
              </p>
              <p className="erp-case-study-section-paragraph">
              Designed for scalability and robustness, the ERP ensures accurate data flow, smooth departmental coordination, and real-time insights that enable better planning, reduced operational delays, and stronger financial control. The solution supports both web access and cloud deployment on AWS for enterprise-level reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="erp-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="erp-case-study-outcomes-wrapper">
              <h2 className="erp-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="erp-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="erp-case-study-underline-img" />
                </span>
              </h2>

              <p className="erp-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row erp-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="erp-case-study-outcome-card">
                    <div className="erp-case-study-outcome-number">{counts.projects}%</div>
                    <div className="erp-case-study-outcome-label">Reduction in manual paperwork and repetitive tasks</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="erp-case-study-outcome-card">
                    <div className="erp-case-study-outcome-number">{counts.success}x</div>
                    <div className="erp-case-study-outcome-label">Faster inter-department coordination</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="erp-case-study-outcome-card">
                    <div className="erp-case-study-outcome-number">{counts.years}%</div>
                    <div className="erp-case-study-outcome-label">Faster tracking & reporting across departmentse</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="erp-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="erp-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="erp-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row erp-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="erp-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="erp-case-study-challenges-text-wrapper">
                  <h3 className="erp-case-study-challenges-heading">Challenges</h3>
                  <ul className="erp-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Different departments worked in isolation, leading to delays, duplicated entries, and frequent miscommunication.
                    </li>
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Purchase orders, production updates, and financial data were maintained in Excel sheets or physical registers, causing inconsistencies.
                    </li>
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Management could not monitor stock levels, pending orders, approvals, or financial positions in real time.
                    </li>
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      The business needed a system capable of processing thousands of entries per day without performance issues.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="erp-case-study-solutions-text-wrapper">
                  <h3 className="erp-case-study-solutions-heading">Solutions</h3>
                  <ul className="erp-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Centralized Operational Modules- Procurement & Purchase Orders, Production Tracking, Inventory & Warehouse Management, Sales & Dispatch, Vendor & Customer Management
                    </li>
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Automated Financial Processes- Ledger entries, Payment tracking, GST calculations, Vendor settlements, Expense management, Real-time profit/loss insights
                    </li>
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Advanced Inventory Control- Stock movement logs, Batch/lot tracking, Multi-warehouse management, Low-stock alerts, Auto-generated reports
                    </li>
                    <li className={bulletPointsVisible ? "erp-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Employees view only what they are permitted to access, ensuring full data security and integrity.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="erp-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="erp-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="erp-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="erp-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="erp-case-study-tools-wrapper">
              <h2 className="erp-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="erp-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="erp-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="erp-case-study-tools-grid">
                {/* Top Row */}
                <div className="erp-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="erp-case-study-tool-logo" />
                  <p className="erp-case-study-tool-name">Figma</p>
                </div>
                <div className="erp-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="erp-case-study-tool-logo" />
                  <p className="erp-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="erp-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="erp-case-study-tool-logo" />
                  <p className="erp-case-study-tool-name">Sketch</p>
                </div>
                <div className="erp-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="erp-case-study-tool-logo" />
                  <p className="erp-case-study-tool-name">Framer</p>
                </div>
                <div className="erp-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="erp-case-study-tool-logo" />
                  <p className="erp-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="erp-case-study-tool-item erp-case-study-tool-empty"></div>
                <div className="erp-case-study-tool-item erp-case-study-tool-empty"></div>
                <div className="erp-case-study-tool-item erp-case-study-tool-empty"></div>
                <div className="erp-case-study-tool-item erp-case-study-tool-empty"></div>
                <div className="erp-case-study-tool-item erp-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Best Projects Section */}
        <div className="erp-case-study-best-projects-section py-7">
          <div className="container">
            <div className="erp-case-study-best-projects-wrapper">
              {/* Project 1: Smart Business */}
              <div className="erp-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectFourteen}
                      alt="Smart Business Operations System - Custom Software"
                      className="erp-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 erp-case-study-best-project-content-col">
                    <div className="erp-case-study-best-project-content">
                      <h3 className="erp-case-study-best-project-title">
                        Smart Business Operations System - Custom Software
                      </h3>
                      <p className="erp-case-study-best-project-desc">
                        A comprehensive custom software solution developed to streamline business operations, featuring automated workflows, real-time analytics, and integrated management tools. The system helps businesses optimize their processes, improve efficiency, and make data-driven decisions.
                      </p>
                      <div className="erp-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="erp-case-study-best-project-tag-badge">Mobile</span>
                        <span className="erp-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn erp-case-study-read-case-study-btn erp-case-study-project-btn"
                      onClick={() => navigate("/smart-business-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="erp-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: Payroll */}
              <div className="erp-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectTen}
                      alt="Custom Payroll Management System – Web & Mobile"
                      className="erp-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 erp-case-study-best-project-content-col">
                    <div className="erp-case-study-best-project-content">
                      <h3 className="erp-case-study-best-project-title">
                        Custom Payroll Management System – Web & Mobile
                      </h3>
                      <p className="erp-case-study-best-project-desc">
                        A comprehensive payroll management system developed for web and mobile platforms, featuring employee management, salary processing, tax calculations, and detailed reporting. The system provides a seamless experience for HR teams to manage payroll efficiently across all devices.
                      </p>
                      <div className="erp-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="erp-case-study-best-project-tag-badge">Mobile</span>
                        <span className="erp-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn erp-case-study-read-case-study-btn erp-case-study-project-btn"
                      onClick={() => navigate("/payroll-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="erp-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="erp-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ERPCaseStudy;

