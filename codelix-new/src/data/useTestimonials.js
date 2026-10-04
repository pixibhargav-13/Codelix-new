import { useEffect, useState } from "react";
import { selectRows } from "../lib/supabaseRest";

/* schema.sql seeds the testimonials table with the same 5 real quotes
   already hardcoded here, so once Supabase returns rows they REPLACE the
   static list (not merged — merging would show each of those 5 twice).
   The static array is only the fallback shown before Supabase responds
   or if it's unreachable. */
export function useTestimonials(staticTestimonials) {
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    let active = true;
    selectRows("testimonials", { eq: { is_featured: true }, order: { column: "sort_order", ascending: true } })
      .then(({ data, error }) => {
        if (!active || error || !data || data.length === 0) return;
        setTestimonials(
          data.map((t) => ({
            logo: t.avatar_url || null,
            quote: t.quote,
            name: t.name,
            position: t.role || "",
          }))
        );
      });
    return () => { active = false; };
  }, [staticTestimonials]);

  return testimonials;
}
