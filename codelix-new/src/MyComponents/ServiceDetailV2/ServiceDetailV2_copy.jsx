import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  Globe, Gauge, Search, ShieldCheck, Smartphone, Wrench,
  CalendarCheck, Lock, Eye, Check,
  TrendingDown, Clock, EyeOff, Unlink, PhoneOff, Puzzle,
  Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark,
  FileCode2, BookOpen, KeyRound, Palette, Server, GitBranch,
  PenTool, ShoppingCart, Code2, Sparkles,
  Minus, X, Phone, FileText, PlayCircle, BarChart3,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "./ServiceDetailV2.css";

/* web-specific stack subset */
import techReact from "../Images/react.png";
import techNext from "../Images/next.png";
import techTs from "../Images/typescript.png";
import techJs from "../Images/javascript.png";
import techVite from "../Images/vite.png";
import techTailwind from "../Images/tailwind.png";
import techBootstrap from "../Images/bootstrap.png";
import techNode from "../Images/node.png";
import techLaravel from "../Images/laravel.png";
import techPhp from "../Images/php.png";
import techPostgres from "../Images/postgresql.png";
import techMongo from "../Images/MongoDB.png";
import techAws from "../Images/AWS.png";
import techDocker from "../Images/docker.png";
import techFigma from "../Images/figma.png";
import techWebflow from "../Images/webflow.png";

/* real project screenshots */
import workOne from "../Images/work-best-project-one.png";
import workTwo from "../Images/work-best-project-two.png";
import workFour from "../Images/work-best-project-four.png";

