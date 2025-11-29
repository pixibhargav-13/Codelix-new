import React from "react";
import "./Work.css";
import { Navbar } from "../Navbar/Navbar"; // your named export
import { BestProjects } from "../BestProjects/BestProjects";
import { HowWeWork } from "../Service-How-We-Work/HowWeWork";
import { ToolsAndTechUsedWeb } from "../ToolsAndTechUsedWeb/ToolsAndTechUsedWeb";
import Footer from "../Footer/Footer";
import Ourwork from "../OurWork/Ourwork";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import { SEO } from "../../components/SEO";

const Work = () => {
  return (
    <>
      <SEO
        title="Our Work | Portfolio | AI-Driven Projects | Codelix"
        description="Explore our portfolio of AI-driven web apps, mobile solutions, and SaaS platforms. See how we deliver elegant design and exceptional performance."
        keywords="portfolio, case studies, web development projects, app development, project showcase"
        canonical="https://codelix.com/work"
      />
      <div className="work-hero-section">
          <Navbar/>
          <div className="work-content">
            <h1>Work</h1>
            <p>
              We build AI-driven Tech experiences that combine elegant design,
              <span className="line-break">
                seasonless seamless performance, and measurable results.
              </span>
            </p>
          </div>
        </div>

        <div className="best-projects">
          <BestProjects />
        </div>

        <div className="lets-build-something">
          <LetsBuildSomething />
        </div>

        <div className="our-work">
          <Ourwork />
        </div>

        <div className="footer">
          <Footer />
        </div>
    </>
  );
};

export default Work;
