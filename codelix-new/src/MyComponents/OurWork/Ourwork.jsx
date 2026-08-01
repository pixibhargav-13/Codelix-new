import React, { useState } from "react";
import "./Ourwork.css";

// images
import logo1 from "../Images/Our-work-logo-one.png";
import logo2 from "../Images/Our-work-logo-two.png";
import logo3 from "../Images/Our-work-logo-three.png";
import logo4 from "../Images/Our-work-logo-four.png";
import logo5 from "../Images/Our-work-logo-five.png";
import underlineImg from "../Images/Our-work-line.png";
import quote from "../Images/Our-work-quote.png";

const testimonials = [
  {
    logo: logo1,
    quote:
      "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule. The time we met and spent with them is lucky for us. We'll always work on the project with them.",
    name: "Rajesh Patel",
    position: "CEO, Harmony Inc.",
  },
  {
    logo: logo2,
    quote:
      "Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.",
    name: "Priya Sharma",
    position: "Founder, Nexa Digital",
  },
  {
    logo: logo3,
    quote:
      "Amazing team! Delivered everything on time with exceptional quality. Totally recommend!",
    name: "Amit Kumar",
    position: "CTO, PixelWave",
  },
  {
    logo: logo4,
    quote:
      "Honestly, we were struggling to keep up with our growth until they stepped in. They didn't just build the tech; they actually understood our users. It’s been a total game-changer for our workflow, and the design is just spot on.",
    name: "Emily Watson",
    position: "Director, Nova Corp",
  },
  {
    logo: logo5,
    quote:
      "What I love most is that they don't just say 'yes' to everything—they tell us what's actually going to work. The whole process felt super collaborative, and they genuinely cared about making the project a success.",
    name: "Chris Taylor",
    position: "COO, Orbit Labs",
  },
];

const Ourwork = () => {
  const [active, setActive] = useState(0);

  // Function to get first letter of first name
  const getFirstLetter = (fullName) => {
    return fullName.split(' ')[0][0].toUpperCase();
  };

  return (
    <div className="container ourwork-section py-7">
      <h2 className="text-center heading-diff mb-3">
        Our Work Through{" "}
        <span className="underline-wrapper fw-bold">
          Client's Words
          <img src={underlineImg} alt="" className="underline-img" />
        </span>
      </h2>

      <p className="gray-font mb-5 gray-font-margin-top text-center">
        Real stories from the clients who trusted us with their vision.
      </p>

      <div className="row g-0">
        {/* LEFT SIDE */}
        <div className="col-12 col-lg-9 left-box d-flex justify-content-center flex-column">
          <div className="quote-icon">
            <img src={quote} alt="quote" />
          </div>

          <p className="testimonial-text">{testimonials[active].quote}</p>

          <div className="d-flex align-items-center">
            {/* Client Info */}
            <div className="d-flex align-items-center client-info-section">
              <div className="client-initial-avatar">
                {getFirstLetter(testimonials[active].name)}
              </div>

              <div className="ms-3 client-details">
                <h5 className="m-0 fw-bold">{testimonials[active].name}</h5>
                <small>{testimonials[active].position}</small>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGO LIST */}
        <div className="col-12 col-lg-3 logos-box">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`logo-item-block ${index === active ? "active-logo" : "inactive-logo"
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