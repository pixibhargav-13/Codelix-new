import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEO = ({
  title,
  description,
  keywords = '',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1',
}) => {
  const siteUrl = 'https://www.codelixitsolutions.com';
  const location = useLocation();
  const fullTitle = title || 'Codelix IT Solutions | AI-Powered Web, App & SaaS Development';
  const pathName = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const fullCanonical = `${siteUrl}${pathName}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Canonical & URL tags
    document.getElementById('meta-canonical')?.setAttribute('href', fullCanonical);
    document.getElementById('meta-og-url')?.setAttribute('content', fullCanonical);
    
    // Some systems look for a specific twitter:url, though og:url often suffices.
    let twUrl = document.getElementById('meta-tw-url');
    if (!twUrl) {
      twUrl = document.createElement('meta');
      twUrl.setAttribute('name', 'twitter:url');
      twUrl.setAttribute('id', 'meta-tw-url');
      document.head.appendChild(twUrl);
    }
    twUrl.setAttribute('content', fullCanonical);

    // Description
    if (description) {
      document.getElementById('meta-description')?.setAttribute('content', description);
      document.getElementById('meta-og-description')?.setAttribute('content', description);
      document.getElementById('meta-tw-description')?.setAttribute('content', description);
    }

    // Keywords
    if (keywords) {
      document.getElementById('meta-keywords')?.setAttribute('content', keywords);
    }

    // Titles (OG & Twitter)
    document.getElementById('meta-og-title')?.setAttribute('content', fullTitle);
    document.getElementById('meta-tw-title')?.setAttribute('content', fullTitle);
    
    // Robots
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', robots);
    
  }, [fullTitle, description, keywords, robots, fullCanonical]);

  return null;
};
