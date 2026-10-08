/* The founders as schema.org Person entities. Posts and case studies name
   them as authors; index.html lists the same people (same @id) as the
   founders of the business, so search engines and AI assistants can tie a
   byline to a real person with a public profile. Keep the two in step. */
const siteUrl = "https://www.codelixitsolutions.com";

export const FOUNDERS = [
  {
    "@type": "Person",
    "@id": `${siteUrl}/team#manas-vadodaria`,
    name: "Manas Vadodaria",
    jobTitle: "CEO",
    url: `${siteUrl}/team`,
    sameAs: ["https://www.linkedin.com/in/manas-vadodaria-396353275/"],
  },
  {
    "@type": "Person",
    "@id": `${siteUrl}/team#kushal-mungalpara`,
    name: "Kushal Mungalpara",
    jobTitle: "Co-Founder",
    url: `${siteUrl}/team`,
    sameAs: ["https://www.linkedin.com/in/kushal-mungalpara-60805227b/"],
  },
];
