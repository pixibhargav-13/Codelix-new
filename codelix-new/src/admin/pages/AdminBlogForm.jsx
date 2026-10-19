import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, X, FileText, Table, HelpCircle, MousePointerClick, Link2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { uploadImage } from "../uploadImage";
import { renderArticle } from "../../lib/articleMarkup";
import { authorFor } from "../../lib/people";
import {
  BLOG_CATEGORIES, POST_TEMPLATE, SNIPPETS, buildTags, splitTags, checkPost, readTimeFor, wordCount,
} from "../../lib/blogChecks";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const emptyForm = {
  title: "", slug: "", excerpt: "", content: "", cover_image_url: "",
  category: "", primaryKeyword: "", extraTags: "", read_time: "", published: false,
};

/* The post editor follows the blog's structure: the category and primary
   search phrase are their own fields (stored in tags as the publisher does),
   the content has a template and quick inserts for the markup the blog page
   renders, a preview shows it rendered, and a checklist applies the same
   rules as scripts/publish-blog-post.mjs (src/lib/blogChecks.js). */
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
  const [tab, setTab] = useState("write");
  /* the publish date already stored, so saving an edit doesn't move the
     post to the top of the newest-first blog with today's date */
  const [publishedAt, setPublishedAt] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error: err } = await supabase.from("blog_posts").select("*").eq("id", id).single();
      if (err) { setError(err.message); setLoading(false); return; }
      setForm({
        title: data.title, slug: data.slug, excerpt: data.excerpt || "",
        content: data.content, cover_image_url: data.cover_image_url || "",
        ...splitTags(data.tags || []),
        read_time: data.read_time || "",
        published: data.published,
      });
      setPublishedAt(data.published_at || null);
      setSlugTouched(true);
      setLoading(false);
    })();
  }, [id, isNew]);

  const checks = useMemo(() => checkPost({
    title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
    category: form.category, primaryKeyword: form.primaryKeyword, coverImage: form.cover_image_url,
  }), [form]);
  const failing = checks.filter((c) => !c.ok);
  const author = authorFor({ title: form.title, tags: ["All Articles", form.category] });
  const words = wordCount(form.content);

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

  /* inserts a block at the cursor, on its own paragraph */
  const insert = (text) => {
    const el = contentRef.current;
    setTab("write");
    setForm((prev) => {
      const c = prev.content;
      const at = el ? el.selectionStart : c.length;
      const before = c.slice(0, at).replace(/\s*$/, "");
      const after = c.slice(at).replace(/^\s*/, "");
      const content = [before, text, after].filter(Boolean).join("\n\n");
      return { ...prev, content };
    });
  };

  const insertTemplate = () => {
    if (form.content.trim() && !window.confirm("Replace the current content with the post template?")) return;
    setTab("write");
    setForm((prev) => ({ ...prev, content: POST_TEMPLATE }));
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
    if (form.published && failing.length &&
      !window.confirm(`${failing.length} checklist item${failing.length === 1 ? " is" : "s are"} not ticked:\n\n- ${failing.map((c) => c.label).join("\n- ")}\n\nPublish anyway?`)) {
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_image_url: form.cover_image_url,
      tags: buildTags(form),
      read_time: form.read_time.trim() || readTimeFor(form.content),
      published: form.published,
      /* keep the original date when an already-published post is edited */
      published_at: form.published ? publishedAt || new Date().toISOString() : null,
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

  const count = (n, min, max) => `adm-count ${n < min || n > max ? "is-off" : "is-ok"}`;

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

      <div className="adm-post-layout">
        <form className="adm-form adm-post-form" onSubmit={handleSubmit}>
          <div className="adm-field">
            <label htmlFor="title">
              Title <span className={count(form.title.trim().length, 20, 90)}>{form.title.trim().length}/90</span>
            </label>
            <input id="title" name="title" required value={form.title} onChange={handleChange}
              placeholder="Specific and search-friendly, with the main search phrase" />
          </div>
          <div className="adm-field">
            <label htmlFor="slug">Slug (URL)</label>
            <input id="slug" name="slug" required value={form.slug} onChange={handleSlugChange} />
            <span className="adm-hint">codelixitsolutions.com/blog/{form.slug || "…"}</span>
          </div>
          <div className="adm-field">
            <label htmlFor="excerpt">
              Meta description <span className={count(form.excerpt.trim().length, 80, 160)}>{form.excerpt.trim().length}/160</span>
            </label>
            <textarea id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} rows={2}
              placeholder="One sentence that answers the title. Shown under the title and in Google results." />
          </div>

          <div className="adm-form-row">
            <div className="adm-field">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={form.category} onChange={handleChange} required>
                <option value="">Choose…</option>
                {BLOG_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="adm-field">
              <label htmlFor="primaryKeyword">Main search phrase</label>
              <input id="primaryKeyword" name="primaryKeyword" value={form.primaryKeyword} onChange={handleChange}
                placeholder="e.g. custom ERP vs off-the-shelf" />
            </div>
          </div>
          <div className="adm-field">
            <label htmlFor="extraTags">More search phrases (comma-separated)</label>
            <input id="extraTags" name="extraTags" value={form.extraTags} onChange={handleChange}
              placeholder="e.g. ERP software cost India, Tally vs ERP, manufacturing ERP" />
            <span className="adm-hint">Become the post's keywords, with the main phrase first.</span>
          </div>

          <div className="adm-field">
            <div className="adm-editor-head">
              <label htmlFor="content">Content</label>
              <div className="adm-tabs" role="tablist">
                <button type="button" role="tab" aria-selected={tab === "write"} className={tab === "write" ? "is-on" : ""} onClick={() => setTab("write")}>Write</button>
                <button type="button" role="tab" aria-selected={tab === "preview"} className={tab === "preview" ? "is-on" : ""} onClick={() => setTab("preview")}>Preview</button>
              </div>
            </div>
            <div className="adm-toolbar">
              <button type="button" onClick={insertTemplate}><FileText size={14} /> Insert template</button>
              <button type="button" onClick={() => insert(SNIPPETS.table)}><Table size={14} /> Table</button>
              <button type="button" onClick={() => insert(SNIPPETS.faq)}><HelpCircle size={14} /> FAQ question</button>
              <button type="button" onClick={() => insert(SNIPPETS.link)}><Link2 size={14} /> Link</button>
              <button type="button" onClick={() => insert(SNIPPETS.cta)}><MousePointerClick size={14} /> Consultation button</button>
              <span className="adm-toolbar-count">{words} words · {readTimeFor(form.content)}</span>
            </div>
            {tab === "write" ? (
              <textarea id="content" name="content" ref={contentRef} required value={form.content} onChange={handleChange} rows={22}
                className="adm-editor" placeholder='Start with "Short answer:" or click Insert template.' />
            ) : (
              <div className="adm-preview">
                {form.content.trim() ? renderArticle(form.content) : <p className="adm-empty">Nothing to preview yet.</p>}
              </div>
            )}
            <details className="adm-guide">
              <summary>Formatting guide</summary>
              <ul>
                <li><code>Short answer: …</code> as the first paragraph shows as the highlighted box</li>
                <li><code>## Heading</code> for sections, <code>### Question?</code> inside the FAQ</li>
                <li><code>- item</code> bullet list, <code>1. item</code> numbered list, one item per line</li>
                <li><code>| a | b |</code> tables, with <code>|---|---|</code> as the second row</li>
                <li><code>[text](https://www.codelixitsolutions.com/…)</code> for links</li>
                <li><code>## Frequently asked questions</code> becomes the FAQ accordion</li>
                <li>A paragraph ending in <code>[Book a free consultation](…/contact)</code> becomes the button</li>
                <li>Leave a blank line between blocks. No <code>#</code> heading (the title is the heading)</li>
              </ul>
            </details>
          </div>

          <div className="adm-field">
            <label htmlFor="read_time">Read time</label>
            <input id="read_time" name="read_time" placeholder={`${readTimeFor(form.content)} (filled in automatically if empty)`} value={form.read_time} onChange={handleChange} />
          </div>
          <div className="adm-field">
            <label htmlFor="cover">Cover image</label>
            <input id="cover" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            <span className="adm-hint">1600×720 works best, with no title text on it (the page shows the title above it).</span>
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

        <aside className="adm-checklist" aria-label="Post checklist">
          <div className="adm-checklist-head">
            <p>Post checklist</p>
            <span className={failing.length ? "adm-pill adm-pill--draft" : "adm-pill adm-pill--live"}>
              {checks.length - failing.length}/{checks.length}
            </span>
          </div>
          <ul>
            {checks.map((c) => (
              <li key={c.label} className={c.ok ? "is-ok" : "is-off"}>
                <span className="adm-check-icon">{c.ok ? <Check size={13} strokeWidth={3} /> : <X size={13} strokeWidth={3} />}</span>
                <span>
                  {c.label}
                  {!c.ok && <em>{c.detail}</em>}
                </span>
              </li>
            ))}
          </ul>
          <div className="adm-checklist-author">
            <span>Credited author</span>
            <strong>{author.name}</strong>
            <em>{author.jobTitle} · chosen from the topic: design and team topics go to Kushal, the rest to Manas</em>
          </div>
        </aside>
      </div>
    </div>
  );
}
