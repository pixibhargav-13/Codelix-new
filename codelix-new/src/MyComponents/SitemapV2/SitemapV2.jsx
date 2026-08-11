import React, { useEffect, useMemo, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { Search, ArrowUpRight } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./SitemapV2.css";

import { CASE_STUDIES } from "../CaseStudyDetailV2/caseStudiesData";
import { blogs, slugify } from "../../data/blogData";
import { INDUSTRIES } from "../IndustriesV2/industriesData";
import { PRODUCTS } from "../ProductsV2/productsData";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from '../Shared/CtaSection';


/* every route here is a real <Route> registered in App.jsx — only the new
   v2-theme pages, not the legacy site */
const GROUPS = [
  {
    title: "Main",
    links: [
      { label: "Homepage", href: "/" },
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Work", href: "/work" },
      { label: "Case Studies", href: "/case-study" },
      { label: "Blog", href: "/blog" },
      { label: "Industries We Serve", href: "/industries" },
      { label: "Process", href: "/process" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    /* was a hand-picked 7 of the 8 core services — missed Support &
       Managed Services entirely and all 18 additional service pages
       (only reachable via the footer's "More Services" row + the
       /services/:slug catch-all route). FOOTER_ALL_SERVICES is the
       real, complete, already-arranged list of all 26 — same source of
       truth as the footer, so nothing here can drift out of sync again. */
    title: "Services",
    links: [
      { label: "Services", href: "/services" },
      ...FOOTER_ALL_SERVICES.map((s) => ({ label: s.label, href: s.path })),
    ],
  },
  {
    title: "Industries",
    links: INDUSTRIES.map(ind => ({ label: ind.title, href: `/industries/${ind.slug}` }))
  },
  {
    title: "Products",
    links: PRODUCTS.map(p => ({ label: p.name, href: `/products/${p.slug}` }))
  },
  {
    title: "Case Studies",
    links: CASE_STUDIES.map(cs => ({ label: cs.title, href: `/case-study/${cs.slug}` }))
  },
  {
    title: "Blog Articles",
    links: blogs.map(b => ({ label: b.title, href: `/blog/${slugify(b.title)}` }))
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Technologies", href: "/technologies" },
      { label: "Careers", href: "/careers" },
      { label: "FAQ", href: "/faq" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const TOTAL_LINKS = GROUPS.reduce((n, g) => n + g.links.length, 0);

export default function SitemapV2() {
  
  
  
  const [search, setSearch] = useState("");

  const rootRef = useRef(null);

  

  

  /* hero intro — masked-line GSAP wipe, matching the other v2 pages */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter for each group column */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    rootRef.current?.querySelectorAll(".v2-label, .v2-heading, .smv2-group-vertical, .v2-cta").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [search]);

  /* extraordinary section — a live search across every real route, with a
     match count that re-plays its pop-in animation on every change */
  const filteredGroups = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return GROUPS;
    return GROUPS
      .map((g) => ({ ...g, links: g.links.filter((l) => l.label.toLowerCase().includes(term) || l.href.toLowerCase().includes(term)) }))
      .filter((g) => g.links.length > 0);
  }, [search]);

  const matchCount = useMemo(() => filteredGroups.reduce((n, g) => n + g.links.length, 0), [filteredGroups]);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <em>Sitemap</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {TOTAL_LINKS} pages, one map</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Every page,</span></span>
                <span className="line"><span className="v2-hero-accent">one place to find it.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                A complete map of the site — search or browse by section.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · SITEMAP — the extraordinary section: a live search
          across every real route on the site, with each surviving group
          re-animating in on every filter change. ══════════ */}
      <section className="v2-section" id="sitemap">
        <div className="smv2-toolbar">
          <div className="smv2-search">
            <Search size={16} strokeWidth={1.8} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search pages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="smv2-count">
            {matchCount} of {TOTAL_LINKS} pages
          </span>
        </div>

        <div className="smv2-groups-vertical">
          {filteredGroups.length === 0 && (
            <p className="smv2-empty">No pages match "{search}".</p>
          )}
          {filteredGroups.map((g) => (
            <div className="smv2-group-vertical" key={g.title}>
              <h2 className="smv2-group-vertical-title">
                {g.title}
              </h2>
              <div className="smv2-hatched-bg">
                <div className="smv2-links-grid">
                  {g.links.map((l) => (
                    <a href={l.href} key={l.href} className="smv2-link-card">
                      <span>{l.label}</span>
                      <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · CTA ══════════ */}
      <CtaSection className="v2-section--void  smv2-cta-shell">
        
          <p className="v2-label">Can't Find It?</p>
          <h2 className="v2-cta-headline">
            Looking for something<br />that's not here?
          </h2>
          <p className="v2-cta-body">Just ask — we'll point you in the right direction.</p>
          <div className="v2-cta-actions">
            <a className="v2-btn" href="/contact">Contact us →</a></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
            <FooterV2 />
    </div>
  );
}
