import React, { useState, useEffect, useRef } from "react";
import "./ModernCreativeAgencyCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-six.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light18.png";
import light2Image from "../Images/Light19.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import projectEleven from "../Images/work-best-project-eleven.png";
import projectTwelve from "../Images/work-best-project-twelve.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ModernCreativeAgencyCaseStudy = () => {
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
  const targetValues = { projects: 48, success: 37, years: 28 };

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
        title="Modern Creative Agency Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/modern-creative-agency-case-study"
      />
      <div className="modern-creative-agency-case-study-page">
        <div className="modern-creative-agency-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="modern-creative-agency-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch modern-creative-agency-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 modern-creative-agency-case-study-content-col">
                <div className="modern-creative-agency-case-study-content-wrapper">
                  <h1 className="modern-creative-agency-case-study-hero-title">
                    Modern Website UI/UX Design for a Creative Agency
                  </h1>
                  <p className="modern-creative-agency-case-study-hero-description">
                    This project showcases the complete UI/UX design for a modern creative agency website. The design focuses on a bold visual identity, clean layout structures, and a smooth user journey across all pages. Each section—from the hero area to services, case studies, contact flow, and navigation—has been crafted with a strong emphasis on clarity, usability, and visual appeal.
                  </p>
                  
                  {/* Tags */}
                  <div className="modern-creative-agency-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="modern-creative-agency-case-study-tag-badge">Mobile</span>
                    <span className="modern-creative-agency-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn modern-creative-agency-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="modern-creative-agency-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 modern-creative-agency-case-study-image-col">
                <div className="modern-creative-agency-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Modern Creative Agency Project" 
                    className="modern-creative-agency-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modern-creative-agency-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="modern-creative-agency-case-study-section">
              <h2 className="modern-creative-agency-case-study-section-heading mb-5">
                Project{" "}
                <span className="modern-creative-agency-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="modern-creative-agency-case-study-underline-img" />
                </span>
              </h2>
              <p className="modern-creative-agency-case-study-section-paragraph">
                This project presents a full UI/UX design system created for a modern creative agency website. The design emphasizes a bold visual identity, clean layout structures, and a seamless, intuitive user journey across all pages. Every section — from hero banners to service showcases, case studies, contact flow, and navigation — was carefully crafted to prioritize clarity, usability, and strong visual appeal.
              </p>
              <p className="modern-creative-agency-case-study-section-paragraph">
              Built to inspire trust and creativity, the interface uses balanced spacing, refined typography, and expressive visuals that highlight the agency’s capabilities while ensuring an effortless browsing experience on all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="modern-creative-agency-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="modern-creative-agency-case-study-outcomes-wrapper">
              <h2 className="modern-creative-agency-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="modern-creative-agency-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="modern-creative-agency-case-study-underline-img" />
                </span>
              </h2>

              <p className="modern-creative-agency-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row modern-creative-agency-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="modern-creative-agency-case-study-outcome-card">
                    <div className="modern-creative-agency-case-study-outcome-number">{counts.projects}%</div>
                    <div className="modern-creative-agency-case-study-outcome-label"> increase in portfolio interaction</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="modern-creative-agency-case-study-outcome-card">
                    <div className="modern-creative-agency-case-study-outcome-number">{counts.success}%</div>
                    <div className="modern-creative-agency-case-study-outcome-label">improvement in time-on-site</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="modern-creative-agency-case-study-outcome-card">
                    <div className="modern-creative-agency-case-study-outcome-number">{counts.years}%</div>
                    <div className="modern-creative-agency-case-study-outcome-label">boost in service enquiry submissions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="modern-creative-agency-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="modern-creative-agency-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="modern-creative-agency-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row modern-creative-agency-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="modern-creative-agency-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="modern-creative-agency-case-study-challenges-text-wrapper">
                  <h3 className="modern-creative-agency-case-study-challenges-heading">Challenges</h3>
                  <ul className="modern-creative-agency-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Users found it difficult to understand the agency's services, work, and capabilities at a glance.
                    </li>
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      The previous design did not reflect the creativity, professionalism, or visual strength of the agency.
                    </li>
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Service information was not organized cohesively, making it difficult for visitors to explore offerings.
                    </li>
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Portfolio items lacked structured layouts, strong visuals, and storytelling elements.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="modern-creative-agency-case-study-solutions-text-wrapper">
                  <h3 className="modern-creative-agency-case-study-solutions-heading">Solutions</h3>
                  <ul className="modern-creative-agency-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Bold Visual Identity- Strong typography, Clean grids, Vibrant yet balanced color schemes, Consistent design language across the entire site
                    </li>
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Streamlined Service Presentation- Clear service categories, Structured descriptions, Visual icons and illustrations, Easy navigation between related services
                    </li>
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Enhanced Portfolio Experience- High-quality project showcases, Organized multi-grid layouts, Visual storytelling with captions and highlights
                    </li>
                    <li className={bulletPointsVisible ? "modern-creative-agency-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Smooth, Modern Navigation- Simple menu structure, Clear page paths, Sticky navigation for better usability
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="modern-creative-agency-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="modern-creative-agency-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="modern-creative-agency-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="modern-creative-agency-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="modern-creative-agency-case-study-tools-wrapper">
              <h2 className="modern-creative-agency-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="modern-creative-agency-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="modern-creative-agency-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="modern-creative-agency-case-study-tools-grid">
                {/* Top Row */}
                <div className="modern-creative-agency-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="modern-creative-agency-case-study-tool-logo" />
                  <p className="modern-creative-agency-case-study-tool-name">Figma</p>
                </div>
                <div className="modern-creative-agency-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="modern-creative-agency-case-study-tool-logo" />
                  <p className="modern-creative-agency-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="modern-creative-agency-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="modern-creative-agency-case-study-tool-logo" />
                  <p className="modern-creative-agency-case-study-tool-name">Sketch</p>
                </div>
                <div className="modern-creative-agency-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="modern-creative-agency-case-study-tool-logo" />
                  <p className="modern-creative-agency-case-study-tool-name">Framer</p>
                </div>
                <div className="modern-creative-agency-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="modern-creative-agency-case-study-tool-logo" />
                  <p className="modern-creative-agency-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="modern-creative-agency-case-study-tool-item modern-creative-agency-case-study-tool-empty"></div>
                <div className="modern-creative-agency-case-study-tool-item modern-creative-agency-case-study-tool-empty"></div>
                <div className="modern-creative-agency-case-study-tool-item modern-creative-agency-case-study-tool-empty"></div>
                <div className="modern-creative-agency-case-study-tool-item modern-creative-agency-case-study-tool-empty"></div>
                <div className="modern-creative-agency-case-study-tool-item modern-creative-agency-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Best Projects Section */}
        <div className="modern-creative-agency-case-study-best-projects-section py-7">
          <div className="container">
            <div className="modern-creative-agency-case-study-best-projects-wrapper">
              {/* Project 1: Elegant Creative Agency */}
              <div className="modern-creative-agency-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectEleven}
                      alt="Elegant Creative Agency Website – UI/UX Design"
                      className="modern-creative-agency-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 modern-creative-agency-case-study-best-project-content-col">
                    <div className="modern-creative-agency-case-study-best-project-content">
                      <h3 className="modern-creative-agency-case-study-best-project-title">
                        Elegant Creative Agency Website – UI/UX Design
                      </h3>
                      <p className="modern-creative-agency-case-study-best-project-desc">
                        A high-end UI/UX design created for a modern creative studio website. The interface uses dark-mode aesthetics, clean grids, and strong typography to showcase projects in a bold and visually engaging way.
                      </p>
                      <div className="modern-creative-agency-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="modern-creative-agency-case-study-best-project-tag-badge">Mobile</span>
                        <span className="modern-creative-agency-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn modern-creative-agency-case-study-read-case-study-btn modern-creative-agency-case-study-project-btn"
                      onClick={() => navigate("/elegant-creative-agency-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="modern-creative-agency-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: AI Powered Design */}
              <div className="modern-creative-agency-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectTwelve}
                      alt="AI-Powered Design Platform – UI/UX Concept"
                      className="modern-creative-agency-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 modern-creative-agency-case-study-best-project-content-col">
                    <div className="modern-creative-agency-case-study-best-project-content">
                      <h3 className="modern-creative-agency-case-study-best-project-title">
                        AI-Powered Design Platform – UI/UX Concept
                      </h3>
                      <p className="modern-creative-agency-case-study-best-project-desc">
                        This project showcases a futuristic UI/UX concept created for an AI-powered design platform. The interface focuses on bold visuals, modern gradients, and a clean layout that highlights the platform's innovative features.
                      </p>
                      <div className="modern-creative-agency-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="modern-creative-agency-case-study-best-project-tag-badge">Mobile</span>
                        <span className="modern-creative-agency-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn modern-creative-agency-case-study-read-case-study-btn modern-creative-agency-case-study-project-btn"
                      onClick={() => navigate("/ai-powered-design-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="modern-creative-agency-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modern-creative-agency-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ModernCreativeAgencyCaseStudy;

