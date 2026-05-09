import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
        item: "https://codelixitsolutions.com/"
      }
    ];

    let currentUrl = "https://codelixitsolutions.com";

    pathnames.forEach((value, index) => {
      currentUrl += `/${value}`;

      const name = value
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      itemListElement.push({
        "@type": "ListItem",
        position: index + 2,
        name: name,
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
