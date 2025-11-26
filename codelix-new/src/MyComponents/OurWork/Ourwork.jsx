import React, { useState } from "react";
import "./Ourwork.css";

// images
import logo1 from "../Images/Our-work-logo-one.png";
import logo2 from "../Images/Our-work-logo-two.png";
import logo3 from "../Images/Our-work-logo-three.png";
import logo4 from "../Images/Our-work-logo-four.png";
import logo5 from "../Images/Our-work-logo-five.png";
import profileImg from "../Images/Our-work-client.png";
import underlineImg from "../Images/Our-work-line.png";
import linkedInImg from "../Images/Our-work-linkedIn.png";
import quote from "../Images/Our-work-quote.png";

const testimonials = [
  {
    logo: logo1,
    quote:
      "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule. The time we met and spent with them is lucky for us. We'll always work on the project with them.",
    name: "Alex Park",
    position: "CEO, Harmony Inc.",
    profile: profileImg,
  },
  {
    logo: logo2,
    quote:
      "Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.",
    name: "Samantha Lee",
    position: "Founder, Nexa Digital",
    profile: profileImg,
  },
  {
    logo: logo3,
    quote:
      "Amazing team! Delivered everything on time with exceptional quality. Totally recommend!",
    name: "John Miller",
    position: "CTO, PixelWave",
    profile: profileImg,
  },
  {
    logo: logo4,
    quote:
      "Their expertise helped us scale our business faster. Great technical and UI/UX understanding!",
    name: "Emily Watson",
    position: "Director, Nova Corp",
    profile: profileImg,
  },
  {
    logo: logo5,
    quote:
      "Fantastic experience! They always go the extra mile to deliver value in every sprint.",
    name: "Chris Taylor",
    position: "COO, Orbit Labs",
    profile: profileImg,
  },
];

const Ourwork = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="container ourwork-section py-5">
      <h2 className="text-center heading-diff mb-5">
        Our Work Through{" "}
        <span className="underline-wrapper fw-bold">
          Client's Words
          <img src={underlineImg} alt="" className="underline-img" />
        </span>
      </h2>

      <div className="row g-0">
        {/* LEFT SIDE */}
        <div className="col-12 col-lg-9 left-box d-flex justify-content-center flex-column">
          <div className="quote-icon">
            <img src={quote} alt="quote" />
          </div>

          <p className="testimonial-text">{testimonials[active].quote}</p>

          <div className="d-flex align-items-center justify-content-between">
            {/* Client Info */}
            <div className="d-flex align-items-center client-info-section">
              <img
                src={testimonials[active].profile}
                alt="client"
                className="client-img"
              />

              <div className="ms-3 client-details">
                <h5 className="m-0 fw-bold">{testimonials[active].name}</h5>
                <small>{testimonials[active].position}</small>
              </div>
            </div>

            {/* LinkedIn icon (static) */}
            <a href="#" className="mt-2">
              <img src={linkedInImg} alt="LinkedIn" className="linkedin-icon" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE LOGO LIST */}
        <div className="col-12 col-lg-3 logos-box">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`logo-item-block ${
                index === active ? "active-logo" : "inactive-logo"
              }`}
              onClick={() => setActive(index)}
            >
              <img src={item.logo} alt="logo" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ourwork;
