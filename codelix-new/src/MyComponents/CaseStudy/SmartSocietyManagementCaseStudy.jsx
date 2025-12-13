import React, { useState, useEffect, useRef } from "react";
import "./SmartSocietyManagementCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
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
import projectFour from "../Images/work-best-project-four.png";
import projectFifteen from "../Images/work-best-project-fifteen.png";
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
                      Most tasks such as maintenance requests, approvals, and payment tracking were handled manually or via WhatsApp, causing delays and confusion.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Important updates often didn't reach residents in time, leading to frustration and repeated queries.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Residents had no single app to manage payments, track requests, view notices, or contact the committee.
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Security checkpoints relied on manual registers, which were inaccurate and slow.
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
                      Resident Dashboard- Maintenance status, Payments overview, Announcements, Upcoming events, Quick actions for common services
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Maintenance & Service Requests- Raise tickets in seconds, Add photos and descriptions, Real-time status updates, Faster approvals and tracking
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Online Payments & Dues- Pay maintenance and society charges from the app, View past transactions, Automated reminders
                    </li>
                    <li className={bulletPointsVisible ? "smart-society-management-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Visitor & Security Management- Pre-approve guests, Digital visitor logs, Staff attendance and daily workers tracking
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

        {/* Best Projects Section */}
        <div className="smart-society-management-case-study-best-projects-section py-6">
          <div className="container">
            <div className="smart-society-management-case-study-best-projects-wrapper">
              {/* Project 1: Car Marketplace */}
              <div className="smart-society-management-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectFour}
                      alt="A Feature-Rich Mobile Marketplace for Buying & Selling Cars"
                      className="smart-society-management-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 smart-society-management-case-study-best-project-content-col">
                    <div className="smart-society-management-case-study-best-project-content">
                      <h3 className="smart-society-management-case-study-best-project-title">
                        A Feature-Rich Mobile Marketplace for Buying & Selling Cars
                      </h3>
                      <p className="smart-society-management-case-study-best-project-desc">
                        A user-friendly automotive mobile application designed to make the car buying and selling process simple, transparent, and efficient. The platform allows users to browse a wide range of vehicles with detailed specifications, list their own cars for sale in just a few steps, and compare different options side-by-side to make confident decisions.
                      </p>
                      <div className="smart-society-management-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="smart-society-management-case-study-best-project-tag-badge">Android</span>
                        <span className="smart-society-management-case-study-best-project-tag-badge">iOS</span>
                      </div>
                    </div>
                    <button
                      className="btn smart-society-management-case-study-read-case-study-btn smart-society-management-case-study-project-btn"
                      onClick={() => navigate("/car-marketplace-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="smart-society-management-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: School Management */}
              <div className="smart-society-management-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectFifteen}
                      alt="Morden School Management Mobile Application"
                      className="smart-society-management-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 smart-society-management-case-study-best-project-content-col">
                    <div className="smart-society-management-case-study-best-project-content">
                      <h3 className="smart-society-management-case-study-best-project-title">
                        Morden School Management Mobile Application
                      </h3>
                      <p className="smart-society-management-case-study-best-project-desc">
                        A comprehensive mobile application designed to streamline school operations and enhance communication between students, parents, teachers, and administrators. The app provides real-time updates on attendance, grades, assignments, events, and school announcements, making it easier for all stakeholders to stay connected and informed.
                      </p>
                      <div className="smart-society-management-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="smart-society-management-case-study-best-project-tag-badge">Mobile</span>
                        <span className="smart-society-management-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn smart-society-management-case-study-read-case-study-btn smart-society-management-case-study-project-btn"
                      onClick={() => navigate("/school-management-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="smart-society-management-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
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

