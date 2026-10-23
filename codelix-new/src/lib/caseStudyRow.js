/* A case_studies row from Supabase, in the shape the site renders. Shared by
   useCaseStudies (in the browser) and scripts/ssg-build.mjs (at build time),
   so a prerendered page and the page React hydrates are built from exactly
   the same object. Plain JS with no imports: ssg-build loads it under Node.

   card_title / card_description / card_tags are the shorter text the
   /work and /case-study grids show; empty means "use the page's own".
   share_image_url is the 1200x630 link-preview image; empty means the
   cover is used for previews too. */
export function caseStudyFromRow(cs) {
  const challengeImages = [
    cs.challenge_image_1_url ? { src: cs.challenge_image_1_url, alt: cs.challenge_image_1_alt || "" } : null,
    cs.challenge_image_2_url ? { src: cs.challenge_image_2_url, alt: cs.challenge_image_2_alt || "" } : null,
  ].filter(Boolean);

  return {
    slug: cs.slug,
    title: cs.title,
    description: cs.description,
    category: cs.category,
    industry: cs.industry || cs.category,
    tags: cs.tags?.length ? cs.tags : [],
    tools: cs.tools?.length ? cs.tools : cs.tags || [],
    overview: cs.overview || [],
    outcomes: cs.outcomes || [],
    challenges: cs.challenges || [],
    solutions: cs.solutions || [],
    image: cs.cover_image_url || "https://laravel.com/img/logomark.min.svg",
    /* kept separate from `image`, whose fallback above is a placeholder on
       someone else's domain - fine as a thumbnail, not for a link preview.
       Link previews can't show SVG either; such a study gets the site's
       default share image. */
    coverImage: cs.share_image_url || (cs.cover_image_url && !/\.svg(\?|$)/i.test(cs.cover_image_url) ? cs.cover_image_url : undefined),
    cardTitle: cs.card_title || cs.title,
    cardDescription: cs.card_description || cs.description,
    cardTags: cs.card_tags?.length ? cs.card_tags : cs.tags?.length ? cs.tags : [],
    /* raw timestamps for datePublished / dateModified */
    publishedAt: cs.published_at || undefined,
    updatedAt: cs.updated_at || undefined,
    isConcept: !!cs.is_concept,
    snapshot: cs.snapshot?.length ? cs.snapshot : undefined,
    challengeImages: challengeImages.length ? challengeImages : undefined,
    process: cs.process?.length ? cs.process : undefined,
    resultsNote: cs.results_note || undefined,
    services: cs.services?.length ? cs.services : undefined,
    features: cs.features?.length ? cs.features : undefined,
    whyStack: cs.why_stack?.length ? cs.why_stack : undefined,
    scalability: cs.scalability?.length ? cs.scalability : undefined,
    quote: cs.quote_text ? { text: cs.quote_text, role: cs.quote_role || "", name: cs.quote_name || "" } : undefined,
  };
}

/* the card the /work and /case-study grids, the industry pages and the
   service pages' "related work" show for a study */
export const caseStudyCard = (cs) => ({
  id: cs.slug,
  slug: cs.slug,
  title: cs.cardTitle || cs.title,
  category: cs.category,
  industry: cs.industry,
  description: cs.cardDescription || cs.description,
  tags: cs.cardTags || cs.tags || [],
  image: cs.image,
  share: cs.coverImage,
  href: `/${cs.slug}`,
});
