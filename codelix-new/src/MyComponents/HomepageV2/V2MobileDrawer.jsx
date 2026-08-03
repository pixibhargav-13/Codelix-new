import React from "react";
import { ChevronDown } from "lucide-react";

/* Homepage, Services, Work, and Industries are already reachable from the
   logo and the centered nav links, so this menu carries everything else —
   every remaining real page, not a curated subset. */
import { FOOTER_SERVICE_KEYWORDS } from "./footerData";

/* grouped: primary → who we are → how we work → resources → join/contact */
const NAV_LINKS = [
  { label: "Work", href: "/work-v2" },
  { label: "Industries", href: "/industries-v2" },
  { label: "About", href: "/about-v2" },
  { label: "Team", href: "/team-v2" },
  { label: "Process", href: "/process-v2" },
  { label: "Pricing", href: "/pricing-v2" },
  { label: "Technologies", href: "/technologies-v2" },
  { label: "Blog", href: "/blog-v2" },
  { label: "FAQ", href: "/faq-v2" },
  { label: "Careers", href: "/careers-v2" },
  { label: "Contact", href: "/contact-v2" },
];

export default function V2MobileDrawer({ open, onClose }) {
  const [servicesOpen, setServicesOpen] = React.useState(false);

  return (
    <>
      <div className={`v2-drawer-backdrop ${open ? "open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div className={`v2-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <button type="button" className="v2-drawer-close" aria-label="Close menu" onClick={onClose}>
          <span /><span />
        </button>
        <div className="v2-drawer-links">

          {/* Expandable Services Menu */}
          <div className="v2-drawer-accordion mobile-only-drawer-link">
            <button
              className={`v2-drawer-link-btn ${servicesOpen ? "open" : ""}`}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown className={`v2-drawer-chevron ${servicesOpen ? "open" : ""}`} size={20} strokeWidth={2} />
            </button>
            
            <div className={`v2-drawer-sublinks ${servicesOpen ? "open" : ""}`}>
              <a href="/services-v2" onClick={onClose} className="v2-drawer-sublink-all">
                Overview (All Services)
              </a>
              {FOOTER_SERVICE_KEYWORDS.map((s) => (
                <a key={s.label} href={s.path} onClick={onClose}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Standard Links */}
          {NAV_LINKS.map((l) => (
            <a 
              key={l.label} 
              href={l.href} 
              onClick={onClose}
              className={(l.label === "Work" || l.label === "Industries") ? "mobile-only-drawer-link" : ""}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
