import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./WhatWeProvide.css";
import underline from "../Images/what-we-build-underline.png"; // same underline image
import arrow from "../Images/blackArrow.png"; // arrow icon

export const WhatWeProvide = ({ showOtherServices = false }) => {
  const location = useLocation();

  // ⭐ SERVICES DATA (auto-rendered using .map())
  const services = [
    {
      id: 1,
      title: "Web Development",
      description:
        "High-performance, scalable websites built with clean code and designed to convert visitors into customers.",
      path: "/services/web-development",
    },
    {
      id: 2,
      title: "Application Development",
      description:
        "Custom-built mobile and web applications engineered for speed, security, and seamless user experience.",
      path: "/services/application-development",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description:
        "Intuitive, modern, and user-first designs crafted to elevate engagement and create memorable digital experiences.",
      path: "/services/ui-ux-design",
    },
    {
      id: 4,
      title: "E-Commerce Solutions",
      description:
        "End-to-end e-commerce platforms designed for smooth shopping experiences and higher conversions.",
      path: "/services/e-commerce-solutions",
    },
    {
      id: 5,
      title: "Custom Software Development",
      description:
        "Tailor-made software solutions designed to simplify workflows, automate processes, and support long-term scalability.",
      path: "/services/custom-software-development",
    },
    {
      id: 6,
      title: "AI Development",
      description:
        "Intelligent AI-powered tools, automations, and agents that help businesses save time, improve accuracy, and scale faster.",
      path: "/services/ai-development",
    },
  ];

  // Handle click - if on same page, reload; otherwise navigate
  const handleServiceClick = (e, servicePath) => {
    if (location.pathname === servicePath) {
      e.preventDefault();
      window.scrollTo(0, 0);
      window.location.reload();
    }
  };

  return (
    <section className="what-provide-section py-7">
      <div className="container text-center">

        {/* HEADING */}
        {showOtherServices ? (
          <h2 className="heading-provide mb-5">
            Other{" "}
            <span className="underline-wrapper fw-bold">
              Services
              <img src={underline} alt="" className="underline-img" />
            </span>
          </h2>
        ) : (
          <>
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
          </>
        )}

        {/* SERVICES GRID */}
        <div className="row g-0 services-grid">
          {services.map((service) => (
            <div className="col-lg-6" key={service.id}>
              <Link
                to={service.path}
                onClick={(e) => handleServiceClick(e, service.path)}
                className="service-box-link"
              >
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
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
