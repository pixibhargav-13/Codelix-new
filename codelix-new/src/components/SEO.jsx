import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEO = ({
  title,
  description,
  keywords = '',
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
  }, [fullTitle, description, keywords, fullCanonical]);

  return null;
};
