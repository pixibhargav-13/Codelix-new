import { useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import { blogs as staticBlogs } from "./blogData";
import { InitialDataContext } from "../App";

export function useBlogPosts() {
  const initialContext = useContext(InitialDataContext);
  const [posts, setPosts] = useState(
    initialContext?.blogPosts || staticBlogs
  );

  useEffect(() => {
    if (initialContext?.blogPosts) return; // Skip fetch if we already hydrated from SSG
    
    let active = true;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active || error || !data || data.length === 0) return;
        const fromSupabase = data.map((p) => ({
          id: `sb-${p.id}`,
          slug: p.slug,
          title: p.title,
          date: p.published_at
            ? new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
            : "",
          readTime: p.read_time || "",
          image: p.cover_image_url || staticBlogs[0]?.image,
          tags: p.tags?.length ? p.tags : ["All Articles"],
          content: p.content,
        }));
        setPosts([...fromSupabase, ...staticBlogs]);
      });
    return () => { active = false; };
  }, []);

  return posts;
}
