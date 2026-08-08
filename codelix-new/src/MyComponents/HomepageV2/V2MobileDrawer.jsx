import React from "react";
import {
  ChevronDown, LayoutGrid, Briefcase, Building2, Info, Users,
  Workflow, Tag, Cpu, Newspaper, HelpCircle, Rocket, Mail,
} from "lucide-react";

/* Homepage, Services, Work, and Industries are already reachable from the
   logo and the centered nav links, so this menu carries everything else —
   every remaining real page, not a curated subset. */
import { NAVBAR_SERVICES_HIERARCHY, FOOTER_INDUSTRY_KEYWORDS } from "./footerData";

const SERVICES_ICON = LayoutGrid;

/* grouped: primary → who we are → how we work → resources → join/contact */
const NAV_LINKS = [
  { label: "Work", href: "/work-v2", icon: Briefcase },
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
  const [industriesOpen, setIndustriesOpen] = React.useState(false);

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
                {"Services"}
              </span>
              <ChevronDown className={`v2-drawer-chevron ${servicesOpen ? "open" : ""}`} size={20} strokeWidth={2} />
            </button>
            
            <div className={`v2-drawer-sublinks ${servicesOpen ? "open" : ""}`}>
              <a href="/services-v2" onClick={onClose} className="v2-drawer-sublink-all">
                Overview (All Services)
              </a>
              {NAVBAR_SERVICES_HIERARCHY.map((category) => (
                <div key={category.title} className="v2-drawer-sublink-category">
                  <a href={category.path} onClick={onClose} className="v2-drawer-sublink-title">
                    {category.title}
                  </a>
                  {category.items.map((item) => (
                    <a key={item.label} href={item.path} onClick={onClose} className="v2-drawer-sublink-item">
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Industries Menu */}
          <div className="v2-drawer-accordion mobile-only-drawer-link">
            <button
              className={`v2-drawer-link-btn ${industriesOpen ? "open" : ""}`}
              onClick={() => setIndustriesOpen(!industriesOpen)}
              aria-expanded={industriesOpen}
            >
              <span className="v2-drawer-link-label">
                <span className="v2-drawer-link-icon"><Building2 size={17} strokeWidth={1.75} /></span>
                {"Industries"}
              </span>
              <ChevronDown className={`v2-drawer-chevron ${industriesOpen ? "open" : ""}`} size={20} strokeWidth={2} />
            </button>
            
            <div className={`v2-drawer-sublinks ${industriesOpen ? "open" : ""}`}>
              <a href="/industries-v2" onClick={onClose} className="v2-drawer-sublink-all">
                Overview (All Industries)
              </a>
              <div className="v2-drawer-sublink-category">
                {FOOTER_INDUSTRY_KEYWORDS.map((industry) => (
                  <a key={industry.label} href={industry.path} onClick={onClose} className="v2-drawer-sublink-item" style={{ paddingLeft: "16px" }}>
                    {industry.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Standard Links */}
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={onClose}
              className={(l.label === "Work" || l.label === "About") ? "mobile-only-drawer-link" : ""}
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
