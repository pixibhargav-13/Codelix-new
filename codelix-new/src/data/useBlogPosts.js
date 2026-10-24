import { useEffect, useState, useContext } from "react";
import { selectRows } from "../lib/supabaseRest";
import { InitialDataContext } from "../lib/initialDataContext";
import { toISODate as isoDate } from "../lib/isoDate.js";

/* Every list of posts (blog page, related articles, sitemap page) shows the
   newest first. Database posts carry an ISO published_at, the built-in
   ones a "20 October 2024" string; both go through the same parser. Posts
   from the same day keep the later-written one first (higher id). */
const timeOf = (p) => { const iso = isoDate(p.publishedAt || p.date); return iso ? Date.parse(iso) : 0; };
const newestFirst = (list) =>
  [...list].sort((a, b) => timeOf(b) - timeOf(a) || (typeof a.id === "number" && typeof b.id === "number" ? b.id - a.id : 0));

/* a post saved in the admin panel without a cover still gets a picture */
const FALLBACK_COVER = "/og/blog.png";

/* Posts from scripts/publish-blog-post.mjs store the on-site banner
   (<name>.banner.webp) as cover_image_url, with the link-preview card next
   to it as <name>.share.webp. Covers uploaded in the admin panel are used
   for both. */
const shareImageFor = (url) => (url ? url.replace(/\.banner\.webp$/, ".share.webp") : undefined);

export function useBlogPosts() {
  const initialContext = useContext(InitialDataContext);
  
  // Format the raw SSG data (if any) and merge with static blogs
  const [posts, setPosts] = useState(() => {
    let ssgPosts = [];
    if (initialContext?.blogPosts && initialContext.blogPosts.length > 0) {
      ssgPosts = initialContext.blogPosts.map((p) => ({
        id: `sb-${p.id}`,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || "",
        date: p.published_at
          ? new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
          : "",
        readTime: p.read_time || "",
        image: p.cover_image_url || FALLBACK_COVER,
        /* the fallback above is a generic picture, fine for a card in a
           list and wrong for a link preview */
        coverImage: shareImageFor(p.cover_image_url),
        /* the raw timestamp, kept alongside the display string:
           article:published_time has to be ISO 8601, and "1 January 2026"
           is not */
        publishedAt: p.published_at || undefined,
        /* last edited (Supabase keeps updated_at current) — dateModified */
        updatedAt: p.updated_at || undefined,
        tags: p.tags?.length ? p.tags : ["All Articles"],
        content: p.content,
        /* prerendered pages carry only their own post's body (ssg-build) */
        partial: p.partial || undefined,
      }));
    }
    return newestFirst(ssgPosts);
  });

  /* Whether the Supabase read is still in flight. A post published from the
     admin panel exists only in Supabase, so until this settles a slug we
     can't find might still be on its way — which is the difference between
     "no such article" and "not loaded yet". */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    let active = true;
    selectRows("blog_posts", { eq: { published: true }, order: { column: "published_at", ascending: false } })
      .then(({ data, error }) => {
        if (!active) return;
        setLoading(false);
        if (error || !data || data.length === 0) return;
        const fromSupabase = data.map((p) => ({
          id: `sb-${p.id}`,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt || "",
          date: p.published_at
            ? new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
            : "",
          readTime: p.read_time || "",
          image: p.cover_image_url || FALLBACK_COVER,
        /* the fallback above is a generic picture, fine for a card in a
           list and wrong for a link preview */
        coverImage: shareImageFor(p.cover_image_url),
        /* the raw timestamp, kept alongside the display string:
           article:published_time has to be ISO 8601, and "1 January 2026"
           is not */
        publishedAt: p.published_at || undefined,
        /* last edited (Supabase keeps updated_at current) — dateModified */
        updatedAt: p.updated_at || undefined,
          tags: p.tags?.length ? p.tags : ["All Articles"],
          content: p.content,
        }));
        setPosts(newestFirst(fromSupabase));
      })
      /* a rejected request must still end the loading state, or an unknown
         slug would spin forever instead of reporting itself as missing */
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { posts, loading };
}

// kept here so existing imports keep working; the parser lives in lib/isoDate.js
export { toISODate } from "../lib/isoDate.js";
