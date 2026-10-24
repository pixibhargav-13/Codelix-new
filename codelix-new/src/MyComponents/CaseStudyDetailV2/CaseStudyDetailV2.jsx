import React, { useEffect, useRef } from "react";
import FooterV2 from "../Shared/FooterV2";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
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
import NotFound from "../NotFound/NotFound";
import { caseStudyCard } from "../../lib/caseStudyRow";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from '../Shared/CtaSection';
import { StructuredData } from "../../components/StructuredData";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";
import { fitTitle } from "../../lib/fitTitle.js";
import { caseStudySeoTitleFor } from "../../lib/seoTitles.js";
import { toISODate } from "../../lib/isoDate.js";
import { pickRelated } from "../../lib/pickRelated";
import { WORK_INDUSTRY_MAP } from "../IndustriesV2/industriesData";


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
  useEffect(() => {
    if (!csKey) return;
    const q = (s) => rootRef.current.querySelectorAll(s);
    splitTitleLinesIn(rootRef.current, ".sd2-hero-title");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".csd2-tags.sv2-hero-reveal"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8 }, "-=.7")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".csd2-hero-media.sv2-hero-reveal"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=.9");
    return () => tl.kill();
  }, [csKey]);

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
  if (!cs && loading) return <ArticleSkeleton label="Loading case study" />;

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
                {/* the separator matters: .line is display:block so this reads
                    as two lines either way, but without a whitespace text node
                    between them the extracted title concatenates — Google was
                    indexing "Marketplace forBuying & Selling Cars" */}
                {splitTitle(cs.title).map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 ? " " : null}
                    <span className="line"><span>{part}</span></span>
                  </React.Fragment>
                ))}
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{cs.description}</p>
              <div className="csd2-tags sv2-hero-reveal">
                {cs.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
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

      {/* ══════════ 1b · SNAPSHOT — only present on richer, fully-briefed
          case studies; older entries without this data simply skip it. ══ */}
      {cs.snapshot && (
        <section className="v2-section v2-section--void" id="snapshot">
          <p className="v2-label">Engagement at a Glance</p>
          <h2 className="v2-heading">The project, in numbers.</h2>
          <div className="csd2-snapshot">
            {cs.snapshot.map((s, i) => (
              <div className="csd2-snapshot-item" key={i}>
                <span className="csd2-snapshot-k">{s.label}</span>
                <span className="csd2-snapshot-v">{s.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 2 · OVERVIEW ══════════
          Business Objectives was dropped from here — it restated the same
          points as The Challenges / The Solutions below almost 1:1 (e.g.
          "give leadership real-time visibility" appeared as an objective,
          a challenge, and a solution). Challenges → Solutions already
          carries that story more concretely, so this cuts the repeat
          instead of trimming the more specific pair. ══════════ */}
      <section className="v2-section" id="overview">
        <p className="v2-label">Project Overview</p>
        <div className="csd2-overview">
          {cs.overview.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* ══════════ 2a-i · CHALLENGE IMAGES — two illustrative diagrams
          side by side, giving the problem section a visual anchor before
          the reader hits the text list. ══════════ */}
      {cs.challengeImages && (
        <div className="csd2-duo">
          {cs.challengeImages.map((img, i) => (
            <div className="csd2-duo-frame" key={i}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      )}

      {/* ══════════ 2b · CHALLENGES / SOLUTIONS — placed right after the
          objectives so a reader hits problem-then-solution before the
          results and delivery process, matching how the story actually
          unfolded rather than leading with the numbers. Each point gets
          its own row with a colored icon (red = problem, green = fixed)
          instead of a wall of prose paragraphs. ══════════ */}
      <section className="v2-section" id="challenges">
        <div className="csd2-challenges-grid">
          <div className="csd2-challenges-col">
            <p className="v2-label">The Challenges</p>
            <h2 className="v2-heading">The problem we faced.</h2>
            <div className="csd2-issues csd2-issues--problem">
              {cs.challenges.map((p, i) => (
                <div className="csd2-issue-row" key={i}>
                  <span className="csd2-issue-icon"><X size={13} strokeWidth={2.6} /></span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="csd2-challenges-col">
            <p className="v2-label">The Solutions</p>
            <h2 className="v2-heading">What we built instead.</h2>
            <div className="csd2-issues csd2-issues--solution">
              {cs.solutions.map((p, i) => (
                <div className="csd2-issue-row" key={i}>
                  <span className="csd2-issue-icon"><Check size={13} strokeWidth={2.6} /></span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      {/* ══════════ 3b · OUTCOMES ══════════ */}
      <section className="v2-section v2-section--void" id="outcomes">
        <p className="v2-label">Project Outcomes</p>
        <h2 className="v2-heading">The results, measured after launch.</h2>
        <p className="v2-lede">Four numbers that summarize what changed once the system went live.</p>
        <div className="csd2-outcomes">
          {cs.outcomes.map((o, i) => {
            const R = 52;
            const C = 2 * Math.PI * R;
            const ring = Math.min(o.value, 100);
            const offset = C - (C * ring) / 100;
            return (
              <div className="sd2-bench" key={i}>
                <div className="sd2-bench-ring">
                  <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                    <defs>
                      <linearGradient id={`csd2-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                        <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                      </linearGradient>
                    </defs>
                    <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                    <circle
                      className="sd2-bench-ring-fill"
                      cx="60" cy="60" r={R}
                      stroke={`url(#csd2-grad-${i})`}
                      style={{ "--c": C, "--ring-offset": offset }}
                    />
                  </svg>
                  <div className="sd2-bench-num">
                    <span className="sd2-bench-value" data-target={o.value}>{o.value}</span>
                    <span className="sd2-bench-suffix">{o.suffix}</span>
                  </div>
                </div>
                <div className="sd2-bench-label">{o.label}</div>
              </div>
            );
          })}
        </div>
        {cs.resultsNote && <p className="csd2-results-note">{cs.resultsNote}</p>}
      </section>

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
          <p className="v2-label">Core Features</p>
          <h2 className="v2-heading">What shipped inside the system.</h2>
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
      <section className="v2-section v2-section--void" id="tools">
        <p className="v2-label">Tools & Technologies</p>
        <h2 className="v2-heading">What this project was built with.</h2>
        <div className="csd2-tools">
          {cs.tools.map((t) => (
            <span key={t}>
              <i className="csd2-tools-avatar" aria-hidden="true">{t.charAt(0)}</i>
              {t}
            </span>
          ))}
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
            Bring us the problem.
            <br />
            <span className="v2-cta-accent">We'll bring back a scoped plan.</span>
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your product — your users, your workflows, your constraints.
            We scope what should be built first, what can wait, and what it takes to ship it.
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
