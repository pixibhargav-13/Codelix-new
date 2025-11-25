import React from "react";
import blackArrow from "../images/blackArrow.png";
import whiteArrow from "../images/whiteArrow.png";
import aanganOne from "../images/homepage-aangan-one.png";
import customSoftware from "../images/homepage-custom-software.png";
import eCommerce from "../images/homepag-e-commerce.png";
import autoHub from "../images/homepage-autohub.png";
import underline from "../images/what-we-build-underline.png";
import "./WhatWeBuild.css";

export const WhatWeBuild = () => {
  const cards = [
    {
      id: 1,
      image: aanganOne,
      title:
        "A Smart Society Management App for Modern Residential Communities",
      description:
        "A fully functional mobile application designed to simplify and digitise everyday society operations. It enhances communication between residents...",
      buttonText: "Read",
    },
    {
      id: 2,
      image: customSoftware,
      title:
        "A Custom ERP Solution Designed for Industrial & Financial Workflows",
      description:
        "A robust and scalable ERP system designed to handle complex industrial workflows, streamline financial processes, and support high-volume operations.",
      buttonText: "Read",
    },
    {
      id: 3,
      image: eCommerce,
      title:
        "A High-Performance E-Commerce Platform for Premium Book Collections",
      description:
        "A modern and intuitive online storefront designed specifically for book retail, featuring smooth navigation, elegant product showcases, and a se...",
      buttonText: "Read",
    },
    {
      id: 4,
      image: autoHub,
      title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars",
      description:
        "A user-friendly automotive mobile application designed to make the car buying and selling process simple, transparent, and efficient. The platfor...",
      buttonText: "Read",
    },
  ];

  return (
    <section className="what-we-build py-5">
      <div className="container text-center">
        <h2 className="heading-provide mb-2">
          This Is What{" "}
          <span className="underline-wrapper fw-bold">
            We Build
            <img src={underline} alt="underline" className="underline-img" />
          </span>
        </h2>

        <p className="gray-font gray-font-margin-top mb-5">
          We build AI-driven Tech experiences that combine elegant design,
          seamless performance, and measurable results.
        </p>

        <div className="row g-4">
          {cards.map((card) => (
            <div className="col-lg-6" key={card.id}>
              <div className="card what-card h-100">
                {/* IMAGE */}
                <div className="image-wrapper">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-img-top"
                  />
                </div>

                {/* TEXT */}
                <div className="card-body text-start d-flex justify-content-between card-text-section">
                  <h5 className="fw-bold mt-1">{card.title}</h5>
                  <button className="btn btn-outline-dark px-3 d-flex read-btn align-items-center">
                    <span>{card.buttonText}</span>
                    <img src={blackArrow} alt="arrow" className="arrow-icon" />
                  </button>
                </div>

                {/* DESCRIPTION */}
                <div className="card-body text-start gray-font">
                  <p className="description mt-2">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button className="btn blue-common-btn mt-4 d-flex align-items-center justify-content-between view-all-button">
            <span>View All</span>
            <img src={whiteArrow} alt="arrow" className="arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};
