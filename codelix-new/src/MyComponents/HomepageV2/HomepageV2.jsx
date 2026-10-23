import { STATIC_TESTIMONIALS } from '../../data/testimonialsData';
import { useTestimonials } from "../../data/useTestimonials";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import {
  Target, PenTool, Code2, CheckCircle2, Rocket,
  Globe, Smartphone, Cloud, Activity, LifeBuoy,
  CalendarCheck, Lock, Eye, PlayCircle, ArrowLeft, ArrowRight, ShoppingCart, Bot, BarChart2
} from "lucide-react";

/* real project screenshots (same assets the case-study pages use) */
import workOne from "../Images/work-best-project-one.webp";
import workTwo from "../Images/work-best-project-two.webp";
import workThree from "../Images/work-best-project-three.webp";
import workFour from "../Images/work-best-project-four.webp";
import workFive from "../Images/work-best-project-five.webp";

/* full real tech-stack set — shared with the services page */
import { TECH_STACK } from "./techStack";

/* shared with the services page */
import { CLIENT_LOGOS } from "./clientLogos";
import codelixLogo from "../Images/codelix-logo.webp";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "./footerData";
import CtaVisual from "../Shared/CtaVisual";
import GoogleReviewButton from "../Shared/GoogleReviewButton";
import ClutchWidget from "../Shared/ClutchWidget";
import { PRODUCTS } from "../ProductsV2/productsData";

import "./HomepageV2.css";
import NavbarV2 from "../Shared/NavbarV2";
import PageLoader from "../Shared/PageLoader";
import { introWillPlay, onIntroHandoff } from "../../lib/introGate";
import FooterV2 from "../Shared/FooterV2";
import HeroVisual from "./HeroVisual";
import ClientStrip from "../Shared/ClientStrip";
import FaqSection from "../Shared/FaqSection";
import ScrollSentence from "../Shared/ScrollSentence";
import CtaSection from "../Shared/CtaSection";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";

gsap.registerPlugin(ScrollTrigger);





/* smootherstep — takes the linear scroll fraction and softens both ends so the
   scrubbed motion doesn't start and stop abruptly */
const ease = (p) => p * p * p * (p * (p * 6 - 15) + 10);

/* Tall sticky block that shows ONE line at a time. Unlike a timed animation,
   every value here (opacity, scale, blur, backdrop position) is a direct
   function of scroll position — no CSS transition plays on its own. Scroll a
   pixel, the text moves a pixel; scroll back, it reverses. */
/* Core workflow declarations */
const DECLARATIONS = ["PLAN.", "BUILD.", "SCALE."];

/* Module scope: false until the homepage first mounts in this page load.
   Together with the load's own URL it tells the hero effect whether it is
   hydrating the prerendered "/" (hero already painted) or mounting a fresh
   hero after a client-side navigation. */
let heroMountedThisLoad = false;

const STATEMENTS = [
  { label: "PLAN.", body: "We don't just take orders. We sit with your team, map out the edge cases, and design an architecture that won't paint you into a corner six months from now." },
  { label: "BUILD.", body: "Clean code, strict typing, and comprehensive test coverage. We engineer resilient systems designed to handle real-world traffic without falling apart at the seams." },
  { label: "SCALE.", body: "You shouldn't have to rewrite your entire backend just because your user base doubled. We build multi-tenant, cloud-native solutions that grow with you." },
];

