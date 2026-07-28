import React from "react";

const NAV_LINKS = [
  { label: "Homepage V2", href: "/preview-v2" },
  { label: "Services V2", href: "/services-v2" },
  { label: "About V2", href: "/about-v2" },
  { label: "Work V2", href: "/work-v2" },
  { label: "Industries V2", href: "/industries-v2" },
  { label: "Process V2", href: "/process-v2" },
  { label: "Contact V2", href: "/contact-v2" },
];

export default function V2MobileDrawer({ open, onClose }) {
  return (
    <div className={`v2-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button
        type="button"
        className="v2-drawer-close"
        aria-label="Close menu"
        onClick={onClose}
      >
        <span /><span />
      </button>
      <div className="v2-drawer-links">
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            style={{ transitionDelay: `${0.08 + i * 0.05}s` }}
            onClick={onClose}
          >
            <span className="v2-drawer-index">{String(i + 1).padStart(2, "0")}</span>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
