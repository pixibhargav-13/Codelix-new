import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Human-readable names for URL slugs (auto-generated names are ugly for abbreviations)
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

// Fallback: convert slug to title case (e.g. "new-page" → "New Page")
const slugToName = (slug) => {
  if (SLUG_NAMES[slug]) return SLUG_NAMES[slug];
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const BreadcrumbSchema = () => {
  const location = useLocation();

  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);

    // 1. Remove the old script if it exists so we don't have duplicates
    const existingScript = document.getElementById('dynamic-breadcrumb-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // 2. If we are on the homepage, do nothing (no breadcrumbs)
    if (pathnames.length === 0) {
      return;
    }

    // 3. Build the schema array
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

    // 4. Create and inject the new script at the VERY TOP of the head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-breadcrumb-schema';
    script.text = JSON.stringify(schema);

    // Insert it at the top of <head> so you don't have to scroll past injected CSS
    document.head.insertBefore(script, document.head.firstChild);

    // 5. Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('dynamic-breadcrumb-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname]);

  return null;
};

export default BreadcrumbSchema;
