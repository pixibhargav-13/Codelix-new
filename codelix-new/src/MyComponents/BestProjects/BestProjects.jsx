import React from "react";
import "./BestProjects.css";
import underline from "../images/what-we-build-underline.png";
import whiteArrow from "../images/whiteArrow.png";
import projectOne from "../images/work-best-project-one.png";
import projectTwo from "../images/work-best-project-two.png";
import projectThree from "../images/work-best-project-three.png";

export const BestProjects = () => {
  const projects = [
    {
      id: 1,
      title: "NextGen - Modern Fashion E-Commerce Website",
      description:
        "A modern and fully responsive e-commerce website built for a fashion and lifestyle brand offering clothing, eyewear, and accessories. This platform features a clean user interface, intuitive navigation, and a seamless shopping experience designed to maximize user engagement and conversions.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectOne,
    },
    {
      id: 2,
      title:
        "A Custom ERP Solution Designed for Industrial & Financial Workflows",
      description:
        "A robust and scalable ERP system designed to handle complex industrial workflows, streamline financial processes, and support high-volume operational activities with ease. Ensures accuracy, transparency, and smooth coordination across departments.",
      tags: ["AWS", "Web"],
      buttonText: "Read Case Study",
      image: projectTwo,
    },
    {
      id: 3,
      title:
        "A Custom ERP Solution Designed for Industrial & Financial Workflows",
      description:
        "A robust and scalable ERP system designed to handle complex industrial workflows, streamline financial processes, and support high-volume operational activities with ease. Ensures accuracy, transparency, and smooth coordination across departments.",
      tags: ["AWS", "Web"],
      buttonText: "Read Case Study",
      image: projectThree,
    },
  ];

  return (
    <section className="best-projects-section">
      <div className="container">
        <h2 className="heading-provide text-center mb-5">
          Some Of Our{" "}
          <span className="underline-wrapper fw-bold">
            Best Projects
            <img src={underline} alt="underline" className="underline-img" />
          </span>
        </h2>

        <div className="filter-tags d-flex flex-wrap justify-content-center gap-3 mb-5">
          {[
            "Custom Software Development",
            "Web Development",
            "Application Development",
            "UI/UX Design",
            "E-Commerce Solutions",
            "AI Development",
          ].map((tag, i) => (
            <span className="filter-badge mb-5" key={i}>
              {tag}
            </span>
          ))}
        </div>

        {/* PROJECT CARDS */}
        <div className="projects-wrapper">
          {projects.map((project, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div className="project-card" key={project.id}>
                <div
                  className={`row align-items-center ${
                    reverse ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* IMAGE */}
                  <div className="col-lg-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="col-lg-6 project-content-col">
                    <div className="project-content">
                      <h3 className="best-project-title">{project.title}</h3>
                      <p className="project-desc">{project.description}</p>
                      <div className="project-tags d-flex flex-wrap gap-2 mb-3">
                        {project.tags.map((t, idx) => (
                          <span key={idx} className="tag-badge">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="btn read-case-study-btn project-btn">
                      <span>{project.buttonText}</span>
                      <img src={whiteArrow} className="arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
