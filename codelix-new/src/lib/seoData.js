/* Nobody searches for the terms or the refund policy, but Google had no way
   to know that: they were linked from all 85 pages exactly like every other
   footer page, so the terms page ended up holding a sitelink under the brand
   query that Services or Careers should have. `follow` stays on - the pages
   are still crawled and still pass their links along, they just stop being
   candidates for the index. Privacy Policy is deliberately left indexed:
   payment processors and ad platforms sometimes check for one. */
const NOINDEX = "noindex, follow";

export const seoData = {
  /* Two titles on purpose. `title` is what Google indexes and is written around
     "it companies in ahmedabad" — 14,800 searches a month at difficulty 9,
     which the homepage already ranks 3rd for. `ogTitle` is what a person sees
     when someone shares the link on WhatsApp or LinkedIn, where a local
     keyword phrase reads as an ad and the positioning does the work instead. */
  "/": { title: "AI-Powered IT Company in Ahmedabad | Codelix IT Solutions", ogTitle: "Codelix IT Solutions — AI-Powered Web, App & Software Development", description: "Codelix IT Solutions is an IT company in Ahmedabad building custom software, web and mobile apps, ERP systems and AI solutions for businesses across India." },
  "/services": { title: "Our Services | Web & App Development | Codelix IT Solutions", description: "Explore our comprehensive suite of IT services including Web Development, App Development, UI/UX Design, AI, and Custom Software." },
  "/services/web-development": { title: "Web Development Company in Ahmedabad | Codelix", description: "Web development company in Ahmedabad building fast, scalable websites and web applications — from marketing sites to complex product platforms." },
  "/services/application-development": { title: "Application Development | iOS & Android | Codelix", description: "Custom mobile and desktop application development for iOS, Android and cross-platform — from product definition through release, testing and ongoing support." },
  "/services/ui-ux-design": { title: "UI/UX Design Services | Codelix IT Solutions", description: "User-centric UI/UX design services to elevate your digital products and user engagement." },
  "/services/e-commerce-solutions": { title: "E-Commerce Solutions | Codelix IT Solutions", description: "End-to-end e-commerce solutions to help you sell online efficiently and securely." },
  "/services/custom-software-development": { title: "Custom Software Development Company | Codelix", description: "Custom software built around how your business actually operates — ERP, CRM, internal tools and customer platforms, delivered with full source-code ownership." },
  "/services/ai-development": { title: "AI Development Services | Codelix IT Solutions", description: "Integrate powerful Artificial Intelligence into your products with our expert AI development." },
  "/services/data-analytics": { title: "Data Analytics Services | Codelix IT Solutions", description: "Turn your raw data into actionable insights with our comprehensive data analytics services." },
  "/services/support-managed-services": { title: "Support & Managed Services | Codelix IT Solutions", description: "Reliable IT support and managed services to keep your operations running smoothly." },
  "/about": { title: "About Us | Codelix IT Solutions", description: "Learn about Codelix IT Solutions, our mission, our team, and how we deliver world-class tech." },
  "/contact": { title: "Contact Us | Codelix IT Solutions", description: "Get in touch with Codelix IT Solutions to discuss your next big project." },
  "/industries": { title: "Industries We Serve | Codelix IT Solutions", description: "Discover the various industries we provide specialized IT solutions for." },
  "/process": { title: "Our Process | Codelix IT Solutions", description: "Discover our proven, transparent development process from ideation to launch." },
  "/team": { title: "Our Team | Codelix IT Solutions", description: "The engineers, designers and project leads behind Codelix IT Solutions — who actually builds your software, and how the team is put together." },
  "/work": { title: "Our Work & Case Studies | Codelix IT Solutions", description: "Shipped projects with the detail behind them — the problem, what we built, the stack we chose and the outcome, across ERP, e-commerce, SaaS and mobile." },
  "/faq": { title: "Frequently Asked Questions | Codelix IT Solutions", description: "Straight answers on how we scope, price and deliver software projects — timelines, source-code ownership, support after launch and how we work with you." },
  "/technologies": { title: "Technologies We Use | Codelix IT Solutions", description: "Explore the modern tech stack we use to build scalable, secure applications." },
  /* A viral LinkedIn hiring post on 9 July drove a 15x brand-search spike, and
     the hiring queries the site does rank for - "it company ahmedabad for
     freshers", "it companies near me hiring" - all land on the homepage rather
     than here. Names the city and the audience so this page can take them. */
  "/careers": { title: "Careers at Codelix IT Solutions — IT Jobs in Ahmedabad", description: "Open roles for developers, designers and freshers at Codelix IT Solutions in Ahmedabad. Work on web, mobile, AI and ERP projects you can point at." },
  "/pricing": { title: "Pricing | Codelix IT Solutions", description: "Transparent, flexible pricing for our professional development services." },
  "/blog": { title: "Blog | Insights & Updates | Codelix IT Solutions", description: "Read the latest insights, tech trends, and company updates on the Codelix blog." },
  "/case-study": { title: "Case Studies | Codelix IT Solutions", description: "Detailed breakdowns of software we have delivered — the constraints, the decisions we made, what we built and what changed for the client afterwards." },

  /* These had no entry and fell back to defaultSEO, so every one of them
     served the generic site description — which is why the terms page was
     showing "Craft AI-powered web, app & SaaS solutions..." as its snippet
     in search results instead of anything about the terms. */
  "/terms-of-service": { title: "Terms & Conditions | Codelix IT Solutions", robots: NOINDEX, description: "The terms covering how you may use the Codelix IT Solutions website, its content, and any third-party integrations." },
  "/privacy-policy": { title: "Privacy Policy | Codelix IT Solutions", description: "What data Codelix IT Solutions collects, how it is used and stored, and the choices you have over your information." },
  "/refund-policy": { title: "Refund & Cancellation Policy | Codelix IT Solutions", robots: NOINDEX, description: "How cancellations are handled, how billing works up to the cancellation date, and when refunds are issued." },
  "/sitemap": { title: "Sitemap | Codelix IT Solutions", description: "Every page on the Codelix IT Solutions site, grouped by services, industries, products, work and company." },
};

export const defaultSEO = {
  title: "Codelix IT Solutions | AI-Powered Web, App & SaaS Development",
  description: "Craft AI-powered web, app & SaaS solutions with world-class UI/UX design. Trusted by 25+ companies for professional development services."
};
