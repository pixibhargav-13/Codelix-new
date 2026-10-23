import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SLUG_NAMES = {
  'about': 'About',
  'work': 'Our Work',
  'services': 'Services',
  'blog': 'Blog',
  'contact': 'Contact Us',
  'terms-of-service': 'Terms of Service',
  'privacy-policy': 'Privacy Policy',
  'web-development': 'Web Development',
  'application-development': 'Application Development',
  'ui-ux-design': 'UI/UX Design',
  'e-commerce-solutions': 'E-Commerce Solutions',
  'custom-software-development': 'Custom Software Development',
  'ai-development': 'AI Development',
  'data-analytics': 'Data Analytics',
  'support-managed-services': 'Support & Managed Services',
  'industries': 'Industries',
  'products': 'Products',
  'process': 'Our Process',
  'team': 'Team',
  'pricing': 'Pricing',
  'technologies': 'Technologies',
  'careers': 'Careers',
  'sitemap': 'Sitemap',
  'faq': 'FAQ',
  'refund-policy': 'Refund Policy',
  'case-study': 'Case Studies',
  'hire-developers': 'Hire Developers',
  'react': 'React Developers',
  'nodejs': 'Node.js Developers',
  'laravel': 'Laravel Developers',
  'python': 'Python Developers',
  'flutter': 'Flutter Developers',
  'android': 'Android Developers',
  'ios': 'iOS Developers',
  'nextjs': 'Next.js Developers',
  'full-stack': 'Full-Stack Developers',
  'ai': 'AI Developers',
  'shopify': 'Shopify Developers',
  'nextgen-case-study': 'NextGen Case Study',
  'erp-case-study': 'ERP Case Study',
  'payroll-case-study': 'Payroll Case Study',
  'smart-business-case-study': 'Smart Business Case Study',
  'book-collections-case-study': 'Book Collections Case Study',
  'makhana-store-case-study': 'Makhana Store Case Study',
  'freight-shipping-case-study': 'Freight Shipping Case Study',
  'hr-portal-case-study': 'HR Portal Case Study',
  'edtech-case-study': 'EdTech Case Study',
  'modern-creative-agency-case-study': 'Modern Creative Agency Case Study',
  'elegant-creative-agency-case-study': 'Elegant Creative Agency Case Study',
  'ai-powered-design-case-study': 'AI-Powered Design Case Study',
  'car-marketplace-case-study': 'Car Marketplace Case Study',
  'school-management-case-study': 'School Management Case Study',
  'smart-society-management-case-study': 'Smart Society Management Case Study',
};

const UPPER_WORDS = new Set(['erp', 'crm', 'ai', 'api']);
const SMALL_WORDS = new Set(['in', 'and', 'of', 'for', 'the', 'to', 'vs']);

const slugToName = (slug) => {
  if (SLUG_NAMES[slug]) return SLUG_NAMES[slug];
  /* the city landing slugs read as titles: "Best ERP Development Company
     in Morbi", not "Best Erp Development Company In Morbi" */
  return slug
    .split('-')
    .map((word, i) => {
      if (UPPER_WORDS.has(word)) return word.toUpperCase();
      if (i > 0 && SMALL_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const BreadcrumbSchema = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.codelixitsolutions.com/"
    }
  ];

  let currentUrl = "https://www.codelixitsolutions.com";

  pathnames.forEach((value, index) => {
    currentUrl += `/${value}`;

    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name: slugToName(value),
      item: currentUrl
    });
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
