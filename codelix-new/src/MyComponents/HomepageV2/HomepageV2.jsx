import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target, PenTool, Code2, CheckCircle2, Rocket,
  Globe, Smartphone, Cloud, Activity, LifeBuoy,
  CalendarCheck, Lock, Eye, PlayCircle,
} from "lucide-react";

/* real project screenshots (same assets the case-study pages use) */
import workOne from "../Images/work-best-project-one.png";
import workTwo from "../Images/work-best-project-two.png";
import workThree from "../Images/work-best-project-three.png";
import workFour from "../Images/work-best-project-four.png";
import workFive from "../Images/work-best-project-five.png";
import codelixText from "../Images/codelix-footer-logo.png";

/* full real tech-stack set — shared with the services page */
import { TECH_STACK } from "./techStack";


/* shared with the services page */
import { CLIENT_LOGOS } from "./clientLogos";
import codelixLogo from "../Images/codelix-logo.png";

import "./HomepageV2.css";
import V2MobileDrawer from "./V2MobileDrawer";

gsap.registerPlugin(ScrollTrigger);

/* Three declaration words — the reference pins exactly three at the hero foot. */
const DECLARATIONS = ["DESIGN.", "BUILD.", "SCALE."];

const STATEMENTS = [
  { label: "DESIGN.", body: "Most software fails at the interface, not the database. We design the experience before a line of code is written." },
  { label: "BUILD.", body: "Every system we ship is built for one business's actual workflow. Not templated. Not resold." },
  { label: "SCALE.", body: "Architecture decided on day one determines what's possible in year three. We build for the second outcome." },
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
  { n: "SYS · 01", tag: "Society Management", title: "A Smart Society Management App for Modern Residential Communities", link: "/smart-society-management-case-study", thumb: workThree },
  { n: "SYS · 02", tag: "Enterprise ERP", title: "A Custom ERP Solution for Industrial & Financial Workflows", link: "/erp-case-study", thumb: workTwo },
  { n: "SYS · 03", tag: "E-Commerce", title: "A High-Performance Platform for Premium Book Collections", link: "/book-collections-case-study", thumb: workOne },
  { n: "SYS · 04", tag: "Marketplace", title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", link: "/car-marketplace-case-study", thumb: workFour },
  { n: "SYS · 05", tag: "Payroll", title: "Custom Payroll Management System — Web & Mobile", link: "/payroll-case-study", thumb: workFive },
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

/* Capability catalogue — mirrors the reference's 84-system map strip */
const SYSTEMS = [
  { id: "WEB · 01", cluster: "Web Platforms", title: "Conversion-First Website", reality: "Most B2B sites are brochures that load slowly and convert nothing. We build for speed budgets and measured conversion." },
  { id: "APP · 02", cluster: "Mobile Applications", title: "Cross-Platform App", reality: "Separate iOS and Android builds double your cost and halve your release pace. One codebase, native feel." },
  { id: "ERP · 03", cluster: "Enterprise Systems", title: "Custom ERP & Workflow", reality: "Your operations run on spreadsheets nobody fully understands. We turn that into a system with an owner." },
  { id: "COM · 04", cluster: "E-Commerce", title: "Storefront & Checkout", reality: "Carts abandon at checkout because the last three steps were an afterthought. We design backwards from payment." },
  { id: "AI · 05", cluster: "Applied AI", title: "AI Agents & Automation", reality: "Your team retypes the same data between four tools daily. We automate the handoff, not the judgement." },
  { id: "SaaS · 06", cluster: "Product Engineering", title: "Multi-Tenant SaaS", reality: "Single-tenant architecture caps your growth at the first enterprise client. We build tenancy in from day one." },
  { id: "UX · 07", cluster: "Design Systems", title: "UI/UX & Design System", reality: "Every new screen looks slightly different because there is no system. We build the component library first." },
  { id: "INT · 08", cluster: "Integrations", title: "API & Systems Integration", reality: "Your CRM, accounts, and inventory don't speak. We make them exchange the right data on the right trigger." },
];

const SERVICES = [
  { n: "01", tag: "Development", title: "Web Development", link: "/services-v2/web-development" },
  { n: "02", tag: "Development", title: "Application Development", link: "/services/application-development" },
  { n: "03", tag: "Design", title: "UI/UX Design", link: "/services-v2/ui-ux-design" },
  { n: "04", tag: "Commerce", title: "E-Commerce Solutions", link: "/services/e-commerce-solutions" },
  { n: "05", tag: "Development", title: "Custom Software Development", link: "/services/custom-software-development" },
  { n: "06", tag: "Applied AI", title: "AI Development", link: "/services/ai-development" },
];

/* headline numbers — the value is the count-up target, suffix rides along */
const STATS = [
  { value: 30, suffix: "+", label: "Projects delivered" },
  { value: 5, suffix: "+", label: "Years building" },
  { value: 100, suffix: "%", label: "Source-code ownership" },
  { value: 24, suffix: "h", label: "Response time" },
];

/* same real client quotes already used on the Our Work page — reused here
   rather than inventing new placeholder testimonials */
const TESTIMONIALS = [
  { quote: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.", name: "Rajesh Patel", position: "CEO, Harmony Inc." },
  { quote: "Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.", name: "Priya Sharma", position: "Founder, Nexa Digital" },
  { quote: "Amazing team! Delivered everything on time with exceptional quality. Totally recommend!", name: "Amit Kumar", position: "CTO, PixelWave" },
  { quote: "Honestly, we were struggling to keep up with our growth until they stepped in. They didn't just build the tech; they actually understood our users. It's been a total game-changer for our workflow, and the design is just spot on.", name: "Emily Watson", position: "Director, Nova Corp" },
  { quote: "What I love most is that they don't just say 'yes' to everything — they tell us what's actually going to work. The whole process felt super collaborative, and they genuinely cared about making the project a success.", name: "Chris Taylor", position: "COO, Orbit Labs" },
];

const PRINCIPLES = [
  { key: "Delivered.", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "Our disciplined process ensures every project launches exactly when promised. Deliver before the deadline is not a slogan here — it is how the schedule is built." },
  { key: "Owned.", icon: Lock, claim: "No code you don't fully own.", body: "On completion you receive 100% ownership of the source code, with documentation and deployment details. No lock-in, no license games, no dependency on us to keep running." },
  { key: "Visible.", icon: Eye, claim: "No progress you can't see.", body: "From kickoff to delivery you always know what's happening, why it's happening, and when. Clarity builds trust, and trust is what makes the second project easier than the first." },
];

const FAQS = [
  { q: "Do you provide source code after project completion?", a: "Yes. Once the project is completed and fully paid for, you receive 100% ownership of the source code, along with documentation and deployment details." },
  { q: "What if I need changes after the project is delivered?", a: "We offer a revision window after delivery for design or functionality tweaks. For ongoing improvements, we recommend our maintenance plan." },
  { q: "What is your cancellation policy?", a: "We understand that plans can change. If you wish to cancel a project, you can do so at any stage with written notice." },
  { q: "How do you integrate AI into your solutions?", a: "We use AI to enhance performance and user experience through smart recommendations, chat automation, predictive analytics, and process optimisation." },
  { q: "How does billing work?", a: "Our billing process is simple and transparent — a detailed quotation with milestones, an upfront deposit, followed by milestone-based instalments." },
  { q: "Can you sign an NDA before starting the project?", a: "Of course. We take confidentiality seriously and are happy to sign an NDA before discussing or starting your project." },
];

/* smootherstep — takes the linear scroll fraction and softens both ends so the
   scrubbed motion doesn't start and stop abruptly */
const ease = (p) => p * p * p * (p * (p * 6 - 15) + 10);

/* Tall sticky block that shows ONE line at a time. Unlike a timed animation,
   every value here (opacity, scale, blur, backdrop position) is a direct
   function of scroll position — no CSS transition plays on its own. Scroll a
   pixel, the text moves a pixel; scroll back, it reverses. */
function ScrollSentence({ words, tone }) {
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const bgRefs = useRef([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;
    let target = 0;   // where the scrollbar says we are
    let current = 0;  // where the type actually is — chases target
    let primed = false;

    const readTarget = () => {
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const raw = (-r.top) / scrollable;
      const norm = Math.min(Math.max(raw / 0.92, 0), 0.9999);
      return norm * words.length;
    };

    // Each slot is split so the line spends MOST of it sharp and still.
    const IN_END = 0.2;
    const OUT_START = 0.8;

    const paint = (t) => {
      words.forEach((_, i) => {
        const d = Math.min(Math.max(t - i, 0), 1);
        const wordEl = wordRefs.current[i];
        const bgEl = bgRefs.current[i];

        let scale, opacity, blur;
        if (d < IN_END) {
          const p = ease(d / IN_END);
          scale = 0.78 + p * 0.22;
          opacity = p;
          blur = 5 * (1 - p);
        } else if (d <= OUT_START) {
          scale = 1;
          opacity = 1;
          blur = 0;
        } else {
          const p = ease((d - OUT_START) / (1 - OUT_START));
          scale = 1 + p * 0.22;
          opacity = 1 - p;
          blur = 6 * p;
        }

        if (wordEl) {
          wordEl.style.opacity = opacity;
          wordEl.style.transform = `translate3d(0,-50%,0) scale(${scale})`;
          wordEl.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
        if (bgEl) {
          // plain crossfade — no sliding motion, the color just blends in
          // so the change isn't visible as one panel moving over another
          const bp = ease(Math.min(d / IN_END, 1));
          bgEl.style.opacity = bp;
        }
      });
    };

    // Damped follow: each frame we close ~12% of the remaining gap. That gives
    // the motion weight — it glides into place and settles instead of snapping
    // to whatever the scrollbar reads on that exact frame.
    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.0002) {
        current = target;
        paint(current);
        running = false;
        raf = 0;
        return;
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
    <section className={`v2-sentence v2-sentence--${tone}`} ref={ref}>
      <div className="v2-sentence-sticky">
        {/* one backdrop per line — position is driven by scroll, not time */}
        <div className="v2-sentence-bgs" aria-hidden="true">
          {words.map((w, i) => (
            <span
              className="v2-sentence-bg"
              style={{ zIndex: i }}
              ref={(elm) => (bgRefs.current[i] = elm)}
              key={"bg" + i}
            />
          ))}
        </div>
        <div className="v2-sentence-words">
          {words.map((w, i) => (
            <span
              className="v2-sentence-word"
              ref={(elm) => (wordRefs.current[i] = elm)}
              key={w + i}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomepageV2() {
  const navigate = useNavigate();
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  // FAQ items' className is recomputed on every click (for the "open" class),
  // which makes React rewrite that element's className attribute — wiping out
  // an "is-in" class added imperatively by the scroll-reveal observer below.
  // Tracking revealed indices in React state instead means "is-in" is part
  // of the same JSX-driven className, so it survives every re-render.
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [activeQuote, setActiveQuote] = useState(0);
  const [quotePaused, setQuotePaused] = useState(false);

  /* testimonial auto-advance — re-armed on every change (manual click or
     auto tick), and paused while the card is hovered, so a click doesn't
     get immediately overridden mid-read */
  useEffect(() => {
    if (quotePaused) return;
    const t = setTimeout(() => {
      setActiveQuote((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearTimeout(t);
  }, [activeQuote, quotePaused]);

  const rootRef = useRef(null);
  const stripRef = useRef(null);
  const heroWordRefs = useRef([]);
  const wrLabelRefs = useRef([]);
  const flyerRefs = useRef([]);
  const workSectionRef = useRef(null);
  const workPreviewRef = useRef(null);
  const workPreviewImgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock background scroll while the mobile drawer is open, and let Escape
     close it */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  /* Every pinned heading band (Method, Work, ...) uses CSS position:sticky.
     Each one's bottom line should only show once IT is actually stuck to the
     top mid-scroll, not while sitting at rest in its normal spot. */
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

  /* Every ScrollTrigger below is created synchronously on mount, which means
     each one's "start" pixel position is calculated against whatever layout
     exists at that instant. NoiGroteskFix / Inter load asynchronously
     (index.html webfont link), and every image below the fold loads lazily —
     both reflow the page after these triggers already cached their numbers,
     leaving some rows' true trigger point stale (already passed, or never
     reached) and permanently unrevealed. One shared refresh, once real
     layout has settled, recalculates every trigger on the page at once. */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);
    // images/marquee logos etc. finish arriving well after mount; a couple of
    // trailing refreshes catches layout shift from anything still loading
    const t1 = setTimeout(refresh, 800);
    const t2 = setTimeout(refresh, 2000);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* hero intro — title lines wipe up, then supporting copy settles in */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.25 });
    tl.fromTo(q(".v2-hero-top"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 })
      .fromTo(q(".v2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".v2-hero-sub"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".v2-hero-cta"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".v2-hero-words span"),
        { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .9, stagger: .1 }, "-=.6");
    return () => tl.kill();
  }, []);

  /* THE handoff — this is not two separate texts (hero fades out, section
     fades in). It is the same three words, physically relocated: a fixed-
     position "flyer" clone travels from each hero-foot word's exact spot to
     its landing spot as a big column heading, its position/size read straight
     off getBoundingClientRect at both ends and interpolated every scroll
     frame. The real hero word and the real heading are both hidden while the
     flyer is mid-flight, so only one instance of each word is ever visible —
     it just happens to be a different element at each end of the trip. */
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
          el.style.top = (a.top + (b.top - a.top) * posP - scrollRef) + "px";
          el.style.left = (a.left + (b.left - a.left) * posP) + "px";
          el.style.fontSize = (heroFontSize[i] + (labelFontSize[i] - heroFontSize[i]) * posP) + "px";
          el.style.color = mixColor(posP);
          el.style.opacity = flyerOpacity;
        });
        heroWords.forEach((el) => { if (el) el.style.opacity = heroOpacity; });
        labels.forEach((el) => { if (el) el.style.opacity = labelOpacity; });
      },
    });

    const onResize = () => { measure(); st.refresh(); };
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(() => { measure(); st.refresh(); });
    return () => { st.kill(); window.removeEventListener("resize", onResize); };
  }, []);

  /* body copy fades in right after the heading lands, once the section pins */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = rootRef.current.querySelector(".v2-wr-pin");
      const cols = gsap.utils.toArray(".v2-wr-col", section);
      const bodies = cols.map((c) => c.querySelector(".v2-wr-body"));

      gsap.set(bodies, { opacity: 0, y: 20 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section, start: "top top", end: "+=70%",
          scrub: .7, pin: true, anticipatePin: 1,
        },
      }).to(bodies, { opacity: 1, y: 0, ease: "none", stagger: .12 });
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
          if (el.classList.contains("v2-faq-item")) {
            // route through React state instead of a direct DOM mutation —
            // see the comment on revealedFaqs above
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
      ".v2-method-row", ".v2-work-row", ".v2-principle",
      ".v2-faq-item", ".v2-quote", ".v2-cta", ".v2-pipe-node", ".v2-map-card", ".v2-strip",
      ".v2-heading", ".v2-map-headline", ".v2-label", ".v2-map-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* client strip drifts continuously, easing off while hovered */
  useEffect(() => {
    if (!stripRef.current) return;
    const tw = gsap.to(stripRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    const wrap = stripRef.current.parentElement;
    const slow = () => gsap.to(tw, { timeScale: 0.25, duration: .6, ease: "power2.out" });
    const norm = () => gsap.to(tw, { timeScale: 1, duration: .6, ease: "power2.out" });
    wrap.addEventListener("mouseenter", slow);
    wrap.addEventListener("mouseleave", norm);
    return () => {
      tw.kill();
      wrap.removeEventListener("mouseenter", slow);
      wrap.removeEventListener("mouseleave", norm);
    };
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
    const enter = (row) => {
      const src = row.dataset.thumb;
      if (src) img.src = src;
      preview.classList.add("show");
      active = true;
    };
    const leave = () => { preview.classList.remove("show"); active = false; };

    section.addEventListener("mousemove", onMove);
    const perRow = rows.map((row) => {
      const e = () => enter(row);
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

  /* FAQ accordion height animation */
  useEffect(() => {
    rootRef.current.querySelectorAll(".v2-faq-a").forEach((el, i) => {
      const inner = el.querySelector("p");
      gsap.to(el, {
        height: i === openFaq ? inner.offsetHeight : 0,
        duration: 0.55,
        ease: "power3.inOut",
      });
    });
  }, [openFaq]);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* the travelling clone of DESIGN./BUILD./SCALE. — the real hero words
          and the real section-2 headings both hide while this is in flight */}
      <div className="v2-word-flyer" aria-hidden="true">
        {DECLARATIONS.map((w, i) => (
          <span ref={(el) => (flyerRefs.current[i] = el)} key={w}>{w}</span>
        ))}
      </div>

      {/* ══════════ NAV ══════════ */}
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <a href="/preview-v2">Homepage V2</a>
            <a href="/services-v2">Services V2</a>
            <a href="/about-v2">About V2</a>
            <a href="/work-v2">Work V2</a>
            <a href="/industries-v2">Industries V2</a>
            <a href="/process-v2">Process V2</a>
            <a href="/contact-v2">Contact V2</a>
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

      {/* ══════════ 1 · HERO — Codelix's own composition ══════════ */}
      <header className="v2-hero">
        <div className="v2-hero-inner">
          <div className="v2-hero-top">
            <span className="v2-hero-status">
              <i /> Available for new projects
            </span>
            <span className="v2-hero-eyebrow">Web · App · SaaS · AI — Ahmedabad</span>
          </div>
          <h1 className="v2-hero-title">
            <span className="line"><span>Software built</span></span>
            <span className="line"><span>to outlast the</span></span>
            <span className="line"><span className="v2-hero-accent">brief.</span></span>
          </h1>
          <p className="v2-hero-sub">
            We design and build web, mobile, and AI systems for businesses that intend to
            still be running them in five years.
          </p>
          <div className="v2-hero-cta">
            <a className="v2-btn v2-btn--filled" href="/contact">
              <span>Start a project</span>
              <i className="v2-btn-arrow">→</i>
            </a>
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
        <a className="v2-hero-scroll" href="#work" aria-label="Scroll to work">
          <span>Scroll</span>
          <i />
        </a>
      </header>

      {/* ══════════ 2 · STATEMENTS (light band) — pinned while the hero's foot
          words grow into these three column heads, then releases ══════════ */}
      <section className="v2-section v2-section--gallery v2-wr-pin">
        <div className="v2-wr">
          {STATEMENTS.map((s, i) => (
            <div className="v2-wr-col" key={s.label}>
              <h2 className="v2-wr-label" ref={(el) => (wrLabelRefs.current[i] = el)}>{s.label}</h2>
              <p className="v2-wr-body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · METHOD — heading stays pinned at the top of the
          section while the numbered rows scroll past underneath it ══════════ */}
      <section className="v2-method-shell" id="method">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">Our Method.</h2>
          <p className="v2-method-lede">
            We don't begin with code. We begin with understanding what the
            business actually needs before anything is built.
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
            Thirty projects delivered across society management, enterprise ERP,
            commerce, and marketplaces.
          </p>
        </div>
        <div className="v2-method-rows">
          {WORK.map((w) => (
            <div
              className="v2-work-row"
              key={w.n}
              data-thumb={w.thumb}
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
            <a className="v2-btn" href="/work">View all work →</a>
          </div>
        </div>
        {/* floating preview — follows the cursor, swaps to the hovered row's
            screenshot; pointer devices only (wired in JS below) */}
        <div className="v2-work-preview" ref={workPreviewRef} aria-hidden="true">
          <img alt="" ref={workPreviewImgRef} />
        </div>
      </section>

      {/* ══════════ 4b · DELIVERY PIPELINE — sticky header, matches the
          reference's "Prospect Engine." layout ══════════ */}
      <section className="v2-method-shell v2-pipe-shell">
        <div className="v2-method-head v2-pipe-head">
          <p className="v2-pipe-eyebrow">System 001</p>
          <h2 className="v2-pipe-heading">Delivery Engine.</h2>
          <p className="v2-pipe-lede">
            Every qualified project moves the same way. One process that
            scopes, designs, builds, and ships without cutting a stage short.
          </p>
        </div>
        <div className="v2-method-rows v2-pipe-rows">
          <div className="v2-pipe-scroll">
            <div className="v2-pipe-rail">
              {PIPELINE.map((n, i) => (
                <React.Fragment key={n.label}>
                  <div className={`v2-pipe-node ${n.highlight ? "is-highlight" : ""}`}>
                    <span className="v2-pipe-step">{String(i + 1).padStart(2, "0")}</span>
                    <span className="v2-pipe-label"><n.icon />{n.label}</span>
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
                <span className="v2-pipe-fork-label">{n.label} forks into</span>
                <div className="v2-pipe-fork-row">
                  {n.channels.map((c) => (
                    <div className="v2-pipe-node v2-pipe-node--mini" key={c.label}>
                      <span className="v2-pipe-label"><c.icon />{c.label}</span>
                      <p className="v2-pipe-body">{c.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4c · SYSTEM MAP strip ══════════ */}
      <section className="v2-map">
        <div className="v2-map-header">
          <div>
            <div className="v2-map-label">What We Build</div>
            <h2 className="v2-map-headline">Eight system types.<br />Already proven.</h2>
          </div>
          <div>
            <p className="v2-map-body">
              Each one maps to work we have already shipped. You don't need to know which
              belongs in your business before you talk to us — that's what the first call is for.
            </p>
            <a className="v2-map-link" href="/work">See the case studies →</a>
          </div>
        </div>
        <div className="v2-map-scroll">
          <div className="v2-map-track">
            {SYSTEMS.map((s) => (
              <a className="v2-map-card" key={s.id} href="/work">
                <span className="v2-map-id">{s.id}</span>
                <span className="v2-map-cluster">{s.cluster}</span>
                <h4 className="v2-map-title">{s.title}</h4>
                <p className="v2-map-reality">{s.reality}</p>
              </a>
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
            No experimental dependencies on client work — a proven stack across
            front-end, mobile, back-end, data, and cloud.
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

      {/* ══════════ 5 · CLIENT STRIP ══════════ */}
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

      {/* ══════════ 6 · SERVICES — same sticky-header + hairline-row shell
          as Selected Work above ══════════ */}
      <section className="v2-method-shell" id="services">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">What We Provide.</h2>
          <p className="v2-method-lede">
            Six services, one delivery standard — the same process, discipline,
            and ownership handoff on every engagement.
          </p>
        </div>
        <div className="v2-method-rows">
          {SERVICES.map((s) => (
            <div className="v2-work-row" key={s.n} onClick={() => navigate(s.link)}>
              <div className="v2-work-index">{s.n}</div>
              <div>
                <div className="v2-work-tag">{s.tag}</div>
                <div className="v2-work-title">{s.title}</div>
              </div>
              <div className="v2-work-arrow">→</div>
            </div>
          ))}
          <div className="v2-work-more">
            <a className="v2-btn" href="/services-v2">View all services →</a>
          </div>
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

      {/* ══════════ 8 · TESTIMONIAL (light band) ══════════ */}
      <section className="v2-section v2-section--gallery">
        <p className="v2-label">Client Voices</p>
        <div
          className="v2-quote-card"
          onMouseEnter={() => setQuotePaused(true)}
          onMouseLeave={() => setQuotePaused(false)}
        >
          <div className="v2-quote">
            <span className="v2-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{TESTIMONIALS[activeQuote].quote}</blockquote>
            <div className="v2-quote-who">
              <span className="v2-quote-avatar">
                {TESTIMONIALS[activeQuote].name.split(" ")[0][0]}
                {TESTIMONIALS[activeQuote].name.split(" ")[1]?.[0]}
              </span>
              <p className="who">
                {TESTIMONIALS[activeQuote].name}
                <span>{TESTIMONIALS[activeQuote].position}</span>
              </p>
            </div>
            <div className="v2-quote-dots">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  className={`v2-quote-dot ${i === activeQuote ? "is-active" : ""}`}
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setActiveQuote(i)}
                />
              ))}
            </div>
          </div>
          <div className="v2-quote-stats">
            <div className="v2-quote-stat">
              <span className="v2-quote-stat-num">30+</span>
              <span className="v2-quote-stat-label">Companies trust us</span>
            </div>
            <div className="v2-quote-stat">
              <span className="v2-quote-stat-num">6</span>
              <span className="v2-quote-stat-label">Services delivered end-to-end</span>
            </div>
            <div className="v2-quote-stat">
              <span className="v2-quote-stat-num">100%</span>
              <span className="v2-quote-stat-label">Source code ownership on delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 8b · SCROLL SENTENCE (light) ══════════ */}
      <ScrollSentence words={SENTENCE_TWO} tone="light" />

      {/* ══════════ 9 · FAQ ══════════ */}
      <section className="v2-section" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Questions we're asked before every engagement.</h2>
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

      {/* ══════════ 10 · CTA ══════════ */}
      <section className="v2-section v2-section--void">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">Tell us what you're building.<br />We'll tell you how we'd build it.</h2>
          <p className="v2-cta-body">
            A structured conversation about your product — your users, your workflows, your constraints.
            We scope what should be built first, what can wait, and what it takes to ship it.
          </p>
          <a className="v2-btn" href="/contact">Book a consultation →</a>
          <p className="v2-cta-footnote">Free consultation · NDA on request · No obligation</p>
        </div>
      </section>

      {/* ══════════ FOOTER — mirrors the live site's real footer content
          (Footer.jsx): same columns, same links, same contact details, the
          "WE LIVE IN IT" marquee, and the oversized wordmark at the base ══════════ */}
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
            <a href="/industries-v2">Industries</a>
            <a href="/process-v2">Process</a>
            <a href="/contact-v2">Contact</a>
          </div>
          <div className="v2-footer-col">
            <h5>Services</h5>
            <a href="/services-v2/web-development">Web Development</a>
            <a href="/services-v2">Mobile Development</a>
            <a href="/services-v2/ui-ux-design">UI/UX Design</a>
            <a href="/services-v2">Custom Software dev.</a>
            <a href="/services-v2">E-Commerce Solutions</a>
            <a href="/services-v2">AI Development</a>
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
            <a
              className="v2-footer-address"
              href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.0095811,72.5203036,17z"
              target="_blank"
              rel="noopener noreferrer"
            >
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
