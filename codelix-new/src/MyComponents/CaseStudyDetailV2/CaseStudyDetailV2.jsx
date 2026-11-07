import React, { useEffect, useRef } from "react";
import FooterV2 from "../Shared/FooterV2";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, X, Check, Briefcase, Building2, UserPlus } from "lucide-react";
import { SEO } from "../../components/SEO";
import BreadcrumbSchema from "../../components/BreadcrumbSchema";
import { caseStudyKeywordsFor } from "../../lib/caseStudyKeywords";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./CaseStudyDetailV2.css";

/* every case study comes from Supabase and is edited in the admin panel */
import { useCaseStudies } from "./useCaseStudies";
import ArticleSkeleton from "../Shared/ArticleSkeleton";
import FullCopyReload from "../Shared/FullCopyReload";
import NotFound from "../NotFound/NotFound";
import { caseStudyCard } from "../../lib/caseStudyRow";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from '../Shared/CtaSection';
import { StructuredData } from "../../components/StructuredData";
import { fitTitle } from "../../lib/fitTitle.js";
import { caseStudySeoTitleFor } from "../../lib/seoTitles.js";
import { toISODate } from "../../lib/isoDate.js";
import { pickRelated } from "../../lib/pickRelated";
import { WORK_INDUSTRY_MAP } from "../IndustriesV2/industriesData";
import { useReplayHeroIntro } from "../../lib/heroIntro.js";
import { keepWords } from "../../lib/keepWords.js";


/* the mask-line wipe animation (shared with every other v2 hero) only
   reads correctly when each .line wraps exactly one visual line of text —
   it clips via overflow:hidden and slides the span up by a percentage of
   its own height, so a long title crammed into one .line would animate as
   one clipped blob instead of a clean per-line reveal. Case-study titles
   are long, real, and vary a lot in length, so split each one into two
   roughly-balanced halves by word count instead of hardcoding lines. */
