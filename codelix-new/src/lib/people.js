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

/* Who is credited on a blog post. Design topics (UI/UX, design systems,
   wireframes, prototypes) and team-management topics (how a team runs a
   project, hiring, collaboration, process) are Kushal's; everything else is
   Manas's. Checked against the title and the category (tags[1]), so posts
   from the scheduled writer follow the same rule without anyone picking. */
const KUSHAL_TOPICS = /\bdesign\b|\bui\b|\bux\b|ui\/ux|user experience|wireframe|prototyp|figma|\bteams?\b|management|hiring|collaborat|\bprocess\b|agile|scrum|project manag/i;

export function authorFor(post) {
  const [manas, kushal] = FOUNDERS;
  const text = `${post?.title || ""} ${post?.tags?.[1] || ""}`;
  return KUSHAL_TOPICS.test(text) ? kushal : manas;
}
