import { LayoutDashboard, Smartphone, Gauge, Bell, ShieldCheck, Wifi, Wrench, CalendarCheck, Lock, Eye, Check, BatteryLow, RefreshCcw, Store as StoreOff, Ban, Bug, LayoutGrid, Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark, FileCode2, BookOpen, KeyRound, Palette, Server, GitBranch, Globe, ShoppingCart, Code2, Sparkles, BarChart3, LifeBuoy, Minus, X, Phone, FileText, PlayCircle, Cloud } from "lucide-react";
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

/* mobile-specific stack subset — pulled from the same real stack list shown
   on the homepage's "THE STACK" section, not a new set of claims */
import techFlutter from "../Images/flutter.webp";
import techSwift from "../Images/swift.webp";
import techAndroid from "../Images/android.webp";
import techJava from "../Images/java.webp";
import techNode from "../Images/node.webp";
import techFirebase from "../Images/Firebase.webp";
import techAws from "../Images/AWS.webp";
import techFigma from "../Images/figma.webp";

/* real project screenshots — shared source of truth with WorkV2/CaseStudyV2 */
import { useRelatedWork } from "../CaseStudyDetailV2/useCaseStudies";
import TechStackShowcaseV2 from "../Shared/TechStackShowcaseV2";
import NavbarV2 from "../Shared/NavbarV2";
import ScrollSentence from '../Shared/ScrollSentence';
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';
import { useTestimonials } from "../../data/useTestimonials";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";
import { StructuredData } from "../../components/StructuredData";
import { serviceInfo } from "../../lib/serviceSchema";


const APP_STACK = [
  { src: techFlutter, name: "Flutter" },
  { src: techSwift, name: "Swift" },
  { src: techAndroid, name: "Android" },
  { src: techJava, name: "Java" },
  { src: techNode, name: "Node.js" },
  { src: techFirebase, name: "Firebase" },
  { src: techAws, name: "AWS" },
  { src: techFigma, name: "Figma" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: BatteryLow, pain: "The app drains battery and lags.", fix: "We profile every screen against real devices, not just simulators, so performance issues get caught before launch." },
  { icon: StoreOff, pain: "It keeps getting rejected from the store.", fix: "We build to Apple and Google's actual review guidelines from day one, not as an afterthought before submission." },
  { icon: RefreshCcw, pain: "iOS and Android versions drift apart.", fix: "One Flutter codebase for both platforms, so a fix or feature ships everywhere at once, not twice." },
  { icon: Wifi, pain: "It breaks the moment the signal drops.", fix: "Offline-first data handling and sync logic, so patchy connectivity degrades gracefully instead of crashing." },
  { icon: Bug, pain: "Every update seems to break something else.", fix: "Automated testing across the core flows before every release, so a new feature doesn't quietly break an old one." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Building2, title: "Corporate & B2B", body: "Internal tools and field-service apps that replace paper forms and spreadsheets with something your team actually opens." },
  { icon: Rocket, title: "Startups & SaaS", body: "A companion mobile app for a web product, built to ship fast without duplicating the whole engineering effort." },
  { icon: Store, title: "Retail & D2C", body: "Shopping apps with a fast, low-friction path from browsing to checkout, built for repeat use, not a one-off visit." },
  { icon: GraduationCap, title: "Education", body: "Student and parent apps for schedules, attendance, and communication that hold up under real daily use." },
  { icon: HeartPulse, title: "Healthcare", body: "Appointment and patient-facing apps built with privacy, accessibility, and offline reliability in mind." },
  { icon: Landmark, title: "Finance & Legal", body: "Secure, compliance-conscious apps where authentication and data handling actually matter." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 99, suffix: "%", label: "Crash-free sessions", note: "Measured post-launch, not in a demo", ring: 99 },
  { value: 2, suffix: "s", label: "Target cold-start time", note: "On a mid-range Android device", ring: 90 },
  { value: 100, suffix: "%", label: "Store-guideline compliance", note: "Reviewed before every submission", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: KeyRound, title: "App store accounts", body: "Apple Developer and Google Play Console accounts registered in your name, with credentials handed over." },
  { icon: Palette, title: "Design files", body: "The Figma project with components and styles, so future work doesn't start from a screenshot." },
  { icon: LayoutDashboard, title: "Admin access", body: "A login to the admin panel, so your team can manage content and users without touching code." },
  { icon: BookOpen, title: "User guide & walkthrough", body: "A plain-language guide to running it day to day, plus a live walkthrough for your team at handover." },
];

