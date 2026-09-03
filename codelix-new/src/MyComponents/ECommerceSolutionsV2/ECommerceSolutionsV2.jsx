import { ShoppingCart, Gauge, CreditCard, ShieldCheck, PackageSearch, Wrench, CalendarCheck, Lock, Eye, Check, TrendingDown, Clock, ShoppingBag, Truck, RotateCcw, AlertTriangle, Building2, Store, Rocket, GraduationCap, Shirt, Utensils, FileCode2, BookOpen, KeyRound, Palette, Server, GitBranch, Globe, Smartphone, Code2, Sparkles, BarChart3, LifeBuoy, Minus, X, Phone, FileText, PlayCircle, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import { STATIC_TESTIMONIALS } from "../../data/testimonialsData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";

/* e-commerce-specific stack subset — pulled from the same real stack list
   shown on the homepage's "THE STACK" section, not a new set of claims */
import techReact from "../Images/react.png";
import techNext from "../Images/next.png";
import techNode from "../Images/node.png";
import techShopify from "../Images/shopify.png";
import techWoo from "../Images/woocommerce.png";
import techPostgres from "../Images/postgresql.png";
import techMongo from "../Images/MongoDB.png";
import techAws from "../Images/AWS.png";

/* real project screenshots — shared source of truth with WorkV2/CaseStudyV2 */
import { PROJECTS } from "../WorkV2/projectsData";
import TechStackShowcaseV2 from "../Shared/TechStackShowcaseV2";
import NavbarV2 from "../Shared/NavbarV2";
import ScrollSentence from '../Shared/ScrollSentence';
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';
import { useTestimonials } from "../../data/useTestimonials";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";


const ECOM_STACK = [
  { src: techReact, name: "React" },
  { src: techNext, name: "Next.js" },
  { src: techNode, name: "Node.js" },
  { src: techShopify, name: "Shopify" },
  { src: techWoo, name: "WooCommerce" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
  { src: techAws, name: "AWS" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: ShoppingBag, pain: "Carts get abandoned at checkout.", fix: "We design backwards from payment — fewer steps, clearer shipping costs, no surprise fees at the last screen." },
  { icon: Clock, pain: "The storefront is slow on mobile.", fix: "We hold a performance budget from day one and test on mid-range phones, not just fast office wifi." },
  { icon: PackageSearch, pain: "Inventory and orders don't sync.", fix: "A single source of truth between your storefront, warehouse, and any marketplaces you sell on." },
  { icon: RotateCcw, pain: "Returns and refunds are all manual.", fix: "Self-serve return flows wired into your actual fulfilment process, not a support inbox full of spreadsheets." },
  { icon: AlertTriangle, pain: "We can't handle a traffic spike.", fix: "Architecture that scales for a sale-day surge, load-tested before it ever needs to hold under real pressure." },
  { icon: TrendingDown, pain: "Traffic comes, but nobody converts.", fix: "Clear product pages, honest reviews, and a checkout that doesn't ask for anything it doesn't need." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Shirt, title: "Fashion & D2C", body: "Storefronts built around visual browsing, size guidance, and a fast path from landing page to cart." },
  { icon: Utensils, title: "Food & FMCG", body: "Subscription and repeat-order flows for products people buy again and again, not just once." },
  { icon: Building2, title: "B2B Commerce", body: "Bulk pricing, quote requests, and account-based ordering for buyers who aren't paying by card at checkout." },
  { icon: Rocket, title: "New Brands", body: "A launch-ready storefront that doesn't need a rebuild the moment the first real sales month lands." },
  { icon: Store, title: "Multi-Channel Retail", body: "One inventory feeding your website, marketplaces, and in-store point of sale without manual reconciliation." },
  { icon: GraduationCap, title: "Digital Products", body: "Checkout and delivery flows for courses, licenses, and downloads — no physical shipping to plan around." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 95, suffix: "+", label: "Lighthouse performance", note: "Measured on mobile, not desktop", ring: 95 },
  { value: 2, suffix: "s", label: "Target checkout load time", note: "First contentful paint on 4G", ring: 90 },
  { value: 100, suffix: "%", label: "Payment gateway uptime target", note: "Monitored from hour one", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: FileCode2, title: "Full source code", body: "The complete repository, with clean commit history — yours to keep, fork, or hand to another team." },
  { icon: GitBranch, title: "Repository access", body: "Transferred to your organisation account, with branch history and CI configuration intact." },
  { icon: BookOpen, title: "Technical documentation", body: "Setup, architecture, environment variables, and deployment steps written for a developer who's never seen it." },
  { icon: KeyRound, title: "Credentials & accounts", body: "Hosting, domain, payment gateway, and any third-party keys — registered in your name from the start." },
  { icon: Palette, title: "Design files", body: "The Figma project with components and styles, so future work doesn't start from a screenshot." },
  { icon: Server, title: "Deployment setup", body: "Live environment configured and documented, with a runbook for redeploying it yourself." },
];

const COMPARE_COLS = ["Codelix", "Template / builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "100% source-code ownership", vals: ["yes", "partial", "maybe", "partial"] },
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "Built for your exact catalogue & workflow", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Handles a real sale-day traffic spike", vals: ["yes", "maybe", "no", "yes"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

const NEXT_STEPS = [
  { n: "01", icon: Phone, title: "Discovery call", meta: "30 minutes", body: "A no-pressure call to understand your catalogue, your customers, and what success looks like. No slide deck, no sales script." },
  { n: "02", icon: FileText, title: "Written proposal", meta: "Within 48 hours", body: "A clear scope, a fixed price, and a timeline — in writing. You'll know exactly what you're getting and what it costs before you commit." },
  { n: "03", icon: PlayCircle, title: "Kickoff", meta: "On your go-ahead", body: "Once you're happy, we lock the scope and start. You get a staging link and a point of contact from day one." },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's actually included */
const INCLUDED = [
  { icon: ShoppingCart, title: "Custom storefront build", body: "Hand-built or headless commerce front-ends — no page-builder bloat, no theme you have to fight to customise." },
  { icon: CreditCard, title: "Payment gateway integration", body: "Secure checkout wired to the gateways your market actually uses, with fees and taxes handled correctly." },
  { icon: PackageSearch, title: "Inventory & order sync", body: "A single source of truth between your storefront, warehouse, and any marketplaces you already sell on." },
  { icon: Gauge, title: "Performance budget", body: "We hold a Core Web Vitals target from day one. Fast on a mid-range phone on 4G, not just on your office wifi." },
  { icon: ShieldCheck, title: "Security & compliance", body: "HTTPS, PCI-conscious payment handling, and sensible headers configured before anything goes live." },
  { icon: Wrench, title: "CMS & handover", body: "An admin you can actually use for products and orders, plus documentation so your team owns it fully." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "storefront", label: "Standard storefront", weeks: 4, base: "A hosted or headless storefront with checkout." },
  { id: "marketplace", label: "Multi-vendor marketplace", weeks: 10, base: "Multiple sellers, payouts, and listing management." },
  { id: "b2b", label: "B2B ordering portal", weeks: 8, base: "Bulk pricing, quotes, and account-based checkout." },
  { id: "migration", label: "Platform migration", weeks: 5, base: "Moving an existing store to new architecture safely." },
];
const EST_SCALE = [
  { id: "s", label: "Under 100 SKUs", mult: 1 },
  { id: "m", label: "100–1,000 SKUs", mult: 1.3 },
  { id: "l", label: "1,000–10,000 SKUs", mult: 1.65 },
  { id: "xl", label: "10,000+ SKUs", mult: 2 },
];
const EST_ADDONS = [
  { id: "subs", label: "Subscriptions", weeks: 1 },
  { id: "multi", label: "Multi-currency", weeks: 0.5 },
  { id: "loyalty", label: "Loyalty & rewards", weeks: 1 },
  { id: "erp", label: "ERP/warehouse integration", weeks: 1.5 },
  { id: "pos", label: "In-store POS sync", weeks: 1.5 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what the storefront actually has to do — your catalogue, your customers, and what can be cut for launch." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Platform choice, catalogue structure, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity screens for every key template, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "3–8 weeks", body: "Front-end, checkout, and integrations built in sprints, with a staging link you can check at any point." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Cross-browser, cross-device, load, and payment-flow testing — then deployment and DNS cutover." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and improvements. You keep the code either way." },
];

/* real e-commerce projects — pulled from the same shared portfolio data as
   the Work page, filtered to the category that actually matches this
   service, not a mixed bag padded with marketplace/ERP work */
/* every project in PROJECTS now has a matching v2 case-study page, so all
   links route through /case-study rather than the old-site v1 href */
const RELATED = PROJECTS
  .filter((p) => p.category === "E-Commerce Solutions")
  .map((p) => ({
    tag: p.category, title: p.title, thumb: p.image,
    link: `/case-study${p.href}`,
  }));

const PRINCIPLES = [
  { key: "Delivered", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Owned", icon: Lock, claim: "No code you don't fully own.", body: "When the invoice is paid, the code is yours. We hand over the repos, the docs, and the keys. No vendor lock-in." },
  { key: "Visible", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens, so we can course-correct early." },
];

const FAQS = [
  { q: "Shopify, WooCommerce, or a custom build — which do we need?", a: "Shopify or WooCommerce cover most standard storefronts well and get you live faster. We'll recommend a custom or headless build only when your catalogue, workflow, or scale genuinely needs it." },
  { q: "Can you migrate our existing store without losing sales?", a: "Yes. We plan the migration around your traffic patterns, keep the old store live until the new one is verified, and handle redirects so SEO rankings carry over." },
  { q: "Do you handle payment gateway setup?", a: "Yes, for whichever gateways your market actually uses. You own the merchant account — we don't hold your payment processing hostage." },
  { q: "Can it handle a big sale-day traffic spike?", a: "We architect and load-test for it before launch, rather than finding out during your first real sale event." },
  { q: "Will I be able to manage products myself?", a: "Yes. We build an admin your team can actually use for products, inventory, and orders, and walk you through it at handover." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that you can take it in-house with the docs we provide, or keep us on a monthly retainer." },
];

const SENTENCE = [
  "YOU GET THE SOURCE.",
  "YOU GET THE CATALOGUE.",
  "YOU GET THE CHECKOUT.",
  "NO LOCK-IN.",
  "NO LICENSE GAMES.",
];

/* scroll-scrubbed word reveal — identical mechanism to ServiceDetailV2's copy,
   kept as its own local copy so each page can tune timing independently */
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);



const TECH_CATEGORIES = [
  {
    id: "commerce",
    title: "Commerce Engines",
    icon: Server,
    tools: ["Shopify Plus", "Magento", "WooCommerce", "BigCommerce"],
    colSpan: 1,
  },
  {
    id: "headless",
    title: "Headless Storefronts",
    icon: Monitor,
    tools: ["Next.js Commerce", "Vue Storefront", "Hydrogen", "Builder.io"],
    colSpan: 1,
  },
  {
    id: "ops",
    title: "Payments & Ops",
    icon: Lock,
    tools: ["Stripe", "PayPal", "Algolia", "ShipStation"],
    colSpan: 1,
  }
];

const METRICS = [
  { value: "<1s", label: "Page Load Time" },
  { value: "99.99%", label: "Checkout Uptime" },
  { value: "40%", label: "Boost In Conversions" }
];

export default function ECommerceSolutionsV2() {
  const testimonials = useTestimonials(STATIC_TESTIMONIALS);

  
  
  
  const [incActive, setIncActive] = useState(0);

  const [estType, setEstType] = useState("storefront");
  const [estScale, setEstScale] = useState("m");
  const [estAddons, setEstAddons] = useState(() => new Set());

  const rootRef = useRef(null);

  const estimate = useMemo(() => {
    const type = EST_TYPES.find((t) => t.id === estType);
    const scale = EST_SCALE.find((s) => s.id === estScale);
    const addonWeeks = EST_ADDONS
      .filter((a) => estAddons.has(a.id))
      .reduce((sum, a) => sum + a.weeks, 0);
    const core = type.weeks * scale.mult + addonWeeks;
    return { low: Math.max(2, Math.round(core * 0.85)), high: Math.round(core * 1.25), base: type.base };
  }, [estType, estScale, estAddons]);

  const toggleAddon = (id) =>
    setEstAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  

  

  useEffect(() => {
    const shells = rootRef.current.querySelectorAll(".v2-method-shell");
    if (!shells.length) return;
    const pairs = Array.from(shells)
      .map((shell) => ({ shell, head: shell.querySelector(".v2-method-head") }))
      .filter((p) => p.head);
    /* Read every rect first, then write every class. Interleaved, each
       toggle invalidated layout for the next getBoundingClientRect, so a page
       with N sticky bands forced N layout flushes on every scroll event. */
    const onScroll = () => {
      const stuck = pairs.map(({ shell }) => {
        const r = shell.getBoundingClientRect();
        return r.top <= 0 && r.bottom > 0;
      });
      pairs.forEach(({ head }, i) => head.classList.toggle("is-stuck", stuck[i]));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
    splitTitleLinesIn(rootRef.current, ".sd2-hero-title");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".sd2-facts.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.75");
    return () => tl.kill();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          
            el.classList.add("is-in");
          
          io.unobserve(el);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const sel = [
      ".sd2-inc-showcase", ".sd2-est", ".sd2-work-card", ".v2-method-row",
      ".sd2-problem", ".sd2-case", ".sd2-bench", ".sd2-hand", ".sd2-quote",
      ".sd2-cmp-row", ".sd2-step", ".sd2-other",
      ".sd2-tenet", ".v2-faq-item", ".v2-cta", ".v2-strip",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const nums = rootRef.current.querySelectorAll(".sd2-bench-value");
    if (!nums.length) return;
    const run = (el) => {
      const target = Number(el.dataset.target);
      if (target === 0) { el.textContent = "0"; return; }
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const bar = rootRef.current.querySelector(".v2-progress span");
    if (!bar) return;
    let raf = 0, cur = 0, tgt = 0, running = false;
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    const tick = () => {
      const d = tgt - cur;
      if (Math.abs(d) < 0.0005) { cur = tgt; running = false; raf = 0; }
      else { cur += d * 0.15; raf = requestAnimationFrame(tick); }
      bar.style.transform = `scaleX(${cur})`;
    };
    const kick = () => { tgt = read(); if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const root = rootRef.current;
    const bind = (els, fn) => els.map((el) => {
      const move = (e) => fn(el, e);
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return { el, move, leave };
    });

    const mags = bind(Array.from(root.querySelectorAll(".v2-btn")), (el, e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * 0.28}px, ${my * 0.34}px)`;
    });
    const tilts = bind(Array.from(root.querySelectorAll(".sd2-work-card")), (el, e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(760px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-6px)`;
    });

    return () => [...mags, ...tilts].forEach(({ el, move, leave }) => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    });
  }, []);



  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>

      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/services">Services</Link>
                <span>/</span>
                <em>E-Commerce Solutions</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service 04 · E-Commerce Solutions</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Storefronts built</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">backwards from payment.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                We build high-performance storefronts and checkout flows with clean,
                hand-written code — designed to convert browsers into buyers, and
                handed over with full source-code ownership.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Schedule a call</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#estimate">
                  <span className="v2-hero-secondary-label">Estimate my project</span>
                </a>
              </div>
            </div>

            <aside className="sd2-facts sv2-hero-reveal">
              {[
                ["Typical timeline", "3–10 weeks"],
                ["Starts with", "Discovery call"],
                ["You receive", "100% source code"],
                ["Post-launch", "Support included"],
              ].map(([k, v]) => (
                <div className="sd2-fact" key={k}>
                  <span className="sd2-fact-k">{k}</span>
                  <span className="sd2-fact-v">{v}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · PROBLEMS WE SOLVE ══════════ */}
      <section className="v2-section v2-section--void" id="problems">
        <p className="v2-label">Sound Familiar?</p>
        <h2 className="v2-heading">The problems we get called in to fix.</h2>
        <p className="v2-lede">
          If you recognise two or three of these, a rebuild will pay for itself
          faster than another round of patches.
        </p>
        <div className="sd2-problem-grid">
          {PROBLEMS.map((p) => (
            <article className="sd2-problem" key={p.pain}>
              <span className="sd2-problem-icon"><p.icon size={17} strokeWidth={1.6} /></span>
              <div>
                <h3 className="sd2-problem-pain">{p.pain}</h3>
                <p className="sd2-problem-fix">{p.fix}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 2b · CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 3 · WHAT'S INCLUDED ══════════ */}
      <section className="v2-section" id="included">
        <p className="v2-label">What's Included</p>
        <h2 className="v2-heading">Every build ships with all of this.</h2>
        <p className="v2-lede">
          Not an upsell list — this is the baseline on every commerce project we
          take, whatever the size.
        </p>
        <div className="sd2-inc-showcase">
          <div className="sd2-inc-nav" role="tablist" aria-label="What's included">
            <span
              className="sd2-inc-nav-indicator"
              style={{ transform: `translateY(${incActive * 100}%)` }}
              aria-hidden="true"
            />
            {INCLUDED.map((it, i) => (
              <div className="sd2-inc-navitem" key={it.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={incActive === i}
                  className={`sd2-inc-tab ${incActive === i ? "is-active" : ""}`}
                  onMouseEnter={() => setIncActive(i)}
                  onFocus={() => setIncActive(i)}
                  onClick={() => setIncActive(i)}
                >
                  <span className="sd2-inc-tab-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sd2-inc-tab-title">{it.title}</span>
                  <span className="sd2-inc-tab-icon"><it.icon size={16} strokeWidth={1.6} /></span>
                </button>
                <div className={`sd2-inc-mobile-body ${incActive === i ? "is-open" : ""}`}>
                  <div className="sd2-inc-mobile-body-inner">
                    <p className="sd2-inc-mobile-body-text">{it.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sd2-inc-stage">
            {INCLUDED.map((it, i) => (
              <div
                className={`sd2-inc-panel ${incActive === i ? "is-active" : ""}`}
                aria-hidden={incActive !== i}
                key={it.title}
              >
                <span className="sd2-inc-panel-glow" aria-hidden="true" />
                <span className="sd2-inc-panel-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="sd2-inc-panel-icon"><it.icon size={40} strokeWidth={1.2} /></span>
                <h3 className="sd2-inc-panel-title">{it.title}</h3>
                <p className="sd2-inc-panel-body">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4 · WHO IT'S FOR ══════════ */}
      <section className="v2-section v2-section--void" id="for">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Who It's For</p>
            <h2 className="v2-heading">Built for how your customers actually shop.</h2>
          </div>
          <p className="v2-lede">
            The stack and the checkout flow change depending on what you sell and
            how your buyers actually pay.
          </p>
        </div>
        <div className="sd2-case-grid">
          {USE_CASES.map((c, i) => (
            <article className="sd2-case" key={c.title}>
              <div className="sd2-case-top">
                <span className="sd2-case-icon"><c.icon size={21} strokeWidth={1.6} /></span>
                <span className="sd2-case-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sd2-case-title">{c.title}</h3>
              <p className="sd2-case-body">{c.body}</p>
              <span className="sd2-case-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 5 · INTERACTIVE ESTIMATOR ══════════ */}
      <section className="v2-section v2-section--void sd2-est-section" id="estimate">
        <div className="sd2-est">
          <div className="sd2-est-head">
            <div>
              <p className="v2-label">Scope Estimator</p>
              <h2 className="v2-heading">Rough out your timeline in ten seconds.</h2>
            </div>
            <p className="v2-lede">
              Pick what you're building and we'll show an honest range. It's an
              estimate, not a quote — but it's the same maths we start from.
            </p>
          </div>

          <div className="sd2-est-body">
            <div className="sd2-est-controls">
              <div className="sd2-est-group">
                <span className="sd2-est-label">01 — What are you building?</span>
                <div className="sd2-est-opts">
                  {EST_TYPES.map((t) => (
                    <button
                      key={t.id}
                      className={`sd2-opt ${estType === t.id ? "on" : ""}`}
                      onClick={() => setEstType(t.id)}
                      aria-pressed={estType === t.id}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sd2-est-group">
                <span className="sd2-est-label">02 — How big is your catalogue?</span>
                <div className="sd2-est-opts">
                  {EST_SCALE.map((s) => (
                    <button
                      key={s.id}
                      className={`sd2-opt ${estScale === s.id ? "on" : ""}`}
                      onClick={() => setEstScale(s.id)}
                      aria-pressed={estScale === s.id}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sd2-est-group">
                <span className="sd2-est-label">03 — Anything else? (optional)</span>
                <div className="sd2-est-opts">
                  {EST_ADDONS.map((a) => (
                    <button
                      key={a.id}
                      className={`sd2-opt sd2-opt--check ${estAddons.has(a.id) ? "on" : ""}`}
                      onClick={() => toggleAddon(a.id)}
                      aria-pressed={estAddons.has(a.id)}
                    >
                      <i><Check size={12} strokeWidth={3} /></i>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <aside className="sd2-est-out" aria-live="polite">
              <span className="sd2-est-out-k">Estimated build time</span>
              <div className="sd2-est-out-v">
                <span key={estimate.low} className="sd2-est-num">{estimate.low}</span>
                <span className="sd2-est-dash">–</span>
                <span key={estimate.high + "h"} className="sd2-est-num">{estimate.high}</span>
                <span className="sd2-est-unit">weeks</span>
              </div>
              <p className="sd2-est-note">{estimate.base}</p>
              <div className="sd2-est-bar" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (estimate.high / 30) * 100)}%` }} />
              </div>
              <ul className="sd2-est-list">
                <li><Check size={13} strokeWidth={2.4} /> Design + build + QA included</li>
                <li><Check size={13} strokeWidth={2.4} /> Fixed price once scoped</li>
                <li><Check size={13} strokeWidth={2.4} /> Full source-code handover</li>
              </ul>
              <Link className="v2-btn" to="/contact">Get an exact quote →</Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ 4b · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How A Build Runs.</h2>
          <p className="v2-method-lede">
            Six stages from first call to live store — nothing advances until the
            stage before it is signed off.
          </p>
        </div>
        <div className="v2-method-rows">
          {PROCESS.map((m) => (
            <div className="v2-method-row" key={m.n}>
              <div className="v2-method-index">{m.n}</div>
              <div>
                <div className="v2-method-title">{m.title}</div>
                <span className="v2-method-timeframe">{m.time}</span>
              </div>
              <div className="v2-method-body">{m.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · QUALITY BENCHMARKS ══════════ */}
      <section className="v2-section v2-section--void" id="benchmarks">
        <p className="v2-label">Quality Bar</p>
        <h2 className="v2-heading">The numbers we hold ourselves to.</h2>
        <p className="v2-lede">
          Every build is measured against these before it's allowed to ship —
          not aspirations, gates.
        </p>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Live quality gate</span>
            <span className="sd2-bench-bar-meta">Checked on every build</span>
          </div>
          <div className="sd2-bench-grid">
            {BENCHMARKS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`sd2-bench-grad-ecom-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#sd2-bench-grad-ecom-${i})`}
                        style={{ "--c": C, "--ring-offset": offset }}
                      />
                    </svg>
                    <div className="sd2-bench-num">
                      <span className="sd2-bench-value" data-target={b.value}>0</span>
                      <span className="sd2-bench-suffix">{b.suffix}</span>
                    </div>
                  </div>
                  <div className="sd2-bench-label">{b.label}</div>
                  <div className="sd2-bench-note">{b.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ 8 · TECH ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">The Commerce Stack</p>
            <h2 className="v2-heading">What we build storefronts with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your catalogue,
            your team, and what you'll need to maintain.
          </p>
        </div>
        <div className="v2-tech-grid">
          {ECOM_STACK.map((t) => (
            <div className="v2-tech-item" key={t.name}>
              <img src={t.src} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 10 · RELATED WORK ══════════ */}
      <section className="v2-section v2-section--void" id="work">
        <p className="v2-label">Related Work</p>
        <h2 className="v2-heading">Commerce builds we've shipped.</h2>
        <div className="sd2-work-grid">
          {RELATED.map((w) => (
            <Link className="sd2-work-card" to={w.link} key={w.link}>
              <span className="sd2-work-media">
                <img src={w.thumb} alt="" loading="lazy" />
              </span>
              <span className="sd2-work-tag">{w.tag}</span>
              <span className="sd2-work-title">{w.title}</span>
              <span className="sd2-work-go">Read case study →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 11 · TESTIMONIAL ══════════ */}
      <TestimonialSpotlight
        testimonials={testimonials}
        label="Client Voices"
        heading="What clients say once we ship."
        stats={[
          { num: "40+", label: "Companies trust us" },
          { num: "11", label: "Industries served" },
          { num: "100%", label: "Source code ownership" },
        ]}
      />

      {/* ══════════ 8 · PRINCIPLES ══════════ */}
      <section className="v2-section" id="principles">
        <p className="v2-label">Our Principles</p>
        <h2 className="v2-heading">Three commitments that govern every project.</h2>
        <div className="sd2-tenet-grid">
          {PRINCIPLES.map((p, i) => (
            <article className="sd2-tenet" key={p.key}>
              <span className="sd2-tenet-shine" aria-hidden="true" />
              <div className="sd2-tenet-top">
                <span className="sd2-tenet-icon"><p.icon size={20} strokeWidth={1.5} /></span>
                <span className="sd2-tenet-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sd2-tenet-claim">{p.claim}</h3>
              <p className="sd2-tenet-body">{p.body}</p>
              <span className="sd2-tenet-tag">{p.key}</span>
            </article>
          ))}
        </div>
      </section>

      

      {/* ══════════ TECH STACK ══════════ */}
      <TechStackShowcaseV2
        title="High-Conversion Commerce Stacks"
        description="Scalable headless commerce and enterprise platforms designed to handle traffic spikes and complex inventory logic seamlessly."
        categories={TECH_CATEGORIES}
        metrics={METRICS}
      />
{/* ══════════ 8a · HANDOVER ══════════ */}
      <section className="v2-section" id="handover">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What You Receive</p>
            <h2 className="v2-heading">Everything, at handover.</h2>
          </div>
          <p className="v2-lede">
            "You own the code" is easy to say. Here is the exact list of what
            lands in your accounts when the project closes.
          </p>
        </div>
        <div className="sd2-manifest">
          <div className="sd2-manifest-bar">
            <span className="sd2-manifest-title">
              <FileCode2 size={14} strokeWidth={1.8} />
              Handover manifest
            </span>
            <span className="sd2-manifest-meta">
              {HANDOVER.length} items
              <i />
              Transferred on completion
            </span>
          </div>

          <div className="sd2-manifest-grid">
            {HANDOVER.map((h, i) => (
              <article className="sd2-hand" key={h.title}>
                <div className="sd2-hand-top">
                  <span className="sd2-hand-icon"><h.icon size={16} strokeWidth={1.6} /></span>
                  <span className="sd2-hand-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sd2-hand-tick"><Check size={12} strokeWidth={3} /></span>
                </div>
                <h3 className="sd2-hand-title">{h.title}</h3>
                <p className="sd2-hand-body">{h.body}</p>
              </article>
            ))}
          </div>

          <div className="sd2-manifest-foot">
            <span className="sd2-manifest-seal"><Check size={13} strokeWidth={3} /></span>
            <span>
              Everything above transfers to your accounts when the project closes.
              <b> No lock-in, no retained access, no dependency on us.</b>
            </span>
          </div>
        </div>
      </section>

      {/* ══════════ 8b · WHY US vs ALTERNATIVES ══════════ */}
      <section className="v2-section v2-section--void" id="compare">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Why Us</p>
            <h2 className="v2-heading">Against what you're actually comparing.</h2>
          </div>
          <p className="v2-lede">
            A template, a freelancer, and a big agency all solve part of the
            problem. Here's where each one tends to leave you exposed.
          </p>
        </div>

        <div className="sd2-cmp" role="table" aria-label="Codelix compared to alternatives">
          <div className="sd2-cmp-head" role="row">
            <span className="sd2-cmp-rowlabel" role="columnheader" />
            {COMPARE_COLS.map((c, i) => (
              <span
                className={`sd2-cmp-col ${i === 0 ? "is-us" : ""}`}
                role="columnheader"
                key={c}
              >
                {c}
              </span>
            ))}
          </div>
          {COMPARE_ROWS.map((row) => (
            <div className="sd2-cmp-row" role="row" key={row.label}>
              <span className="sd2-cmp-rowlabel" role="rowheader">{row.label}</span>
              {row.vals.map((v, i) => (
                <span
                  className={`sd2-cmp-cell ${i === 0 ? "is-us" : ""} sd2-cmp-${v}`}
                  role="cell"
                  key={i}
                >
                  {v === "yes" && <Check size={16} strokeWidth={2.6} />}
                  {v === "partial" && <Minus size={16} strokeWidth={2.6} />}
                  {v === "maybe" && <Minus size={16} strokeWidth={2.6} />}
                  {v === "no" && <X size={15} strokeWidth={2.6} />}
                  <em className="sd2-cmp-txt">
                    {v === "yes" ? "Yes" : v === "no" ? "No" : v === "partial" ? "Partial" : "Maybe"}
                  </em>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 8.5 · SCROLL SENTENCE ══════════ */}
      <ScrollSentence words={SENTENCE} tone="dark"  centered={true} />

      {/* ══════════ 9 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 14b · WHAT HAPPENS NEXT ══════════ */}
      <section className="v2-section v2-section--void" id="next">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What Happens Next</p>
            <h2 className="v2-heading">Three steps from here to kickoff.</h2>
          </div>
          <p className="v2-lede">
            No drawn-out sales process. Reach out and here's exactly what follows.
          </p>
        </div>
        <div className="sd2-next">
          <span className="sd2-next-line" aria-hidden="true" />
          {NEXT_STEPS.map((s) => (
            <article className="sd2-step" key={s.n}>
              <div className="sd2-step-node">
                <span className="sd2-step-num">{s.n}</span>
                <span className="sd2-step-badge"><s.icon size={15} strokeWidth={1.7} /></span>
              </div>
              <div className="sd2-step-inner">
                <span className="sd2-step-meta">{s.meta}</span>
                <h3 className="sd2-step-title">{s.title}</h3>
                <p className="sd2-step-body">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 15 · OTHER SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">The rest of what we do.</h2>
        <div className="sd2-other-list">
          {OTHER_SERVICES.map((s) => (
            <Link className="sd2-other" to={s.path} key={s.path}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{s.n}</span>
              </div>
              <span className="sd2-other-title">{s.title}</span>
              <p className="sd2-other-body">{s.body}</p>
              <span className="sd2-other-go">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 16 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're selling.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your store — your catalogue, your
            customers, your constraints. We scope what should be built first,
            what can wait, and what it takes to ship it.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      </main>

            <FooterV2 />
    </div>
  );
}
