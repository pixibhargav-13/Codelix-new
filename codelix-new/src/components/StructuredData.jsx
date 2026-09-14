import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toISODate } from '../lib/isoDate.js';

const siteUrl = 'https://www.codelixitsolutions.com';

/* The company is described once, in index.html, as a LocalBusiness with the
   address, map, phone and the social profiles the site actually links to. This
   file used to publish a second Organization on the homepage that disagreed
   with it on the name, the email (a contact@ mailbox) and both the LinkedIn and
   Instagram URLs, with nothing to tell Google they were the same company.
   Posts now point at that one entity by @id instead of restating it. */
const ORG_REF = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": "Codelix IT Solutions",
};

export const StructuredData = ({ type = 'Organization', data = null }) => {
  const location = useLocation();
  let schemaObj = null;

  if (type === 'Organization') {
    /* covered by the template on every page — see above */
    schemaObj = null;
  } else if (type === 'BlogPosting' && data) {
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.excerpt || undefined,
      "image": data.image || `${siteUrl}/og-image.png`,
      "url": `${siteUrl}${location.pathname}`,
      /* new Date("20 October 2024") leans on implementation-defined parsing,
         and an unparseable date makes toISOString() throw mid-render. The
         explicit parser returns undefined instead, which drops the field. */
      "datePublished": toISODate(data.publishedAt || data.date),
      "author": ORG_REF,
      /* Google's article guidance expects a publisher with a logo; without
         it the post is not eligible for the richer article treatments. */
      "publisher": {
        ...ORG_REF,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/codelix.svg`
        }
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
      "author": ORG_REF
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
