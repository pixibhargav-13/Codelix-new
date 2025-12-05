import React, { useState } from "react";
import "./HomepageFaq.css";

import underline from "../Images/what-we-build-underline.png";
import plusIcon from "../Images/homepage-plus.png";   // your plus image
import minusIcon from "../Images/homepage-minus.png"; // your minus image

export const HomepageFaq = () => {
  const faqs = [
    {
      id: 1,
      question: "Do you provide source code after project completion?",
      answer:
        "Yes. Once the project is completed and fully paid for, you receive 100% ownership of the source code, along with documentation and deployment details.",
    },
    {
      id: 2,
      question: "What if I need changes after the project is delivered?",
      answer:
        "We offer a revision window after delivery for design or functionality tweaks. For ongoing improvements, we recommend our maintenance plan, which covers updates, enhancements, and tech support.",
    },
    {
      id: 3,
      question: "What is your cancellation policy?",
      answer:
        "We understand that plans can change. If you wish to cancel a project, you can do so at any stage with written notice. Work completed up to the cancellation date will be billed accordingly, and any unused payment balance will be refunded.",
    },
    {
      id: 4,
      question: "How do you integrate AI into your solutions?",
      answer:
        "We use AI to enhance performance and user experience through smart recommendations, chat automation, predictive analytics, and process optimisation. Our AI-powered integrations are tailored to your business goals, ensuring tangible results, not just buzzwords.",
    },
    {
      id: 5,
      question: "How does billing work?",
      answer:
        "Our billing process is simple and transparent. After finalising your project scope, we provide a detailed quotation with milestones. Payments are made in phases: an upfront deposit, followed by milestone-based instalments as work progresses.",
    },
    {
      id: 6,
      question: "Can you sign an NDA before starting the project?",
      answer:
        "Of course. We take confidentiality seriously and are happy to sign an NDA (Non-Disclosure Agreement) before discussing or starting your project to protect your ideas and data.",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="homepage-faq-section py-7">
      <div className="container">
        <div className="text-center">
          <h2 className="heading-provide mb-2">
            Frequently Asked{" "}
            <span className="underline-wrapper fw-bold">
              Questions
              <img src={underline} alt="underline" className="underline-img" />
            </span>
          </h2>

          <p className="faq-subtext mb-5">
            We've gathered the most common questions to help you understand how we build,
            design, and <br/> deliver with excellence.
          </p>
        </div>

        <div className="faq-list mx-auto">
          {faqs.map((faq) => (
            <div className="faq-item" key={faq.id}>
              <div className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                
                <span className="question-text">{faq.question}</span>

                <button className="toggle-btn">
                  <img
                    src={openId === faq.id ? minusIcon : plusIcon}
                    alt=""
                    className="toggle-icon"
                  />
                </button>
              </div>

              {openId === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
