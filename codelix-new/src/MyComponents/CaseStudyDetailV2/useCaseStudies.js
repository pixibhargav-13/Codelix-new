import { useEffect, useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { CASE_STUDIES as staticCaseStudies } from "./caseStudiesData";
import { InitialDataContext } from "../../App";

export function useCaseStudies() {
  const initialContext = useContext(InitialDataContext);
  const [studies, setStudies] = useState(
    initialContext?.caseStudies || staticCaseStudies
  );

  useEffect(() => {

    let active = true;
    supabase
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active || error) {
          console.error("Supabase case_studies fetch error:", error);
          return;
        }
        console.log("Fetched case studies:", data);
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
      });
    return () => { active = false; };
  }, []);

  return studies;
}
