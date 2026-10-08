import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toISODate } from '../lib/isoDate.js';
import { FOUNDERS } from '../lib/people.js';

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
      /* last edit in the admin panel (updated_at); a post never edited
         after publishing was last modified when it was published */
      "dateModified": toISODate(data.updatedAt) || toISODate(data.publishedAt || data.date),
      /* both founders are credited as authors, with the business as the
         publisher below */
      "author": FOUNDERS,
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
  } else if (type === 'FAQPage' && Array.isArray(data) && data.length) {
    /* Google stopped showing FAQ rich results for most commercial sites in
       2023, so this is not about the search results page. It is for answer
       engines — Bing Copilot (which ChatGPT search draws on), Perplexity and
       the rest — which can take a marked-up question and its answer as a
       unit instead of inferring the pairing from an accordion. Built from
       the same array the page renders, so the markup can never describe
       questions the visitor cannot see. */
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a },
      })),
    };
  } else if (type === 'SoftwareApplication' && data) {
    /* The products. Built by the product page from its own data, so every
       field here is something the page itself states. Google only shows a
       rich result for software with ratings, which these do not publish;
       the point is that an assistant asked what Audytee is or costs can read
       the answer rather than infer it. */
    const path = location.pathname.replace(/\/+$/, "");
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}${path}#software`,
      "applicationCategory": "BusinessApplication",
      "publisher": ORG_REF,
      "creator": ORG_REF,
      ...data,
      "url": `${siteUrl}${path}`,
    };
  } else if (type === 'Service' && data) {
    /* One per service page, tying the service to the business by @id so
       "Codelix provides UI/UX design, from Ahmedabad" is stated rather than
       left for a reader to assemble from the page copy. */
    const path = location.pathname.replace(/\/+$/, "");
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}${path}#service`,
      "name": data.name,
      "serviceType": data.name,
      "description": data.description,
      "url": `${siteUrl}${path}`,
      "provider": ORG_REF,
      "areaServed": "Worldwide",
    };
  } else if (type === 'Article' && data) { // For Case Studies
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.description,
      "image": data.image || `${siteUrl}/og-image.png`,
      "url": `${siteUrl}${location.pathname}`,
      "datePublished": toISODate(data.publishedAt),
      "dateModified": toISODate(data.updatedAt) || toISODate(data.publishedAt),
      "author": FOUNDERS,
      "publisher": ORG_REF,
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
