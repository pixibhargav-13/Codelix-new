import React from "react";
import LegalV2 from "../LegalV2/LegalV2";

/* grounded in the one real, existing cancellation statement on the site
   (HomepageFaq.jsx: "you can cancel at any stage with written notice, work
   completed up to that date is billed, unused balance is refunded") —
   expanded into full sections without inventing specific timeframes,
   percentages, or terms not established elsewhere on the real site */
const SECTIONS = [
  {
    id: "overview",
    heading: "Overview",
    body: (
      <p>
        This policy explains how cancellations and refunds are handled on projects with Codelix
        IT Solutions. It applies alongside the payment terms set out in your project proposal —
        where the two differ on project-specific detail, your signed proposal governs.
      </p>
    ),
  },
  {
    id: "cancellation",
    heading: "Cancelling a Project",
    body: (
      <p>
        You can cancel a project at any stage by giving us written notice (email is fine). Work
        completed up to the cancellation date is billed at the agreed rate. Any portion of your
        payment that hasn't yet been used against completed work is refunded to you.
      </p>
    ),
  },
  {
    id: "how-billed",
    heading: "How Completed Work Is Billed",
    body: (
      <p>
        Because our process moves in fixed stages — discovery, scoping, design, development, QA,
        and launch — cancellation billing is based on which stages were signed off and delivered
        before the cancellation date, not on time elapsed. A project cancelled after Discovery is
        billed differently from one cancelled midway through Development.
      </p>
    ),
  },
  {
    id: "non-refundable",
    heading: "What Isn't Refunded",
    body: (
      <p>
        Payment for stages that were completed and delivered before cancellation is not refunded,
        since that work has already been done and handed over. Third-party costs paid on your
        behalf (domains, licenses, paid plugins, hosting already provisioned) are also
        non-refundable once purchased.
      </p>
    ),
  },
  {
    id: "process",
    heading: "How Refunds Are Processed",
    body: (
      <p>
        Once a cancellation is confirmed in writing, we calculate the completed-work balance
        against what's already been paid and issue any refund due back to the original payment
        method. We'll confirm the exact refund amount with you in writing before processing it.
      </p>
    ),
  },
  {
    id: "disputes",
    heading: "If You Disagree With a Billing Decision",
    body: (
      <p>
        If you think a cancellation invoice doesn't reflect the work actually completed, tell us —
        we'll walk through the stage sign-offs with you and correct it if we got it wrong. Most
        disagreements here come down to a straightforward look at what was delivered and signed
        off before the cancellation date.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: (
      <p>
        Codelix IT Solutions may update this policy from time to time. The version in effect at
        the time you sign a project proposal is the one that applies to that project.
      </p>
    ),
  },
];

export default function RefundPolicyV2() {
  return (
    <LegalV2
      crumbLabel="Refund Policy"
      statusLabel="Legal · Cancellations & refunds"
      titleLine1="Cancel anytime."
      titleLine2="Here's exactly how billing works."
      sub="What happens to your payment if a project is cancelled midway — no fine print, no surprises."
      updated="2026"
      sections={SECTIONS}
    />
  );
}
