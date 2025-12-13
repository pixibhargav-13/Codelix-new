import React, { useState, useEffect, useRef } from "react";
import "./CaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-one.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light.png";
import light2Image from "../Images/Light2.png";
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

const CaseStudy = () => {
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
  const targetValues = { projects: 50, success: 95, years: 6 };

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
        title="Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/case-study"
      />
      <div className="case-study-page">
        <div className="case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 case-study-content-col">
                <div className="case-study-content-wrapper">
                  <h1 className="case-study-hero-title">
                    Meditech - Streamlining Your Healthcare Billing Process
                  </h1>
                  <p className="case-study-hero-description">
                    Introducing an innovative point-of-sale (POS) system specifically tailored for healthcare facilities that handle over 2,000 transactions daily. This advanced solution streamlines operations, enhances patient experiences.
                  </p>
                  
                  {/* Tags */}
                  <div className="case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="case-study-tag-badge">Mobile</span>
                    <span className="case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 case-study-image-col">
                <div className="case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Meditech Project" 
                    className="case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="case-study-section">
              <h2 className="case-study-section-heading mb-5">
                Project{" "}
                <span className="case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="case-study-underline-img" />
                </span>
              </h2>
              <p className="case-study-section-paragraph">
                Introducing an innovative point-of-sale (POS) system specifically tailored for healthcare facilities that handle over 2,000 transactions daily. This advanced solution not only streamlines operations but also significantly enhances patient experiences by providing seamless transaction processing, real-time inventory management, and comprehensive reporting features. With its user-friendly interface and robust security measures, this POS system is designed to meet the unique needs of healthcare providers, ensuring that both staff and patients benefit from improved efficiency and satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="case-study-outcomes-wrapper">
              <h2 className="case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="case-study-underline-img" />
                </span>
              </h2>

              <p className="case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="case-study-outcome-card">
                    <div className="case-study-outcome-number">{counts.projects}+</div>
                    <div className="case-study-outcome-label">Projects Completed</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="case-study-outcome-card">
                    <div className="case-study-outcome-number">{counts.success}%</div>
                    <div className="case-study-outcome-label">Success Rate</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="case-study-outcome-card">
                    <div className="case-study-outcome-number">{counts.years}+</div>
                    <div className="case-study-outcome-label">Years of Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="case-study-challenges-text-wrapper">
                  <h3 className="case-study-challenges-heading">Challenges</h3>
                  <ul className="case-study-challenges-list">
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Developing a meditech app comes with its own set of challenges.
                    </li>
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      These include ensuring user-friendly interfaces, maintaining data security, integrating with existing healthcare systems, and complying with regulations.
                    </li>
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Additionally, keeping up with rapid technological advancements and addressing user feedback effectively can be daunting.
                    </li>
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      It's crucial to navigate these hurdles to create a successful and impactful application.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text (just after Challenges Image) */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="case-study-solutions-text-wrapper">
                  <h3 className="case-study-solutions-heading">Solutions</h3>
                  <ul className="case-study-solutions-list">
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Developing a meditech app comes with its own set of challenges.
                    </li>
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      These include ensuring user-friendly interfaces, maintaining data security, integrating with existing healthcare systems, and complying with regulations.
                    </li>
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Additionally, keeping up with rapid technological advancements and addressing user feedback effectively can be daunting.
                    </li>
                    <li className={bulletPointsVisible ? "case-study-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      It's crucial to navigate these hurdles to create a successful and impactful application.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="case-study-tools-section pb-7">
          <div className="container">
            <div className="case-study-tools-wrapper">
              <h2 className="case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="case-study-underline-img" />
                </span>
              </h2>
              
              <div className="case-study-tools-grid">
                {/* Top Row */}
                <div className="case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="case-study-tool-logo" />
                  <p className="case-study-tool-name">Figma</p>
                </div>
                <div className="case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="case-study-tool-logo" />
                  <p className="case-study-tool-name">Adobe XD</p>
                </div>
                <div className="case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="case-study-tool-logo" />
                  <p className="case-study-tool-name">Sketch</p>
                </div>
                <div className="case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="case-study-tool-logo" />
                  <p className="case-study-tool-name">Framer</p>
                </div>
                <div className="case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="case-study-tool-logo" />
                  <p className="case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="case-study-tool-item case-study-tool-empty"></div>
                <div className="case-study-tool-item case-study-tool-empty"></div>
                <div className="case-study-tool-item case-study-tool-empty"></div>
                <div className="case-study-tool-item case-study-tool-empty"></div>
                <div className="case-study-tool-item case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="case-study-component5-section py-7">
          <div className="container">
            <div className="row case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CaseStudy;

