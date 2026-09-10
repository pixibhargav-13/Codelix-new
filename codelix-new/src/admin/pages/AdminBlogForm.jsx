import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { uploadImage } from "../uploadImage";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const emptyForm = {
  title: "", slug: "", excerpt: "", content: "", cover_image_url: "",
  tags: "", read_time: "", published: false,
};

export default function AdminBlogForm() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error: err } = await supabase.from("blog_posts").select("*").eq("id", id).single();
      if (err) { setError(err.message); setLoading(false); return; }
      setForm({
        title: data.title, slug: data.slug, excerpt: data.excerpt || "",
        content: data.content, cover_image_url: data.cover_image_url || "",
        tags: (data.tags || []).join(", "), read_time: data.read_time || "",
        published: data.published,
      });
      setSlugTouched(true);
      setLoading(false);
    })();
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "title" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setSlugTouched(true);
    setForm((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file, "blog");
      setForm((prev) => ({ ...prev, cover_image_url: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_image_url: form.cover_image_url,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      read_time: form.read_time,
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    };

    const query = isNew
      ? supabase.from("blog_posts").insert(payload)
      : supabase.from("blog_posts").update(payload).eq("id", id);

    const { error: err } = await query;
    setSaving(false);
    if (err) setError(err.message);
    else navigate("/admin/blog");
  };

  if (loading) return <p className="adm-empty">Loading…</p>;

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <Link className="adm-back" to="/admin/blog">
            <ArrowLeft size={14} strokeWidth={2} />
            Blog Posts
          </Link>
          <h1>{isNew ? "New Blog Post" : "Edit Blog Post"}</h1>
        </div>
      </div>
      {error && <p className="adm-error">{error}</p>}
      <form className="adm-form" onSubmit={handleSubmit}>
        <div className="adm-field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required value={form.title} onChange={handleChange} />
        </div>
        <div className="adm-field">
          <label htmlFor="slug">Slug (URL)</label>
          <input id="slug" name="slug" required value={form.slug} onChange={handleSlugChange} />
        </div>
        <div className="adm-field">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} />
        </div>
        <div className="adm-field">
          <label htmlFor="content">Content (Markdown)</label>
          <textarea id="content" name="content" required value={form.content} onChange={handleChange} rows={14} />
        </div>
        <div className="adm-form-row">
          <div className="adm-field">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input id="tags" name="tags" placeholder="business, UI/UX" value={form.tags} onChange={handleChange} />
          </div>
          <div className="adm-field">
            <label htmlFor="read_time">Read time</label>
            <input id="read_time" name="read_time" placeholder="5 min read" value={form.read_time} onChange={handleChange} />
          </div>
        </div>
        <div className="adm-field">
          <label htmlFor="cover">Cover image</label>
          <input id="cover" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          {uploading && <span style={{ fontSize: 12, color: "#8b90a3" }}>Uploading…</span>}
          {form.cover_image_url && (
            <div className="adm-file-preview">
              <img src={form.cover_image_url} alt="" />
            </div>
          )}
        </div>
        <div className="adm-field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input id="published" type="checkbox" name="published" checked={form.published} onChange={handleChange} style={{ width: "auto" }} />
          <label htmlFor="published" style={{ margin: 0 }}>Published (visible on the live site)</label>
        </div>
        <div className="adm-form-actions">
          <button className="adm-btn" type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          <button className="adm-btn adm-btn--ghost" type="button" onClick={() => navigate("/admin/blog")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
