import React from "react";
import "./WhatWeProvide.css";
import underline from "../Images/what-we-build-underline.png"; // same underline image
import arrow from "../Images/blackArrow.png"; // arrow icon

export const WhatWeProvide = () => {

  // ⭐ SERVICES DATA (auto-rendered using .map())
  const services = [
    {
      id: 1,
      title: "Web Development",
      description:
        "High-performance, scalable websites built with clean code and designed to convert visitors into customers.",
    },
    {
      id: 2,
      title: "Application Development",
      description:
        "Custom-built mobile and web applications engineered for speed, security, and seamless user experience.",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description:
        "Intuitive, modern, and user-first designs crafted to elevate engagement and create memorable digital experiences.",
    },
    {
      id: 4,
      title: "E-Commerce Solutions",
      description:
        "End-to-end e-commerce platforms designed for smooth shopping experiences and higher conversions.",
    },
    {
      id: 5,
      title: "Custom Software Development",
      description:
        "Tailor-made software solutions designed to simplify workflows, automate processes, and support long-term scalability.",
    },
    {
      id: 6,
      title: "AI Development",
      description:
        "Intelligent AI-powered tools, automations, and agents that help businesses save time, improve accuracy, and scale faster.",
    },
  ];

  return (
    <section className="what-provide-section py-7">
      <div className="container text-center">

        {/* HEADING */}
        <h2 className="heading-provide mb-2">
          Let's See What Services{" "}
          <span className="underline-wrapper fw-bold">
            We're Providing You
            <img src={underline} alt="" className="underline-img" />
          </span>
        </h2>

        <p className="gray-font mb-5 mt-3 gray-font-margin-top">
          From concept to completion, our expert team delivers solutions that
          drive real results, blending innovation, performance, and purposeful
          design.
        </p>

        {/* SERVICES GRID */}
        <div className="row g-0 services-grid">
          {services.map((service) => (
            <div className="col-lg-6" key={service.id}>
              <div className="service-box p-4 d-flex justify-content-between h-100 gap-5">

                {/* LEFT SIDE TEXT */}
                <div className="text-start">
                  <h4 className="what-we-provide-title">{service.title}</h4>
                  <p className=" mt-4 mb-0">
                    {service.description}
                  </p>
                </div>

                {/* ARROW ICON */}
                <div className="arrow-wrapper">
                  <img src={arrow} alt="arrow" className="arrow-icon arrow-icon-rotate" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
