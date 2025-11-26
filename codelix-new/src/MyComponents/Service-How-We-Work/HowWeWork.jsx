import React from "react";
import "./HowWeWork.css";
import blackArrow from "../Images/blackArrow.png";
import underline from "../Images/what-we-build-underline.png";

export const HowWeWork = () => {
  const steps = [
    {
      number: "01",
      title: "Project Ideation",
      desc: "We start by listening to your business goals, challenges, and vision for your web application. We learn about your target audience, competitors, and key features you require to create an optimal solution.",
    },
    {
      number: "02",
      title: "Planning",
      desc: "Based on our initial discussion, we create a detailed project plan that includes timelines, milestones, and deliverables. We collaborate with you to finalize the scope and ensure we're aligned on the project’s objectives.",
    },
    {
      number: "03",
      title: "Design",
      desc: "Once we have a clear understanding of your requirements, we move on to create high-fidelity designs. We work collaboratively with you to ensure the design aligns with your brand and user-experience goals.",
    },
    {
      number: "04",
      title: "Agile Development",
      desc: "We follow an agile development approach, delivering functional pieces in sprints. This allows flexibility and ensures adjustments can be made as needed during the process.",
    },
    {
      number: "05",
      title: "Testing",
      desc: "Before deployment, we test for functionality, usability, security, and performance. We ensure everything works as expected and meets your business needs.",
    },
    {
      number: "06",
      title: "Deployment",
      desc: "After testing, we deploy the solution and provide post-launch support to ensure everything runs smoothly and your team is fully trained to manage it.",
    },
  ];

  return (
    <section className="how-we-work-section">
      <div className="container text-center">

        <h2 className="text-center heading-provide mb-5">
          How We{" "}
          <span className="underline-wrapper fw-bold">
            Work
            <img src={underline} alt="" className="underline-img" />
          </span>
        </h2>

        <div className="row how-grid">
          {steps.map((step, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="how-card">
                <div className="how-number">{step.number}</div>

                <div className="how-title-wrapper">
                  <h4 className="how-title">{step.title}</h4>
                  <img src={blackArrow} alt="arrow" className="how-arrow" />
                </div>

                <p className="how-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
