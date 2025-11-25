import React from "react";
import "./Work.css";
import { BestProjects } from "../BestProjects/BestProjects";
import { LetsBuildSomething } from "../Let'sBuildSomething/LetsBuildSomething";
import Ourwork from "../OurWork/Ourwork";
import Footer from "../Footer/Footer";

const Work = () => {
  return (
    <>
      <div className="work-page">
        <div className="best-projects">
          <BestProjects />
        </div>
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
