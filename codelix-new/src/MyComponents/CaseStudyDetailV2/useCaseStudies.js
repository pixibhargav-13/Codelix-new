import { useEffect, useState, useContext } from "react";
import { selectRows } from "../../lib/supabaseRest";
import { CASE_STUDIES as staticCaseStudies } from "./caseStudiesData";
import { InitialDataContext } from "../../lib/initialDataContext";

export function useCaseStudies() {
  const initialContext = useContext(InitialDataContext);
  const [studies, setStudies] = useState(
    initialContext?.caseStudies?.length
      ? [...initialContext.caseStudies, ...staticCaseStudies]
      : staticCaseStudies
  );

  /* in flight until the Supabase read settles — a study published from the
     admin panel exists only there, so an unknown slug may still be arriving */
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let active = true;
    selectRows("case_studies", { eq: { published: true }, order: { column: "published_at", ascending: false } })
      .then(({ data, error }) => {
        /* An unmounted component is not a failure — it just means the
           reader navigated away before the request came back, which happens
           on every route change now that navigation is client-side. Only a
           real Supabase error is worth reporting. */
        if (!active) return;
        setLoading(false);
        if (error) {
          console.error("Supabase case_studies fetch error:", error);
          return;
        }
        const fromSupabase = (data || []).map((cs) => {
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
            /* kept separate from `image`, whose fallback above is a
               placeholder on someone else.s domain - fine as a broken-ish
               thumbnail, not something to hand a link preview */
            coverImage: cs.cover_image_url || undefined,
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
        });
        setStudies([...fromSupabase, ...staticCaseStudies]);
      })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { studies, loading };
}
