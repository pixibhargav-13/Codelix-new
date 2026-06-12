// Injects Service structured data (schema.org) so AI answer engines and
// search engines can clearly identify what each service page offers.
export const ServiceSchema = ({ name, description, url }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": `https://www.codelixitsolutions.com${url}`,
    "provider": {
      "@type": "Organization",
      "name": "Codelix IT Solutions",
      "url": "https://www.codelixitsolutions.com",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
