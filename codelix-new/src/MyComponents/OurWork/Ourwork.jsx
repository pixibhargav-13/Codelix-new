import React from "react";
import "./Ourwork.css";
//images
import logo1 from "../images/Our-work-logo-one.png";
import logo2 from "../images/Our-work-logo-two.png";
import logo3 from "../images/Our-work-logo-three.png";
import logo4 from "../images/Our-work-logo-four.png";
import logo5 from "../images/Our-work-logo-five.png";
import profileImg from "../images/Our-work-client.png";
import underlineImg from "../images/Our-work-line.png";
import linkedInImg from "../images/Our-work-linkedIn.png";
import quote from "../images/our-work-quote.png";

const Ourwork = () => {
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
        <div className="col-12 col-lg-9 p-5 left-box d-flex justify-content-center flex-column">
          <div className="quote-icon"><img src={quote} alt="quote" /></div>

          <p className="testimonial-text">
            We were able to successfully complete the project by meeting the best
            partner. They have a very good understanding of development and skills,
            and are fully committed to the task schedule. The time we met and
            spent with them is lucky for us. We'll always work on the project with them.
          </p>
          <div className="d-flex align-items-center justify-content-between">
            {/* LEFT: Image + Name */}
            <div className="d-flex align-items-center">
              <img src={profileImg} alt="client" className="client-img" />

              <div className="ms-3 client-details">
                <h5 className="m-0 fw-bold">Alex Park</h5>
                <small>CEO, Harmony Inc.</small>
              </div>
            </div>

            {/* RIGHT: LinkedIn Icon */}
            <a href="#">
            <img src={linkedInImg} alt="LinkedIn" className="linkedin-icon" />
            </a>

          </div>

        </div>


        {/* RIGHT SIDE LOGOS */}
        <div className="col-12 col-lg-3 logos-box">
          <div className="logo-item"><img src={logo1} alt="logo1" /></div>
          <div className="logo-item"><img src={logo2} alt="logo2" /></div>
          <div className="logo-item"><img src={logo3} alt="logo3" /></div>
          <div className="logo-item"><img src={logo4} alt="logo4" /></div>
          <div className="logo-item"><img src={logo5} alt="logo5" /></div>
        </div>
      </div>
    </div>
  );
};

export default Ourwork;