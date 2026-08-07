import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { uploadImage } from "../uploadImage";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CATEGORIES = ["Web Development", "Application Development", "UI/UX Design", "E-Commerce Solutions", "Custom Software Development", "AI Development", "Data Analytics"];

/* one item per line — kept as plain textareas (no repeatable field-group
   UI) to match how simple every other admin form field already is here
   (tags/read_time are plain text, content is a single markdown blob) */
const linesToArray = (str) => str.split("\n").map((s) => s.trim()).filter(Boolean);
const arrayToLines = (arr) => (arr || []).join("\n");

/* structured (non-plain-text) fields use a "a|b|c" shorthand per line
   instead of a dedicated repeatable sub-form */
const linesToOutcomes = (str) =>
  linesToArray(str).map((line) => {
    const [value, suffix = "", label = ""] = line.split("|").map((s) => s.trim());
    return { value: Number(value) || 0, suffix, label };
  });
const outcomesToLines = (outcomes) =>
  (outcomes || []).map((o) => `${o.value}|${o.suffix || ""}|${o.label || ""}`).join("\n");

const linesToSnapshot = (str) =>
  linesToArray(str).map((line) => {
    const [label = "", value = ""] = line.split("|").map((s) => s.trim());
    return { label, value };
  });
const snapshotToLines = (snapshot) =>
  (snapshot || []).map((s) => `${s.label}|${s.value}`).join("\n");

const linesToProcess = (str) =>
  linesToArray(str).map((line) => {
    const [phase = "", time = "", body = ""] = line.split("|").map((s) => s.trim());
    return { phase, time, body };
  });
const processToLines = (process) =>
  (process || []).map((p) => `${p.phase}|${p.time}|${p.body}`).join("\n");

const emptyForm = {
  title: "", slug: "", description: "", category: CATEGORIES[0],
  tags: "", tools: "", overview: "", outcomes: "", challenges: "", solutions: "",
  cover_image_url: "", is_concept: false,
  snapshot: "", challenge_image_1_url: "", challenge_image_1_alt: "",
  challenge_image_2_url: "", challenge_image_2_alt: "",
  process: "", results_note: "", services: "", features: "",
  why_stack: "", scalability: "",
  quote_text: "", quote_role: "", quote_name: "",
  published: false,
};

const SectionHead = ({ children }) => (
  <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: ".02em", color: "#c9cce0", marginTop: 32, marginBottom: 4, textTransform: "uppercase" }}>
    {children}
  </p>
);

