import React from "react";
import "./Work.css";
import { Navbar } from "../Navbar/Navbar"; // your named export
import { BestProjects } from "../BestProjects/BestProjects";
import { HowWeWork } from "../Service-How-We-Work/HowWeWork";
import { ToolsAndTechUsedWeb } from "../ToolsAndTechUsedWeb/ToolsAndTechUsedWeb";
import Footer from "../Footer/Footer";
import Ourwork from "../OurWork/Ourwork";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";

const Work = () => {
  return (
    <>
        <div className="work-hero-section">
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
