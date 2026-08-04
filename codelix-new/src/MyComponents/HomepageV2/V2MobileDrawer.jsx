import React from "react";
import {
  ChevronDown, LayoutGrid, Briefcase, Building2, Info, Users,
  Workflow, Tag, Cpu, Newspaper, HelpCircle, Rocket, Mail,
} from "lucide-react";

/* Homepage, Services, Work, and Industries are already reachable from the
   logo and the centered nav links, so this menu carries everything else —
   every remaining real page, not a curated subset. */
import { FOOTER_SERVICE_KEYWORDS } from "./footerData";

const SERVICES_ICON = LayoutGrid;

/* grouped: primary → who we are → how we work → resources → join/contact */
const NAV_LINKS = [
  { label: "Work", href: "/work-v2", icon: Briefcase },
  { label: "Industries", href: "/industries-v2", icon: Building2 },
  { label: "About", href: "/about-v2", icon: Info },
  { label: "Team", href: "/team-v2", icon: Users },
  { label: "Process", href: "/process-v2", icon: Workflow },
  { label: "Pricing", href: "/pricing-v2", icon: Tag },
  { label: "Technologies", href: "/technologies-v2", icon: Cpu },
  { label: "Blog", href: "/blog-v2", icon: Newspaper },
  { label: "FAQ", href: "/faq-v2", icon: HelpCircle },
  { label: "Careers", href: "/careers-v2", icon: Rocket },
  { label: "Contact", href: "/contact-v2", icon: Mail },
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
              <span className="v2-drawer-link-label">
                <span className="v2-drawer-link-icon"><SERVICES_ICON size={17} strokeWidth={1.75} /></span>
                Services
              </span>
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
              className={(l.label === "Work" || l.label === "Industries" || l.label === "About") ? "mobile-only-drawer-link" : ""}
            >
              <span className="v2-drawer-link-icon"><l.icon size={17} strokeWidth={1.75} /></span>
              {l.label}
            </a>
          ))}
        </div>

        <div className="v2-drawer-cta">
          <a className="v2-btn v2-btn--filled" href="/contact-v2" onClick={onClose}>
            <span>Book a consultation</span>
            <i className="v2-btn-arrow">→</i>
          </a>
          <div className="v2-drawer-cta-socials">
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </>
  );
}