const METHOD = [
  { n: "01", title: "Project Ideation", time: "2–3 days", body: "We start by listening to your business goals, challenges, and vision. We learn about your target audience, competitors, and the key features you need — before proposing anything." },
  { n: "02", title: "Planning", time: "3–5 days", body: "We create a detailed project plan — timelines, milestones, deliverables — and finalize scope with you, so we're aligned on objectives before anything is built." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity designs come next. We work collaboratively to make sure the design aligns with your brand and your users' expectations, not just ours." },
  { n: "04", title: "Agile Development", time: "2–8 weeks", body: "We build in sprints, shipping functional pieces on a cadence. That keeps the project flexible — adjustments happen as we go, not after the fact." },
  { n: "05", title: "Testing", time: "1–2 weeks", body: "Before anything ships, we test for functionality, usability, security, and performance against your actual use cases, not a generic checklist." },
  { n: "06", title: "Deployment", time: "Ongoing", body: "We deploy and stay on for post-launch support, so your team is fully equipped to run it long after we've handed it over." },
];

const WORK = [
  { n: "SYS · 01", tag: "Society Management", title: "A Smart Society Management App for Modern Residential Communities", link: "/case-study/smart-society-management-case-study", thumb: workThree },
  { n: "SYS · 02", tag: "Enterprise ERP", title: "A Custom ERP Solution for Industrial & Financial Workflows", link: "/case-study/erp-case-study", thumb: workTwo },
  { n: "SYS · 03", tag: "E-Commerce", title: "A High-Performance Platform for Premium Book Collections", link: "/case-study/book-collections-case-study", thumb: workOne },
  { n: "SYS · 04", tag: "Marketplace", title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", link: "/case-study/car-marketplace-case-study", thumb: workFour },
  { n: "SYS · 05", tag: "Payroll", title: "Custom Payroll Management System — Web & Mobile", link: "/case-study/payroll-case-study", thumb: workFive },
];
/* Sticky scroll sentences — the reference's signature full-screen moment */
const SENTENCE_ONE = [
  "YOUR BUSINESS RUNS ON SOFTWARE.",
  "SOMEONE BUILT IT.",
  "SOMEONE MAINTAINS IT.",
  "SOMEONE OWNS IT.",
  "IT SHOULD BE YOU.",
];
const SENTENCE_TWO = [
  "TELL US WHAT YOU NEED.",
  "WE SCOPE IT HONESTLY.",
  "BUILD IT PROPERLY.",
  "SHIP IT ON TIME.",
  "THEN HAND YOU THE KEYS.",
];

/* Delivery pipeline — mirrors the reference's SOURCE→…→LEARN rail, including
   its one branching beat (REACH forking into WhatsApp/Email/LinkedIn before
   merging back into CONVERSE). Ours forks at Deploy into Web/Mobile/Cloud. */
const PIPELINE = [
  { label: "Scope", icon: Target, body: "Goals, users, constraints — mapped before an estimate exists." },
  { label: "Design", icon: PenTool, body: "Screens and flows agreed before any code is written." },
  { label: "Build", icon: Code2, body: "Shipped in sprints. Reviewable every fortnight." },
  { label: "Test", icon: CheckCircle2, body: "Function, security, and load — against your real cases.", highlight: true },
  {
    label: "Deploy",
    icon: Rocket,
    body: "Released across every surface at once.",
    branch: true,
    channels: [
      { label: "Web", icon: Globe, body: "Live on your domain, monitored from hour one." },
      { label: "Mobile", icon: Smartphone, body: "Signed, submitted, and tracked through store review." },
      { label: "Cloud", icon: Cloud, body: "Provisioned, scaled, and backed up automatically." },
    ],
  },
  { label: "Monitor", icon: Activity, body: "Uptime, errors, and performance watched from day one." },
  { label: "Support", icon: LifeBuoy, body: "We stay on. Every release sharpens the next one." },
];

/* Capability catalogue — mirrors the reference's 84-system map strip 
   Each card links to the service page that answers it. All eight used to
   point at /work, which spent eight descriptive anchors on one generic
   destination and left those service pages with no inbound link from the
   homepage. */
const SYSTEMS = [
  { id: "WEB · 01", cluster: "Web Platforms", title: "Conversion-First Website", path: "/services/web-development", reality: "Most B2B sites are brochures that load slowly and convert nothing. We build for speed budgets and measured conversion." },
  { id: "APP · 02", cluster: "Mobile Applications", title: "Cross-Platform App", path: "/services/application-development", reality: "Separate iOS and Android builds double your cost and halve your release pace. One codebase, native feel." },
  { id: "ERP · 03", cluster: "Enterprise Systems", title: "Custom ERP & Workflow", path: "/services/erp-crm-development", reality: "Your operations run on spreadsheets nobody fully understands. We turn that into a system with an owner." },
  { id: "COM · 04", cluster: "E-Commerce", title: "Storefront & Checkout", path: "/services/e-commerce-solutions", reality: "Carts abandon at checkout because the last three steps were an afterthought. We design backwards from payment." },
  { id: "AI · 05", cluster: "Applied AI", title: "AI Agents & Automation", path: "/services/ai-development", reality: "Your team retypes the same data between four tools daily. We automate the handoff, not the judgement." },
  { id: "SaaS · 06", cluster: "Product Engineering", title: "Multi-Tenant SaaS", path: "/services/saas-product-development", reality: "Single-tenant architecture caps your growth at the first enterprise client. We build tenancy in from day one." },
  { id: "UX · 07", cluster: "Design Systems", title: "UI/UX & Design System", path: "/services/ui-ux-design", reality: "Every new screen looks slightly different because there is no system. We build the component library first." },
  { id: "INT · 08", cluster: "Integrations", title: "API & Systems Integration", path: "/services/api-development-integration", reality: "Your CRM, accounts, and inventory don't speak. We make them exchange the right data on the right trigger." },
];

const SERVICES = [
  { n: "01", tag: "Development", title: "Web Development", items: [{ label: "Performance Optimization", path: "/services/performance-optimization" }], link: "/services/web-development" },
  { n: "02", tag: "Development", title: "Application Development", items: [{ label: "SaaS Product Development", path: "/services/saas-product-development" }], link: "/services/application-development" },
  { n: "03", tag: "Design", title: "UI/UX Design", items: [{ label: "UX Research & Design Systems", path: "/services/ux-research-design-systems" }], link: "/services/ui-ux-design" },
  { n: "04", tag: "Commerce", title: "E-Commerce Solutions", items: [{ label: "Marketplace Development", path: "/services/marketplace-development" }, { label: "Payment Integration Services", path: "/services/payment-integration-services" }], link: "/services/e-commerce-solutions" },
  { n: "05", tag: "Development", title: "Custom Software Development", items: [{ label: "ERP & CRM Development", path: "/services/erp-crm-development" }, { label: "API Development & Integration", path: "/services/api-development-integration" }, { label: "Legacy System Modernization", path: "/services/legacy-system-modernization" }], link: "/services/custom-software-development" },
  { n: "06", tag: "Applied AI", title: "AI Development", items: [{ label: "AI Agent Development", path: "/services/ai-agent-development" }, { label: "Generative AI Solutions", path: "/services/generative-ai-solutions" }, { label: "Workflow Automation", path: "/services/workflow-automation" }], link: "/services/ai-development" },
  { n: "07", tag: "Analytics", title: "Data Analytics", items: [{ label: "Business Intelligence Solutions", path: "/services/business-intelligence-solutions" }, { label: "Predictive Analytics", path: "/services/predictive-analytics" }, { label: "Data Engineering", path: "/services/data-engineering" }], link: "/services/data-analytics" },
  { n: "08", tag: "Support", title: "Support & Managed Services", items: [{ label: "Cloud Solutions & Migration", path: "/services/cloud-solutions-migration" }, { label: "Cloud Infrastructure Services", path: "/services/cloud-infrastructure-services" }, { label: "Security & Maintenance", path: "/services/security-maintenance" }, { label: "Dedicated Development Teams", path: "/services/dedicated-development-teams" }], link: "/services/support-managed-services" },
];

/* headline numbers — the value is the count-up target, suffix rides along */
const STATS = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 24, suffix: "h", label: "Response time" },
];

