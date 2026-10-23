import { useEffect, useState, useContext, useMemo } from "react";
import { selectRows } from "../../lib/supabaseRest";
import { CASE_STUDIES as staticCaseStudies } from "./caseStudiesData";
import { InitialDataContext } from "../../lib/initialDataContext";
import { caseStudyFromRow, caseStudyCard } from "../../lib/caseStudyRow";

/* Supabase studies first (newest first, as queried), then any repo study
   Supabase doesn't have yet. A study in both is taken from Supabase: that
   is the copy the admin panel edits. */
const merge = (fromSupabase) => {
  const inSupabase = new Set(fromSupabase.map((cs) => cs.slug));
  return [...fromSupabase, ...staticCaseStudies.filter((cs) => !inSupabase.has(cs.slug))];
};

export function useCaseStudies() {
  const initialContext = useContext(InitialDataContext);
  const [studies, setStudies] = useState(() => merge(initialContext?.caseStudies || []));

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
        setStudies(merge((data || []).map(caseStudyFromRow)));
      })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { studies, loading };
}

/* every study as a grid card, in the same order */
export function useProjects() {
  const { studies } = useCaseStudies();
  return useMemo(() => studies.map(caseStudyCard), [studies]);
}

/* the service pages' "related work": the studies in one category, or a
   hand-picked list of slugs in that order */
export function useRelatedWork({ category, slugs }) {
  const projects = useProjects();
  const key = slugs ? slugs.join(",") : category;
  return useMemo(() => {
    const list = slugs
      ? slugs.map((s) => projects.find((p) => p.slug === s)).filter(Boolean)
      : projects.filter((p) => p.category === category);
    return list.map((p) => ({ tag: p.category, title: p.title, thumb: p.image, link: `/case-study${p.href}` }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, key]);
}
