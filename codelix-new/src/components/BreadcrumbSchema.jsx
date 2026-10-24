import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS, FOOTER_PRODUCTS, FOOTER_HIRE } from '../MyComponents/HomepageV2/footerData';

/* Breadcrumb names are what Google shows in a result's URL line, so they
   should be the page's real name. Built from the slug, they came out as
   "B2b Saas", "Ux Research Design Systems" or "Design System Component Based
   Uis Efficiency At Scale". Every service, industry, product and hire page is
   already named in the footer lists, so those names are used by full path;
   a blog post or case study passes its own headline as `lastName`. The slug
   is only the fallback. */
const PATH_NAMES = Object.fromEntries(
  [...FOOTER_ALL_SERVICES, ...FOOTER_INDUSTRY_KEYWORDS, ...FOOTER_PRODUCTS, ...FOOTER_HIRE]
    .map(({ label, path }) => [path, label])
);

const SLUG_NAMES = {
  'about': 'About',
  'work': 'Our Work',
  'services': 'Services',
  'blog': 'Blog',
  'contact': 'Contact Us',
  'terms-of-service': 'Terms of Service',
  'privacy-policy': 'Privacy Policy',
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
};

const SITE = 'https://www.codelixitsolutions.com';

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

/* posts and case studies render their own breadcrumb (with their headline),
   so the site-wide one stays out of their way */
const NO_PAGE = new Set(['/products']);

const SELF_NAMED = /^\/(blog|case-study)\/[^/]+\/?$/;

const BreadcrumbSchema = ({ lastName } = {}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }
  if (!lastName && SELF_NAMED.test(location.pathname)) {
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

  let currentUrl = SITE;

  pathnames.forEach((value, index) => {
    currentUrl += `/${value}`;
    /* /products has no page of its own (it redirects to /work), and a
       breadcrumb must not point at a redirect */
    if (NO_PAGE.has(currentUrl.replace(SITE, ''))) return;

    itemListElement.push({
      "@type": "ListItem",
      position: itemListElement.length + 1,
      name: (index === pathnames.length - 1 && lastName) || PATH_NAMES[currentUrl.replace(SITE, '')] || slugToName(value),
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