/* same real client quotes already used on the Our Work page — reused here
   rather than inventing new placeholder testimonials. schema.sql seeds the
   Supabase testimonials table with these same 5 quotes, so once Supabase
   responds it REPLACES this static list (see useTestimonials) rather than
   merging — merging would show each one twice. */


const PRINCIPLES = [
  { key: "Delivered.", icon: CalendarCheck, claim: "Deadlines are commitments, not aspirations.", body: "Our disciplined process ensures every project launches exactly when promised. Deliver before the deadline is not a slogan here — it is how the schedule is built." },
  { key: "Visible.", icon: Eye, claim: "Nothing about the build stays behind closed doors.", body: "From kickoff to delivery you always know what's happening, why it's happening, and when. Clarity builds trust, and trust is what makes the second project easier than the first." },
];

const FAQS = [
  { q: "What if I need changes after the project is delivered?", a: "We offer a revision window after delivery for design or functionality tweaks. For ongoing improvements, we recommend our maintenance plan." },
  { q: "What is your cancellation policy?", a: "We understand that plans can change. If you wish to cancel a project, you can do so at any stage with written notice." },
  { q: "How do you integrate AI into your solutions?", a: "We use AI to enhance performance and user experience through smart recommendations, chat automation, predictive analytics, and process optimisation." },
  { q: "How does billing work?", a: "Our billing process is simple and transparent — a detailed quotation with milestones, an upfront deposit, followed by milestone-based instalments." },
  { q: "Can you sign an NDA before starting the project?", a: "Of course. We take confidentiality seriously and are happy to sign an NDA before discussing or starting your project." },
];