export default function AdminCaseStudyForm() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [toolsTouched, setToolsTouched] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingField, setUploadingField] = useState("");

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error: err } = await supabase.from("case_studies").select("*").eq("id", id).single();
      if (err) { setError(err.message); setLoading(false); return; }
      setForm({
        title: data.title, slug: data.slug, description: data.description || "",
        category: data.category, tags: (data.tags || []).join(", "),
        tools: (data.tools || []).join(", "),
        overview: arrayToLines(data.overview), outcomes: outcomesToLines(data.outcomes),
        challenges: arrayToLines(data.challenges), solutions: arrayToLines(data.solutions),
        cover_image_url: data.cover_image_url || "", is_concept: !!data.is_concept,
        snapshot: snapshotToLines(data.snapshot),
        challenge_image_1_url: data.challenge_image_1_url || "", challenge_image_1_alt: data.challenge_image_1_alt || "",
        challenge_image_2_url: data.challenge_image_2_url || "", challenge_image_2_alt: data.challenge_image_2_alt || "",
        process: processToLines(data.process), results_note: data.results_note || "",
        services: arrayToLines(data.services), features: arrayToLines(data.features),
        why_stack: arrayToLines(data.why_stack), scalability: arrayToLines(data.scalability),
        quote_text: data.quote_text || "", quote_role: data.quote_role || "", quote_name: data.quote_name || "",
        published: data.published,
      });
      setSlugTouched(true);
      setToolsTouched(true);
      setLoading(false);
    })();
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "title" && !slugTouched) next.slug = slugify(value);
      if (name === "tags" && !toolsTouched) next.tools = value;
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setSlugTouched(true);
    setForm((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleToolsChange = (e) => {
    setToolsTouched(true);
    setForm((prev) => ({ ...prev, tools: e.target.value }));
  };

  const handleImageUpload = (field) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField(field);
    setError("");
    try {
      const url = await uploadImage(file, "case-studies");
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingField("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      description: form.description,
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      tools: form.tools.split(",").map((t) => t.trim()).filter(Boolean),
      overview: linesToArray(form.overview),
      outcomes: linesToOutcomes(form.outcomes),
      challenges: linesToArray(form.challenges),
      solutions: linesToArray(form.solutions),
      cover_image_url: form.cover_image_url,
      is_concept: form.is_concept,
      snapshot: linesToSnapshot(form.snapshot),
      challenge_image_1_url: form.challenge_image_1_url || null,
      challenge_image_1_alt: form.challenge_image_1_alt || null,
      challenge_image_2_url: form.challenge_image_2_url || null,
      challenge_image_2_alt: form.challenge_image_2_alt || null,
      process: linesToProcess(form.process),
      results_note: form.results_note || null,
      services: linesToArray(form.services),
      features: linesToArray(form.features),
      why_stack: linesToArray(form.why_stack),
      scalability: linesToArray(form.scalability),
      quote_text: form.quote_text || null,
      quote_role: form.quote_role || null,
      quote_name: form.quote_name || null,
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    };

    const query = isNew
      ? supabase.from("case_studies").insert(payload)
      : supabase.from("case_studies").update(payload).eq("id", id);

    const { error: err } = await query;
    setSaving(false);
    if (err) setError(err.message);
    else navigate("/admin/case-studies");
  };

  if (loading) return <p className="adm-empty">Loading…</p>;

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <span className="adm-main-eyebrow">Case Studies</span>
          <h1>{isNew ? "New Case Study" : "Edit Case Study"}</h1>
        </div>
      </div>
      {error && <p className="adm-error">{error}</p>}
      <form className="adm-form" onSubmit={handleSubmit}>
        <SectionHead>Basics</SectionHead>
        <div className="adm-field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required value={form.title} onChange={handleChange} />
        </div>
        <div className="adm-form-row">
          <div className="adm-field">
            <label htmlFor="slug">Slug (URL)</label>
            <input id="slug" name="slug" required value={form.slug} onChange={handleSlugChange} />
          </div>
          <div className="adm-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="adm-field">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required value={form.description} onChange={handleChange} rows={3} />
        </div>
        <div className="adm-form-row">
          <div className="adm-field">
            <label htmlFor="tags">Tags / tech stack (comma-separated)</label>
            <input id="tags" name="tags" placeholder="ReactJS, Node.js, AWS" value={form.tags} onChange={handleChange} />
          </div>
          <div className="adm-field">
            <label htmlFor="tools">Tools (comma-separated, defaults to tags)</label>
            <input id="tools" name="tools" placeholder="ReactJS, Node.js, AWS" value={form.tools} onChange={handleToolsChange} />
          </div>
        </div>
        <div className="adm-field">
          <label htmlFor="cover">Hero / cover image</label>
          <input id="cover" type="file" accept="image/*" onChange={handleImageUpload("cover_image_url")} disabled={uploadingField === "cover_image_url"} />
          {uploadingField === "cover_image_url" && <span style={{ fontSize: 12, color: "#8b90a3" }}>Uploading…</span>}
          {form.cover_image_url && (
            <div className="adm-file-preview">
              <img src={form.cover_image_url} alt="" />
            </div>
          )}
        </div>
        <div className="adm-field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input id="is_concept" type="checkbox" name="is_concept" checked={form.is_concept} onChange={handleChange} style={{ width: "auto" }} />
          <label htmlFor="is_concept" style={{ margin: 0 }}>Concept exploration (not a live client build — shows a disclosure note on the page)</label>
        </div>

        <SectionHead>Engagement at a Glance (optional)</SectionHead>
        <div className="adm-field">
          <label htmlFor="snapshot">Snapshot facts — one per line, as <code>label|value</code></label>
          <textarea id="snapshot" name="snapshot" placeholder={"Industry|B2B SaaS\nTimeline|13 weeks\nTeam Size|6"} value={form.snapshot} onChange={handleChange} rows={4} />
        </div>

        <SectionHead>Overview</SectionHead>
        <div className="adm-field">
          <label htmlFor="overview">Overview (one paragraph per line)</label>
          <textarea id="overview" name="overview" value={form.overview} onChange={handleChange} rows={6} />
        </div>

        <SectionHead>Challenge Images (optional, shown as a pair)</SectionHead>
        <div className="adm-form-row">
          <div className="adm-field">
            <label htmlFor="challenge_image_1">Challenge image 1</label>
            <input id="challenge_image_1" type="file" accept="image/*" onChange={handleImageUpload("challenge_image_1_url")} disabled={uploadingField === "challenge_image_1_url"} />
            {form.challenge_image_1_url && <div className="adm-file-preview"><img src={form.challenge_image_1_url} alt="" /></div>}
            <input name="challenge_image_1_alt" placeholder="Alt text" value={form.challenge_image_1_alt} onChange={handleChange} style={{ marginTop: 8 }} />
          </div>
          <div className="adm-field">
            <label htmlFor="challenge_image_2">Challenge image 2</label>
            <input id="challenge_image_2" type="file" accept="image/*" onChange={handleImageUpload("challenge_image_2_url")} disabled={uploadingField === "challenge_image_2_url"} />
            {form.challenge_image_2_url && <div className="adm-file-preview"><img src={form.challenge_image_2_url} alt="" /></div>}
            <input name="challenge_image_2_alt" placeholder="Alt text" value={form.challenge_image_2_alt} onChange={handleChange} style={{ marginTop: 8 }} />
          </div>
        </div>

        <SectionHead>Challenges &amp; Solutions</SectionHead>
        <div className="adm-field">
          <label htmlFor="challenges">Challenges (one per line)</label>
          <textarea id="challenges" name="challenges" value={form.challenges} onChange={handleChange} rows={5} />
        </div>
        <div className="adm-field">
          <label htmlFor="solutions">Solutions (one per line)</label>
          <textarea id="solutions" name="solutions" value={form.solutions} onChange={handleChange} rows={5} />
        </div>

        <SectionHead>Delivery Process (optional)</SectionHead>
        <div className="adm-field">
          <label htmlFor="process">Process phases — one per line, as <code>phase|time|body</code></label>
          <textarea id="process" name="process" placeholder={"Discovery & Analysis|2 weeks|Sessions with stakeholders mapped where data and workflows diverged."} value={form.process} onChange={handleChange} rows={5} />
        </div>

        <SectionHead>Outcomes</SectionHead>
        <div className="adm-field">
          <label htmlFor="outcomes">Outcomes — one per line, as <code>value|suffix|label</code></label>
          <textarea id="outcomes" name="outcomes" placeholder={"42|%|increase in product views\n29|%|faster average browsing speed"} value={form.outcomes} onChange={handleChange} rows={4} />
        </div>
        <div className="adm-field">
          <label htmlFor="results_note">Results note (optional, one extra qualitative line below the outcomes)</label>
          <textarea id="results_note" name="results_note" value={form.results_note} onChange={handleChange} rows={2} />
        </div>

        <SectionHead>Services Delivered (optional)</SectionHead>
        <div className="adm-field">
          <label htmlFor="services">Services (one per line)</label>
          <textarea id="services" name="services" placeholder={"Business Analysis\nBackend Development (Spring Boot)"} value={form.services} onChange={handleChange} rows={5} />
        </div>

        <SectionHead>Core Features (optional)</SectionHead>
        <div className="adm-field">
          <label htmlFor="features">Features (one per line)</label>
          <textarea id="features" name="features" value={form.features} onChange={handleChange} rows={5} />
        </div>

        <SectionHead>Why This Stack (optional)</SectionHead>
        <div className="adm-field">
          <label htmlFor="why_stack">Reasons (one per line)</label>
          <textarea id="why_stack" name="why_stack" value={form.why_stack} onChange={handleChange} rows={4} />
        </div>

        <SectionHead>Future Scalability (optional)</SectionHead>
        <div className="adm-field">
          <label htmlFor="scalability">Roadmap points (one per line)</label>
          <textarea id="scalability" name="scalability" value={form.scalability} onChange={handleChange} rows={4} />
        </div>

        <SectionHead>Client Testimonial (optional)</SectionHead>
        <div className="adm-field">
          <label htmlFor="quote_text">Quote</label>
          <textarea id="quote_text" name="quote_text" value={form.quote_text} onChange={handleChange} rows={3} />
        </div>
        <div className="adm-form-row">
          <div className="adm-field">
            <label htmlFor="quote_name">Name (optional)</label>
            <input id="quote_name" name="quote_name" value={form.quote_name} onChange={handleChange} />
          </div>
          <div className="adm-field">
            <label htmlFor="quote_role">Role / company</label>
            <input id="quote_role" name="quote_role" placeholder="VP of Operations, Acme Inc." value={form.quote_role} onChange={handleChange} />
          </div>
        </div>

        <SectionHead>Publish</SectionHead>
        <div className="adm-field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input id="published" type="checkbox" name="published" checked={form.published} onChange={handleChange} style={{ width: "auto" }} />
          <label htmlFor="published" style={{ margin: 0 }}>Published (visible on the live site)</label>
        </div>
        <div className="adm-form-actions">
          <button className="adm-btn" type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          <button className="adm-btn adm-btn--ghost" type="button" onClick={() => navigate("/admin/case-studies")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
