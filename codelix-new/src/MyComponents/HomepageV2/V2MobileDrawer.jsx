import React from "react";

const NAV_LINKS = [
  { label: "Homepage", href: "/preview-v2" },
  { label: "Services", href: "/services-v2" },
  { label: "About", href: "/about-v2" },
  { label: "Work", href: "/work-v2" },
  { label: "Industries", href: "/industries-v2" },
  { label: "Process", href: "/process-v2" },
  { label: "Contact", href: "/contact-v2" },
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
