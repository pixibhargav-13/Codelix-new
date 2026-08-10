// Post-build step: generates a static index.html per route with its own
// <title>, meta description/keywords, canonical, and OG/Twitter tags baked
// directly into the HTML. This fixes duplicate canonical/meta tags for
// crawlers and tools that read raw HTML without executing JavaScript.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const siteUrl = 'https://www.codelixitsolutions.com';

const routes = [
  {
    path: '/',
    title: 'Codelix IT Solutions | AI-Powered Web, App & SaaS Development Services',
    description: 'Craft AI-powered web, app & SaaS solutions with world-class UI/UX design. Trusted by 25+ companies for web development, mobile apps, and custom software.',
    keywords: 'web development, app development, SaaS solutions, UI/UX design, AI technology, software development',
  },
  {
    path: '/about',
    title: 'About Codelix IT Solutions | AI-Powered Development Team',
    description: 'Learn about Codelix - your partner in building AI-powered web, app, and SaaS solutions with cutting-edge technology and exceptional design.',
    keywords: 'about codelix, development team, company information, our story',
  },
  {
    path: '/work',
    title: 'Our Work | Portfolio | AI-Driven Projects | Codelix IT Solutions',
    description: 'Explore our portfolio of AI-driven web apps, mobile solutions, and SaaS platforms. See how we deliver elegant design and exceptional performance.',
    keywords: 'portfolio, case studies, web development projects, app development, project showcase',
  },
  {
    path: '/services',
    title: 'Our Services | Web, App, AI & Software Development | Codelix IT Solutions',
    description: "Explore Codelix IT Solutions' full range of services - web development, mobile & desktop apps, UI/UX design, e-commerce, custom software, and AI development.",
    keywords: 'software development services, web development company, app development services, AI development, UI/UX design, e-commerce solutions, custom software development',
  },
  {
    path: '/services/web-development',
    title: 'Web Development Services | Custom Web Solutions | Codelix IT Solutions',
    description: 'Professional web development services combining modern design, optimized coding, and intelligent automation for high-performance websites and applications.',
    keywords: 'web development, web design, custom web solutions, professional web services, responsive design, modern websites',
  },
  {
    path: '/services/application-development',
    title: 'Application Development Services | Mobile & Desktop Apps | Codelix IT Solutions',
    description: 'Expert application development services for mobile and desktop platforms. We build scalable, high-performance applications using cutting-edge technologies and best practices.',
    keywords: 'application development, mobile app development, desktop applications, cross-platform apps, software development',
  },
  {
    path: '/services/ui-ux-design',
    title: 'UI/UX Design Services | User Experience Design | Codelix IT Solutions',
    description: 'Professional UI/UX design services that create intuitive, beautiful, and user-centered digital experiences. We design interfaces that users love and businesses trust.',
    keywords: 'UI design, UX design, user interface design, user experience, digital design, interface design',
  },
  {
    path: '/services/e-commerce-solutions',
    title: 'E-Commerce Solutions | Online Store Development | Codelix IT Solutions',
    description: 'Complete e-commerce solutions that drive sales and growth. We build secure, scalable online stores with seamless payment integration and exceptional user experiences.',
    keywords: 'e-commerce development, online store, ecommerce solutions, shopping cart, payment integration, online retail',
  },
  {
    path: '/services/custom-software-development',
    title: 'Custom Software Development | Tailored Solutions | Codelix IT Solutions',
    description: 'Bespoke software development services tailored to your unique business needs. We build custom solutions that streamline operations, improve efficiency, and drive growth.',
    keywords: 'custom software development, bespoke software, enterprise software, business software, tailored solutions',
  },
  {
    path: '/services/ai-development',
    title: 'AI Development Services | Artificial Intelligence Solutions | Codelix IT Solutions',
    description: 'Cutting-edge AI development services that leverage machine learning, natural language processing, and intelligent automation to transform your business operations.',
    keywords: 'AI development, artificial intelligence, machine learning, NLP, intelligent automation, AI solutions',
  },
  {
    path: '/services/data-analytics',
    title: 'Data Analytics & Business Intelligence | Codelix IT Solutions',
    description: 'Data engineering, business intelligence, and predictive analytics services that turn raw data into decisions your team can actually trust.',
    keywords: 'data analytics, business intelligence, predictive analytics, data engineering, BI dashboards',
  },
  {
    path: '/services/support-managed-services',
    title: 'Support & Managed Services | Codelix IT Solutions',
    description: 'Cloud infrastructure, migration, security, and dedicated development teams — ongoing support for software already in production.',
    keywords: 'managed services, cloud infrastructure, cloud migration, dedicated development team, security maintenance',
  },
  {
    path: '/industries',
    title: 'Industries We Serve | Codelix IT Solutions',
    description: 'Software built for how your sector actually operates — manufacturing, fintech, healthcare, e-commerce, and 7 more industries with real repeat experience.',
    keywords: 'industries, sector expertise, manufacturing software, fintech software, healthcare software, e-commerce development',
  },
  {
    path: '/team',
    title: 'Our Team | Codelix IT Solutions',
    description: 'The people behind what Codelix ships — every project scoped and delivered by the founders themselves, not handed off to anonymous contractors.',
    keywords: 'about the team, codelix founders, development team, software studio',
  },
  {
    path: '/process',
    title: 'Our Process | How We Build | Codelix IT Solutions',
    description: 'How a Codelix engagement actually runs, from discovery call to launch — fixed scope, fixed price, full source-code ownership.',
    keywords: 'development process, software delivery process, project workflow, discovery to launch',
  },
  {
    path: '/pricing',
    title: 'Pricing | Codelix IT Solutions',
    description: 'Transparent, fixed-scope pricing for web, app, and AI development engagements — no hourly guesswork.',
    keywords: 'software development pricing, fixed price development, project cost, pricing plans',
  },
  {
    path: '/technologies',
    title: 'Technologies We Use | Codelix IT Solutions',
    description: 'The real, current tech stack behind every Codelix build — chosen per project, not by habit.',
    keywords: 'tech stack, technologies, development tools, frameworks, programming languages',
  },
  {
    path: '/careers',
    title: 'Careers | Join Codelix IT Solutions',
    description: 'Open roles at Codelix IT Solutions — join a small team shipping real client work and in-house products.',
    keywords: 'careers, jobs, hiring, software developer jobs, join codelix',
  },
  {
    path: '/faq',
    title: 'FAQ | Codelix IT Solutions',
    description: 'Straight answers to the questions people actually ask before working with Codelix — pricing, ownership, timelines, and process.',
    keywords: 'faq, frequently asked questions, software development questions, pricing questions',
  },
  {
    path: '/sitemap',
    title: 'Sitemap | Codelix IT Solutions',
    description: 'Every page on the Codelix IT Solutions site, in one place.',
    keywords: 'sitemap, site navigation, all pages',
  },
  {
    path: '/refund-policy',
    title: 'Refund Policy | Codelix IT Solutions',
    description: "Read Codelix's Refund Policy to understand our terms around project cancellations and refunds.",
    keywords: 'refund policy, cancellation policy, project refund terms',
  },
  {
    path: '/products/audytee',
    title: 'Audytee | Practice Management Software | Codelix IT Solutions',
    description: 'Audytee — practice management software built for Indian CA firms, with AI automation, compliance tracking, and client management in one platform.',
    keywords: 'audytee, CA practice management software, chartered accountant software, compliance tracking',
  },
  {
    path: '/products/4bitx',
    title: '4bitx | Custom ERP for Every Industry | Codelix IT Solutions',
    description: '4bitx — a custom-built ERP platform connecting every part of your factory or business, engineered per industry rather than sold off the shelf.',
    keywords: '4bitx, custom ERP, manufacturing ERP, industrial ERP software',
  },
  {
    path: '/products/aanganone',
    title: 'AanganOne | Society Management App | Codelix IT Solutions',
    description: 'AanganOne — smart living software for modern residential societies, apartments, and communities.',
    keywords: 'aanganone, society management app, apartment management software, community management',
  },
  {
    path: '/blog',
    title: 'Blog | Tech Insights & Development Tips | Codelix IT Solutions',
    description: 'Discover the latest in web development, app development, AI technology, and design trends. Expert insights from the Codelix team.',
    keywords: 'blog, tech blog, development tips, web development insights, coding tutorials',
  },
  {
    path: '/contact',
    title: 'Contact Us | Get a Free Quote | Codelix IT Solutions',
    description: "Ready to build something amazing? Contact Codelix for a free consultation. We're here to help with your web, app, or SaaS project.",
    keywords: 'contact us, free quote, consultation, web development inquiry, get in touch',
  },
  {
    path: '/terms-of-service',
    title: 'Terms & Conditions | Codelix IT Solutions',
    description: "Read Codelix's Terms & Conditions to understand how you may use our site, services, and content.",
    keywords: 'terms and conditions, terms of service, user agreement, website terms',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Codelix IT Solutions',
    description: "Read Codelix's Privacy Policy to understand how we collect, use, and protect your personal information.",
    keywords: 'privacy policy, data protection, privacy, data usage',
  },
  {
    path: '/case-study',
    title: 'Case Study | Codelix IT Solutions',
    description: "Browse Codelix IT Solutions' portfolio of real-world case studies — from ERP and HR systems to e-commerce, EdTech, and AI-powered platforms.",
    keywords: 'case studies, project portfolio, client work, software development case studies, web app projects, Codelix portfolio',
  },
];

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function setTagContent(html, regex, replacement) {
  return html.replace(regex, replacement);
}

