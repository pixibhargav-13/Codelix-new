import React, { useState } from "react";
import "./HomepageFaq.css";

import underline from "../Images/what-we-build-underline.png";
import plusIcon from "../Images/homepage-plus.png";   // your plus image
import minusIcon from "../Images/homepage-minus.png"; // your minus image

export const HomepageFaq = () => {
  const faqs = [
    {
      id: 1,
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      id: 2,
      question: "Can I change my plan later?",
      answer:
        "We understand that plans can change. If you wish to cancel a project, you can do so at any stage with written notice. Work completed up to the cancellation date will be billed accordingly, and any unused payment balance will be refunded.",
    },
    {
      id: 3,
      question: "What is your cancellation policy?",
      answer:
        "We use AI to enhance performance and user experience through smart recommendations, chat automation, predictive analytics, and process optimisation. Our AI-powered integrations are tailored to your business goals, ensuring tangible results, not just buzzwords.",
    },
    {
      id: 4,
      question: "Can other info be added to an invoice?",
      answer:
        "Our billing process is simple and transparent. After finalising your project scope, we provide a detailed quotation with milestones. Payments are made in phases: an upfront deposit, followed by milestone-based instalments as work progresses.",
    },
    {
      id: 5,
      question: "How does billing work?",
      answer:
        "Billing is processed monthly or yearly depending on your subscription type.",
    },
    {
      id: 6,
      question: "How do I change my account email?",
      answer:
        "You can update your email under account settings > personal information.",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="homepage-faq-section py-5">
      <div className="container text-center">

        <h2 className="heading-provide mb-4">
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
