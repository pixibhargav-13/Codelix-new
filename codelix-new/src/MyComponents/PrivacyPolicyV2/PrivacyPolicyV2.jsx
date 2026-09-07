import React from "react";
import LegalV2 from "../LegalV2/LegalV2";

/* same real legal text as PrivacyPolicy.jsx, restructured into TOC
   sections for the v2 shell — not new/invented policy */
const SECTIONS = [
  {
    id: "priority",
    heading: "Protecting Your Personal Information Is Our Priority",
    body: (
      <>
        <p>
          This Privacy Policy applies to{" "}
          <a href="https://www.codelixitsolutions.com/">www.codelixitsolutions.com</a> and governs
          data collection, usage, and protection practices. By accessing or using our website, you
          consent to the data practices described in this Statement.
        </p>
        <p>
          Codelix IT Solutions ("Codelix," "we," "us," or "our") is committed to safeguarding your
          privacy and ensuring that your personal information remains protected at all times.
        </p>
      </>
    ),
  },
  {
    id: "collection",
    heading: "Collection of Personal Information",
    body: (
      <>
        <p>
          To provide you with our products, services, and support, Codelix may collect the
          following personally identifiable information:
        </p>
        <ul>
          <li>First and Last Name</li>
          <li>Email Address</li>
          <li>Phone Number (if voluntarily provided)</li>
          <li>Location / City</li>
          <li>Company Name (if applicable)</li>
        </ul>
        <p>
          We do not collect personal information unless you voluntarily submit it to us. You may
          be required to provide certain information when using services such as:
        </p>
        <ul>
          <li>Submitting a contact form</li>
          <li>Booking a consultation</li>
          <li>Requesting a proposal</li>
          <li>Subscribing to newsletters</li>
          <li>Downloading resources</li>
        </ul>
        <p>This information helps us deliver the specific services you request.</p>
      </>
    ),
  },
  {
    id: "use",
    heading: "Use of Your Personal Information",
    body: (
      <>
        <p>Codelix uses collected personal information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Respond to inquiries and support requests</li>
          <li>Deliver proposals, reports, or project-related communication</li>
          <li>Inform you about new services, updates, or relevant offerings</li>
          <li>Enhance user experience on our website</li>
        </ul>
        <p>
          We only use your information for purposes you have consented to or for legitimate
          business needs.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Sharing of Information With Third Parties",
    body: (
      <>
        <p>Codelix does not sell, rent, or lease customer information to any third party.</p>
        <p>We may share data only with trusted service providers who assist us with:</p>
        <ul>
          <li>Email communication</li>
          <li>Statistical analysis</li>
          <li>Customer support</li>
          <li>Project delivery or documentation</li>
        </ul>
        <p>
          All such third parties are prohibited from using your information except to provide
          services for Codelix, and they are required to maintain confidentiality.
        </p>
        <p>
          Codelix may also disclose your data without notice if required by law or in good faith
          when necessary to:
        </p>
        <ul>
          <li>Comply with legal obligations or court orders</li>
          <li>Protect and defend the rights or property of Codelix</li>
          <li>Prevent or investigate potential wrongdoing</li>
          <li>Protect the safety of users or the public</li>
        </ul>
      </>
    ),
  },
  {
    id: "automatic",
    heading: "Automatically Collected Information",
    body: (
      <>
        <p>
          We automatically collect technical information about your device when you visit our
          Site, including:
        </p>
        <ul>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Operating system</li>
          <li>Access times</li>
          <li>Referring website links</li>
        </ul>
        <p>This data helps us improve site performance, security, and user experience.</p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Use of Cookies",
    body: (
      <>
        <p>
          <a href="https://www.codelixitsolutions.com/">www.codelixitsolutions.com</a> may use
          cookies to enhance your online experience. Cookies:
        </p>
        <ul>
          <li>Help personalize content</li>
          <li>Store user preferences</li>
          <li>Improve website performance</li>
        </ul>
        <p>
          You may choose to accept or decline cookies. Most browsers accept cookies automatically,
          but you can modify settings to disable them if preferred.
        </p>
        <p>Disabling cookies may affect some functionalities of the Site.</p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security of Personal Information",
    body: (
      <>
        <p>
          Codelix uses industry-standard security measures to protect your personal information
          from unauthorized access, use, or disclosure. This includes:
        </p>
        <ul>
          <li>SSL encryption</li>
          <li>Secure server environments</li>
          <li>Restricted access to personal data</li>
        </ul>
        <p>
          While we strive to protect your data, no internet transmission or storage method is 100%
          secure. You acknowledge that absolute security cannot be guaranteed.
        </p>
      </>
    ),
  },
  {
    id: "external-links",
    heading: "Links to External Websites",
    body: (
      <>
        <p>
          Our Site may contain links to third-party websites. If you click on such links, you will
          be directed to their website.
        </p>
        <p>Please note:</p>
        <ul>
          <li>We do not control third-party websites</li>
          <li>We are not responsible for their content, privacy practices, or policies</li>
          <li>We encourage you to review each site's Privacy Policy before interacting with it</li>
        </ul>
      </>
    ),
  },
  {
    id: "email",
    heading: "Email Communications",
    body: (
      <>
        <p>Codelix may contact you via email for:</p>
        <ul>
          <li>Service updates</li>
          <li>Announcements</li>
          <li>Promotions</li>
          <li>Invoices or confirmations</li>
          <li>Surveys or feedback requests</li>
        </ul>
        <p>
          If you wish to stop receiving promotional or marketing emails, you may opt out anytime
          by replying "STOP" or using the unsubscribe link where available.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Privacy Policy",
    body: (
      <>
        <p>
          Codelix IT Solutions reserves the right to update or modify this Privacy Policy at any
          time. Significant changes will be communicated through:
        </p>
        <ul>
          <li>A notice on our website</li>
          <li>Email notifications (if applicable)</li>
          <li>Updated documentation on this page</li>
        </ul>
        <p>
          Your continued use of the Site after such updates indicates your acceptance of the
          revised Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact Information",
    body: (
      <p>
        If you have any questions or concerns about this Privacy Policy or our data practices, you
        may contact us at:
        <br /><br />
        {/* JSX strips the trailing newline before each <br />, so without an
            explicit space the extracted text glued into "Codelix IT
            SolutionsAhmedabad, IndiaEmail:" — the line breaks render the same
            either way */}
        Codelix IT Solutions{" "}
        <br />
        Ahmedabad, India{" "}
        <br />
        Email: <a href="mailto:sales@codelixitsolutions.com">sales@codelixitsolutions.com</a>{" "}
        <br />
        Website: <a href="https://www.codelixitsolutions.com">www.codelixitsolutions.com</a>
      </p>
    ),
  },
];

export default function PrivacyPolicyV2() {
  return (
    <LegalV2
      crumbLabel="Privacy Policy"
      statusLabel="Legal · Data & privacy"
      titleLine1="How we handle"
      titleLine2="your information."
      sub="What we collect, why we collect it, and how it's protected — in full."
      updated="2026"
      sections={SECTIONS}
    />
  );
}
