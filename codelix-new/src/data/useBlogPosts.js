import { useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import { blogs as staticBlogs } from "./blogData";
import { InitialDataContext } from "../lib/initialDataContext";

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
        image: p.cover_image_url || staticBlogs[0]?.image,
        /* the fallback above borrows another post.s picture, which is fine
           for a card in a list and wrong for a link preview */
        coverImage: p.cover_image_url || undefined,
        /* the raw timestamp, kept alongside the display string:
           article:published_time has to be ISO 8601, and "1 January 2026"
           is not */
        publishedAt: p.published_at || undefined,
        tags: p.tags?.length ? p.tags : ["All Articles"],
        content: p.content,
      }));
    }
    // Only use staticBlogs if there are no SSG posts, or merge them?
    // The original code merged them: setPosts([...fromSupabase, ...staticBlogs])
    return [...ssgPosts, ...staticBlogs];
  });

  /* Whether the Supabase read is still in flight. A post published from the
     admin panel exists only in Supabase, so until this settles a slug we
     can't find might still be on its way — which is the difference between
     "no such article" and "not loaded yet". */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    let active = true;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
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
          image: p.cover_image_url || staticBlogs[0]?.image,
        /* the fallback above borrows another post.s picture, which is fine
           for a card in a list and wrong for a link preview */
        coverImage: p.cover_image_url || undefined,
        /* the raw timestamp, kept alongside the display string:
           article:published_time has to be ISO 8601, and "1 January 2026"
           is not */
        publishedAt: p.published_at || undefined,
          tags: p.tags?.length ? p.tags : ["All Articles"],
          content: p.content,
        }));
        setPosts([...fromSupabase, ...staticBlogs]);
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
