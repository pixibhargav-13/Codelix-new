import React from "react";
import "./About.css";
import { SEO } from "../../components/SEO";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <>
      <SEO
        title="About Codelix | AI-Powered Development Team"
        description="Learn about Codelix - your partner in building AI-powered web, app, and SaaS solutions with cutting-edge technology and exceptional design."
        keywords="about codelix, development team, company information, our story"
        canonical="https://codelix.com/about"
      />
      <div className="about">
        <Navbar />
        <div className="about-main">
          <div className="about-inner">
            <span className="about-badge">Page update in progress</span>
            <h1 className="about-title">
              We&apos;re refreshing our{" "}
              <span className="about-highlight">About</span> page
            </h1>
            <p className="about-text">
              We&apos;re crafting a new story that better showcases who we are,
              how we work, and the teams behind our AI-driven products. While
              we finalize the details, you can still explore our live work and
              services across the site.
            </p>
            <div className="about-pill-row">
              <span className="about-pill">Designing better content</span>
              <span className="about-pill">Updating our journey</span>
              <span className="about-pill">Polishing case studies</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;