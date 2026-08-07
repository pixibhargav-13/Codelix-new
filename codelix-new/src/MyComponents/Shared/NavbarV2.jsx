import React, { useState, useEffect } from "react";
import { NAVBAR_SERVICES_HIERARCHY } from "../HomepageV2/footerData";
import { 
  Globe, Smartphone, Palette, ShoppingCart, 
  Database, Bot, LineChart, Cloud, ChevronRight
} from "lucide-react";
import codelixLogo from "../Images/codelix-logo.png";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import "./NavbarV2.css";

const getCategoryIcon = (title) => {
  switch (title) {
    case "Web Development": return <Globe size={18} strokeWidth={1.75} />;
    case "Application Development": return <Smartphone size={18} strokeWidth={1.75} />;
    case "UI/UX & Product Design": return <Palette size={18} strokeWidth={1.75} />;
    case "E-Commerce Solutions": return <ShoppingCart size={18} strokeWidth={1.75} />;
    case "Enterprise Software Solutions": return <Database size={18} strokeWidth={1.75} />;
    case "AI & Automation Solutions": return <Bot size={18} strokeWidth={1.75} />;
    case "Data Analytics & Business Intelligence": return <LineChart size={18} strokeWidth={1.75} />;
    case "Support & Managed Services": return <Cloud size={18} strokeWidth={1.75} />;
    default: return null;
  }
};

const getCategoryDescription = (title) => {
  switch (title) {
    case "Web Development": return "High-performance websites and web applications.";
    case "Application Development": return "Scalable SaaS products and mobile experiences.";
    case "UI/UX & Product Design": return "Research-driven design systems and interfaces.";
    case "E-Commerce Solutions": return "Marketplaces, payments, and digital storefronts.";
    case "Enterprise Software Solutions": return "ERP, CRM, APIs, and legacy modernizations.";
    case "AI & Automation Solutions": return "Generative AI, smart agents, and workflow automation.";
    case "Data Analytics & Business Intelligence": return "Predictive models, BI, and data engineering.";
    case "Support & Managed Services": return "Cloud migrations, infrastructure, and dedicated teams.";
    default: return "";
  }
};

export default function NavbarV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 40);
      setNavHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""} ${navHidden ? "nav-hidden" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/preview-v2" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <div className="v2-nav-dropdown">
              <a href="/services-v2">Services <span className="v2-nav-dropdown-chevron">▾</span></a>
              <div className="v2-nav-dropdown-panel">
                <div className="v2-nav-dropdown-head">
                  <div>
                    <p className="v2-nav-dropdown-head-label">Our Services</p>
                    <p className="v2-nav-dropdown-head-lede">Everything we build, in one place.</p>
                  </div>
                  <a href="/services-v2" className="v2-nav-dropdown-head-all">View all services →</a>
                </div>
                <div className="v2-nav-mega-menu">
                  {NAVBAR_SERVICES_HIERARCHY.map((category) => (
                    <div key={category.title} className="v2-nav-mega-category">
                      <a href={category.path} className="v2-nav-mega-title-wrapper">
                        <div className="v2-nav-mega-icon-box">
                          {getCategoryIcon(category.title)}
                        </div>
                        <div className="v2-nav-mega-title-content">
                          <span className="v2-nav-mega-title">
                            {category.title} <span className="v2-nav-mega-arrow">→</span>
                          </span>
                          <span className="v2-nav-mega-desc">
                            {getCategoryDescription(category.title)}
                          </span>
                        </div>
                      </a>
                      <div className="v2-nav-mega-links">
                        {category.items.map((item) => (
                          <a key={item.label} href={item.path} className="v2-nav-mega-link">
                            <span className="v2-nav-mega-link-left">
                              <span className="v2-nav-mega-link-dot"></span>
                              {item.label}
                            </span>
                            <span className="v2-nav-mega-link-arrow"><ChevronRight size={14} strokeWidth={2} /></span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/about-v2">About</a>
          </div>
          <div className="v2-nav-actions">
            <a className="v2-btn v2-btn--filled v2-nav-cta" href="/contact-v2">Book a consultation</a>
            <button
              className={`v2-burger ${mobileOpen ? "open" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <V2MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
