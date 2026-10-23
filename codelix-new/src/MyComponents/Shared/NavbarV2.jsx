import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLenis } from 'lenis/react';
import { NAVBAR_SERVICES_HIERARCHY, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import {
  Globe, Smartphone, Palette, ShoppingCart,
  Database, Bot, LineChart, Cloud, ChevronRight,
  Factory, Landmark, Cpu, Activity, Coffee, Building2,
  GraduationCap, Rocket, Plane, Boxes
} from "lucide-react";
import codelixLogo from "../Images/codelix-logo.webp";
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
  /* Did THIS instance lock the page scroll? Every one of the 30 page
     components renders its own <NavbarV2 />, so following a drawer link
     unmounts this navbar and mounts a fresh one — refs and all. The body's
     dataset.scrollY outlives that, which is exactly how a stale offset used to
     get restored on the new page. */
  const lockedRef = useRef(false);

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
      lockedRef.current = true;
    } else {
      if (lenis) lenis.start();
      /* consumed exactly once, so a later mount can't find it and act on it */
      const stored = document.body.dataset.scrollY;
      delete document.body.dataset.scrollY;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      if (lockedRef.current) {
        /* same instance, same page: the drawer was simply dismissed, so put
           the reader back where they were */
        lockedRef.current = false;
        if (stored) window.scrollTo(0, parseInt(stored));
      } else if (stored) {
        /* a fresh navbar mounting on top of someone else's lock — a drawer
           link was followed. Restoring here would drop the reader part-way
           down the new page. Take the top instead: dropping position:fixed
           gives the document its height back and the browser reapplies the old
           offset when that layout lands, so flush it first, then re-assert
           next frame in case Lenis is still easing toward its stored target. */
        void document.body.offsetHeight;
        const toTop = () => {
          window.scrollTo(0, 0);
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        };
        toTop();
        requestAnimationFrame(toTop);
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
          <Link to="/" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" width="544" height="188" />
          </Link>
          <div className="v2-nav-links">
            <div className="v2-nav-dropdown">
              <Link to="/services">Services <span className="v2-nav-dropdown-chevron">▾</span></Link>
              <div className="v2-nav-dropdown-panel" data-lenis-prevent>
                <div className="v2-nav-dropdown-head">
                  <div>
                    <p className="v2-nav-dropdown-head-label">Our Services</p>
                    <p className="v2-nav-dropdown-head-lede">Everything we build, in one place.</p>
                  </div>
                  <Link to="/services" className="v2-nav-dropdown-head-all">View all services →</Link>
                </div>
                <div className="v2-nav-mega-menu">
                  {NAVBAR_SERVICES_HIERARCHY.map((category) => (
                    <div key={category.title} className="v2-nav-mega-category">
                      <Link to={category.path} className="v2-nav-mega-title-wrapper">
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
                      </Link>
                      <div className="v2-nav-mega-links">
                        {category.items.map((item) => (
                          <Link key={item.label} to={item.path} className="v2-nav-mega-link">
                            <span className="v2-nav-mega-link-left">
                              <span className="v2-nav-mega-link-dot"></span>
                              {item.label}
                            </span>
                            <span className="v2-nav-mega-link-arrow"><ChevronRight size={14} strokeWidth={2} /></span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/work">Work</Link>
            <div className="v2-nav-dropdown">
              <Link to="/industries">Industries <span className="v2-nav-dropdown-chevron">▾</span></Link>
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
                    <Link to="/industries" className="v2-nav-mega-menu-left-btn">Explore All Industries <ChevronRight size={14} strokeWidth={2.5} /></Link>
                  </div>
                  <div className="v2-nav-mega-menu-right">
                    {FOOTER_INDUSTRY_KEYWORDS.map((industry) => (
                      <Link key={industry.label} to={industry.path} className="v2-nav-industry-link">
                        <span className="v2-nav-industry-link-left">
                          <span className="v2-nav-industry-link-icon-wrap">
                            {getIndustryIcon(industry.label)}
                          </span>
                          <span className="v2-nav-industry-link-text">{industry.label}</span>
                        </span>
                        <ChevronRight className="v2-nav-industry-link-arrow" size={16} strokeWidth={2} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="v2-nav-dropdown">
              <Link to={`/products/${PRODUCTS[0].slug}`}>Products <span className="v2-nav-dropdown-chevron">▾</span></Link>
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
                      <Link key={p.slug} to={`/products/${p.slug}`} className="v2-nav-product-link">
                        <span className="v2-nav-product-link-top">
                          <span className="v2-nav-product-link-logo"><img src={p.logo} alt={`${p.name} logo`} /></span>
                          <span className="v2-nav-product-link-name" style={{ color: p.accent }}>{p.name}</span>
                          <ChevronRight className="v2-nav-industry-link-arrow" size={16} strokeWidth={2} />
                        </span>
                        <span className="v2-nav-product-link-badge">{p.badge}</span>
                        <span className="v2-nav-product-link-tagline">{p.tagline}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link to="/hire-developers">Hire Developers</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="v2-nav-actions">
            <Link className="v2-btn v2-btn--filled v2-nav-cta" to="/contact">Book a consultation</Link>
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
