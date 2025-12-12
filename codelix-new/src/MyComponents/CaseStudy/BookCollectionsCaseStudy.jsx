import React, { useState, useEffect, useRef } from "react";
import "./BookCollectionsCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo_v2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-five.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light9.png";
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

const BookCollectionsCaseStudy = () => {
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
  const targetValues = { projects: 40, success: 99, years: 28 };

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
        title="Book Collections Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/book-collections-case-study"
      />
      <div className="book-collections-case-study-page">
        <div className="book-collections-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="book-collections-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch book-collections-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 book-collections-case-study-content-col">
                <div className="book-collections-case-study-content-wrapper">
                  <h1 className="book-collections-case-study-hero-title">
                    A High-Performance E-Commerce Platform for Premium Book Collections
                  </h1>
                  <p className="book-collections-case-study-hero-description">
                    A modern and intuitive online storefront designed specifically for book retail, featuring smooth navigation, elegant product showcases, and a seamless browsing experience. The platform highlights each book with high-quality visuals, detailed descriptions, and an organized category structure that helps users discover titles easily.
                  </p>
                  
                  {/* Tags */}
                  <div className="book-collections-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="book-collections-case-study-tag-badge">ReactJS</span>
                    <span className="book-collections-case-study-tag-badge">Tailwind</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn book-collections-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="book-collections-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 book-collections-case-study-image-col">
                <div className="book-collections-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="Book Collections Project" 
                    className="book-collections-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="book-collections-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="book-collections-case-study-section">
              <h2 className="book-collections-case-study-section-heading mb-5">
                Project{" "}
                <span className="book-collections-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="book-collections-case-study-underline-img" />
                </span>
              </h2>
              <p className="book-collections-case-study-section-paragraph">
              This high-performance e-commerce platform was designed exclusively for premium and collectible book collections. Built with a strong focus on aesthetics, speed, and user experience, the storefront showcases each book with high-quality visuals, detailed descriptions, and an elegant layout that matches the brand’s premium identity.
              </p>
              <p className="book-collections-case-study-section-paragraph">
              The platform offers smooth navigation, advanced catalog filtering, and a simplified purchasing flow — ensuring customers can browse, explore, and buy rare titles effortlessly. Built with ReactJS and Tailwind, the system delivers a fast, responsive, and modern online shopping experience.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="book-collections-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="book-collections-case-study-outcomes-wrapper">
              <h2 className="book-collections-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="book-collections-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="book-collections-case-study-underline-img" />
                </span>
              </h2>

              <p className="book-collections-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row book-collections-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="book-collections-case-study-outcome-card">
                    <div className="book-collections-case-study-outcome-number">{counts.projects}%</div>
                    <div className="book-collections-case-study-outcome-label">Increase in product discovery and engagement</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="book-collections-case-study-outcome-card">
                    <div className="book-collections-case-study-outcome-number">{counts.success}%</div>
                    <div className="book-collections-case-study-outcome-label">responsive compatibility across desktop and mobile</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="book-collections-case-study-outcome-card">
                    <div className="book-collections-case-study-outcome-number">{counts.years}%</div>
                    <div className="book-collections-case-study-outcome-label">increase in checkout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="book-collections-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="book-collections-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="book-collections-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row book-collections-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="book-collections-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="book-collections-case-study-challenges-text-wrapper">
                  <h3 className="book-collections-case-study-challenges-heading">Challenges</h3>
                  <ul className="book-collections-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      Creating an intuitive browsing experience for large book catalogs with multiple categories and genres.
                    </li>
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Ensuring fast page load times and smooth navigation despite high-quality product images and descriptions.
                    </li>
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      Implementing responsive design that works seamlessly across desktop, tablet, and mobile devices.
                    </li>
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Building a secure and efficient checkout process that minimizes cart abandonment.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="book-collections-case-study-solutions-text-wrapper">
                  <h3 className="book-collections-case-study-solutions-heading">Solutions</h3>
                  <ul className="book-collections-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Developed a sophisticated category filtering system with search functionality to help users quickly find books by genre, author, or title.
                    </li>
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Optimized images and implemented lazy loading techniques to ensure fast page loads and smooth user experience.
                    </li>
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Built a fully responsive design using Tailwind CSS that adapts beautifully to all screen sizes and devices.
                    </li>
                    <li className={bulletPointsVisible ? "book-collections-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Created a streamlined checkout process with multiple payment options and secure transaction handling.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="book-collections-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="book-collections-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="book-collections-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="book-collections-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="book-collections-case-study-tools-wrapper">
              <h2 className="book-collections-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="book-collections-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="book-collections-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="book-collections-case-study-tools-grid">
                {/* Top Row */}
                <div className="book-collections-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="book-collections-case-study-tool-logo" />
                  <p className="book-collections-case-study-tool-name">Figma</p>
                </div>
                <div className="book-collections-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="book-collections-case-study-tool-logo" />
                  <p className="book-collections-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="book-collections-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="book-collections-case-study-tool-logo" />
                  <p className="book-collections-case-study-tool-name">Sketch</p>
                </div>
                <div className="book-collections-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="book-collections-case-study-tool-logo" />
                  <p className="book-collections-case-study-tool-name">Framer</p>
                </div>
                <div className="book-collections-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="book-collections-case-study-tool-logo" />
                  <p className="book-collections-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="book-collections-case-study-tool-item book-collections-case-study-tool-empty"></div>
                <div className="book-collections-case-study-tool-item book-collections-case-study-tool-empty"></div>
                <div className="book-collections-case-study-tool-item book-collections-case-study-tool-empty"></div>
                <div className="book-collections-case-study-tool-item book-collections-case-study-tool-empty"></div>
                <div className="book-collections-case-study-tool-item book-collections-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Component 5 Images Section */}
        <div className="book-collections-case-study-component5-section py-7">
          <div className="container">
            <div className="row book-collections-case-study-component5-row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="book-collections-case-study-component5-image" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={component5Image} alt="Component 5" className="book-collections-case-study-component5-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="book-collections-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BookCollectionsCaseStudy;

