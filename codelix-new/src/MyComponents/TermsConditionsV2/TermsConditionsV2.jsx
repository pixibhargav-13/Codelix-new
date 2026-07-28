import React from "react";
import LegalV2 from "../LegalV2/LegalV2";

/* same real legal text as TermsConditions.jsx, restructured into TOC
   sections for the v2 shell — not new/invented terms */
const SECTIONS = [
  {
    id: "agreement",
    heading: "Agreement Between User and Codelix",
    body: (
      <p>
        Welcome to <a href="https://www.codelixitsolutions.com">www.codelixitsolutions.com</a> (the
        "Site"). The Site is owned and operated by Codelix IT Solutions, Ahmedabad. By accessing
        or using this Site, you agree to be bound by these Terms &amp; Conditions (the "Terms")
        without modification. If you do not agree with any part of these Terms, please do not use
        the Site.
      </p>
    ),
  },
  {
    id: "communications",
    heading: "Electronic Communications",
    body: (
      <p>
        By visiting <a href="https://www.codelixitsolutions.com">www.codelixitsolutions.com</a> or
        communicating with us through email, forms, or chats, you consent to receive electronic
        communications from Codelix. All agreements, notices, disclosures, and other
        communications provided electronically satisfy any legal requirement that such
        communications be in writing.
      </p>
    ),
  },
  {
    id: "account",
    heading: "Your Account",
    body: (
      <>
        <p>
          If you create an account on the Site or access any client dashboard provided by
          Codelix, you are responsible for maintaining the confidentiality of your login
          credentials and restricting access to your devices. You accept full responsibility for
          all activities conducted under your account.
        </p>
        <p>
          Codelix is not liable for any unauthorized access arising from loss, theft, or sharing
          of your credentials. We reserve the right to modify, suspend, or terminate accounts,
          content, or services at our discretion.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    heading: "Children Under Thirteen",
    body: (
      <p>
        Codelix does not knowingly collect personal information from individuals under the age of
        thirteen. If you are under 18, you may use this Site only with permission and supervision
        from a parent or guardian.
      </p>
    ),
  },
  {
    id: "ip",
    heading: "No Unlawful or Prohibited Use / Intellectual Property",
    body: (
      <>
        <p>
          You are granted a limited, revocable, non-transferable license to access and use the
          Site strictly according to these Terms.
        </p>
        <p>
          You agree not to use the Site for any purpose that is unlawful or prohibited by these
          Terms, including actions that may:
        </p>
        <ul>
          <li>Damage, disable, or overburden the Site</li>
          <li>Interfere with other users' access</li>
          <li>Attempt to gain unauthorized access to any system or information</li>
        </ul>
        <p>
          All content on the Site, including text, graphics, UI/UX elements, media, logos, and
          compiled data, is the property of Codelix IT Solutions or its licensors and is protected
          by copyright and intellectual property laws.
        </p>
        <p>You may not:</p>
        <ul>
          <li>Modify, publish, copy, distribute, or sell any part of the content</li>
          <li>Reverse-engineer any software on the Site</li>
          <li>Create derivative works without written permission</li>
        </ul>
        <p>
          Using the content does not grant ownership or additional licenses beyond the limited use
          described.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    heading: "Third-Party Accounts",
    body: (
      <p>
        If the Site allows integration with third-party tools (e.g., GitHub, Google, social
        logins), you agree that connecting such accounts authorizes Codelix to receive limited
        information per your settings. If you do not want data shared, do not connect third-party
        accounts.
      </p>
    ),
  },
  {
    id: "international",
    heading: "International Users",
    body: (
      <p>
        If you access the Site from outside India, you are solely responsible for complying with
        local laws. You agree not to use Codelix content in any country or manner that violates
        applicable regulations.
      </p>
    ),
  },
  {
    id: "indemnification",
    heading: "Indemnification",
    body: (
      <>
        <p>
          You agree to indemnify and hold harmless Codelix IT Solutions, its founders, employees,
          partners, and agents from any claims, damages, losses, liabilities, and expenses
          (including attorney fees) arising from:
        </p>
        <ul>
          <li>Your use or inability to use the Site</li>
          <li>Any content you submit</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any third-party rights or laws</li>
        </ul>
        <p>
          Codelix reserves the right to assume exclusive defense in such matters, with your
          cooperation.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    heading: "Termination / Access Restriction",
    body: (
      <>
        <p>
          Codelix may terminate or restrict your access to the Site, services, or accounts at any
          time without notice. This Agreement is governed by the laws of India, and you consent to
          exclusive jurisdiction in Ahmedabad courts for any dispute.
        </p>
        <p>
          If any part of this Agreement is deemed invalid, the rest remains enforceable. This
          document constitutes the full, complete Terms between the user and Codelix.
        </p>
      </>
    ),
  },
  {
    id: "printed",
    heading: "Printed & Electronic Versions",
    body: (
      <p>
        A printed or electronic copy of these Terms is admissible in judicial or administrative
        proceedings to the same extent as other business documents.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to Terms",
    body: (
      <p>
        Codelix IT Solutions may update or revise these Terms at any time. The most recent version
        will replace all previous versions. Users are encouraged to check this page periodically
        for updates.
      </p>
    ),
  },
];

export default function TermsConditionsV2() {
  return (
    <LegalV2
      crumbLabel="Terms & Conditions"
      statusLabel="Legal · Terms of use"
      titleLine1="The terms behind"
      titleLine2="using this site."
      sub="Plain-language legal terms covering how you can use www.codelixitsolutions.com and the content on it."
      updated="2026"
      sections={SECTIONS}
    />
  );
}
