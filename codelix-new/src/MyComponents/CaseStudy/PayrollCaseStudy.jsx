import React, { useState, useEffect, useRef } from "react";
import "./PayrollCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
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
import component5Image from "../Images/Component 5.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PayrollCaseStudy = () => {
  const navigate = useNavigate();
  const outcomesRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, success: 0, years: 0 });

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

      // Animate Projects (50+)
      setCounts((prev) => ({
        ...prev,
        projects: Math.floor(50 * easedProgress),
      }));

      // Animate Success Rate (95%)
      setCounts((prev) => ({
        ...prev,
        success: Math.floor(95 * easedProgress),
      }));

      // Animate Years (6+)
      setCounts((prev) => ({
        ...prev,
        years: Math.floor(6 * easedProgress),
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final values are set
        setCounts({ projects: 80, success: 2, years: 0 });
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
        <div className="payroll-case-study-challenges-solutions-section py-5">
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
                    <li>Manual payroll processing leading to errors and delays.</li>
                    <li>Difficulty tracking employee attendance and leave management.</li>
                    <li>Complex tax calculations and compliance requirements.</li>
                    <li>Lack of real-time access to payroll information for employees.</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="payroll-case-study-solutions-text-wrapper">
                  <h3 className="payroll-case-study-solutions-heading">Solutions</h3>
                  <ul className="payroll-case-study-solutions-list">
                    <li>Automated payroll processing with accurate calculations and timely payments.</li>
                    <li>Integrated attendance tracking system with biometric and digital check-in options.</li>
                    <li>Built-in tax calculation engine that ensures compliance with local regulations.</li>
                    <li>Mobile and web portals for employees to access payslips and payroll information anytime.</li>
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

        {/* Component 5 Images Section */}
        <div className="payroll-case-study-component5-section py-7">
          <div className="container">
            <div className="row payroll-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="payroll-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="payroll-case-study-component5-image" />
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

