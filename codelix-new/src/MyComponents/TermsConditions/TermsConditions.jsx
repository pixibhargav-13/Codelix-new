import React from "react";
import "./TermsConditions.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import underline from "../Images/what-we-build-underline.png";
import { SEO } from "../../components/SEO";

const TermsConditions = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions | Codelix"
        description="Read Codelix's Terms & Conditions to understand how you may use our site, services, and content."
        keywords="terms and conditions, terms of service, user agreement, website terms"
        canonical="https://codelix.com/terms-of-service"
      />
      <div className="terms-conditions-hero-section">
        <Navbar />
        <div className="terms-conditions-content">
          <h1>
            <span className="terms-conditions-title-bold terms-conditions-underline-wrapper">
              Terms &amp; Conditions
              <img
                src={underline}
                alt="underline"
                className="terms-conditions-underline-img"
              />
            </span>
          </h1>
        </div>
      </div>

      <div className="terms-conditions-content-section">
        <div className="container">
          <div className="terms-conditions-text-wrapper">
            <table className="terms-conditions-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Agreement Between User and <a href="https://www.codelixitsolutions.com"><u>www.codelixitsolutions.com</u></a></strong>
                    <br /><br />
                    Welcome to <a href="https://www.codelixitsolutions.com"><u>www.codelixitsolutions.com</u></a> (the “Site”). The Site is owned
                    and operated by Codelix IT Solutions, Ahmedabad. By accessing or using
                    this Site, you agree to be bound by these Terms &amp; Conditions (the
                    “Terms”) without modification. If you do not agree with any part of
                    these Terms, please do not use the Site.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Electronic Communications</strong>
                    <br /><br />
                    By visiting <a href="https://www.codelixitsolutions.com/"><u> www.codelixitsolutions.com</u></a> or communicating with us
                    through email, forms, or chats, you consent to receive electronic
                    communications from Codelix. All agreements, notices, disclosures,
                    and other communications provided electronically satisfy any legal
                    requirement that such communications be in writing.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Your Account</strong>
                    <br /><br />
                    If you create an account on the Site or access any client dashboard
                    provided by Codelix, you are responsible for maintaining the
                    confidentiality of your login credentials and restricting access to
                    your devices. You accept full responsibility for all activities
                    conducted under your account.
                    <br /><br />
                    Codelix is not liable for any unauthorized access arising from loss,
                    theft, or sharing of your credentials. We reserve the right to
                    modify, suspend, or terminate accounts, content, or services at our
                    discretion.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Children Under Thirteen</strong>
                    <br /><br />
                    Codelix does not knowingly collect personal information from
                    individuals under the age of thirteen. If you are under 18, you may
                    use this Site only with permission and supervision from a parent or
                    guardian.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>No Unlawful or Prohibited Use / Intellectual Property</strong>
                    <br /><br />
                    You are granted a limited, revocable, non-transferable license to
                    access and use the Site strictly according to these Terms.
                    <br /><br />
                    You agree not to use the Site for any purpose that is unlawful or
                    prohibited by these Terms, including actions that may:
                    <ul>
                      <li>Damage, disable, or overburden the Site</li>
                      <li>Interfere with other users&apos; access</li>
                      <li>
                        Attempt to gain unauthorized access to any system or information
                      </li>
                    </ul>
                    All content on the Site, including text, graphics, UI/UX elements,
                    media, logos, and compiled data, is the property of Codelix IT
                    Solutions or its licensors and is protected by copyright and
                    intellectual property laws.
                    <br /><br />
                    You may not:
                    <ul>
                      <li>
                        Modify, publish, copy, distribute, or sell any part of the content
                      </li>
                      <li>Reverse-engineer any software on the Site</li>
                      <li>Create derivative works without written permission</li>
                    </ul>
                    Using the content does not grant ownership or additional licenses
                    beyond the limited use described.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Third-Party Accounts</strong>
                    <br /><br />
                    If the Site allows integration with third-party tools (e.g., GitHub,
                    Google, social logins), you agree that connecting such accounts
                    authorizes Codelix to receive limited information per your settings.
                    If you do not want data shared, do not connect third-party accounts.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>International Users</strong>
                    <br /><br />
                    If you access the Site from outside India, you are solely responsible
                    for complying with local laws. You agree not to use Codelix content in
                    any country or manner that violates applicable regulations.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Indemnification</strong>
                    <br /><br />
                    You agree to indemnify and hold harmless Codelix IT Solutions, its
                    founders, employees, partners, and agents from any claims, damages,
                    losses, liabilities, and expenses (including attorney fees) arising
                    from:
                    <ul>
                      <li>Your use or inability to use the Site</li>
                      <li>Any content you submit</li>
                      <li>Your violation of these Terms</li>
                      <li>Your violation of any third-party rights or laws</li>
                    </ul>
                    Codelix reserves the right to assume exclusive defense in such
                    matters, with your cooperation.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Termination / Access Restriction</strong>
                    <br /><br />
                    Codelix may terminate or restrict your access to the Site, services,
                    or accounts at any time without notice. This Agreement is governed by
                    the laws of India, and you consent to exclusive jurisdiction in
                    Ahmedabad courts for any dispute.
                    <br /><br />
                    If any part of this Agreement is deemed invalid, the rest remains
                    enforceable. This document constitutes the full, complete Terms
                    between the user and Codelix.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Printed &amp; Electronic Versions</strong>
                    <br /><br />
                    A printed or electronic copy of these Terms is admissible in judicial
                    or administrative proceedings to the same extent as other business
                    documents.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Changes to Terms</strong>
                    <br /><br />
                    Codelix IT Solutions may update or revise these Terms at any time.
                    The most recent version will replace all previous versions. Users are
                    encouraged to check this page periodically for updates.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default TermsConditions;


