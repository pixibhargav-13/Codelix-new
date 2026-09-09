import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SEO = ({
  title,
  ogTitle,
  description,
  keywords = '',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1',
}) => {
  const siteUrl = 'https://www.codelixitsolutions.com';
  const location = useLocation();
  const fullTitle = title || 'Codelix IT Solutions | AI-Powered Web, App & SaaS Development';
  /* The page title and the social title answer to different readers. The
     <title> is written for search — it carries the words people type. The
     og:title is read by a person deciding whether to open a link someone
     shared, where a keyword phrase reads as spam and the brand does not. */
  const socialTitle = ogTitle || fullTitle;
  const pathName = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const fullCanonical = `${siteUrl}${pathName}`;
  const defaultDesc = 'Craft AI-powered web, app & SaaS solutions with world-class UI/UX design. Trusted by 25+ companies for professional development services.';
  const finalDesc = description || defaultDesc;
  const defaultImage = `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      {/* Title */}
      <title>{fullTitle}</title>

      {/* Meta Description */}
      <meta name="description" content={finalDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content="Codelix IT Solutions" />
      <meta name="theme-color" content="#000000" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content="Codelix IT Solutions" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Codelix IT Solutions - AI-Powered Web, App & SaaS Development" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codelixitsolutions" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:image" content={defaultImage} />
    </Helmet>
  );
};
