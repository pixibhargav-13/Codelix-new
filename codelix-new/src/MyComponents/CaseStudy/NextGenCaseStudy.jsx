import React, { useState, useEffect, useRef } from "react";
import "./NextGenCaseStudy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import logoV2 from "../Images/Logo-V2.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectImage from "../Images/work-best-project-one.png";
import underline from "../Images/what-we-build-underline.png";
import lightImage from "../Images/Light.png";
import light2Image from "../Images/Light7.png";
import fam1Image from "../Images/fam-1.png";
import fam2Image from "../Images/fam-2.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import projectFive from "../Images/work-best-project-five.png";
import projectEight from "../Images/work-best-project-eight.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NextGenCaseStudy = () => {
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
  const targetValues = { projects: 42, success: 29, years: 20 };

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
        title="NextGen Case Study | Codelix"
        description="Explore our detailed case studies showcasing innovative solutions and successful projects."
        keywords="case study, project details, portfolio, web development case study"
        canonical="https://codelix.com/nextgen-case-study"
      />
      <div className="nextgen-case-study-page">
        <div className="nextgen-case-study-hero-section">
          <Navbar logo={logoV2} />
          
          {/* Back Button */}
          <div className="container">
            <button className="nextgen-case-study-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="container">
            <div className="row align-items-stretch nextgen-case-study-hero-row">
              {/* Left Content */}
              <div className="col-lg-8 nextgen-case-study-content-col">
                <div className="nextgen-case-study-content-wrapper">
                  <h1 className="nextgen-case-study-hero-title">
                    NextGen – Modern Fashion E-Commerce Website
                  </h1>
                  <p className="nextgen-case-study-hero-description">
                    A modern and fully responsive e-commerce website built for a fashion and lifestyle brand offering clothing, eyewear, and accessories. This platform features a clean user interface, intuitive navigation, and a seamless shopping experience designed to maximize user engagement and conversions.
                  </p>
                  
                  {/* Tags */}
                  <div className="nextgen-case-study-tags d-flex flex-wrap gap-2 mb-4">
                    <span className="nextgen-case-study-tag-badge">Mobile</span>
                    <span className="nextgen-case-study-tag-badge">Web</span>
                  </div>

                  {/* Schedule A Call Button */}
                  <button className="btn nextgen-case-study-schedule-btn">
                    <span>Schedule A Call</span>
                    <img src={whiteArrow} alt="arrow" className="nextgen-case-study-arrow-icon" />
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4 nextgen-case-study-image-col">
                <div className="nextgen-case-study-image-wrapper">
                  <img 
                    src={projectImage} 
                    alt="NextGen Project" 
                    className="nextgen-case-study-hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nextgen-case-study-main-content py-5">
          <div className="container">
            {/* Project Overview Section */}
            <div className="nextgen-case-study-section">
              <h2 className="nextgen-case-study-section-heading mb-5">
                Project{" "}
                <span className="nextgen-case-study-underline-wrapper fw-bold">
                  Overview
                  <img src={underline} alt="underline" className="nextgen-case-study-underline-img" />
                </span>
              </h2>
              <p className="nextgen-case-study-section-paragraph">
               The NextGen Fashion E-Commerce Website is a modern, fully responsive online storefront created for a lifestyle brand selling clothing, eyewear, and accessories. The platform delivers a clean and elegant interface with intuitive navigation, ensuring that users can browse categories, explore product details, and complete purchases effortlessly.
              </p>
              <p className="nextgen-case-study-section-paragraph">
                With a strong focus on conversion optimization, the website includes smooth transitions, fast load speeds, and visually appealing product layouts that highlight the brand’s unique style. Built for both mobile and web users, the platform ensures a seamless shopping experience across all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="nextgen-case-study-outcomes-section py-5" ref={outcomesRef}>
          <div className="container">
            <div className="nextgen-case-study-outcomes-wrapper">
              <h2 className="nextgen-case-study-outcomes-heading mb-3">
                Project{" "}
                <span className="nextgen-case-study-underline-wrapper fw-bold">
                  Outcomes
                  <img src={underline} alt="underline" className="nextgen-case-study-underline-img" />
                </span>
              </h2>

              <p className="nextgen-case-study-outcomes-subtitle mb-5">
                An overview of the transformation the client saw after project completion
              </p>
              
              <div className="row nextgen-case-study-outcomes-cards">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="nextgen-case-study-outcome-card">
                    <div className="nextgen-case-study-outcome-number">{counts.projects}%</div>
                    <div className="nextgen-case-study-outcome-label"> increase in product views</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="nextgen-case-study-outcome-card">
                    <div className="nextgen-case-study-outcome-number">{counts.success}%</div>
                    <div className="nextgen-case-study-outcome-label">faster average browsing speed</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="nextgen-case-study-outcome-card">
                    <div className="nextgen-case-study-outcome-number">{counts.years}%</div>
                    <div className="nextgen-case-study-outcome-label">improvement in checkout completion rates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light Image Section */}
        <div className="nextgen-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={lightImage} alt="Light" className="nextgen-case-study-light-image" />
          </div>
        </div>

        {/* Challenges & Solutions Section */}
        <div className="nextgen-case-study-challenges-solutions-section py-5" ref={challengesRef}>
          <div className="container">
            <div className="row nextgen-case-study-challenges-grid">
              {/* Top Left - Challenges Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam1Image} alt="Challenges" className="nextgen-case-study-challenges-image" />
              </div>

              {/* Top Right - Challenges Text */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="nextgen-case-study-challenges-text-wrapper">
                  <h3 className="nextgen-case-study-challenges-heading">Challenges</h3>
                  <ul className="nextgen-case-study-challenges-list">
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.1s" }}>
                      The previous website lacked modern visuals, reducing brand appeal and trust.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.2s" }}>
                      Users struggled to browse through categories like clothing, eyewear, and accessories efficiently.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.3s" }}>
                      A majority of fashion shoppers visit from mobile, but the old site had slow load times and inconsistent layouts.
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.4s" }}>
                      Limited image variety and poor description placement negatively affected conversions.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Left - Solutions Text (just after Challenges Image) */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="nextgen-case-study-solutions-text-wrapper">
                  <h3 className="nextgen-case-study-solutions-heading">Solutions</h3>
                  <ul className="nextgen-case-study-solutions-list">
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.5s" }}>
                      Clean, elegant layouts inspired by premium fashion brands, High-quality visuals and product spotlights, Curated collections (e.g., Trending, New Arrivals, Essentials)
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.6s" }}>
                      Intuitive Category Navigation- Clothing, Eyewear, Accessories, Seasonal collections
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.7s" }}>
                      Mobile-First Experience- Touch-friendly interactions, Faster load speeds, Optimized product grid layouts, Smooth page transitions
                    </li>
                    <li className={bulletPointsVisible ? "nextgen-bullet-visible" : ""} style={{ transitionDelay: "0.8s" }}>
                      Conversion-Optimized Product Pages- Large product images, Zoom & multiple-angle views, Clear CTAS, Detailed descriptions, measurements, and fabric info
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right - Solutions Image */}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={fam2Image} alt="Solutions" className="nextgen-case-study-solutions-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Light2 Image Section */}
        <div className="nextgen-case-study-light-image-wrapper py-5">
          <div className="container">
            <img src={light2Image} alt="Light2" className="nextgen-case-study-light-image" />
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="nextgen-case-study-tools-section pb-7 pt-4">
          <div className="container">
            <div className="nextgen-case-study-tools-wrapper">
              <h2 className="nextgen-case-study-tools-heading pb-3">
                Tools & Technologies We Use In{" "}
                <span className="nextgen-case-study-underline-wrapper fw-bold">
                  This Project
                  <img src={underline} alt="underline" className="nextgen-case-study-underline-img" />
                </span>
              </h2>
              
              <div className="nextgen-case-study-tools-grid">
                {/* Top Row */}
                <div className="nextgen-case-study-tool-item">
                  <img src={figmaLogo} alt="Figma" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Figma</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={adobeXdLogo} alt="Adobe XD" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Adobe XD</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={sketchLogo} alt="Sketch" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Sketch</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={framerLogo} alt="Framer" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Framer</p>
                </div>
                <div className="nextgen-case-study-tool-item">
                  <img src={canvaLogo} alt="Canva" className="nextgen-case-study-tool-logo" />
                  <p className="nextgen-case-study-tool-name">Canva</p>
                </div>
                
                {/* Bottom Row - Empty */}
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
                <div className="nextgen-case-study-tool-item nextgen-case-study-tool-empty"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Best Projects Section */}
        <div className="nextgen-case-study-best-projects-section py-7">
          <div className="container">
            <div className="nextgen-case-study-best-projects-wrapper">
              {/* Project 1: Book Collections */}
              <div className="nextgen-case-study-best-project-card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <img
                      src={projectFive}
                      alt="A High-Performance E-Commerce Platform for Premium Book Collections"
                      className="nextgen-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 nextgen-case-study-best-project-content-col">
                    <div className="nextgen-case-study-best-project-content">
                      <h3 className="nextgen-case-study-best-project-title">
                        A High-Performance E-Commerce Platform for Premium Book Collections
                      </h3>
                      <p className="nextgen-case-study-best-project-desc">
                        A high-performance e-commerce website developed for a premium book collection store, featuring advanced search functionality, detailed product pages, and a sophisticated design. The platform provides an exceptional browsing and purchasing experience with optimized performance and responsive layout.
                      </p>
                      <div className="nextgen-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="nextgen-case-study-best-project-tag-badge">Mobile</span>
                        <span className="nextgen-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn nextgen-case-study-read-case-study-btn nextgen-case-study-project-btn"
                      onClick={() => navigate("/book-collections-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="nextgen-case-study-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2: Makhana Store */}
              <div className="nextgen-case-study-best-project-card">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <img
                      src={projectEight}
                      alt="Organic Makhana Store – Responsive E-Commerce Platform"
                      className="nextgen-case-study-best-project-img"
                    />
                  </div>
                  <div className="col-lg-6 nextgen-case-study-best-project-content-col">
                    <div className="nextgen-case-study-best-project-content">
                      <h3 className="nextgen-case-study-best-project-title">
                        Organic Makhana Store – Responsive E-Commerce Platform
                      </h3>
                      <p className="nextgen-case-study-best-project-desc">
                        A fully responsive e-commerce website developed for an organic makhana store, featuring smooth product browsing, secure checkout, and a clean, modern design. The platform ensures a seamless shopping experience across all devices with intuitive navigation and fast performance.
                      </p>
                      <div className="nextgen-case-study-best-project-tags d-flex flex-wrap gap-2 mb-3">
                        <span className="nextgen-case-study-best-project-tag-badge">Mobile</span>
                        <span className="nextgen-case-study-best-project-tag-badge">Web</span>
                      </div>
                    </div>
                    <button
                      className="btn nextgen-case-study-read-case-study-btn nextgen-case-study-project-btn"
                      onClick={() => navigate("/makhana-store-case-study")}
                    >
                      <span>Read Case Study</span>
                      <img src={whiteArrow} className="nextgen-case-study-arrow-icon" />
                    </button>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nextgen-case-study-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NextGenCaseStudy;

