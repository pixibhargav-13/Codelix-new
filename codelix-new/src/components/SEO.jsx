import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SEO = ({
  title,
  ogTitle,
  image,
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
  /* A blog post or a case study has a picture of the thing itself; sharing it
     with the house card wastes the one part of the preview people actually
     look at. og:image has to be absolute, so a bundled asset path gets the
     origin prefixed - a Supabase storage URL already carries one. */
  /* SVG is not a valid og:image - Facebook, LinkedIn and X all refuse it and
     fall back to no preview at all, which is worse than the house card. */
  const usable = image && !image.split("?")[0].toLowerCase().endsWith(".svg") ? image : null;
  const shareImage = usable
    ? (/^https?:/.test(usable) ? usable : `${siteUrl}${usable.startsWith("/") ? "" : "/"}${usable}`)
    : defaultImage;
  const usingDefaultImage = shareImage === defaultImage;

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
      <meta property="og:image" content={shareImage} />
      {/* the house card is known to be 1200x630; a post cover is whatever it
          is, and declaring dimensions we have not measured makes the crop
          worse than declaring none */}
      {usingDefaultImage && <meta property="og:image:width" content="1200" />}
      {usingDefaultImage && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={usingDefaultImage ? "Codelix IT Solutions - AI-Powered Web, App & SaaS Development" : socialTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codelixitsolutions" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:image" content={shareImage} />
    </Helmet>
  );
};
