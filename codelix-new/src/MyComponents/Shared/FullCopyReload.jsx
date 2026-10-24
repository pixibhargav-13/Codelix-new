import { useEffect } from "react";
import ArticleSkeleton from "./ArticleSkeleton";

/* A post or case study reached by client-side navigation starts from the
   slimmed copy every prerendered page carries (no body), and the full one
   comes from Supabase. If that read failed, the full copy is still in this
   URL's own prerendered HTML, so load the page for real — once, so a page
   that somehow lacks it too can't reload forever. */
export default function FullCopyReload({ label }) {
  useEffect(() => {
    const key = `full-copy-reload:${location.pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: reload anyway, the prerendered page has the copy */
    }
    location.reload();
  }, []);
  return <ArticleSkeleton label={label} />;
}
