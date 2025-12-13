import React from "react";
import "./About.css";
import { SEO } from "../../components/SEO";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import Ourwork from "../OurWork/Ourwork";
import whiteArrow from "../Images/whiteArrow.png";
import aboutHeroImage from "../Images/Hero_bannerr.png";
import underline from "../Images/what-we-build-underline.png";
import financeIcon from "../Images/Finance.png";
import logisticIcon from "../Images/Logistic & Supply chain.png";
import healthcareIcon from "../Images/Healthcare.png";
import ecommerceIcon from "../Images/E-commerce.png";
import fintechIcon from "../Images/Fintech.png";
import educationIcon from "../Images/Education.png";
import manufacturingIcon from "../Images/Manufacturing.png";
import saasIcon from "../Images/SaaS.png";
import travelIcon from "../Images/Travel & Hospitality.png";
import fashionIcon from "../Images/Fashion.png";
import consumerServiceIcon from "../Images/Consumer Service.png";
import staffingIcon from "../Images/Staffing.png";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="About Codelix | AI-Powered Development Team"
        description="Learn about Codelix - your partner in building AI-powered web, app, and SaaS solutions with cutting-edge technology and exceptional design."
        keywords="about codelix, development team, company information, our story"
        canonical="https://codelix.com/about"
      />
      <div className="about-page">
        <div className="about-hero-section">
          <Navbar />
          <section className="text-white py-5">
            <div className="container">
              <div className="row g-4 align-items-stretch">
                {/* Left Text */}
                <div className="col-lg-7">
                  <div className="about-hero-content-wrapper p-4 border border-secondary h-100 d-flex flex-column justify-content-between">
                    <div className="top">
                      <h1 className="fw-bold display-6 hanken-grotesk about-hero-title">
                        Your Tech Partner in a Fast Changing World.
                      </h1>
                      <p className="mt-3 light-gray inter fs-5 about-hero-description">
                        We create digital experiences that drive business performance to help organizations adapt to shifts in customer seek behaviour and technology.
                      </p>
                    </div>

                    <div className="d-flex gap-3 hero-buttons">
                      <button
                        className="btn about-schedule-btn d-flex align-items-center justify-content-between"
                        onClick={() => navigate('/contact')}
                      >
                        <span>Schedule A Call</span>
                        <img
                          src={whiteArrow}
                          alt="arrow"
                          className="arrow-icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="col-lg-5">
                  <div className="border border-secondary d-flex justify-content-center align-items-center h-100 no-spacing about-hero-image-wrapper">
                    <img
                      src={aboutHeroImage}
                      alt="About Codelix"
                      className="img-fluid right-image about-hero-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Our Core Philosophy Section */}
        <div className="about-philosophy-section py-7">
          <div className="container">
            <div className="about-philosophy-wrapper">
              <div className="about-philosophy-header">
                <h2 className="about-philosophy-heading">
                  Our Core{" "}
                  <span className="about-philosophy-underline-wrapper fw-bold">
                    Philosophy
                    <img src={underline} alt="underline" className="about-philosophy-underline-img" />
                  </span>
                </h2>
              </div>

              <div className="about-philosophy-cards d-flex justify-content-center flex-md-row flex-column text-center">
                <div className="about-philosophy-card">
                  <h4>Our Mission</h4>
                  <p>
                    To empower businesses and startups with exceptional products that wow customers.
                  </p>
                </div>

                <div className="about-philosophy-card">
                  <h4>Our Vision</h4>
                  <p>
                    To empower businesses and startups with exceptional products that wow customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Companies Across Industries Section */}
        <div className="about-industries-section py-7">
          <div className="container">
            <div className="about-industries-wrapper">
              <h2 className="about-industries-heading pb-3">
                Trusted By Companies Across{" "}
                <span className="about-industries-underline-wrapper fw-bold">
                  Industries
                  <img src={underline} alt="underline" className="about-industries-underline-img" />
                </span>
              </h2>
              
              <div className="about-industries-grid">
                <div className="about-industry-item">
                  <img src={financeIcon} alt="Finance" className="about-industry-icon" />
                  <p className="about-industry-name">Finance</p>
                </div>
                <div className="about-industry-item">
                  <img src={logisticIcon} alt="Logistic & Supply chain" className="about-industry-icon" />
                  <p className="about-industry-name">Logistic & Supply chain</p>
                </div>
                <div className="about-industry-item">
                  <img src={healthcareIcon} alt="Healthcare" className="about-industry-icon" />
                  <p className="about-industry-name">Healthcare</p>
                </div>
                <div className="about-industry-item">
                  <img src={ecommerceIcon} alt="E-commerce" className="about-industry-icon" />
                  <p className="about-industry-name">E-commerce</p>
                </div>
                <div className="about-industry-item">
                  <img src={fintechIcon} alt="FinTech" className="about-industry-icon" />
                  <p className="about-industry-name">FinTech</p>
                </div>
                <div className="about-industry-item">
                  <img src={educationIcon} alt="Education" className="about-industry-icon" />
                  <p className="about-industry-name">Education</p>
                </div>
                <div className="about-industry-item">
                  <img src={manufacturingIcon} alt="Manufacturing" className="about-industry-icon" />
                  <p className="about-industry-name">Manufacturing</p>
                </div>
                <div className="about-industry-item">
                  <img src={saasIcon} alt="SaaS" className="about-industry-icon" />
                  <p className="about-industry-name">SaaS</p>
                </div>
                <div className="about-industry-item">
                  <img src={travelIcon} alt="Travel & Hospitality" className="about-industry-icon" />
                  <p className="about-industry-name">Travel & Hospitality</p>
                </div>
                <div className="about-industry-item">
                  <img src={fashionIcon} alt="Fashion" className="about-industry-icon" />
                  <p className="about-industry-name">Fashion</p>
                </div>
                <div className="about-industry-item">
                  <img src={consumerServiceIcon} alt="Consumer Service" className="about-industry-icon" />
                  <p className="about-industry-name">Consumer Service</p>
                </div>
                <div className="about-industry-item">
                  <img src={staffingIcon} alt="Staffing" className="about-industry-icon" />
                  <p className="about-industry-name">Staffing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Foundations Of Codelix Section */}
        <div className="about-foundations-section pt-6">
          <div className="container">
            <div className="about-foundations-wrapper">
              <h2 className="about-foundations-heading">
                The Foundations Of{" "}
                <span className="about-foundations-underline-wrapper fw-bold">
                  Codelix
                  <img src={underline} alt="underline" className="about-foundations-underline-img" />
                </span>
              </h2>

              <div className="about-foundations-cards row g-4">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="about-foundation-card">
                    <div className="about-foundation-number">01</div>
                    <h3 className="about-foundation-title">Innovation-Driven Solutions</h3>
                    <p className="about-foundation-description">
                      We build lasting, trusted partnerships by providing top talent, expertise, and innovative solutions to tackle complex challenges with confidence.
                    </p>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="about-foundation-card">
                    <div className="about-foundation-number">02</div>
                    <h3 className="about-foundation-title">Design-First Excellence</h3>
                    <p className="about-foundation-description">
                      We hire top talent to drive our vision, staying ahead with rising technologies to ensure innovation, excellence, & exceptional customer service.
                    </p>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="about-foundation-card">
                    <div className="about-foundation-number">03</div>
                    <h3 className="about-foundation-title">Full-Spectrum Partnership</h3>
                    <p className="about-foundation-description">
                      We provide end-to-end solutions, from strategy to execution, crafting intuitive experiences that align with your vision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Build Something Section */}
        <LetsBuildSomething />

        {/* Our Work Through Client's Words Section */}
        <div className="about-ourwork-section">
          <Ourwork />
        </div>

        <div className="about-footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;