const splitTitle = (title) => {
  const words = title.split(" ");
  if (words.length < 4) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

/* category → the core service page that sells that work. Case-study
   categories are the core service names (set in the admin panel from the
   same list). */
const CATEGORY_SERVICE = {
  "Web Development": { label: "Web Development", path: "/services/web-development" },
  "Application Development": { label: "Mobile App Development", path: "/services/application-development" },
  "UI/UX Design": { label: "UI/UX Design", path: "/services/ui-ux-design" },
  "E-Commerce Solutions": { label: "E-Commerce Development", path: "/services/e-commerce-solutions" },
  "Custom Software Development": { label: "Custom Software Development", path: "/services/custom-software-development" },
  "AI Development": { label: "AI Development", path: "/services/ai-development" },
  "Data Analytics": { label: "Data Analytics", path: "/services/data-analytics" },
};

/* tool name as written in a study's tools list → hire page slug */
const TOOL_HIRE = {
  reactjs: "react", react: "react", nodejs: "nodejs", "node.js": "nodejs",
  laravel: "laravel", django: "python", python: "python", flutter: "flutter",
  "next.js": "nextjs", shopify: "shopify", woocommerce: "shopify",
  angularjs: "angular", angular: "angular", "spring boot": "java", java: "java",
  "react native": "react-native", figma: "ui-ux-designers",
};
const HIRE_LABEL = {
  react: "React", nodejs: "Node.js", laravel: "Laravel", python: "Python",
  flutter: "Flutter", nextjs: "Next.js", shopify: "Shopify",
  angular: "Angular", java: "Java", "react-native": "React Native", "ui-ux-designers": "UI/UX",
};

/* every study carries its own category and industry (see caseStudyRow.js) */
const projectInfo = (cs) => ({ category: cs.category, industry: cs.industry });

function caseStudyHelpLinks(cs) {
  const links = [];
  const { category, industry } = projectInfo(cs);
  const service = CATEGORY_SERVICE[category];
  if (service) links.push({ ...service, icon: Briefcase, body: `The service behind this project — ${service.label.toLowerCase()} for your business.` });
  const industrySlug = Object.keys(WORK_INDUSTRY_MAP).find((k) => WORK_INDUSTRY_MAP[k] === industry);
  const industryName = FOOTER_INDUSTRY_KEYWORDS.find((k) => k.path === `/industries/${industrySlug}`)?.label;
  if (industryName) links.push({ label: `${industryName} Software`, path: `/industries/${industrySlug}`, icon: Building2, body: `More on the software we build for ${industryName.toLowerCase()} businesses.` });
  const hires = [...new Set((cs.tools || cs.tags || []).map((t) => TOOL_HIRE[String(t).toLowerCase()]).filter(Boolean))].slice(0, 2);
  hires.forEach((h) => links.push({ label: h === "ui-ux-designers" ? "Hire UI/UX Designers" : `Hire ${HIRE_LABEL[h]} Developers`, path: `/hire-developers/${h}`, icon: UserPlus, body: h === "ui-ux-designers" ? "The designers who design projects like this one." : `The ${HIRE_LABEL[h]} developers who build projects like this one.` }));
  return links;
}

/* the closing call to action, by the study's service category: someone who
   just read an ERP story is asking a different question from someone who
   read about a store redesign */
const CATEGORY_CTA = {
  "Custom Software Development": {
    line: "Still running operations on Excel and WhatsApp?",
    accent: "Book a 30-minute call.",
    body: "Tell us how the work moves today. We'll show you what one system would replace, what to build first, and send a written plan.",
  },
  "E-Commerce Solutions": {
    line: "Losing shoppers between the product page and checkout?",
    accent: "Book a 30-minute call.",
    body: "Walk us through your store. We'll point out where buyers drop off and send a written plan for fixing it.",
  },
  "Application Development": {
    line: "Need an app your users will actually open?",
    accent: "Book a 30-minute call.",
    body: "Tell us who uses it and what they need to get done. We'll scope the first version and send a written plan.",
  },
  "Web Development": {
    line: "Is your website losing leads before the first call?",
    accent: "Book a 30-minute call.",
    body: "Show us the site and who it needs to win over. We'll tell you what is costing you enquiries and send a written plan.",
  },
  "UI/UX Design": {
    line: "Does your website undersell your work?",
    accent: "Book a 30-minute call.",
    body: "Tell us who you want to win. We'll show you where the design gets in the way and send a written plan.",
  },
  default: {
    line: "Bring us the problem.",
    accent: "We'll bring back a scoped plan.",
    body: "A structured conversation about your product: your users, your workflows, your constraints. We scope what should be built first, what can wait, and what it takes to ship it.",
  },
};

export default function CaseStudyDetailV2() {
  const { slug } = useParams();
  const { studies: caseStudies, loading } = useCaseStudies();
  const cs = caseStudies.find((c) => c.slug === slug);

  
  
  

  const rootRef = useRef(null);

  

  

  /* hero intro — masked-line GSAP wipe, matching every other v2 page's
     sd2-hero (same selectors, same timeline shape). Keyed on the slug: the
     study is read again from Supabase after the prerendered copy, and a new
     object with the same content used to replay the whole intro. */
  const csKey = cs ? cs.slug : null;
  useReplayHeroIntro(rootRef, csKey);

  /* reveal-on-enter + stat count-up */
  useEffect(() => {
    if (!cs) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(
      ".csd2-outcomes, .csd2-cs, .csd2-more, .v2-cta, .v2-heading, .v2-label, .v2-lede, .sd2-bench, " +
      ".csd2-snapshot, .csd2-features, .csd2-whystack, .v2-method-row, .sd2-quote, " +
      ".csd2-ledger, .csd2-roadmap, .csd2-issues"
    ).forEach((el) => io.observe(el));

    const nums = rootRef.current?.querySelectorAll(".sd2-bench-value") || [];
    const runNum = (el) => {
      const target = Number(el.dataset.target);
      const isDecimal = target % 1 !== 0;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = isDecimal
          ? (target * eased).toFixed(1)
          : Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const numIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        runNum(e.target);
        numIo.unobserve(e.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );
    nums.forEach((n) => numIo.observe(n));

    return () => { io.disconnect(); numIo.disconnect(); };
  }, [cs]);

  /* same reasoning as the blog detail page: don't call it missing until the
     Supabase read has settled, or an admin-published study opens with a flash
     of the error screen */
  if ((!cs || cs.partial) && loading) return <ArticleSkeleton label="Loading case study" />;
  if (cs?.partial) return <FullCopyReload label="Loading case study" />;

  /* unknown slugs reach here through the vercel.json rewrite with a 200 —
     NotFound's noindex keeps them out of the index (see BlogDetailV2) */
  if (!cs) return <NotFound />;

  const projects = caseStudies.map(caseStudyCard);
  const more = pickRelated(
    projects,
    projects.findIndex((p) => p.slug === cs.slug),
    3,
    (p) => (p.category === projectInfo(cs).category ? 1 : 0),
  );
  const helpLinks = caseStudyHelpLinks(cs);
  /* At a glance: the three facts a visitor looks for first, from fields
     every study has. The hero used to repeat the tools list as chips, which
     the Tools section below already shows. */
  const industrySlug = Object.keys(WORK_INDUSTRY_MAP).find((k) => WORK_INDUSTRY_MAP[k] === cs.industry);
  const industryLabel = FOOTER_INDUSTRY_KEYWORDS.find((k) => k.path === `/industries/${industrySlug}`)?.label || cs.industry;
  const glance = [
    industryLabel && ["Industry", industryLabel],
    cs.category && ["Service", CATEGORY_SERVICE[cs.category]?.label || cs.category],
    (cs.tools || cs.tags || []).length > 0 && ["Built with", (cs.tools || cs.tags).slice(0, 3).join(", ")],
  ].filter(Boolean);
  /* the snapshot (client, industry, service, platform, stack) replaces the
     derived facts when a study has one */
  const glanceRows = cs.snapshot ? cs.snapshot.map((x) => [x.label, x.value]) : glance;

  /* the story in the order a buyer reads it: the overview's paragraphs are
     [summary, situation before, what we built, result]; a short overview
     falls back to the first paragraph as the "before" */
  const overview = cs.overview || [];
  const beforeText = overview.length >= 3 ? overview[1] : overview[0];
  const builtParas = overview.length >= 3 ? overview.slice(2) : overview.slice(1);
  const pairs = Array.from({ length: Math.max(cs.challenges?.length || 0, cs.solutions?.length || 0) }, (_, i) => [cs.challenges?.[i], cs.solutions?.[i]]);
  const cta = CATEGORY_CTA[cs.category] || CATEGORY_CTA.default;

  return (
    <div className="v2" ref={rootRef}>
      <BreadcrumbSchema lastName={cs.title} />
      <SEO
        title={caseStudySeoTitleFor(cs.slug) || fitTitle(cs.title, [" | Case Study | Codelix", " | Codelix"])}
        ogTitle={cs.title}
        description={cs.description || `Read about how we solved ${cs.title} at Codelix IT Solutions.`}
        keywords={caseStudyKeywordsFor(cs.slug, cs.tags)}
        image={cs.coverImage}
        type={cs.publishedAt ? "article" : undefined}
        publishedTime={toISODate(cs.publishedAt)}
        modifiedTime={toISODate(cs.updatedAt) || toISODate(cs.publishedAt)}
      />
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>
      <StructuredData type="Article" data={cs} />

      
      

      {/* ══════════ 1 · HERO — same sd2-hero shell as every other v2 page
          (background treatment, mask-line title wipe, status pill, CTA
          row), not a bespoke layout. ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/case-study">Case Studies</Link>
                <span>/</span>
                <em>{cs.title}</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Case Study{cs.isConcept ? " · Concept" : ""}</span>
              </div>
              <h1 key={slug} className="sd2-hero-title csd2-title">
                {/* the separator matters: without a whitespace text node
                    between the lines the extracted title concatenates — Google
                    was indexing "Marketplace forBuying & Selling Cars" */}
                {splitTitle(cs.title).map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 ? " " : null}
                    <span className="line"><span>{keepWords(part)}</span></span>
                  </React.Fragment>
                ))}
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{cs.description}</p>
              {glanceRows.length > 0 && (
                <dl className={`csd2-glance sv2-hero-reveal${cs.snapshot ? " csd2-glance--snapshot" : ""}`}>
                  {glanceRows.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {cs.isConcept && (
                <p className="csd2-concept-note">
                  This is a concept exploration, not a live client build — shown here honestly as design work, not a deployed product.
                </p>
              )}
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Start a similar project</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <Link className="v2-hero-secondary" to="/case-study">
                  <ArrowLeft size={15} strokeWidth={2} />
                  <span className="v2-hero-secondary-label">All case studies</span>
                </Link>
              </div>
            </div>

            {cs.image && (
              <div className="csd2-hero-media sv2-hero-reveal">
                {/* the hero art is the largest thing on the page and the heaviest
                    request on the site - the biggest is 2.4 MB. Chrome does
                    boost the first large in-viewport image on its own, but only
                    once layout has told it the image is in view; saying so up
                    front means it is not queued behind the rest. */}
                <img src={cs.image} alt={cs.title} fetchPriority="high" decoding="async" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ══════════ 1c · RESULTS — straight after the hero, because the
          numbers are what a visitor came to check; shown as large figures
          (the small rings were hard to read at a glance) ══════════ */}
      {cs.outcomes?.length > 0 && (
        <section className="v2-section v2-section--void" id="outcomes">
          <p className="v2-label">The Results</p>
          <h2 className="v2-heading">What changed after launch.</h2>
          <div className="csd2-outcomes csd2-results">
            {cs.outcomes.slice(0, 3).map((o, i) => (
              <div className="csd2-result" key={i}>
                <span className="csd2-result-num">
                  <span className="sd2-bench-value" data-target={o.value}>{o.value}</span>
                  <span className="csd2-result-suffix">{o.suffix}</span>
                </span>
                <span className="csd2-result-label">{o.label}</span>
                {o.note && <span className="csd2-result-note">{o.note}</span>}
              </div>
            ))}
          </div>
          {cs.resultsNote && <p className="csd2-results-note">{cs.resultsNote}</p>}
        </section>
      )}

      {/* ══════════ 2 · OVERVIEW ══════════
          Business Objectives was dropped from here — it restated the same
          points as The Challenges / The Solutions below almost 1:1 (e.g.
          "give leadership real-time visibility" appeared as an objective,
          a challenge, and a solution). Challenges → Solutions already
          carries that story more concretely, so this cuts the repeat
          instead of trimming the more specific pair. ══════════ */}
      {/* two columns on desktop: the heading and lead paragraph stay in
          view on the left while the rest reads as numbered blocks on the
          right — as one long column it left half the screen empty */}
      {beforeText && (
        <section className="v2-section" id="before">
          <div className="csd2-brief">
            <div className="csd2-brief-head">
              <p className="v2-label">The Situation Before</p>
              <h2 className="v2-heading">Where they started.</h2>
            </div>
            <p className="csd2-overview-lead csd2-before">{beforeText}</p>
          </div>
        </section>
      )}

      {/* every problem next to what was done about it, row by row: as two
          separate lists the reader had to match them up */}
      {pairs.length > 0 && (
        <section className="v2-section v2-section--void" id="challenges">
          <p className="v2-label">Problem → What We Did</p>
          <h2 className="v2-heading">What was broken, and how we fixed it.</h2>
          <div className="csd2-pairs" role="table" aria-label="Problems and what we did about each">
            <div className="csd2-pair csd2-pair--head" role="row">
              <span role="columnheader">The problem</span>
              <span role="columnheader">What we did</span>
            </div>
            {pairs.map(([problem, fix], i) => (
              <div className="csd2-pair" role="row" key={i}>
                <div className="csd2-pair-cell csd2-pair-cell--problem" role="cell">
                  <span className="csd2-issue-icon"><X size={13} strokeWidth={2.6} /></span>
                  <span className="csd2-issue-n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{problem}</p>
                </div>
                <div className="csd2-pair-cell csd2-pair-cell--fix" role="cell">
                  <span className="csd2-issue-icon"><Check size={13} strokeWidth={2.6} /></span>
                  <p>{fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {cs.challengeImages && (
        <div className="csd2-duo">
          {cs.challengeImages.map((img, i) => (
            <div className="csd2-duo-frame" key={i}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      )}

      {builtParas.length > 0 && (
        <section className="v2-section" id="overview">
          <div className="csd2-brief">
            <div className="csd2-brief-head">
              <p className="v2-label">What We Built</p>
              <h2 className="v2-heading">How the build came together.</h2>
            </div>
            <ol className="csd2-brief-body">
              {builtParas.map((p, i) => (
                <li key={i}>
                  <span className="csd2-brief-n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ══════════ 3 · DELIVERY PROCESS — reuses the same sticky-header
          method-row pattern already proven on the service pages, rather
          than inventing a new timeline component from scratch. Sits right
          after the problem/solution so "how we built it" reads before
          "what happened after launch." ══════════ */}
      {cs.process && (
        <section className="v2-method-shell" id="process">
          <div className="v2-method-head">
            <h2 className="v2-method-heading">How We Delivered It.</h2>
            <p className="v2-method-lede">
              The phase-by-phase path from discovery to go-live.
            </p>
          </div>
          <div className="v2-method-rows">
            {cs.process.map((m, i) => (
              <div className="v2-method-row" key={i}>
                <div className="v2-method-index">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="v2-method-title">{m.phase}</div>
                  <span className="v2-method-timeframe">{m.time}</span>
                </div>
                <div className="v2-method-body">{m.body}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 4a · SERVICES DELIVERED ══════════ */}
      {cs.services && (
        <section className="v2-section v2-section--void" id="services-delivered">
          <p className="v2-label">Services Delivered</p>
          <h2 className="v2-heading">What we were engaged to do.</h2>
          <div className="csd2-ledger">
            {cs.services.map((s, i) => (
              <div className="csd2-ledger-row" key={i}>
                <span className="csd2-ledger-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="csd2-ledger-text">{s}</span>
                <span className="csd2-ledger-icon"><Check size={13} strokeWidth={2.6} /></span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 4b · CORE FEATURES ══════════ */}
      {cs.features && (
        <section className="v2-section" id="features">
          <p className="v2-label">Also In The Build</p>
          <h2 className="v2-heading">More of what shipped.</h2>
          <div className="csd2-features">
            {cs.features.map((f, i) => (
              <div className="csd2-feature" key={i}>
                <div className="csd2-feature-top">
                  <span className="csd2-feature-icon"><Check size={14} strokeWidth={2.6} /></span>
                  <span className="csd2-feature-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 5 · TOOLS ══════════ */}
      {/* a slim strip, not a full section: a large heading over one row of
          chips read as an empty block, and the main tools are already in
          At a glance at the top */}
      <section className="v2-section v2-section--void csd2-tools-strip" id="tools">
        <div className="csd2-tools-row">
          <h2 className="csd2-tools-title">Tools &amp; technologies</h2>
        <div className="csd2-tools">
          {cs.tools.map((t) => (
            <span key={t}>
              <i className="csd2-tools-avatar" aria-hidden="true">{t.charAt(0)}</i>
              {t}
            </span>
          ))}
        </div>
        </div>

        {cs.whyStack && (
          <div className="csd2-whystack">
            <p className="csd2-whystack-label">Why this stack</p>
            <ul>
              {cs.whyStack.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* ══════════ 5b · FUTURE SCALABILITY ══════════ */}
      {cs.scalability && (
        <section className="v2-section" id="scalability">
          <p className="v2-label">Built To Grow</p>
          <h2 className="v2-heading">Where this goes from here.</h2>
          <div className="csd2-roadmap">
            {cs.scalability.map((s, i) => (
              <div className="csd2-roadmap-item" key={i}>
                <span className="csd2-roadmap-marker">{String(i + 1).padStart(2, "0")}</span>
                <div className="csd2-roadmap-card">
                  <p>{s}</p>
                  <span className="csd2-roadmap-arrow"><ArrowUpRight size={15} strokeWidth={2} /></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 5c · CLIENT TESTIMONIAL ══════════ */}
      {cs.quote && (
        <section className="v2-section">
          <figure className="sd2-quote">
            <span className="sd2-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="sd2-quote-text">{cs.quote.text}</blockquote>
            <figcaption className="sd2-quote-by">
              {cs.quote.name && <span className="sd2-quote-name">{cs.quote.name}</span>}
              <span className="sd2-quote-role">{cs.quote.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      {/* ══════════ 5b · RELATED SERVICES — the service, sector and hire
          pages behind this project. A case study is the strongest proof on
          the site; linking it to the pages that sell the same work is what
          lets that proof count for them. ══════════ */}
      {helpLinks.length > 0 && (
        <section className="v2-section v2-section--void" id="related-services">
          <p className="v2-label">Related Services</p>
          <h2 className="v2-heading">Need something like this built?</h2>
          <div className="sd2-other-list">
            {helpLinks.map((l, i) => (
              <Link className="sd2-other is-in" to={l.path} key={l.path}>
                <div className="sd2-other-top">
                  <span className="sd2-other-icon"><l.icon size={17} strokeWidth={1.5} /></span>
                  <span className="sd2-other-n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="sd2-other-title">{l.label}</span>
                <p className="sd2-other-body">{l.body}</p>
                <span className="sd2-other-go">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 6 · MORE CASE STUDIES ══════════ */}
      <section className="v2-section" id="more">
        <p className="v2-label">More Work</p>
        <h2 className="v2-heading">Other real projects.</h2>
        <div className="csd2-more">
          {more.map((p) => (
            <Link className="csd2-more-card" to={`/case-study${p.href}`} key={p.id}>
              <div className="csd2-more-media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="csd2-more-body">
                <h3>{p.title}</h3>
                <div className="csd2-more-tags">
                  {p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              <span className="csd2-more-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · CTA ══════════ */}
      <CtaSection className="v2-section--void  csd2-cta-shell">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            {cta.line}
            <br />
            <span className="v2-cta-accent">{cta.accent}</span>
          </h2>
          <p className="v2-cta-body">{cta.body}</p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      </main>

            <FooterV2 />
    </div>
  );
}
