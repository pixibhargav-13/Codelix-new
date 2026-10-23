import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown, LayoutGrid, Briefcase, Building2, Info, Users,
  Workflow, Tag, Cpu, Newspaper, HelpCircle, Rocket, Mail, Boxes, UserPlus,
} from "lucide-react";

/* Homepage, Services, Work, and Industries are already reachable from the
   logo and the centered nav links, so this menu carries everything else —
   every remaining real page, not a curated subset. */
import { NAVBAR_SERVICES_HIERARCHY, FOOTER_INDUSTRY_KEYWORDS } from "./footerData";
import { PRODUCTS } from "../ProductsV2/productsData";

const SERVICES_ICON = LayoutGrid;

/* grouped: primary → who we are → how we work → resources → join/contact */
const NAV_LINKS = [
  { label: "Work", href: "/work", icon: Briefcase },
  { label: "Hire Developers", href: "/hire-developers", icon: UserPlus },
  { label: "About", href: "/about", icon: Info },
  { label: "Team", href: "/team", icon: Users },
  { label: "Process", href: "/process", icon: Workflow },
  { label: "Pricing", href: "/pricing", icon: Tag },
  { label: "Technologies", href: "/technologies", icon: Cpu },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Careers", href: "/careers", icon: Rocket },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function V2MobileDrawer({ open, onClose }) {
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [industriesOpen, setIndustriesOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);

  return (
    <>
      <div className={`v2-drawer-backdrop ${open ? "open" : ""}`} onClick={onClose} aria-hidden="true" data-lenis-prevent="true" />
      {/* inert, not just aria-hidden: while closed the drawer is off-screen
          but its links and buttons stayed in the tab order, so keyboard users
          tabbed into an invisible menu — and aria-hidden on a container that
          holds focusable children is itself invalid. inert removes the whole
          subtree from focus and from the accessibility tree. */}
      <div
        className={`v2-drawer ${open ? "open" : ""}`}
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent="true"
      >
        <button type="button" className="v2-drawer-close" aria-label="Close menu" onClick={onClose}>
          <span /><span />
        </button>
        <div className="v2-drawer-scroll-area">
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
                <Link to="/services" onClick={onClose} className="v2-drawer-sublink-all">
                  Overview (All Services)
                </Link>
                {NAVBAR_SERVICES_HIERARCHY.map((category) => (
                  <div key={category.title} className="v2-drawer-sublink-category">
                    <Link to={category.path} onClick={onClose} className="v2-drawer-sublink-title">
                      {category.title}
                    </Link>
                    {category.items.map((item) => (
                      <Link key={item.label} to={item.path} onClick={onClose} className="v2-drawer-sublink-item">
                        {item.label}
                      </Link>
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
                <Link to="/industries" onClick={onClose} className="v2-drawer-sublink-all">
                  Overview (All Industries)
                </Link>
                <div className="v2-drawer-sublink-category">
                  {FOOTER_INDUSTRY_KEYWORDS.map((industry) => (
                    <Link key={industry.label} to={industry.path} onClick={onClose} className="v2-drawer-sublink-item" style={{ paddingLeft: "16px" }}>
                      {industry.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Expandable Products Menu */}
            <div className="v2-drawer-accordion mobile-only-drawer-link">
              <button
                className={`v2-drawer-link-btn ${productsOpen ? "open" : ""}`}
                onClick={() => setProductsOpen(!productsOpen)}
                aria-expanded={productsOpen}
              >
                <span className="v2-drawer-link-label">
                  <span className="v2-drawer-link-icon"><Boxes size={17} strokeWidth={1.75} /></span>
                  {"Products"}
                </span>
                <ChevronDown className={`v2-drawer-chevron ${productsOpen ? "open" : ""}`} size={20} strokeWidth={2} />
              </button>

              <div className={`v2-drawer-sublinks ${productsOpen ? "open" : ""}`}>
                <div className="v2-drawer-sublink-category">
                  {PRODUCTS.map((p) => (
                    <Link key={p.slug} to={`/products/${p.slug}`} onClick={onClose} className="v2-drawer-sublink-item">
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Standard Links */}
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                onClick={onClose}
                className={(l.label === "Work" || l.label === "About") ? "mobile-only-drawer-link" : ""}
              >
                <span className="v2-drawer-link-icon"><l.icon size={17} strokeWidth={1.75} /></span>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="v2-drawer-cta">
            <Link className="v2-btn v2-btn--filled" to="/contact" onClick={onClose}>
              <span>Book a consultation</span>
              <i className="v2-btn-arrow">→</i>
            </Link>
            <div className="v2-drawer-cta-socials">
              <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