export default function HomepageV2() {
  const TESTIMONIALS = useTestimonials(STATIC_TESTIMONIALS);
  const navigate = useNavigate();
  // FAQ items' className is recomputed on every click (for the "open" class),
  // which makes React rewrite that element's className attribute — wiping out
  // an "is-in" class added imperatively by the scroll-reveal observer below.
  // Tracking revealed indices in React state instead means "is-in" is part
  // of the same JSX-driven className, so it survives every re-render.
  // of the same JSX-driven className, so it survives every re-render.




  const rootRef = useRef(null);
  const heroWordRefs = useRef([]);
  const wrLabelRefs = useRef([]);
  const flyerRefs = useRef([]);
  const workSectionRef = useRef(null);
  const workPreviewRef = useRef(null);
  const workPreviewImgRef = useRef(null);

  /* The hero and the Method/Work bands carry ~33 looping decorative
     animations (rings, glows, the grid, pulses). They kept running — and
     repainting — long after they had scrolled away, which on a phone cost
     more paint time per scroll frame than everything on screen. Pause each
     section's loops while it is off screen; they resume where they were. */
  useEffect(() => {
    const sections = rootRef.current.querySelectorAll(".v2-hero, .v2-method-shell");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("v2-anim-paused", !e.isIntersecting)),
      { rootMargin: "10% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Every pinned heading band (Method, Work, ...) uses CSS position:sticky.
     Each one's bottom line should only show once IT is actually stuck to the
     top mid-scroll, not while sitting at rest in its normal spot. */
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

  /* Every ScrollTrigger below is created synchronously on mount, which means
     each one's "start" pixel position is calculated against whatever layout
     exists at that instant. NoiGroteskFix / Inter load asynchronously
     (index.html webfont link), and every image below the fold loads lazily —
     both reflow the page after these triggers already cached their numbers,
     leaving some rows' true trigger point stale (already passed, or never
     reached) and permanently unrevealed. One shared refresh, once real
     layout has settled, recalculates every trigger on the page at once. */
  /* Each refresh re-measures every trigger, i.e. a full layout of a ~20000px
     page — about 0.3s on a mid-range phone. The window "load" refresh is
     left to ScrollTrigger, which already refreshes on load by default (doing
     it here too ran it twice), and the remaining requests are coalesced so
     fonts.ready and the trailing timer can't stack two back to back. */
  useEffect(() => {
    let pending = 0;
    const refresh = () => {
      clearTimeout(pending);
      pending = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    document.fonts?.ready?.then(refresh);
    // images/marquee logos etc. finish arriving well after mount; one
    // trailing refresh catches layout shift from anything still loading
    const trailing = setTimeout(refresh, 2000);
    return () => {
      clearTimeout(pending);
      clearTimeout(trailing);
    };
  }, []);

  /* hero intro — title lines wipe up, then supporting copy settles in.
     When the session intro is running this must NOT start on mount: it
     would play out behind the loader's plate and reveal an already
     finished, static hero. It's held paused and released by the loader
     as the plate begins clearing, so the wipe happens in view.
     A layout effect, because the hero copy is visible in the prerendered
     HTML (see .v2-hero-top in the CSS): the timeline's from-state has to be
     applied before the first client paint, or the copy flashes, vanishes
     and then animates in. */
  useLayoutEffect(() => {
    const held = introWillPlay();
    const loadUrl = performance.getEntriesByType("navigation")[0]?.name || location.href;
    const prepainted = !heroMountedThisLoad && new URL(loadUrl).pathname === "/";
    heroMountedThisLoad = true;
    const q = (s) => rootRef.current.querySelectorAll(s);
    splitTitleLinesIn(rootRef.current, ".v2-hero-title");

    /* No intro on a fresh load (phones, repeat visits): the prerendered hero
       has been on screen since first paint, often for seconds before this
       runs on a slow phone. Hiding it now to wipe it back in would blank the
       copy the visitor is already reading, so just reveal the one element
       the CSS still hides. Client-side navigation back to "/" mounts a hero
       nobody has seen yet, so that still gets the entrance. */
    if (!held && prepainted) {
      gsap.set(q(".v2-hero-words span"), { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      delay: held ? 0 : 0.25,
      paused: held,
    });
    tl.fromTo(q(".v2-hero-top"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 })
      .fromTo(q(".v2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".v2-hero-sub"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".v2-hero-cta"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".v2-hero-words span"),
        { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .9, stagger: .1 }, "-=.6");

    if (!held) return () => tl.kill();

    const play = () => tl.play();
    const off = onIntroHandoff(play);
    /* safety net — if the loader ever fails to signal, the hero must
       still animate rather than sit invisible forever */
    const failsafe = setTimeout(play, 2600);

    return () => { tl.kill(); off(); clearTimeout(failsafe); };
  }, []);

  /* THE handoff — this is not two separate texts (hero fades out, section
     fades in). It is the same three words, physically relocated: a fixed-
     position "flyer" clone travels from each hero-foot word's exact spot to
     its landing spot as a big column heading, its position/size read straight
     off getBoundingClientRect at both ends and interpolated every scroll
     frame. The real hero word and the real heading are both hidden while the
     flyer is mid-flight, so only one instance of each word is ever visible —
     it just happens to be a different element at each end of the trip.
     Set up on mount, so the words follow the very first scroll — deferring
     it to idle left them frozen for the first second on a phone.

     The flyer moves with transform only: each clone is laid out once at its
     LANDING font size and scaled down to the hero size, with translate for
     position. Animating top/left/font-size made the browser re-lay-out the
     text on every scroll frame, which is what made the flight stutter on
     phones. Scaling down (never up) keeps the glyphs sharp, and with
     line-height 1 and an em letter-spacing, scale() matches what the
     font-size change looked like exactly. */
  useEffect(() => {
    const heroEl = rootRef.current.querySelector(".v2-hero");
    const pinSection = rootRef.current.querySelector(".v2-wr-pin");
    const heroWords = heroWordRefs.current;
    const labels = wrLabelRefs.current;
    const flyers = flyerRefs.current;
    if (!heroEl || !pinSection || !heroWords.length || !labels.length || !flyers.length) return;

    const lerp = (a, b, t) => a + (b - a) * t;
    const HERO_RGBA = [242, 240, 236, .45];
    const LAND_RGBA = [15, 15, 13, 1];
    const mixColor = (t) => {
      const [r, g, b, a] = HERO_RGBA.map((v, i) => lerp(v, LAND_RGBA[i], t));
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    // Both ends of the flight are frozen document-space constants, and there
    // is exactly ONE scroll conversion at the very end (viewport = doc - Y).
    // That's what makes the path a straight line: if either end were re-read
    // live and blended with a scroll-driven weight at the same time, the
    // scroll term appears twice and the path bows into a curve — which is
    // what "dips past the target, then snaps into place" actually was.
    let startPx = 0, endPx = 1, freezeScrollY = 0;
    let heroDoc = [], labelDocTarget = [];
    let heroFontSize = [], labelFontSize = [];

    const measure = () => {
      heroDoc = heroWords.map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, left: r.left };
      });
      heroFontSize = heroWords.map((el) => parseFloat(getComputedStyle(el).fontSize));
      labelFontSize = labels.map((el) => parseFloat(getComputedStyle(el).fontSize));

      const heroBottomDoc = heroEl.getBoundingClientRect().bottom + window.scrollY;
      startPx = Math.max(0, heroBottomDoc - window.innerHeight);
      endPx = heroBottomDoc;
      const EDGE = 0.035;
      freezeScrollY = startPx + (1 - EDGE) * (endPx - startPx);

      // The label's TRUE resting spot is "0 (viewport top, once the section
      // pins) + its fixed offset within that section" — an amount that never
      // changes with scroll, because label and section move together right
      // up until the pin engages. Reading that offset now (pre-pin, normal
      // flow) and projecting it forward is exact, unlike reading the label's
      // pre-scroll document position directly (which ignored the vertical
      // re-centering the pin causes and produced a stale target).
      const sectionRect = pinSection.getBoundingClientRect();
      labelDocTarget = labels.map((el) => {
        const r = el.getBoundingClientRect();
        const pinnedViewportTop = r.top - sectionRect.top; // invariant
        return { top: pinnedViewportTop + freezeScrollY, left: r.left };
      });

      flyers.forEach((el, i) => { if (el) el.style.fontSize = labelFontSize[i] + "px"; });
    };
    measure();

    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: () => startPx,
      end: () => endPx,
      scrub: true,
      onUpdate: (self) => {
        // linear, not eased — this is scrubbed 1:1 to the scrollbar, so any
        // ease-in-out here reads as the word lagging, then rushing, then
        // "overshooting" into place. Scroll a pixel, it moves a pixel.
        const p = self.progress;
        const clamp01 = (v) => Math.min(1, Math.max(0, v));
        const EDGE = 0.035;
        // position finishes arriving BEFORE the crossfade window starts —
        // otherwise the word is still visibly travelling while it's also
        // fading into the label, which reads as "it keeps settling down"
        // even though the maths is correct. Motion stops, THEN it fades.
        const posP = clamp01(p / (1 - EDGE));
        const scrollRef = Math.min(window.scrollY, freezeScrollY);
        // fades: hero word 1→0 over [0, EDGE], label 0→1 over [1-EDGE, 1],
        // flyer holds whatever opacity is left between the two — a soft
        // crossfade instead of a hard binary cut
        const heroOpacity = 1 - clamp01(p / EDGE);
        const labelOpacity = clamp01((p - (1 - EDGE)) / EDGE);
        const flyerOpacity = clamp01(1 - heroOpacity - labelOpacity);

        flyers.forEach((el, i) => {
          if (!el || !heroDoc[i] || !labelDocTarget[i]) return;
          const a = heroDoc[i], b = labelDocTarget[i];
          const x = a.left + (b.left - a.left) * posP;
          const y = a.top + (b.top - a.top) * posP - scrollRef;
          const scale = (heroFontSize[i] + (labelFontSize[i] - heroFontSize[i]) * posP) / labelFontSize[i];
          el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
          el.style.color = mixColor(posP);
          el.style.opacity = flyerOpacity;
        });
        heroWords.forEach((el) => { if (el) el.style.opacity = heroOpacity; });
        labels.forEach((el) => { if (el) el.style.opacity = labelOpacity; });
      },
    });

    /* Width only: on a phone "resize" also fires every time the address bar
       slides in or out mid-scroll, and re-measuring then stalled the scroll
       and made the words jump. */
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measure();
      st.refresh();
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(() => { measure(); st.refresh(); });
    return () => { st.kill(); window.removeEventListener("resize", onResize); };
  }, []);

  /* body copy fades in right after the heading lands, once the section pins.
     The accent tick (::before) and background ordinal (::after) on each
     column are pure CSS pseudo-elements — GSAP can't select them directly,
     so they're driven by tweening a --wr-decor custom property on the real
     .v2-wr-col element instead, which the CSS reads via var(--wr-decor, 0)
     for their opacity. Same timeline as the body, so both arrive together
     right as each word lands. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = rootRef.current.querySelector(".v2-wr-pin");
      const intro = section.querySelector(".v2-wr-intro");
      const cols = gsap.utils.toArray(".v2-wr-col", section);
      const bodies = cols.map((c) => c.querySelector(".v2-wr-body"));

      if (intro) gsap.set(intro, { opacity: 0, y: 20 });
      gsap.set(bodies, { opacity: 0, y: 20 });
      gsap.set(cols, { "--wr-decor": 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: "top top", end: "+=70%",
          scrub: .7, pin: true, anticipatePin: 1,
        },
      });

      if (intro) {
        tl.to(intro, { opacity: 1, y: 0, ease: "none" });
      }

      tl.to(bodies, { opacity: 1, y: 0, ease: "none", stagger: .12 }, intro ? "<0.1" : undefined)
        .to(cols, { "--wr-decor": 1, ease: "none", stagger: .12 }, "<");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* Reveal-on-enter for every row/heading/label, via IntersectionObserver
     rather than GSAP ScrollTrigger. ScrollTrigger caches a pixel "start"
     position at creation time; if webfonts or images below reflow the page
     afterward (which they do — NoiGroteskFix/Inter load async, images lazy-
     load), that cached number goes stale and the element can end up
     permanently stuck at opacity:0 ("Work"'s rows going invisible was this).
     IntersectionObserver has no cache to go stale — it's re-checked against
     live layout by the browser itself — so this class of bug can't recur. */
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
      ".v2-method-row", ".v2-work-row", ".v2-principle",
      ".v2-faq-item", ".v2-deck-shell", ".v2-cta", ".v2-pipe-node", ".v2-map-card", ".v2-strip",
      ".v2-heading", ".v2-map-headline", ".v2-label", ".v2-map-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* (Footer marquee animation is now handled in pure CSS) */

  /* stat numbers count up from 0 → target the first time they scroll in */
  useEffect(() => {
    const nums = rootRef.current.querySelectorAll(".v2-stat-value");
    if (!nums.length) return;
    const runCount = (el) => {
      const target = Number(el.dataset.target);
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        // easeOutExpo — fast then settles, so the number feels like it "lands"
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    // same trigger config as the page's proven reveal observer — a low
    // threshold plus a bottom rootMargin, rather than a high 0.6 threshold
    // that can be finicky on a short element
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          runCount(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Work rows: a project screenshot follows the cursor while a row is hovered
     — the signature agency "hover to preview" interaction. Pointer devices
     only; the image lives in one shared element whose src swaps per row. */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const section = workSectionRef.current;
    const preview = workPreviewRef.current;
    const img = workPreviewImgRef.current;
    if (!section || !preview || !img) return;

    const rows = Array.from(section.querySelectorAll(".v2-work-row"));
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, active = false;

    const loop = () => {
      // damped follow so the thumbnail trails the cursor with a little weight
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      preview.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      if (active || Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else { raf = 0; }
    };
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const enter = (row, ev) => {
      const src = row.dataset.thumb;
      if (src) img.src = src;
      img.alt = row.dataset.title || "Project preview";

      /* mouseenter also fires when a row scrolls up under a stationary
         cursor — and in that case no mousemove has run, so tx/ty would
         still be their initial 0,0 and the thumbnail would open at the
         top-left corner instead of at the pointer. The event carries the
         real coordinates however it was triggered, so seed from it. */
      if (ev && typeof ev.clientX === "number") {
        tx = ev.clientX;
        ty = ev.clientY;
      }

      /* place it at the cursor on first show rather than letting the
         damped follow glide it in from wherever it was left */
      if (!active) {
        cx = tx;
        cy = ty;
        preview.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }

      preview.classList.add("show");
      active = true;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => { preview.classList.remove("show"); active = false; };

    section.addEventListener("mousemove", onMove);
    const perRow = rows.map((row) => {
      const e = (ev) => enter(row, ev);
      row.addEventListener("mouseenter", e);
      row.addEventListener("mouseleave", leave);
      return { row, e };
    });
    return () => {
      section.removeEventListener("mousemove", onMove);
      perRow.forEach(({ row, e }) => {
        row.removeEventListener("mouseenter", e);
        row.removeEventListener("mouseleave", leave);
      });
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* magnetic buttons + cursor-aware card tilt — pointer devices only. Both
     are pure transform writes on mousemove, cleared on leave, so they never
     fight the scroll-reveal transforms (those have finished by interaction). */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const root = rootRef.current;

    // magnetic: the button eases a few px toward the cursor while hovered
    const magnets = Array.from(root.querySelectorAll(".v2-btn"));
    const magHandlers = magnets.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${mx * 0.28}px, ${my * 0.34}px)`;
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return { el, move, leave };
    });

    // tilt: system-map cards lean slightly toward the cursor in 3D
    const tilts = Array.from(root.querySelectorAll(".v2-map-card"));
    const tiltHandlers = tilts.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(720px) rotateX(${-py * 7}deg) rotateY(${px * 9}deg) translateY(-5px)`;
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return { el, move, leave };
    });

    return () => {
      magHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      tiltHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  /* top scroll-progress bar — damped so it glides with the page */
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

  /* FAQ accordion height animation moved to FaqSection */

  return (
    <div className="v2" ref={rootRef}>
      <PageLoader />
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* the travelling clone of DESIGN./BUILD./SCALE. — the real hero words
          and the real section-2 headings both hide while this is in flight */}
      <div className="v2-word-flyer" aria-hidden="true">
        {DECLARATIONS.map((w, i) => (
          <span ref={(el) => (flyerRefs.current[i] = el)} key={w}>{w}</span>
        ))}
      </div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>

      {/* ══════════ 1 · HERO — Codelix's own composition ══════════ */}
      <header className="v2-hero">
        <div className="v2-hero-inner">
          <div className="v2-hero-content-left">
            <div className="v2-hero-top">
              <span className="v2-hero-status">
                <i /> Available for new projects
              </span>
              <h1 className="v2-hero-eyebrow">AI-Powered IT Company in Ahmedabad</h1>
            </div>
            <h2 className="v2-hero-title">
              <span className="line"><span>We build</span></span>{" "}
              <span className="line"><span>software that</span></span>{" "}
              <span className="line"><span className="v2-hero-accent">actually scales.</span></span>
            </h2>
            <p className="v2-hero-sub">
              Codelix IT Solutions is a software development company in Ahmedabad, India. We engineer production-ready web apps, mobile platforms, and enterprise SaaS designed to handle real users.
            </p>
            <div className="v2-hero-cta">
              <Link className="v2-btn v2-btn--filled" to="/contact">
                <span>Start a project</span>
                <i className="v2-btn-arrow">→</i>
              </Link>
              <a className="v2-hero-secondary" href="#work">
                <span className="v2-hero-secondary-icon"><PlayCircle size={17} strokeWidth={1.6} /></span>
                <span className="v2-hero-secondary-label">See our work</span>
              </a>
            </div>
            <div className="v2-hero-words">
              {DECLARATIONS.map((w, i) => (
                <span ref={(el) => (heroWordRefs.current[i] = el)} key={w}>{w}</span>
              ))}
            </div>
          </div>
          <div className="v2-hero-content-right">
            <HeroVisual />
          </div>
        </div>
        <a className="v2-hero-scroll" href="#work" aria-label="Scroll to work">
          <span>Scroll</span>
          <i />
        </a>
      </header>

      {/* ══════════ 2 · STATEMENTS (light band) — pinned while the hero's foot
          words grow into these three column heads, then releases ══════════ */}
      <section className="v2-section v2-section--gallery v2-wr-pin">
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="v2-wr-intro" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <p className="v2-wr-intro-label">Our Philosophy</p>
            <h2 className="v2-wr-intro-heading">Great software isn't just written. It's engineered.</h2>
          </div>
          <div className="v2-wr">
            {STATEMENTS.map((s, i) => (
              <div className="v2-wr-col" key={s.label}>
                <h2 className="v2-wr-label" ref={(el) => (wrLabelRefs.current[i] = el)}>{s.label}</h2>
                <p className="v2-wr-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 3 · METHOD — heading stays pinned at the top of the
          section while the numbered rows scroll past underneath it ══════════ */}
      <section className="v2-method-shell" id="method">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">Our Method.</h2>
          <p className="v2-method-lede">
            Our method is six steps: ideation, planning, design, agile development,
            testing, and deployment. It starts with what your business actually
            needs — not a proposal template.
          </p>
        </div>
        <div className="v2-method-rows">
          {METHOD.map((m) => (
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

      {/* ══════════ 3b · SCROLL SENTENCE (dark) ══════════ */}
      <ScrollSentence words={SENTENCE_ONE} tone="dark" />

      {/* ══════════ 4 · WORK ══════════ */}
      <section className="v2-method-shell" id="work" ref={workSectionRef}>
        <div className="v2-method-head">
          <h2 className="v2-method-heading">Selected Work.</h2>
          <p className="v2-method-lede">
            Codelix has delivered 40+ projects across society management, enterprise
            ERP, e-commerce, payroll, and marketplaces. Here are five of them.
          </p>
        </div>
        <div className="v2-method-rows">
          {WORK.map((w) => (
            <div
              className="v2-work-row"
              key={w.n}
              data-thumb={w.thumb}
              data-title={w.title}
              onClick={() => navigate(w.link)}
            >
              <div className="v2-work-index">{w.n}</div>
              <div>
                <div className="v2-work-tag">{w.tag}</div>
                <div className="v2-work-title">{w.title}</div>
              </div>
              <div className="v2-work-arrow">→</div>
            </div>
          ))}
          <div className="v2-work-more">
            <Link className="v2-btn" to="/work">View all work →</Link>
          </div>
        </div>
        {/* floating preview — follows the cursor, swaps to the hovered row's
            screenshot; pointer devices only (wired in JS below) */}
        <div className="v2-work-preview" ref={workPreviewRef} aria-hidden="true">
          <img alt="Project preview" ref={workPreviewImgRef} />
        </div>
      </section>

      {/* ══════════ 4b · DELIVERY PIPELINE ══════════ */}
      <section className="v2-method-shell v2-pipe-shell">
        <div className="v2-method-head v2-pipe-head">
          <p className="v2-pipe-eyebrow">From Brief To Launch</p>
          <h2 className="v2-pipe-heading">How We Ship.</h2>
          <p className="v2-pipe-lede">
            Every project ships through the same seven stages: scope, design, build,
            test, deploy, monitor, and support — without cutting a stage short.
          </p>
        </div>
        <div className="v2-method-rows v2-pipe-rows">
          {/* the whole pipeline lives inside a bordered "console" panel — a
              deliberate tonal break from the light gallery around it, styled
              like a running terminal/engine readout rather than a plain
              card rail. */}
          <div className="v2-pipe-console">
            <div className="v2-pipe-console-bar">
              <span className="v2-pipe-console-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="v2-pipe-console-title">how-we-ship.sh</span>
              <span className="v2-pipe-console-live">
                <i className="v2-pipe-console-live-dot" aria-hidden="true" />
                running
              </span>
            </div>
            <div className="v2-pipe-scroll">
              <div className="v2-pipe-rail">
                {PIPELINE.map((n, i) => (
                  <React.Fragment key={n.label}>
                    <div className={`v2-pipe-node ${n.highlight ? "is-highlight" : ""}`}>
                      <span className="v2-pipe-step">{String(i + 1).padStart(2, "0")}</span>
                      <span className="v2-pipe-label">
                        <span className="v2-pipe-icon"><n.icon size={15} strokeWidth={1.8} /></span>
                        <span className="v2-pipe-name">{n.label}</span>
                      </span>
                      <p className="v2-pipe-body">{n.body}</p>
                    </div>
                    {i < PIPELINE.length - 1 && (
                      <div className="v2-pipe-connector" aria-hidden="true">
                        <span className="v2-pipe-track" />
                        <span className="v2-pipe-arrow">→</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* the one branching beat gets the FULL row's width to itself,
                  underneath the main rail, instead of squeezing into a column
                  that also has to hold its own place in that rail */}
              {PIPELINE.filter((n) => n.branch).map((n) => (
                <div className="v2-pipe-fork" key={n.label}>
                  <span className="v2-pipe-fork-connector" aria-hidden="true">
                    <span className="v2-pipe-fork-connector-track" />
                  </span>
                  <span className="v2-pipe-fork-label">Ships to three destinations at once</span>
                  <div className="v2-pipe-fork-row">
                    {n.channels.map((c) => (
                      <div className="v2-pipe-node v2-pipe-node--mini" key={c.label}>
                        <span className="v2-pipe-label">
                          <span className="v2-pipe-icon"><c.icon size={13} strokeWidth={1.8} /></span>
                          <span className="v2-pipe-name">{c.label}</span>
                        </span>
                        <p className="v2-pipe-body">{c.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 4c · SYSTEM MAP strip ══════════ */}
      <section className="v2-map">
        <div className="v2-map-header">
          <div>
            <div className="v2-map-label">What We Build</div>
            <h2 className="v2-map-headline">Eight ways we build,<br />all already shipped.</h2>
          </div>
          <div>
            <p className="v2-map-body">
              We build websites, cross-platform apps, ERPs, storefronts, AI automation, SaaS,
              design systems, and integrations — each one already shipped for clients.
            </p>
            <Link className="v2-map-link" to="/work">See the case studies →</Link>
          </div>
        </div>
        <div className="v2-map-scroll">
          <div className="v2-map-track">
            {SYSTEMS.map((s) => (
              <Link className="v2-map-card" key={s.id} to={s.path}>
                <span className="v2-map-id">{s.id}</span>
                <span className="v2-map-cluster">{s.cluster}</span>
                <h3 className="v2-map-title">{s.title}</h3>
                <p className="v2-map-reality">{s.reality}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4d · TECH STACK — "what we build it with" ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">The Stack</p>
            <h2 className="v2-heading">Built on tools we trust in production.</h2>
          </div>
          <p className="v2-lede">
            We use a proven production stack across front-end, mobile, back-end,
            data, and cloud — no experimental dependencies on client work.
          </p>
        </div>
        <div className="v2-tech-grid">
          {TECH_STACK.map((t) => (
            <div className="v2-tech-item" key={t.name}>
              <img src={t.src} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>



      {/* ══════════ 5b · STATS band — numbers count up when scrolled in ══════════ */}
      <section className="v2-section v2-stats-section">
        <div className="v2-stats">
          {STATS.map((s) => (
            <div className="v2-stat" key={s.label}>
              <div className="v2-stat-num">
                <span className="v2-stat-value" data-target={s.value}>0</span>
                <span className="v2-stat-suffix">{s.suffix}</span>
              </div>
              <div className="v2-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 6 · SERVICES — Premium Bento Grid ══════════ */}
      <section className="v2-method-shell v2-services-section" id="services">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">What We Provide.</h2>
          <p className="v2-method-lede">
            Codelix provides eight services: web, app, UI/UX, e-commerce, custom
            software, AI, data analytics, and managed support — one delivery standard.
          </p>
        </div>

        <div className="v2-services-grid">
          {SERVICES.map((s, idx) => (
            <div className={`v2-svc-card v2-svc-card-${idx + 1}`} key={s.n} onClick={() => navigate(s.link)}>
              <div className="v2-svc-glow"></div>
              <div className="v2-svc-content">
                <div className="v2-svc-head">
                  <span className="v2-svc-num">{s.n}</span>
                  <span className="v2-svc-tag">{s.tag}</span>
                </div>
                <div className="v2-svc-bottom">
                  <div className="v2-svc-text">
                    <h3 className="v2-svc-title">{s.title}</h3>
                    {s.items && (
                      <ul className="v2-svc-sublist">
                        {s.items.map((sub, i) => (
                          <li key={i}>
                            <span
                              className="v2-svc-sublink"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(sub.path);
                              }}
                              style={{ display: 'inline-flex', alignItems: 'center', textAlign: 'left' }}
                            >
                              <span>{sub.label}</span>
                              <span style={{ opacity: 0.4, fontSize: '0.9em', marginLeft: '8px' }}>→</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="v2-svc-arrow">→</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="v2-work-more" style={{ marginTop: '48px', paddingBottom: '0' }}>
          <Link className="v2-btn" to="/services">View all services →</Link>
        </div>
      </section>

      {/* ══════════ 6.5 · OUR PRODUCTS — real, in-house SaaS products we
          build and run ourselves, distinct from client project work above. ══════════ */}
      <section className="v2-section v2-products-section" id="products">
        <p className="v2-label">Our Products</p>
        <h2 className="v2-heading">Beyond client work — products we build and run ourselves.</h2>
        <p className="v2-lede">Codelix runs three live SaaS products — Audytee, 4bitx, and AanganOne — engineered with the same craft we bring to client work.</p>
        <div className="v2-products-grid">
          {PRODUCTS.map((p) => (
            <Link to={`/products/${p.slug}`} className="v2-product-card" key={p.slug} style={{ "--accent": p.accent }}>
              <span className="v2-product-card-logo"><img src={p.logo} alt={`${p.name} logo`} /></span>
              <span className="v2-product-card-badge">{p.badge}</span>
              <h3 className="v2-product-card-name">{p.name}</h3>
              <p className="v2-product-card-tagline">{p.tagline}</p>
              <div className="v2-product-card-stats">
                {p.stats.slice(0, 2).map((s) => (
                  <span key={s.label}><b>{s.value}</b>{s.label}</span>
                ))}
              </div>
              <span className="v2-product-card-cta">Explore {p.name} <i>→</i></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · PRINCIPLES ══════════ */}
      <section className="v2-section v2-section--void v2-principles-section" id="principles">
        <p className="v2-label">Our Principles</p>
        <h2 className="v2-heading">Three commitments that govern every project we take.</h2>
        <div className="v2-principles-grid">
          {PRINCIPLES.map((p) => (
            <div className="v2-principle" key={p.key}>
              <div className="v2-principle-icon"><p.icon /></div>
              <div className="v2-principle-key">{p.key}</div>
              <div className="v2-principle-claim">{p.claim}</div>
              <div className="v2-principle-body">{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 8 · TESTIMONIAL (light band) — bare editorial layout,
          matching the rest of the site's system: hairline dividers, no
          cards, no icon chrome, monochrome type. Every quote stays mounted
          so the crossfade/height transition is driven by .is-active alone. ══════════ */}
      {/* ══════════ 8 · TESTIMONIAL ══════════ */}
      <TestimonialSpotlight
        testimonials={TESTIMONIALS}
        heading="What clients say once we ship."
        stats={[
          { num: '40+', label: 'Companies trust us' },
          { num: '11', label: 'Industries served' },
        ]}
      />

      {/* ══════════ 8b · SCROLL SENTENCE (light) ══════════ */}
      <ScrollSentence words={SENTENCE_TWO} tone="light" />

      {/* ══════════ 9 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} />

      {/* ══════════ 10 · CTA ══════════ */}
      <CtaSection className="v2-section--void">

        <p className="v2-label">Start Here</p>
        <h2 className="v2-cta-headline">
          Bring us the problem.
          <br />
          <span className="v2-cta-accent">We'll bring back a scoped plan.</span>
        </h2>
        <p className="v2-cta-body">
          A free consultation is a structured conversation about your product — your users, your workflows, your constraints.
          We scope what should be built first, what can wait, and what it takes to ship it.
        </p>
        <div className="v2-cta-actions">
          <Link className="v2-btn" to="/contact">Book a consultation →</Link>
        </div>
        <div className="v2-cta-badges">
          <span className="v2-cta-badge">Free consultation</span>
          <span className="v2-cta-badge">NDA on request</span>
          <span className="v2-cta-badge">No obligation</span>
        </div>
      </CtaSection>

      {/* ══════════ FOOTER — mirrors the live site's real footer content
          (Footer.jsx): same columns, same links, same contact details, the
          "WE LIVE IN IT" marquee, and the oversized wordmark at the base ══════════ */}
      </main>

      <FooterV2 />
    </div>
  );
}
