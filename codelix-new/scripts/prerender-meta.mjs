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
  {
    path: '/nextgen-case-study',
    title: 'NextGen Case Study | Codelix IT Solutions',
    description: 'See how Codelix IT Solutions built a next-generation digital platform with cutting-edge UI, scalable architecture, and AI-driven features.',
    keywords: 'nextgen platform case study, digital transformation, scalable web app, AI-powered platform, Codelix portfolio',
  },
  {
    path: '/erp-case-study',
    title: 'ERP Case Study | Codelix IT Solutions',
    description: 'Discover how Codelix IT Solutions delivered a comprehensive ERP system with real-time analytics, inventory management, and automated business workflows.',
    keywords: 'ERP case study, enterprise resource planning, business automation, inventory management, Codelix portfolio',
  },
  {
    path: '/payroll-case-study',
    title: 'Payroll Case Study | Codelix IT Solutions',
    description: 'Learn how Codelix IT Solutions built a smart payroll management system with automated salary processing, tax compliance, and employee self-service features.',
    keywords: 'payroll system case study, payroll management, salary automation, HR software, employee management, Codelix portfolio',
  },
  {
    path: '/smart-business-case-study',
    title: 'Smart Business Case Study | Codelix IT Solutions',
    description: 'Explore how Codelix IT Solutions created a smart business management platform with AI-powered insights, workflow automation, and data-driven decision tools.',
    keywords: 'smart business case study, business management platform, AI analytics, workflow automation, Codelix portfolio',
  },
  {
    path: '/book-collections-case-study',
    title: 'Book Collections Case Study | Codelix IT Solutions',
    description: 'See how Codelix IT Solutions designed a beautiful book collections e-commerce platform with advanced search, user reviews, and seamless checkout experience.',
    keywords: 'book store case study, e-commerce platform, online bookstore, book collections app, Codelix portfolio',
  },
  {
    path: '/makhana-store-case-study',
    title: 'Makhana Store Case Study | Codelix IT Solutions',
    description: 'Discover how Codelix IT Solutions built a premium makhana e-commerce store with brand storytelling, product catalog, and integrated payment solutions.',
    keywords: 'makhana store case study, food e-commerce, online store design, product catalog, Codelix portfolio',
  },
  {
    path: '/freight-shipping-case-study',
    title: 'Freight & Shipping Case Study | Codelix IT Solutions',
    description: 'Learn how Codelix IT Solutions developed a freight shipping management platform with real-time tracking, route optimization, and logistics automation.',
    keywords: 'freight shipping case study, logistics platform, shipment tracking, supply chain management, Codelix portfolio',
  },
  {
    path: '/hr-portal-case-study',
    title: 'HR Portal Case Study | Codelix IT Solutions',
    description: 'See how Codelix IT Solutions created an HR portal with employee onboarding, leave management, performance tracking, and team collaboration tools.',
    keywords: 'HR portal case study, human resources software, employee management, leave management, performance tracking, Codelix portfolio',
  },
  {
    path: '/edtech-case-study',
    title: 'EdTech Case Study | Codelix IT Solutions',
    description: 'Discover how Codelix IT Solutions built an EdTech platform with interactive learning modules, student progress tracking, and virtual classroom features.',
    keywords: 'EdTech case study, education technology, online learning platform, e-learning, student management, Codelix portfolio',
  },
  {
    path: '/modern-creative-agency-case-study',
    title: 'Modern Creative Agency Case Study | Codelix IT Solutions',
    description: 'See how Codelix IT Solutions designed a modern creative agency website with bold visuals, smooth animations, and portfolio showcasing for a design studio.',
    keywords: 'creative agency case study, agency website design, portfolio website, modern web design, Codelix portfolio',
  },
  {
    path: '/elegant-creative-agency-case-study',
    title: 'Elegant Creative Agency Case Study | Codelix IT Solutions',
    description: 'Explore how Codelix IT Solutions crafted an elegant creative agency website with refined typography, immersive layouts, and premium brand identity.',
    keywords: 'elegant agency case study, premium website design, brand identity, creative studio website, Codelix portfolio',
  },
  {
    path: '/ai-powered-design-case-study',
    title: 'AI-Powered Design Platform Case Study | Codelix IT Solutions',
    description: 'Discover how Codelix IT Solutions leveraged AI-powered design tools to create stunning, data-driven interfaces with intelligent layout and content generation.',
    keywords: 'AI design case study, AI-powered UI, generative design, intelligent interfaces, machine learning design, Codelix portfolio',
  },
  {
    path: '/car-marketplace-case-study',
    title: 'Car Marketplace Case Study | Codelix IT Solutions',
    description: 'Learn how Codelix IT Solutions built a car marketplace platform with advanced vehicle search, dealer management, and seamless buyer-seller connection tools.',
    keywords: 'car marketplace case study, auto marketplace, vehicle listing platform, dealer management, car sales website, Codelix portfolio',
  },
  {
    path: '/school-management-case-study',
    title: 'School Management Case Study | Codelix IT Solutions',
    description: 'See how Codelix IT Solutions developed a school management system with student enrollment, attendance tracking, grade management, and parent communication portals.',
    keywords: 'school management case study, student management system, education software, attendance tracking, school ERP, Codelix portfolio',
  },
  {
    path: '/smart-society-management-case-study',
    title: 'Smart Society Management Case Study | Codelix IT Solutions',
    description: 'Explore how Codelix IT Solutions built a smart society management app with visitor tracking, maintenance requests, billing automation, and community engagement features.',
    keywords: 'society management case study, residential management app, visitor management, maintenance tracking, smart society, Codelix portfolio',
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
