import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BestProjects.css";
import underline from "../Images/what-we-build-underline.png";
import whiteArrow from "../Images/whiteArrow.png";
import projectOne from "../Images/work-best-project-one.png";
import projectTwo from "../Images/work-best-project-two.png";
import projectThree from "../Images/work-best-project-three.png";
import projectFour from "../Images/work-best-project-four.png";
import projectFive from "../Images/work-best-project-five.png";
import projectSix from "../Images/work-best-project-six.png";
import projectSeven from "../Images/work-best-project-seven.png";
import projectEight from "../Images/work-best-project-eight.png";
import projectNine from "../Images/work-best-project-nine.png";
import projectTen from "../Images/work-best-project-ten.png";
import projectEleven from "../Images/work-best-project-eleven.png";
import projectTwelve from "../Images/work-best-project-twelve.png";
import projectThirteen from "../Images/work-best-project-thirteen.png";
import projectFourteen from "../Images/work-best-project-fourteen.png";
import projectFifteen from "../Images/work-best-project-fifteen.png";
import projectSixteen from "../Images/work-best-project-sixteen.png";



export const BestProjects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

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
    {
      id: 4,
      title:
        "A Feature-Rich Mobile Marketplace for Buying & Selling Cars",
      description:
        "A user-friendly automotive mobile application designed to make the car buying and selling process simple, transparent, and efficient. The platform allows users to browse a wide range of vehicles with detailed specifications, list their own cars for sale in just a few steps, and compare different options side-by-side to make confident decisions. With secure flows, smart search filters, real-time updates, and an intuitive interface, the app streamlines the entire journey, from discovery to final transaction, making it effortless for buyers, sellers, and dealers alike.",
      tags: ["Android", "ios"],
      buttonText: "Read Case Study",
      image: projectFour,
    },
    {
      id: 5,
      title:
        "A High-Performance E-Commerce Platform for Premium Book Collections",
      description:
        "A modern and intuitive online storefront designed specifically for book retail, featuring smooth navigation, elegant product showcases, and a seamless browsing experience. The platform highlights each book with high-quality visuals, detailed descriptions, and an organized category structure that helps users discover titles easily.",
      tags: ["ReactJS", "tailwind"],
      buttonText: "Read Case Study",
      image: projectFive,
    },
    {
      id: 6,
      title:
        "Modern Website UI/UX Design for a Creative Agency",
      description:
        "This project showcases the complete UI/UX design for a modern creative agency website. The design focuses on a bold visual identity, clean layout structures, and a smooth user journey across all pages. Each section—from the hero area to services, case studies, contact flow, and navigation—has been crafted with a strong emphasis on clarity, usability, and visual appeal.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectSix,
    },
    {
      id: 7,
      title:
        "Modern HR Portal for Employee Benefits - Web Development",
      description:
        "A modern, responsive web platform developed to simplify employee benefits, claims, and HR administration. The website includes a clean dashboard for employees to view benefits, submit claims, track approvals, and access important HR resources with ease.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectSeven,
    },
    {
      id: 8,
      title:
        "Organic Makhana Store – Responsive E-Commerce Platform",
      description:
        "A clean and responsive e-commerce website designed for a premium makhana brand. The platform showcases multiple product categories with high-quality visuals, clear structure, and an effortless shopping experience. Built with a mobile-first layout, smooth navigation, and optimised product pages, it enhances customer trust and supports strong conversion flow.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectEight,
    },
    {
      id: 9,
      title:
        "Modern EdTech Website for Online Courses",
      description:
        "A modern web platform developed for an online learning experience, featuring smooth navigation, structured course pages, and a clean, welcoming interface. The website is built with fast performance, mobile responsiveness, and a user-friendly flow to make online education simple and engaging.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectNine,
    },
    {
      id: 10,
      title:
        "Custom Payroll Management System – Web & Mobile",
      description:
        "A fully custom payroll management system developed to simplify employee salary processing, attendance tracking, and financial reporting for businesses. This solution includes a responsive web dashboard and mobile interface, enabling HR teams and employees to manage payroll activities from anywhere.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectTen,
    },
    {
      id: 11,
      title:
        "Elegant Creative Agency Website – UI/UX Design",
      description:
        "A high-end UI/UX design created for a modern creative studio website. The interface uses dark-mode aesthetics, clean grids, and strong typography to showcase projects in a bold and visually engaging way. Designed to highlight creativity while keeping the experience smooth and intuitive across all devices.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectEleven,
    },
    {
      id: 12,
      title:
        "AI-Powered Design Platform – UI/UX Concept",
      description:
      "This project showcases a futuristic UI/UX concept created for an AI-powered design platform. The interface focuses on bold visuals, modern gradients, and a clean layout that highlights the platform’s innovative features. The goal was to craft an immersive user experience centered around simplicity, intuitive navigation, and high visual impact. Every section—from the hero banner to the feature highlights—is designed to communicate advanced technology while staying user-friendly and accessible.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectTwelve,
    },
    {
      id: 13,
      title:
        "Freight & Shipping Web Platform – Modern Development",
      description:
      "A fully responsive and modern website developed for an international ocean freight and logistics service provider. The platform showcases global cargo solutions, shipment tracking features, service categories, and detailed logistics information through a clean, intuitive interface.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectThirteen,
    },
    {
      id: 14,
      title:
        "Smart Business Operations System - Custom Software",
      description:
      "A fully customized software system developed to help businesses manage their operations more efficiently. The platform includes a clean web dashboard and a mobile-friendly interface, offering seamless access to core business modules such as order tracking, inventory management, staff workflows, and real-time reporting.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectFourteen,
    },
    {
      id: 15,
      title:
        "Morden School Management Mobile Application",
      description:
      "A modern and user-friendly mobile application developed to streamline school operations, student schedules, and daily academic activities. The app allows students and teachers to manage classes, view timetables, check announcements, and stay updated with important academic information.",
      tags: ["Mobile", "Web"],
      buttonText: "Read Case Study",
      image: projectFifteen,
    },
  ];

  // Filter mapping: filter name -> project IDs
  const filterMap = {
    "Custom Software Development": [2, 10, 14],
    "Web Development": [7, 9, 13],
    "Application Development": [3, 4, 15],
    "UI/UX Design": [6, 11, 12],
    "E-Commerce Solutions": [1, 5, 8],
    "AI Development": [], // No projects assigned yet
  };

  const handleFilterClick = (filterName) => {
    // Toggle filter: if same filter clicked, reset to show all
    if (activeFilter === filterName) {
      setActiveFilter("All");
    } else {
      setActiveFilter(filterName);
    }
  };

  // Filter projects based on active filter
  const getFilteredProjects = () => {
    // Show all projects when "All" is selected or no filter is active
    if (!activeFilter || activeFilter === "All") {
      return projects;
    }
    const projectIds = filterMap[activeFilter] || [];
    return projects.filter((project) => projectIds.includes(project.id));
  };

  return (
    <section className="best-projects-section pt-7 pb-5 bg-white">
      <div className="container">
        <h2 className="heading-provide text-center mb-3">
          Some Of Our{" "}
          <span className="underline-wrapper fw-bold">
            Best Projects
            <img src={underline} alt="underline" className="underline-img" />
          </span>
        </h2>

        <div className="filter-tags d-flex flex-wrap justify-content-center gap-3 ">
          {[
            "All",
            "Custom Software Development",
            "Web Development",
            "Application Development",
            "UI/UX Design",
            "E-Commerce Solutions",
            "AI Development",
          ].map((tag, i) => (
            <span
              className={`filter-badge ${activeFilter === tag ? "active" : ""}`}
              key={i}
              onClick={() => handleFilterClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* PROJECT CARDS */}
        <div className="projects-wrapper">
          {getFilteredProjects().map((project, index) => {
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

                    <button 
                      className="btn read-case-study-btn project-btn"
                      onClick={() => {
                        if (project.id === 1) {
                          navigate("/nextgen-case-study");
                        } else if (project.id === 2) {
                          navigate("/erp-case-study");
                        } else if (project.id === 10) {
                          navigate("/payroll-case-study");
                        } else if (project.id === 14) {
                          navigate("/smart-business-case-study");
                        } else {
                          navigate("/case-study");
                        }
                      }}
                    >
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