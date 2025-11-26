import React from "react";
import "./WhatMakesUsDifferent.css";
import underline from "../Images/what-we-build-underline.png"; // underline image

export const WhatMakesUsDifferent = () => {
  
  // ⭐ RIGHT SIDE STATS (REUSABLE)
  const stats = [
    { id: 1, value: "25+", label: "Projects Completed" },
    { id: 2, value: "95%", label: "Success Rate" },
    { id: 3, value: "20+", label: "Tech Stacks & Tools" },
    { id: 4, value: "2+", label: "Countries Served" },
  ];

  return (
    <section className="what-different-section py-5">
      <div className="container">

        {/* HEADING */}
        <h2 className="text-center heading-provide mb-4">
          What Makes{" "}
          <span className="underline-wrapper fw-bold">
            Us Different
            <img src={underline} alt="" className="underline-img" />
          </span>
        </h2>

        <div className="row g-4 mt-4">

          {/* LEFT SIDE TEXT*/}
          <div className="col-lg-7">
            <h4 className="fw-bold mb-3">
              Our Young, Passionate Tech Team
            </h4>

            <p className="gray-font mb-4">
              — driven to build Tech solutions that make businesses faster, smarter, 
              and more connected.
            </p>

            <p className="gray-font mb-4">
              From custom software systems and mobile applications to sleek e-commerce 
              stores, every project at <span className="codelix-blue">Codelix</span> reflects our core motto.
            </p>

            <h5 className="fw-bold deliver-text">
              <span className="line"></span>
              “Deliver Before The Deadline.”
            </h5>
          </div>

          {/* RIGHT SIDE CARDS — generated using .map() */}
          <div className="col-lg-5">
            <div className="row g-3">
              {stats.map((item) => (
                <div className="col-6" key={item.id}>
                  <div className="stats-card p-3 h-100">
                    <h3 className="fw-bold">{item.value}</h3>
                    <p className="different-label mt-2 mb-0">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};