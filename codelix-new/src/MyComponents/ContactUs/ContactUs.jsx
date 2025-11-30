import React from "react";
import "./ContactUs.css";
import contactUsLogo from "../Images/contact-us-logo.png";
import whiteArrow from "../Images/whiteArrow.png";
import underline from "../Images/what-we-build-underline.png";
import { Navbar } from "../Navbar/Navbar";
import Ourwork from "../OurWork/Ourwork";
import { HomepageFaq } from "../HomepageFaq/HomepageFaq";
import Footer from "../Footer/Footer";
import { SEO } from "../../components/SEO";

export const ContactUs = () => {
  return (
    <>
      <SEO
        title="Contact Us | Get a Free Quote | Codelix"
        description="Ready to build something amazing? Contact Codelix for a free consultation. We're here to help with your web, app, or SaaS project."
        keywords="contact us, free quote, consultation, web development inquiry, get in touch"
        canonical="https://codelix.com/contact"
      />
      <div className="work-hero-section">
        <Navbar />
        <div className="work-content">
          <h1>Contact</h1>
          <p>
            Whether you're looking for guidance, support, or a custom solution,
            <span className="line-break">
              we're here to help you every step of the way.
            </span>
          </p>
        </div>
      </div>
      <div className="contact-us-container d-flex justify-content-between flex-column light-gray">
        <div className="container">
          <div className="contact-us-top-section">
            <div className="contact-us-top-section-text">
              <h2 className="heading-provide mb-2">
                Schedule A{" "}
                <span className="underline-wrapper fw-bold">
                  Meeting
                  <img src={underline} alt="" className="underline-img" />
                </span>
              </h2>
              <p className="gray-font mb-5 gray-font-margin-top">
                Leave us a little info and we will get in touch asap!
              </p>
            </div>

            <div className="contact-us-top-cards d-flex justify-content-center flex-md-row flex-column text-start">
              <div className="contact-us-card">
                <h4>People</h4>
                <p>
                  With our design & development ninjas by our side, there's
                  absolutely nothing we can't achieve.
                </p>
              </div>

              <div className="contact-us-card">
                <h4>Process</h4>
                <p>
                  We turn your vision into reality with a proven end-to-end
                  process. From strategy to launch, every step is handled with
                  care.
                </p>
              </div>

              <div className="contact-us-card">
                <h4>Passion</h4>
                <p>
                  We turn your product vision from brainstorming to a fully
                  implemented real-world solution.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-us-main-section">
          <div className="container">
            <div className="row d-flex gap-10">
              <div className="col-lg-8 col-md-12">
                <div className="contact-us-form-box form d-flex flex-column">
                  <form>
                    {/* Name + Contact */}
                    <div className="contact-us-form-row">
                      <div>
                        <label className="form-label">Your Name*</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label className="form-label">Contact*</label>
                        <input type="text" />
                      </div>
                    </div>

                    {/* Email */}
                    <label className="form-label">Email*</label>
                    <input type="email" />

                    {/* Company + Designation */}
                    <div className="contact-us-form-row">
                      <div>
                        <label className="form-label">Company*</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label className="form-label">Designation*</label>
                        <input type="text" />
                      </div>
                    </div>

                    {/* Service */}
                    <label className="form-label">Service*</label>
                    <select>
                      <option>Select</option>
                    </select>

                    {/* About Project */}
                    <label className="form-label">About Project*</label>
                    <textarea rows="4"></textarea>

                    {/* Budget + Timeline */}
                    <div className="contact-us-form-row">
                      <div>
                        <label className="form-label">Budget</label>
                        <select>
                          <option>Select</option>
                        </select>
                      </div>

                      <div>
                        <label className="form-label">Timeline</label>
                        <select>
                          <option>Select</option>
                        </select>
                      </div>
                    </div>

                    {/* How heard */}
                    <label className="form-label">How did you hear about us?</label>
                    <textarea rows="3"></textarea>
                  </form>

                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn blue-common-btn mt-4 d-flex align-items-center justify-content-between view-all-button">
                      <span>Submit</span>
                      <img src={whiteArrow} alt="arrow" className="arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — PROCESS BOX (5 columns) */}
              <div className="col-lg-4 col-md-12">
                <div className="contact-us-process-box">
                  <div className="contact-us-process-header">
                    <div className="contact-us-process-card">
                      <h5>Initiating Contract</h5>
                      <p>
                        Tell us what you need — our tech team will analyze and
                        suggest the best solution.
                      </p>
                    </div>

                    <div className="contact-us-process-card">
                      <h5>Define your needs</h5>
                      <p>
                        We secure your idea with a signed NDA. Your privacy is
                        always our priority.
                      </p>
                    </div>

                    <div className="contact-us-process-card">
                      <h5>NDA Signing</h5>
                      <p>
                        After in-depth evaluation, we share the estimated budget
                        and project timeline.
                      </p>
                    </div>

                    <div className="contact-us-process-card">
                      <h5>Estimated Budget/Cost</h5>
                      <p>
                        After in-depth evaluation, we share the estimated budget
                        and project timeline.
                      </p>
                    </div>

                    <div className="contact-us-process-card">
                      <h5>Time Launch</h5>
                      <p>
                        We respect your deadlines — delivering on time with full
                        transparency.
                      </p>
                    </div>
                  </div>

                  <div className="contact-us-copy-img">
                    <img src={contactUsLogo} alt="process" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="our-work">
        <Ourwork />
      </div>

      <div className="homepage-faq">
        <HomepageFaq />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
