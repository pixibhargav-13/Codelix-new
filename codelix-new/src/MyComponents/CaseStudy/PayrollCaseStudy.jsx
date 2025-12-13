import React, { useState, useEffect, useRef } from "react";
import "./PayrollCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-ten.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light5.png";
import light2Image from "../Images/Dashboard mobile2.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import projectFourteen from "../Images/work-best-project-fourteen.png";
import projectTwo from "../Images/work-best-project-two.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PayrollCaseStudy = () => {
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
  const targetValues = { projects: 80, success: 2, years: 0 };

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
        title="Payroll Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/payroll-case-study"
      />
      <div className="payroll-case-study-page">
        <div className="payroll-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="payroll-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch payroll-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 payroll-case-study-content-col">
                <div className="payroll-case-study-content-wrapper">
                  <h1 className="payroll-case-study-hero-title">
                    Custom Payroll Management System – Web & Mobile
                  </h1>
                  <p className="payroll-case-study-hero-description">
                    A fully custom payroll management system developed to simplify employee salary processing, attendance tracking, and financial reporting for businesses. This solution includes a responsive web dashboard and mobile interface, enabling HR teams and employees to manage payroll activities from anywhere.
                  </p>
                  
                  {/* Tags */}
                  <div className="payroll-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="payroll-case-study-tag-badge">Mobile</span>
                    <span className="payroll-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn payroll-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="payroll-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 payroll-case-study-image-col">
                <div className="payroll-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Payroll Project" 
                    className="payroll-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="payroll-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="payroll-case-study-section">
              <h2 className="payroll-case-study-section-heading mb-5">
                Project{" "}
                <span className="payroll-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="payroll-case-study-underline-img" />
                </span>
              </h2>
              <p className="payroll-case-study-section-paragraph">
                The Custom Payroll Management System is a fully tailored solution designed to automate salary processing, attendance tracking, compliance calculations, and financial reporting for businesses. The platform offers both a responsive web dashboard for HR teams and a simplified mobile interface for employees, enabling seamless payroll operations from anywhere.
              </p>
              <p className="payroll-case-study-section-paragraph">
                This system replaces manual spreadsheets and inconsistent attendance records with an integrated workflow that ensures accuracy, compliance, and transparency for all payroll-related activities.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="payroll-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="payroll-case-study-outcomes-wrapper">
              <h2 className="payroll-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="payroll-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="payroll-case-study-underline-img" />
                </span>
              </h2>

              <p className="payroll-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row payroll-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="payroll-case-study-outcome-card">
                    <div className="payroll-case-study-outcome-number">{counts.projects}+</div>
                    <div className="payroll-case-study-outcome-label">Reduction in manual payroll processing effort</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="payroll-case-study-outcome-card">
                    <div className="payroll-case-study-outcome-number">{counts.success}x</div>
                    <div className="payroll-case-study-outcome-label">Faster monthly salary calculations</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="payroll-case-study-outcome-card">
                    <div className="payroll-case-study-outcome-number">{counts.years}%</div>
                    <div className="payroll-case-study-outcome-label">payroll errors through automated calculations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="payroll-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="payroll-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="payroll-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row payroll-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="payroll-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="payroll-case-study-challenges-text-wrapper">
                  <h3 className="payroll-case-study-challenges-heading">Challenges</h3>
                  <ul className="payroll-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Payroll was processed using Excel sheets, leading to frequent errors and inconsistent payouts.
                    </li>
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Data from biometric devices, manual logs, and employee requests created confusion during salary processing.
                    </li>
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Components like PF, ESI, TDS, overtime, leaves, and deductions were complicated to track accurately.
                    </li>
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Employees relied on HR for basic information like payslips, leave balances, or attendance history, increasing HR workload.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="payroll-case-study-solutions-text-wrapper">
                  <h3 className="payroll-case-study-solutions-heading">Solutions</h3>
                  <ul className="payroll-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Automatically calculates- Basic, HRA, allowances, Overtime, Deductions (PF, ESI, TDS, loans), Leave adjustments, Incentives & bonuses.
                    </li>
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Attendance Integration- Sync from biometric machines, Mobile attendance with GPS, Leave & WFH request flows, Real-time visibility for HR.
                    </li>
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Employee Self-Service Portal- Download payslips, View attendance & leave balance, Submit leave/O.T. requests, Update profile information.
                    </li>
                    <li className={bulletPointsVisible ? "payroll-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      HR Dashboard- Salary approvals, Monthly payroll overview, Department-wise reports, Compliance summaries.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="payroll-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="payroll-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="payroll-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="payroll-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="payroll-case-study-tools-wrapper">
              <h2 className="payroll-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="payroll-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="payroll-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="payroll-case-study-tools-grid">
                {/* Top Row */}
                <div className="payroll-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="payroll-case-study-tool-logo" />
                  <p className="payroll-case-study-tool-name">Figma</p>
                </div>
                <div className="payroll-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="payroll-case-study-tool-logo" />
                  <p className="payroll-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="payroll-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="payroll-case-study-tool-logo" />
                  <p className="payroll-case-study-tool-name">Sketch</p>
                </div>
                <div className="payroll-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="payroll-case-study-tool-logo" />
                  <p className="payroll-case-study-tool-name">Framer</p>
                </div>
                <div className="payroll-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="payroll-case-study-tool-logo" />
                  <p className="payroll-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="payroll-case-study-tool-item payroll-case-study-tool-empty"></div>
                <div className="payroll-case-study-tool-item payroll-case-study-tool-empty"></div>
                <div className="payroll-case-study-tool-item payroll-case-study-tool-empty"></div>
                <div className="payroll-case-study-tool-item payroll-case-study-tool-empty"></div>
                <div className="payroll-case-study-tool-item payroll-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Best Projects Section */}
        <div className="payroll-case-study-best-projects-section py-7">
          <div className="container">
            <div className="payroll-case-study-best-projects-wrapper">
              {/* Project 1: Smart Business */}
              <div className="payroll-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectFourteen}
                      alt="Smart Business Operations System - Custom Software"
                      className="payroll-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 payroll-case-study-best-project-content-col">
                    <div className="payroll-case-study-best-project-content">
                      <h3 className="payroll-case-study-best-project-title">
                        Smart Business Operations System - Custom Software
                      </h3>
                      <p className="payroll-case-study-best-project-desc">
                        A comprehensive custom software solution developed to streamline business operations, featuring automated workflows, real-time analytics, and integrated management tools. The system helps businesses optimize their processes, improve efficiency, and make data-driven decisions.
                      </p>
                      <div className="payroll-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="payroll-case-study-best-project-tag-badge">Mobile</span>
                        <span className="payroll-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn payroll-case-study-read-case-study-btn payroll-case-study-project-btn"
                      onClick={() => navigate("/smart-business-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="payroll-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: ERP */}
              <div className="payroll-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectTwo}
                      alt="A Custom ERP Solution Designed for Industrial & Financial Workflows"
                      className="payroll-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 payroll-case-study-best-project-content-col">
                    <div className="payroll-case-study-best-project-content">
                      <h3 className="payroll-case-study-best-project-title">
                        A Custom ERP Solution Designed for Industrial & Financial Workflows
                      </h3>
                      <p className="payroll-case-study-best-project-desc">
                        A comprehensive ERP solution developed to streamline industrial and financial workflows, featuring integrated modules for inventory management, financial reporting, supply chain management, and business analytics. The platform provides a unified system for managing complex business operations.
                      </p>
                      <div className="payroll-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="payroll-case-study-best-project-tag-badge">Mobile</span>
                        <span className="payroll-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn payroll-case-study-read-case-study-btn payroll-case-study-project-btn"
                      onClick={() => navigate("/erp-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="payroll-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="payroll-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PayrollCaseStudy;

