import React from "react";
import "./ChooseUs.css";
import underline from "../Images/what-we-build-underline.png";

export const ChooseUs = () => {
  // ⭐ DATA ARRAY – 6 boxes
  const reasons = [
    {
      id: 1,
      title: "Experienced Team",
      description:
        "With a proven track record of delivering successful projects across multiple domains, we bring extensive knowledge and strong technical skills to every engagement.",
    },
    {
      id: 2,
      title: "Smart Solutions",
      description:
        "We don’t just build, we think ahead. Our AI-driven and design-focused approach ensures every solution is efficient, scalable, and crafted to make your business smarter, faster, and future-ready.",
    },
    {
      id: 3,
      title: "Transparent Communication",
      description:
        "We believe clarity builds trust. From kickoff to delivery, you’ll always know what’s happening, why it’s happening, and when it’s happening with complete visibility into project progress.",
    },
    {
      id: 4,
      title: "Dedicated Team",
      description:
        "We treat your goals as our own. Our passionate team works hand-in-hand with you, ensuring every project milestone reflects quality, precision, and your business vision.",
    },
    {
      id: 5,
      title: "Scalability & Security",
      description:
        "Our solutions are engineered to grow with your business. Built with robust architecture, advanced encryption, and best coding practices, ensuring performance without compromising security.",
    },
    {
      id: 6,
      title: "On-Time Delivery",
      description:
        "We understand that timing defines success. Our disciplined process ensures every project launches exactly when promised, maintaining excellence without compromise.",
    },
  ];

  return (
    <section className="choose-us-section py-5">
      <div className="container text-center">

        {/* Heading */}
        <h2 className="text-center heading-diff mb-3">
          Reasons To{" "}
          <span className="underline-wrapper fw-bold">
            Choose Us
            <img src={underline} alt="" className="underline-img" />
          </span>
        </h2>

        <p className="choose-subtitle gray-font-margin-top mb-5">
          From concept to completion, we craft digital experiences that don’t
          just look great;
          <span className="line-break">
            they drive measurable growth and long-term impact.
          </span>
        </p>

        {/* Boxes */}
        <div className="row g-0 choose-grid">
          {reasons.map((item) => (
            <div className="col-lg-4 col-md-6 border p-4 choose-box" key={item.id}>
              <h5 className="choose-title">{item.title}</h5>
              <p className="mt-2 choose-desc">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