const WEB_STACK = [
  { src: techReact, name: "React" },
  { src: techNext, name: "Next.js" },
  { src: techTs, name: "TypeScript" },
  { src: techJs, name: "JavaScript" },
  { src: techVite, name: "Vite" },
  { src: techTailwind, name: "Tailwind" },
  { src: techBootstrap, name: "Bootstrap" },
  { src: techNode, name: "Node.js" },
  { src: techLaravel, name: "Laravel" },
  { src: techPhp, name: "PHP" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
  { src: techAws, name: "AWS" },
  { src: techDocker, name: "Docker" },
  { src: techFigma, name: "Figma" },
  { src: techWebflow, name: "Webflow" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: Clock, pain: "The site takes forever to load.", fix: "We hold a performance budget from day one and test on mid-range phones, not just fast office wifi." },
  { icon: EyeOff, pain: "Nobody finds us on Google.", fix: "Semantic markup, structured data, clean URLs, and real page-speed work — the technical groundwork search engines actually reward." },
  { icon: Unlink, pain: "We can't update anything ourselves.", fix: "A CMS your team can genuinely use, plus documentation and a walkthrough at handover." },
  { icon: TrendingDown, pain: "Traffic comes, but nobody converts.", fix: "We design backwards from the action you want, then cut every step that isn't earning its place." },
  { icon: PhoneOff, pain: "It falls apart on mobile.", fix: "Designed and tested small-screen-first, across real devices — not a desktop layout squeezed down." },
  { icon: Puzzle, pain: "Our last developer disappeared.", fix: "You get the repo, the docs, and the credentials. No lock-in, no dependency on us to keep it running." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Building2, title: "Corporate & B2B", body: "Credibility-first sites for companies whose buyers research before they ever make contact." },
  { icon: Rocket, title: "Startups & SaaS", body: "Marketing sites and product pages that explain a new idea clearly and capture signups." },
  { icon: Store, title: "Retail & D2C", body: "Storefronts built around a fast, low-friction path from landing to checkout." },
  { icon: GraduationCap, title: "Education", body: "Course catalogues, admissions journeys, and student portals that handle real enrolment load." },
  { icon: HeartPulse, title: "Healthcare", body: "Appointment flows and patient information built with privacy and accessibility in mind." },
  { icon: Landmark, title: "Finance & Legal", body: "Compliance-conscious sites where trust signals and document handling actually matter." },
];

/* quality bars we hold ourselves to — value is the count-up target */
const BENCHMARKS = [
  { value: 95, suffix: "+", label: "Lighthouse performance", note: "Measured on mobile, not desktop", ring: 95 },
  { value: 2, suffix: "s", label: "Target load time", note: "First contentful paint on 4G", ring: 90 },
  { value: 100, suffix: "%", label: "Responsive coverage", note: "320px through ultrawide", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over — concrete, not vague promises */
const HANDOVER = [
  { icon: FileCode2, title: "Full source code", body: "The complete repository, with clean commit history — yours to keep, fork, or hand to another team." },
  { icon: GitBranch, title: "Repository access", body: "Transferred to your organisation account, with branch history and CI configuration intact." },
  { icon: BookOpen, title: "Technical documentation", body: "Setup, architecture, environment variables, and deployment steps written for a developer who's never seen it." },
  { icon: KeyRound, title: "Credentials & accounts", body: "Hosting, domain, analytics, and any third-party keys — registered in your name from the start." },
  { icon: Palette, title: "Design files", body: "The Figma project with components and styles, so future work doesn't start from a screenshot." },
  { icon: Server, title: "Deployment setup", body: "Live environment configured and documented, with a runbook for redeploying it yourself." },
];

/* real client quote, already used on the live site's Our Work page */
const QUOTE = {
  text: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.",
  name: "Rajesh Patel",
  role: "CEO, Harmony Inc.",
};

/* how we stack up against what a buyer is realistically comparing us to.
   `vals` order = [Codelix, Template/builder, Freelancer, Large agency] */
const COMPARE_COLS = ["Codelix", "Template / builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "100% source-code ownership", vals: ["yes", "partial", "maybe", "partial"] },
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "Built for your exact workflow", vals: ["yes", "no", "maybe", "yes"] },
  { label: "One team, one point of contact", vals: ["yes", "no", "yes", "no"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

/* the exact next steps after someone reaches out — removes the "what am I
   signing up for" hesitation right before the CTA */
const NEXT_STEPS = [
  { n: "01", icon: Phone, title: "Discovery call", meta: "30 minutes", body: "A no-pressure call to understand what you're building, who it's for, and what success looks like. No slide deck, no sales script." },
  { n: "02", icon: FileText, title: "Written proposal", meta: "Within 48 hours", body: "A clear scope, a fixed price, and a timeline — in writing. You'll know exactly what you're getting and what it costs before you commit." },
  { n: "03", icon: PlayCircle, title: "Kickoff", meta: "On your go-ahead", body: "Once you're happy, we lock the scope and start. You get a staging link and a point of contact from day one." },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Smartphone, n: "02", title: "Application Development", path: "/services/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX Design", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Custom Software Development", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI Development", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics", path: "/services-v2/data-analytics" },
];

/* what's actually included — the deliverables buyers want spelled out */
const INCLUDED = [
  { icon: Globe, title: "Custom front-end build", body: "Hand-built interfaces in React or Next.js — no page-builder bloat, no theme you have to fight to customise." },
  { icon: Gauge, title: "Performance budget", body: "We hold a Core Web Vitals target from day one. Fast on a mid-range phone on 4G, not just on your office wifi." },
  { icon: Search, title: "Technical SEO groundwork", body: "Semantic markup, metadata, sitemaps, structured data, and clean URLs — so the site is findable the day it launches." },
  { icon: Smartphone, title: "Responsive across devices", body: "Designed and tested from small phones up to wide desktops. No 'mobile version' bolted on afterwards." },
  { icon: ShieldCheck, title: "Security & hardening", body: "HTTPS, input validation, dependency auditing, and sensible headers configured before anything goes live." },
  { icon: Wrench, title: "CMS & handover", body: "An admin you can actually use, plus documentation and deployment details so your team owns it fully." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "landing", label: "Landing page", weeks: 1, base: "A single focused page built to convert." },
  { id: "marketing", label: "Marketing site", weeks: 2.5, base: "Multi-page site with a CMS behind it." },
  { id: "webapp", label: "Web application", weeks: 5, base: "Authenticated product with real logic." },
  { id: "platform", label: "Platform / SaaS", weeks: 10, base: "Multi-tenant system built to scale." },
];
const EST_SCALE = [
  { id: "s", label: "1–5 pages", mult: 1 },
  { id: "m", label: "6–15 pages", mult: 1.35 },
  { id: "l", label: "16–40 pages", mult: 1.7 },
  { id: "xl", label: "40+ pages", mult: 2.1 },
];
const EST_ADDONS = [
  { id: "cms", label: "CMS", weeks: 0.5 },
  { id: "auth", label: "User accounts", weeks: 1 },
  { id: "pay", label: "Payments", weeks: 1 },
  { id: "api", label: "Third-party integrations", weeks: 1 },
  { id: "multi", label: "Multi-language", weeks: 0.5 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what the site actually has to do — who it's for, what action matters, and what can be cut." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Sitemap, page structure, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity screens for every key template, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "2–8 weeks", body: "Front-end and back-end built in sprints, with a staging link you can check at any point." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Cross-browser, cross-device, performance and security testing — then deployment and DNS cutover." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and improvements. You keep the code either way." },
];

const RELATED = [
  { tag: "E-Commerce", title: "A High-Performance Platform for Premium Book Collections", link: "/book-collections-case-study", thumb: workOne },
  { tag: "Enterprise ERP", title: "A Custom ERP Solution for Industrial & Financial Workflows", link: "/erp-case-study", thumb: workTwo },
  { tag: "Marketplace", title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", link: "/car-marketplace-case-study", thumb: workFour },
];

const PRINCIPLES = [
  { key: "Delivered", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Owned", icon: Lock, claim: "No code you don't fully own.", body: "When the invoice is paid, the code is yours. We hand over the repos, the docs, and the keys. No vendor lock-in." },
  { key: "Visible", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens, so we can course-correct early." },
];

const FAQS = [
  { q: "How long does a website take to build?", a: "A focused landing page is usually 2–3 weeks. A full marketing site with a CMS runs 4–8 weeks. Web applications depend heavily on scope — use the estimator above for a rough range, then we'll firm it up on a call." },
  { q: "Do you redesign existing websites?", a: "Yes. We'll audit what you have first — sometimes the right answer is a rebuild, sometimes it's targeted fixes to performance and conversion. We'll tell you honestly which one you need." },
  { q: "Will I be able to update the site myself?", a: "Yes, if you want a CMS we'll build one you can actually use, and walk your team through it at handover. If you'd rather we handle updates, that's what the support retainer is for." },
  { q: "Do you handle hosting and domains?", a: "We can deploy to your hosting or set up new infrastructure on AWS or similar. Either way you own the accounts — we don't hold your domain or hosting hostage." },
  { q: "Is SEO included?", a: "Technical SEO is — semantic markup, metadata, structured data, sitemaps, speed. Ongoing content strategy and link building are separate, though we can advise." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that you can take it in-house with the docs we provide, or keep us on a monthly retainer." },
];

const SENTENCE = [
  "YOU GET THE SOURCE.",
  "YOU GET THE SERVER.",
  "YOU GET THE DOMAIN.",
  "NO LOCK-IN.",
  "NO LICENSE GAMES.",
];

/* scroll-scrubbed word reveal — identical mechanism to HomepageV2 / ServicesV2
   (kept as a separate copy rather than a shared import so each page can tune
   its own word list/timing without a shared-component refactor) */
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);

function ScrollSentence({ words, tone }) {
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const bgRefs = useRef([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0, running = false, target = 0, current = 0, primed = false;

    const readTarget = () => {
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const raw = (-r.top) / scrollable;
      const norm = Math.min(Math.max((raw - 0.06) / 0.86, 0), 0.9999);
      return norm * words.length;
    };

    const IN_END = 0.2;
    const OUT_START = 0.8;

    const paint = (t) => {
      words.forEach((_, i) => {
        const d = Math.min(Math.max(t - i, 0), 1);
        const wordEl = wordRefs.current[i];
        const bgEl = bgRefs.current[i];

        let scale, opacity, blur;
        if (d < IN_END) {
          const p = scrollSentenceEase(d / IN_END);
          scale = 0.78 + p * 0.22; opacity = p; blur = 5 * (1 - p);
        } else if (d <= OUT_START) {
          scale = 1; opacity = 1; blur = 0;
        } else {
          const p = scrollSentenceEase((d - OUT_START) / (1 - OUT_START));
          scale = 1 + p * 0.22; opacity = 1 - p; blur = 6 * p;
        }

        if (wordEl) {
          wordEl.style.opacity = opacity;
          wordEl.style.transform = `translate3d(-50%,-50%,0) scale(${scale})`;
          wordEl.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
        if (bgEl) bgEl.style.opacity = scrollSentenceEase(Math.min(d / IN_END, 1));
      });
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.0002) {
        current = target; paint(current); running = false; raf = 0; return;
      }
      current += diff * 0.12;
      paint(current);
      raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      target = readTarget();
      if (!primed) { current = target; primed = true; }
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words]);

  return (
    <section className={`v2-sentence v2-sentence--${tone} sd2-sentence`} ref={ref}>
      <div className="v2-sentence-sticky">
        <div className="v2-sentence-bgs" aria-hidden="true">
          {words.map((w, i) => (
            <span className="v2-sentence-bg" style={{ zIndex: i }}
              ref={(elm) => (bgRefs.current[i] = elm)} key={"bg" + i} />
          ))}
        </div>
        <div className="v2-sentence-words">
          {words.map((w, i) => (
            <span className="v2-sentence-word"
              ref={(elm) => (wordRefs.current[i] = elm)} key={w + i}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetailV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [incActive, setIncActive] = useState(0);

  /* estimator state */
  const [estType, setEstType] = useState("marketing");
  const [estScale, setEstScale] = useState("m");
  const [estAddons, setEstAddons] = useState(() => new Set(["cms"]));

  const rootRef = useRef(null);
  const stripRef = useRef(null);

  const estimate = useMemo(() => {
    const type = EST_TYPES.find((t) => t.id === estType);
    const scale = EST_SCALE.find((s) => s.id === estScale);
    const addonWeeks = EST_ADDONS
      .filter((a) => estAddons.has(a.id))
      .reduce((sum, a) => sum + a.weeks, 0);
    const core = type.weeks * scale.mult + addonWeeks;
    // present as a range rather than false precision
    return { low: Math.max(2, Math.round(core * 0.85)), high: Math.round(core * 1.25), base: type.base };
  }, [estType, estScale, estAddons]);

  const toggleAddon = (id) =>
    setEstAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
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

  /* sticky heading bands only show their rule once actually stuck */
  useEffect(() => {
    const shells = rootRef.current.querySelectorAll(".v2-method-shell");
    if (!shells.length) return;
    const pairs = Array.from(shells)
      .map((shell) => ({ shell, head: shell.querySelector(".v2-method-head") }))
      .filter((p) => p.head);
    const onScroll = () => {
      pairs.forEach(({ shell, head }) => {
        const r = shell.getBoundingClientRect();
        head.classList.toggle("is-stuck", r.top <= 0 && r.bottom > 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* hero intro — same GSAP mechanism as the homepage: the title wipes up
     line-by-line out of a mask, then the supporting elements settle in with
     overlapping "-=" offsets so it reads as one continuous motion rather
     than a row of things fading in on a timer */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
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

  /* reveal-on-enter — IntersectionObserver, no stale cached scroll positions */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains("v2-faq-item")) {
            const idx = Number(el.dataset.faqIndex);
            setRevealedFaqs((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
          } else {
            el.classList.add("is-in");
          }
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

  /* client strip drift, pausing on hover */
  useEffect(() => {
    const track = stripRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, x = 0, paused = false, last = performance.now();
    const step = (now) => {
      const dt = now - last; last = now;
      if (!paused) {
        x -= 0.00125 * dt;
        if (x <= -50) x += 50;
        track.style.transform = `translateX(${x}%)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const wrap = track.parentElement;
    const on = () => { paused = true; };
    const off = () => { paused = false; };
    wrap.addEventListener("mouseenter", on);
    wrap.addEventListener("mouseleave", off);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", on);
      wrap.removeEventListener("mouseleave", off);
    };
  }, []);

  /* benchmark numbers count up when scrolled in */
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

  /* damped scroll-progress bar */
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

  /* magnetic buttons + card tilt — pointer devices only */
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

  /* FAQ accordion height */
  useEffect(() => {
    rootRef.current.querySelectorAll(".v2-faq-a").forEach((el, i) => {
      const inner = el.querySelector("p");
      el.style.height = i === openFaq ? `${inner.offsetHeight}px` : "0px";
    });
  }, [openFaq]);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/preview-v2" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <a href="/preview-v2">Homepage</a>
            <a href="/services-v2">Services</a>
            <a href="/about-v2">About</a>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/process-v2">Process</a>
            <a href="/contact-v2">Contact</a>
          </div>
          <button
            className={`v2-burger ${mobileOpen ? "open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <V2MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <a href="/services-v2">Services</a>
            <span>/</span>
            <em>Web Development</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service 01 · Web Development</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Websites that are</span></span>
                <span className="line"><span className="v2-hero-accent">fast, findable, and yours.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                We build high-performance websites and web applications with clean,
                hand-written code — designed to convert visitors into customers, and
                handed over with full source-code ownership.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact">
                  <span>Schedule a call</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="#estimate">
                  <span className="v2-hero-secondary-label">Estimate my project</span>
                </a>
              </div>
            </div>

            {/* at-a-glance facts */}
            <aside className="sd2-facts sv2-hero-reveal">
              {[
                ["Typical timeline", "2–12 weeks"],
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
      <section className="v2-section v2-client-strip" style={{ paddingTop: 56, paddingBottom: 56, paddingLeft: 0, paddingRight: 0 }}>
        <p className="v2-label" style={{ textAlign: "center", marginBottom: 28 }}>Trusted by 30+ companies</p>
        <div className="v2-strip">
          <div className="v2-strip-track" ref={stripRef}>
            {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, i) => (
              <img key={i} src={logo} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3 · WHAT'S INCLUDED ══════════ */}
      <section className="v2-section" id="included">
        <p className="v2-label">What's Included</p>
        <h2 className="v2-heading">Every build ships with all of this.</h2>
        <p className="v2-lede">
          Not an upsell list — this is the baseline on every web project we take,
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
                  key={it.title}
                >
                  <span className="sd2-inc-tab-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sd2-inc-tab-title">{it.title}</span>
                  <span className="sd2-inc-tab-icon"><it.icon size={16} strokeWidth={1.6} /></span>
                </button>
                {/* mobile-only accordion body — desktop shows the side stage instead */}
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
            <h2 className="v2-heading">Built for how your sector actually operates.</h2>
          </div>
          <p className="v2-lede">
            The stack and the structure change depending on who's using the site
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

      {/* ══════════ 5 · INTERACTIVE ESTIMATOR — the standout ══════════ */}
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
                <span className="sd2-est-label">02 — How big is it?</span>
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

            {/* live readout */}
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
              <a className="v2-btn" href="/contact">Get an exact quote →</a>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ 4 · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How A Build Runs.</h2>
          <p className="v2-method-lede">
            Six stages from first call to live site — nothing advances until the
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
                        <linearGradient id={`sd2-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#sd2-bench-grad-${i})`}
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
            <p className="v2-label">The Web Stack</p>
            <h2 className="v2-heading">What we build websites with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your scale,
            your team, and what you'll need to maintain.
          </p>
        </div>
        <div className="v2-tech-grid">
          {WEB_STACK.map((t) => (
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
        <h2 className="v2-heading">Web builds we've shipped.</h2>
        <div className="sd2-work-grid">
          {RELATED.map((w) => (
            <a className="sd2-work-card" href={w.link} key={w.link}>
              <span className="sd2-work-media">
                <img src={w.thumb} alt="" loading="lazy" />
              </span>
              <span className="sd2-work-tag">{w.tag}</span>
              <span className="sd2-work-title">{w.title}</span>
              <span className="sd2-work-go">Read case study →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 11 · TESTIMONIAL ══════════ */}
      <section className="v2-section">
        <figure className="sd2-quote">
          <span className="sd2-quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="sd2-quote-text">{QUOTE.text}</blockquote>
          <figcaption className="sd2-quote-by">
            <span className="sd2-quote-name">{QUOTE.name}</span>
            <span className="sd2-quote-role">{QUOTE.role}</span>
          </figcaption>
        </figure>
      </section>

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
        {/* styled as an actual handover document — header, itemised body,
            sign-off footer — rather than a plain list */}
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
      <ScrollSentence words={SENTENCE} tone="dark" />

      {/* ══════════ 9 · FAQ ══════════ */}
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Web development questions.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Don't see yours here? <a href="/contact">Ask us directly →</a>
          </p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div
              className={`v2-faq-item ${openFaq === i ? "open" : ""} ${revealedFaqs.has(i) ? "is-in" : ""}`}
              data-faq-index={i}
              key={f.q}
            >
              <button className="v2-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span className="v2-faq-q-label">
                  <span className="v2-faq-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v2-faq-q-text">{f.q}</span>
                </span>
                <span className="v2-faq-sign"><span /><span /></span>
              </button>
              <div className="v2-faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

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
            <a className="sd2-other" href={s.path} key={s.path}>
              <span className="sd2-other-n">{s.n}</span>
              <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
              <span className="sd2-other-title">{s.title}</span>
              <span className="sd2-other-go">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 16 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your site — your users, your goals,
            your constraints. We scope what should be built first, what can wait,
            and what it takes to ship it.
          </p>
          <a className="v2-btn" href="/contact">Book a consultation →</a>
          <p className="v2-cta-footnote">Free consultation · NDA on request · No obligation</p>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="v2-footer">
        <div className="v2-footer-marquee">
          <div className="v2-footer-marquee-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>WE LIVE IN IT <em>•</em></span>
            ))}
          </div>
        </div>
        <div className="v2-footer-grid">
          <div className="v2-footer-col">
            <h5>Company</h5>
            <a href="/preview-v2">Codelix</a>
            <a href="/about-v2">About</a>
            <a href="/team-v2">Team</a>
            <a href="/work-v2">Work</a>
            <a href="/case-study-v2">Case Studies</a>
            <a href="/blog-v2">Blog</a>
            <a href="/industries-v2">Industries</a>
            <a href="/process-v2">Process</a>
            <a href="/contact-v2">Contact</a>
          </div>
          <div className="v2-footer-col">
            <h5>Services</h5>
            <a href="/services-v2/web-development">Web Development</a>
            <a href="/services-v2">Application Development</a>
            <a href="/services-v2/ui-ux-design">UI/UX Design</a>
            <a href="/services-v2">E-Commerce Solutions</a>
            <a href="/services-v2">Custom Software</a>
            <a href="/services-v2">AI Development</a>
            <a href="/services-v2/data-analytics">Data Analytics</a>
          </div>
          <div className="v2-footer-col">
            <h5>Resources</h5>
            <a href="/pricing-v2">Pricing</a>
            <a href="/technologies-v2">Technologies</a>
            <a href="/careers-v2">Careers</a>
            <a href="/faq-v2">FAQ</a>
            <a href="/sitemap-v2">Sitemap</a>
          </div>
          <div className="v2-footer-col">
            <h5>Contact</h5>
            <a href="mailto:Sales@codelixitsolutions.com">Sales@codelixitsolutions.com</a>
            <a href="tel:+919429269295">+91 94292 69295</a>
            <a href="tel:+917490909686">+91 74909 09686</a>
            <a className="v2-footer-address"
              href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.0095811,72.5203036,17z"
              target="_blank" rel="noopener noreferrer">
              A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015
            </a>
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>© 2026 Codelix IT Solutions — All Copyright Reserved</span>
          <div className="v2-footer-legal">
            <a href="/privacy-policy-v2">Privacy Policy</a>
            <a href="/terms-of-service-v2">Terms of service</a>
            <a href="/refund-policy-v2">Refund Policy</a>
          </div>
        </div>
        <div className="codelix-large-text" style={{ padding: '0 var(--pad-x)' }}>
          <div className="codelix-text">
            <img src={codelixText} alt="Codelix" style={{ width: '100%', display: 'block', margin: '0 auto' }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
