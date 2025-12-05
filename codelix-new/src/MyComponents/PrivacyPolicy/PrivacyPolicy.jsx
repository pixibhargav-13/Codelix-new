import React from "react";
import "./PrivacyPolicy.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import underline from "../Images/what-we-build-underline.png";
import { SEO } from "../../components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Codelix"
        description="Read Codelix's Privacy Policy to understand how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, privacy, data usage"
        canonical="https://codelix.com/privacy-policy"
      />
      <div className="privacy-page-hero-section">
        <Navbar />
        <div className="privacy-page-content">
          <h1>
            <span className="privacy-page-title-bold">
              Privacy Policy
              <img
                src={underline}
                alt="underline"
                className="privacy-page-underline-img"
              />
            </span>
          </h1>
        </div>
      </div>

      <div className="privacy-page-content-section">
        <div className="container">
          <div className="privacy-page-text-wrapper">
            <table className="privacy-page-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Protecting Your Personal Information Is Our Priority</strong>
                    <br /><br />
                    This Privacy Policy applies to <a href="https://www.codelixitsolutions.com/"><u> www.codelixitsolutions.com</u></a> and
                    governs data collection, usage, and protection practices. By
                    accessing or using our website, you consent to the data practices
                    described in this Statement.
                    <br /><br />
                    Codelix IT Solutions (&quot;Codelix,&quot; &quot;we,&quot;
                    &quot;us,&quot; or &quot;our&quot;) is committed to safeguarding your
                    privacy and ensuring that your personal information remains
                    protected at all times.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Collection of Personal Information</strong>
                    <br /><br />
                    To provide you with our products, services, and support, Codelix may
                    collect the following personally identifiable information:
                    <ul>
                      <li>First and Last Name</li>
                      <li>Email Address</li>
                      <li>Phone Number (if voluntarily provided)</li>
                      <li>Location / City</li>
                      <li>Company Name (if applicable)</li>
                    </ul>
                    We do not collect personal information unless you voluntarily submit
                    it to us. You may be required to provide certain information when
                    using services such as:
                    <ul>
                      <li>Submitting a contact form</li>
                      <li>Booking a consultation</li>
                      <li>Requesting a proposal</li>
                      <li>Subscribing to newsletters</li>
                      <li>Downloading resources</li>
                    </ul>
                    This information helps us deliver the specific services you request.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Use of Your Personal Information</strong>
                    <br /><br />
                    Codelix uses collected personal information to:
                    <ul>
                      <li>Provide and improve our services</li>
                      <li>Respond to inquiries and support requests</li>
                      <li>
                        Deliver proposals, reports, or project-related communication
                      </li>
                      <li>
                        Inform you about new services, updates, or relevant offerings
                      </li>
                      <li>Enhance user experience on our website</li>
                    </ul>
                    We only use your information for purposes you have consented to or
                    for legitimate business needs.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Sharing of Information With Third Parties</strong>
                    <br /><br />
                    Codelix does not sell, rent, or lease customer information to any
                    third party.
                    <br /><br />
                    We may share data only with trusted service providers who assist us
                    with:
                    <ul>
                      <li>Email communication</li>
                      <li>Statistical analysis</li>
                      <li>Customer support</li>
                      <li>Project delivery or documentation</li>
                    </ul>
                    All such third parties are prohibited from using your information
                    except to provide services for Codelix, and they are required to
                    maintain confidentiality.
                    <br /><br />
                    Codelix may also disclose your data without notice if required by
                    law or in good faith when necessary to:
                    <ul>
                      <li>Comply with legal obligations or court orders</li>
                      <li>Protect and defend the rights or property of Codelix</li>
                      <li>Prevent or investigate potential wrongdoing</li>
                      <li>Protect the safety of users or the public</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Automatically Collected Information</strong>
                    <br /><br />
                    We automatically collect technical information about your device when
                    you visit our Site, including:
                    <ul>
                      <li>IP address</li>
                      <li>Browser type</li>
                      <li>Operating system</li>
                      <li>Access times</li>
                      <li>Referring website links</li>
                    </ul>
                    This data helps us improve site performance, security, and user
                    experience.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Use of Cookies</strong>
                    <br /><br />
                    <a href="https://www.codelixitsolutions.com/"><u> www.codelixitsolutions.com</u></a> may use cookies to enhance your online
                    experience. Cookies:
                    <ul>
                      <li>Help personalize content</li>
                      <li>Store user preferences</li>
                      <li>Improve website performance</li>
                    </ul>
                    You may choose to accept or decline cookies. Most browsers accept
                    cookies automatically, but you can modify settings to disable them if
                    preferred.
                    <br /><br />
                    Disabling cookies may affect some functionalities of the Site.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Security of Personal Information</strong>
                    <br /><br />
                    Codelix uses industry-standard security measures to protect your
                    personal information from unauthorized access, use, or disclosure.
                    This includes:
                    <ul>
                      <li>SSL encryption</li>
                      <li>Secure server environments</li>
                      <li>Restricted access to personal data</li>
                    </ul>
                    While we strive to protect your data, no internet transmission or
                    storage method is 100% secure. You acknowledge that absolute security
                    cannot be guaranteed.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Links to External Websites</strong>
                    <br /><br />
                    Our Site may contain links to third-party websites. If you click on
                    such links, you will be directed to their website.
                    <br /><br />
                    Please note:
                    <ul>
                      <li>We do not control third-party websites</li>
                      <li>
                        We are not responsible for their content, privacy practices, or
                        policies
                      </li>
                      <li>
                        We encourage you to review each site&apos;s Privacy Policy before
                        interacting with it
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Email Communications</strong>
                    <br /><br />
                    Codelix may contact you via email for:
                    <ul>
                      <li>Service updates</li>
                      <li>Announcements</li>
                      <li>Promotions</li>
                      <li>Invoices or confirmations</li>
                      <li>Surveys or feedback requests</li>
                    </ul>
                    If you wish to stop receiving promotional or marketing emails, you
                    may opt out anytime by replying &quot;STOP&quot; or using the
                    unsubscribe link where available.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Changes to This Privacy Policy</strong>
                    <br /><br />
                    Codelix IT Solutions reserves the right to update or modify this
                    Privacy Policy at any time. Significant changes will be communicated
                    through:
                    <ul>
                      <li>A notice on our website</li>
                      <li>Email notifications (if applicable)</li>
                      <li>Updated documentation on this page</li>
                    </ul>
                    Your continued use of the Site after such updates indicates your
                    acceptance of the revised Privacy Policy.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Contact Information</strong>
                    <br /><br />
                    If you have any questions or concerns about this Privacy Policy or
                    our data practices, you may contact us at:
                    <br /><br />
                    Codelix IT Solutions
                    <br />
                    Ahmedabad, India
                    <br />
                    Email: <a href="mailto:sales@codelixitsolutions.com">sales@codelixitsolutions.com</a>
                    <br />
                    Website: <a href="https://www.codelixitsolutions.com">www.codelixitsolutions.com</a>
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

export default PrivacyPolicy;


