import React, { useState, useEffect } from "react";
import { useLenis } from 'lenis/react';
import { NAVBAR_SERVICES_HIERARCHY, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import {
  Globe, Smartphone, Palette, ShoppingCart,
  Database, Bot, LineChart, Cloud, ChevronRight,
  Factory, Landmark, Cpu, Activity, Coffee, Building2,
  GraduationCap, Rocket, Plane, Boxes
} from "lucide-react";
import codelixLogo from "../Images/codelix-logo.png";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { PRODUCTS } from "../ProductsV2/productsData";
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
    default: return <Globe size={18} strokeWidth={1.75} />;
  }
};

const getIndustryIcon = (label) => {
  switch (label) {
    case "Manufacturing": return <Factory size={18} strokeWidth={1.75} />;
    case "FinTech": return <Landmark size={18} strokeWidth={1.75} />;
    case "AI & Data": return <Cpu size={18} strokeWidth={1.75} />;
    case "Healthcare": return <Activity size={18} strokeWidth={1.75} />;
    case "Food & Beverages": return <Coffee size={18} strokeWidth={1.75} />;
    case "E-Commerce": return <ShoppingCart size={18} strokeWidth={1.75} />;
    case "Real Estate & Construction": return <Building2 size={18} strokeWidth={1.75} />;
    case "Education": return <GraduationCap size={18} strokeWidth={1.75} />;
    case "Startups": return <Rocket size={18} strokeWidth={1.75} />;
    case "B2B SaaS": return <Cloud size={18} strokeWidth={1.75} />;
    case "Travel & Hospitality": return <Plane size={18} strokeWidth={1.75} />;
    default: return <Globe size={18} strokeWidth={1.75} />;
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
  const lenis = useLenis();

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
    let scrollY = 0;
    if (mobileOpen) {
      if (lenis) lenis.stop();
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY;
    } else {
      if (lenis) lenis.start();
      scrollY = document.body.dataset.scrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""} ${navHidden ? "nav-hidden" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <div className="v2-nav-dropdown">
              <a href="/services">Services <span className="v2-nav-dropdown-chevron">▾</span></a>
              <div className="v2-nav-dropdown-panel" data-lenis-prevent>
                <div className="v2-nav-dropdown-head">
                  <div>
                    <p className="v2-nav-dropdown-head-label">Our Services</p>
                    <p className="v2-nav-dropdown-head-lede">Everything we build, in one place.</p>
                  </div>
                  <a href="/services" className="v2-nav-dropdown-head-all">View all services →</a>
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
            <a href="/work">Work</a>
            <div className="v2-nav-dropdown">
              <a href="/industries">Industries <span className="v2-nav-dropdown-chevron">▾</span></a>
              <div className="v2-nav-dropdown-panel" data-lenis-prevent>
                <div className="v2-nav-industry-mega-menu">
                  <div className="v2-nav-mega-menu-left">
                    <div className="v2-nav-mega-menu-left-bg-icon">
                      <Building2 size={160} strokeWidth={0.5} />
                    </div>
                    <h3 className="v2-nav-mega-menu-left-title">Industry Expertise</h3>
                    <p className="v2-nav-mega-menu-left-desc">
                      We engineer powerful, scalable software solutions perfectly tailored to the unique challenges of your industry.
                    </p>
                    <a href="/industries" className="v2-nav-mega-menu-left-btn">Explore All Industries <ChevronRight size={14} strokeWidth={2.5} /></a>
                  </div>
                  <div className="v2-nav-mega-menu-right">
                    {FOOTER_INDUSTRY_KEYWORDS.map((industry) => (
                      <a key={industry.label} href={industry.path} className="v2-nav-industry-link">
                        <span className="v2-nav-industry-link-left">
                          <span className="v2-nav-industry-link-icon-wrap">
                            {getIndustryIcon(industry.label)}
                          </span>
                          <span className="v2-nav-industry-link-text">{industry.label}</span>
                        </span>
                        <ChevronRight className="v2-nav-industry-link-arrow" size={16} strokeWidth={2} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="v2-nav-dropdown">
              <a href={`/products/${PRODUCTS[0].slug}`}>Products <span className="v2-nav-dropdown-chevron">▾</span></a>
              <div className="v2-nav-dropdown-panel" data-lenis-prevent>
                <div className="v2-nav-products-mega-menu">
                  <div className="v2-nav-mega-menu-left">
                    <div className="v2-nav-mega-menu-left-bg-icon">
                      <Boxes size={160} strokeWidth={0.5} />
                    </div>
                    <h3 className="v2-nav-mega-menu-left-title">Our Products</h3>
                    <p className="v2-nav-mega-menu-left-desc">
                      Beyond client work — SaaS products we design, build, and run ourselves.
                    </p>
                  </div>
                  <div className="v2-nav-products-right">
                    {PRODUCTS.map((p) => (
                      <a key={p.slug} href={`/products/${p.slug}`} className="v2-nav-product-link">
                        <span className="v2-nav-product-link-top">
                          <span className="v2-nav-product-link-logo"><img src={p.logo} alt="" /></span>
                          <span className="v2-nav-product-link-name" style={{ color: p.accent }}>{p.name}</span>
                          <ChevronRight className="v2-nav-industry-link-arrow" size={16} strokeWidth={2} />
                        </span>
                        <span className="v2-nav-product-link-badge">{p.badge}</span>
                        <span className="v2-nav-product-link-tagline">{p.tagline}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <a href="/about">About</a>
          </div>
          <div className="v2-nav-actions">
            <a className="v2-btn v2-btn--filled v2-nav-cta" href="/contact">Book a consultation</a>
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
