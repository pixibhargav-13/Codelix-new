import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const siteUrl = 'https://www.codelixitsolutions.com';

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Codelix IT Solutions",
  "url": siteUrl,
  "logo": `${siteUrl}/codelix.svg`,
  "description": "Craft AI-powered web, app & SaaS solutions with world-class UI/UX design. Trusted by 25+ companies for professional development services.",
  "sameAs": [
    "https://www.linkedin.com/company/codelix-it-solutions",
    "https://twitter.com/codelixitsolutions",
    "https://www.instagram.com/codelix_it_solutions"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contact@codelixitsolutions.com"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Codelix IT Solutions",
  "url": siteUrl
};

export const StructuredData = ({ type = 'Organization', data = null }) => {
  const location = useLocation();
  let schemaObj = null;

  if (type === 'Organization' && location.pathname === '/') {
    schemaObj = [orgSchema, websiteSchema];
  } else if (type === 'BlogPosting' && data) {
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "image": data.image || `${siteUrl}/og-image.png`,
      "url": `${siteUrl}${location.pathname}`,
      "datePublished": data.date ? new Date(data.date).toISOString() : undefined,
      "author": {
        "@type": "Organization",
        "name": "Codelix IT Solutions"
      }
    };
  } else if (type === 'Article' && data) { // For Case Studies
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.description,
      "image": data.image || `${siteUrl}/og-image.png`,
      "url": `${siteUrl}${location.pathname}`,
      "author": {
        "@type": "Organization",
        "name": "Codelix IT Solutions"
      }
    };
  }

  if (!schemaObj) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaObj)}
      </script>
    </Helmet>
  );
};
