import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminBlogList() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    let active = true;
    supabase
      .from("blog_posts")
      .select("id, title, slug, published, published_at, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) setError(err.message);
        else setPosts(data);
      });
    return () => { active = false; };
  }, [refreshIndex]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    const { error: err } = await supabase.from("blog_posts").delete().eq("id", id);
    if (err) setError(err.message);
    else setRefreshIndex((n) => n + 1);
  };

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <span className="adm-main-eyebrow">Content</span>
          <h1>Blog Posts</h1>
        </div>
        <Link className="adm-btn" to="/admin/blog/new">
          <Plus size={16} strokeWidth={2.2} />
          New Post
        </Link>
      </div>
      {error && <p className="adm-error">{error}</p>}
      {posts === null ? (
        <p className="adm-empty">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="adm-empty">No blog posts yet — create your first one.</p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Slug</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>
                    <span className={`adm-pill ${p.published ? "adm-pill--live" : "adm-pill--draft"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{p.slug}</td>
                  <td>
                    <div className="adm-row-actions">
                      <Link className="adm-btn adm-btn--ghost" to={`/admin/blog/${p.id}`}>Edit</Link>
                      <button className="adm-btn adm-btn--danger" onClick={() => handleDelete(p.id, p.title)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