const COMPARE_COLS = ["Codelix", "No-code app builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "One codebase, both platforms", vals: ["yes", "partial", "maybe", "yes"] },
  { label: "One team, one point of contact", vals: ["yes", "no", "yes", "no"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

const NEXT_STEPS = [
  { n: "01", icon: Phone, title: "Discovery call", meta: "30 minutes", body: "A no-pressure call to understand what you're building, who it's for, and what success looks like. No slide deck, no sales script." },
  { n: "02", icon: FileText, title: "Written proposal", meta: "Within 48 hours", body: "A clear scope, a fixed price, and a timeline — in writing. You'll know exactly what you're getting and what it costs before you commit." },
  { n: "03", icon: PlayCircle, title: "Kickoff", meta: "On your go-ahead", body: "Once you're happy, we lock the scope and start. You get a test build and a point of contact from day one." },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's actually included */
const INCLUDED = [
  { icon: Smartphone, title: "Cross-platform build", body: "One Flutter codebase for iOS and Android where it fits, or fully native where the platform demands it." },
  { icon: Gauge, title: "Performance profiling", body: "Cold-start time, memory, and battery use checked against real mid-range devices, not just a flagship simulator." },
  { icon: Bell, title: "Push & background handling", body: "Notifications, background sync, and offline-first data so the app stays useful with a weak signal." },
  { icon: ShieldCheck, title: "Security & hardening", body: "Secure auth, encrypted local storage, and sensible API handling configured before anything ships." },
  { icon: LayoutGrid, title: "Store-ready submission", body: "App-store listing assets, screenshots, and compliance review handled as part of the build, not after." },
  { icon: Wrench, title: "Backend & admin", body: "A reliable backend with an admin panel your team can use, plus app-store account handover." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "mvp", label: "MVP app", weeks: 4, base: "A focused app that proves the core idea works." },
  { id: "consumer", label: "Consumer app", weeks: 8, base: "Full-featured app with accounts, content, and push." },
  { id: "marketplace", label: "Marketplace app", weeks: 12, base: "Two-sided app with listings, search, and messaging." },
  { id: "enterprise", label: "Enterprise / field app", weeks: 10, base: "Internal tool with offline sync and role-based access." },
];
const EST_SCALE = [
  { id: "s", label: "Single platform", mult: 1 },
  { id: "m", label: "iOS + Android", mult: 1.4 },
  { id: "l", label: "+ Admin dashboard", mult: 1.75 },
  { id: "xl", label: "+ Backend from scratch", mult: 2.1 },
];
const EST_ADDONS = [
  { id: "auth", label: "User accounts", weeks: 1 },
  { id: "pay", label: "In-app payments", weeks: 1.5 },
  { id: "push", label: "Push notifications", weeks: 0.5 },
  { id: "offline", label: "Offline mode", weeks: 1.5 },
  { id: "chat", label: "In-app messaging", weeks: 1.5 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what the app actually has to do — who it's for, what action matters, and what can be cut for v1." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Platform choice, data model, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity screens for every key flow, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "3–10 weeks", body: "Front-end and backend built in sprints, with a test build you can install on your own device at any point." },
  { n: "05", title: "QA & Store Submission", time: "1–2 weeks", body: "Device testing, crash monitoring, and store-guideline review — then submission and release." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and OS-update compatibility. You keep the code either way." },
];

/* real application-development projects — pulled from the same shared
   portfolio data as the Work page, filtered to the category that actually
   matches this service */

const PRINCIPLES = [
  { key: "Delivered", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Visible", icon: Eye, claim: "No progress you can't see.", body: "You get an installable test build early and often, so you're never waiting a month to see what's been built." },
];

const FAQS = [
  { q: "Flutter or native — which do we need?", a: "Flutter covers most consumer and internal apps well and ships to both platforms from one codebase. We'll recommend fully native Swift/Java only when a feature genuinely needs it — camera-heavy or hardware-specific apps, mostly." },
  { q: "How long does an app take to build?", a: "A focused MVP is usually 4–6 weeks. A full consumer app with accounts and push runs 8–12 weeks. Marketplace and enterprise apps depend on scope — use the estimator above for a rough range." },
  { q: "Do you handle the App Store and Play Store submission?", a: "Yes. We prepare the listing assets, handle the review process, and submit under your own developer accounts, so you're never locked out of your own app." },
  { q: "Can the app work without an internet connection?", a: "For apps that need it, yes — we build offline-first data handling that syncs once the connection returns, rather than the app simply failing." },
  { q: "Will I be able to update content myself?", a: "Where it makes sense, yes — we build an admin panel or CMS so your team can manage content without waiting on a new app release." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes and OS-update compatibility. After that, you can keep us on a monthly retainer for updates, fixes, and support." },
];

const SENTENCE = [
  "YOU GET THE ACCOUNTS.",
  "YOU GET THE ADMIN.",
  "FIXED PRICE.",
];



const TECH_CATEGORIES = [
  {
    id: "mobile",
    title: "Mobile Core",
    icon: Smartphone,
    tools: ["Swift (iOS)", "Kotlin (Android)", "React Native", "Flutter"],
    colSpan: 1,
  },
  {
    id: "backend",
    title: "Backend Sync",
    icon: Server,
    tools: ["Firebase", "Node.js", "GraphQL", "WebSocket"],
    colSpan: 1,
  },
  {
    id: "cloud",
    title: "Testing & Distribution",
    icon: Cloud,
    tools: ["TestFlight", "Fastlane", "Appium", "Bitrise"],
    colSpan: 1,
  }
];

const METRICS = [
  { value: "4.8+", label: "Avg. App Store Rating" },
  { value: "60fps", label: "Guaranteed Render Speed" },
  { value: "100%", label: "Crash-Free Sessions" }
];

export default function ApplicationDevelopmentV2() {
  /* related work: case studies from the admin panel (see useCaseStudies) */
  const RELATED = useRelatedWork({ category: "Application Development" });
  const testimonials = useTestimonials(STATIC_TESTIMONIALS);

  
  
  
  const [incActive, setIncActive] = useState(0);

  const [estType, setEstType] = useState("consumer");
  const [estScale, setEstScale] = useState("m");
  const [estAddons, setEstAddons] = useState(() => new Set(["auth"]));

  const rootRef = useRef(null);

  const estimate = useMemo(() => {
    const type = EST_TYPES.find((t) => t.id === estType);
    const scale = EST_SCALE.find((s) => s.id === estScale);
    const addonWeeks = EST_ADDONS
      .filter((a) => estAddons.has(a.id))
      .reduce((sum, a) => sum + a.weeks, 0);
    const core = type.weeks * scale.mult + addonWeeks;
    return { low: Math.max(3, Math.round(core * 0.85)), high: Math.round(core * 1.25), base: type.base };
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
                <em>Application Development</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service 02 · Application Development</span>
                <h1 className="v2-hero-eyebrow">Mobile App Development Company — iOS, Android &amp; Flutter</h1>
              </div>
              <h2 className="sd2-hero-title">
                <span className="line"><span>Apps that feel</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">native, not bolted on.</span></span>
              </h2>
              <p className="sd2-hero-sub sv2-hero-reveal">
                We build cross-platform and native mobile apps with clean, hand-written
                code — one Flutter codebase where it fits, fully native where the
                platform demands it.
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
                ["Typical timeline", "4–12 weeks"],
                ["Starts with", "Discovery call"],
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
          Not an upsell list — this is the baseline on every app project we take,
          whatever the size.
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
            <h2 className="v2-heading">Built for how your users actually behave.</h2>
          </div>
          <p className="v2-lede">
            The platform and the architecture change depending on who's using the app
            and what they came to do.
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
                <span className="sd2-est-label">02 — Which platforms?</span>
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
            Six stages from first call to a live app — nothing advances until the
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
                        <linearGradient id={`sd2-bench-grad-app-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#sd2-bench-grad-app-${i})`}
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
            <p className="v2-label">The App Stack</p>
            <h2 className="v2-heading">What we build apps with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your platform,
            your team, and what you'll need to maintain.
          </p>
        </div>
        <div className="v2-tech-grid">
          {APP_STACK.map((t) => (
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
        <h2 className="v2-heading">App builds we've shipped.</h2>
        <div className="sd2-work-grid">
          {RELATED.map((w) => (
            <Link className="sd2-work-card" to={w.link} key={w.link}>
              <span className="sd2-work-media">
                <img src={w.thumb} alt={w.title} loading="lazy" />
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
        title="Built for Mobile & Cross-Platform Dominance"
        description="Native and hybrid mobile technologies engineered for performance, smooth animations, and platform-specific capabilities."
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
            Here is the exact list of what
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
            A no-code builder, a freelancer, and a big agency all solve part of the
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
            Tell us what you're building.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your app — your users, your goals,
            your constraints. We scope what should be built first, what can wait,
            and what it takes to ship it.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      </main>

            <StructuredData type="Service" data={serviceInfo("/services/application-development")} />
            <FooterV2 />
    </div>
  );
}