for (const route of routes) {
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);
  const keywords = escapeAttr(route.keywords);

  let html = template;

  html = setTagContent(html, /<title>.*?<\/title>/, `<title>${title}</title>`);
  html = setTagContent(html, /(<meta id="meta-description"[^>]*content=")[^"]*(")/, `$1${description}$2`);
  html = setTagContent(html, /(<meta id="meta-keywords"[^>]*content=")[^"]*(")/, `$1${keywords}$2`);
  html = setTagContent(html, /(<link rel="canonical" id="meta-canonical" href=")[^"]*(")/, `$1${canonical}$2`);
  html = setTagContent(html, /(<meta id="meta-og-url"[^>]*content=")[^"]*(")/, `$1${canonical}$2`);
  html = setTagContent(html, /(<meta id="meta-og-title"[^>]*content=")[^"]*(")/, `$1${title}$2`);
  html = setTagContent(html, /(<meta id="meta-og-description"[^>]*content=")[^"]*(")/, `$1${description}$2`);
  html = setTagContent(html, /(<meta id="meta-tw-title"[^>]*content=")[^"]*(")/, `$1${title}$2`);
  html = setTagContent(html, /(<meta id="meta-tw-description"[^>]*content=")[^"]*(")/, `$1${description}$2`);

  if (route.path === '/') {
    writeFileSync(join(distDir, 'index.html'), html);
  } else {
    const dir = join(distDir, route.path.replace(/^\//, ''));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }
}

console.log(`Prerendered metadata for ${routes.length} routes.`);
