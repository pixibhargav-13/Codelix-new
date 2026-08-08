import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { uploadImage } from "../uploadImage";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CATEGORIES = ["Web Development", "Application Development", "UI/UX Design", "E-Commerce Solutions", "Custom Software Development", "AI Development", "Data Analytics"];

/* same list as the WorkV2 industry-filter dropdown — must match exactly
   or an admin-added case study won't show up when a visitor filters
   /work-v2 by industry */
const INDUSTRIES = ["Manufacturing", "FinTech", "Ai & Data", "Healthcare", "Food and Bavarages", "E-commerce", "Real estae and construction", "Education", "Startups", "B2B SaaS", "Travel & Hospitality"];

/* one item per line — kept as a plain textarea (no repeatable field-group
   UI) for the fields that are just a flat list of strings (challenges,
   solutions, services, features, why-stack, scalability). Snapshot,
   process and outcomes are the three structured (multi-field) items, so
   those get their own repeatable row UI instead — see RepeatField below. */
const linesToArray = (str) => str.split("\n").map((s) => s.trim()).filter(Boolean);
const arrayToLines = (arr) => (arr || []).join("\n");

const emptySnapshotRow = { label: "", value: "" };
const emptyProcessRow = { phase: "", time: "", body: "" };
const emptyOutcomeRow = { value: "", suffix: "", label: "" };

const emptyForm = {
  title: "", slug: "", description: "", category: CATEGORIES[0], industry: INDUSTRIES[0],
  tags: "", tools: "", overview: "", challenges: "", solutions: "",
  cover_image_url: "", is_concept: false,
  snapshot: [],
  challenge_image_1_url: "", challenge_image_1_alt: "",
  challenge_image_2_url: "", challenge_image_2_alt: "",
  process: [], results_note: "", services: "", features: "",
  why_stack: "", scalability: "",
  outcomes: [],
  quote_text: "", quote_role: "", quote_name: "",
  published: false,
};

const SectionHead = ({ children }) => (
  <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: ".02em", color: "#c9cce0", marginTop: 32, marginBottom: 4, textTransform: "uppercase" }}>
    {children}
  </p>
);

/* generic repeatable field group — used for Snapshot, Process, and
   Outcomes, the three fields that are arrays of small objects rather
   than arrays of plain strings. `columns` describes each object's keys
   in render order: { key, placeholder, type: "text" | "textarea" }. */
function RepeatField({ rows, onChange, columns, emptyRow, addLabel }) {
  const updateRow = (i, key, val) => {
    const next = rows.slice();
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const removeRow = (i) => onChange(rows.filter((_, idx) => idx !== i));
  const addRow = () => onChange([...rows, { ...emptyRow }]);

  return (
    <div className="adm-repeat">
      {rows.map((row, i) => (
        <div className="adm-repeat-row" key={i}>
          <div className="adm-repeat-row-fields" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            {columns.map((col) =>
              col.type === "textarea" ? (
                <textarea
                  key={col.key}
                  placeholder={col.placeholder}
                  value={row[col.key] || ""}
                  onChange={(e) => updateRow(i, col.key, e.target.value)}
                  rows={2}
                />
              ) : (
                <input
                  key={col.key}
                  placeholder={col.placeholder}
                  value={row[col.key] || ""}
                  onChange={(e) => updateRow(i, col.key, e.target.value)}
                />
              )
            )}
          </div>
          <button type="button" className="adm-repeat-remove" onClick={() => removeRow(i)} aria-label="Remove">
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn--ghost adm-repeat-add" onClick={addRow}>
        <Plus size={13} strokeWidth={2.2} />
        {addLabel}
      </button>
    </div>
  );
}

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
        category: data.category, industry: data.industry || INDUSTRIES[0], tags: (data.tags || []).join(", "),
        tools: (data.tools || []).join(", "),
        overview: arrayToLines(data.overview),
        challenges: arrayToLines(data.challenges), solutions: arrayToLines(data.solutions),
        cover_image_url: data.cover_image_url || "", is_concept: !!data.is_concept,
        snapshot: data.snapshot?.length ? data.snapshot : [],
        challenge_image_1_url: data.challenge_image_1_url || "", challenge_image_1_alt: data.challenge_image_1_alt || "",
        challenge_image_2_url: data.challenge_image_2_url || "", challenge_image_2_alt: data.challenge_image_2_alt || "",
        process: data.process?.length ? data.process : [], results_note: data.results_note || "",
        services: arrayToLines(data.services), features: arrayToLines(data.features),
        why_stack: arrayToLines(data.why_stack), scalability: arrayToLines(data.scalability),
        outcomes: data.outcomes?.length ? data.outcomes.map((o) => ({ ...o, value: String(o.value) })) : [],
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
      industry: form.industry,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      tools: form.tools.split(",").map((t) => t.trim()).filter(Boolean),
      overview: linesToArray(form.overview),
      outcomes: form.outcomes
        .filter((o) => o.label || o.value)
        .map((o) => ({ value: Number(o.value) || 0, suffix: o.suffix || "", label: o.label || "" })),
      challenges: linesToArray(form.challenges),
      solutions: linesToArray(form.solutions),
      cover_image_url: form.cover_image_url,
      is_concept: form.is_concept,
      snapshot: form.snapshot.filter((s) => s.label || s.value),
      challenge_image_1_url: form.challenge_image_1_url || null,
      challenge_image_1_alt: form.challenge_image_1_alt || null,
      challenge_image_2_url: form.challenge_image_2_url || null,
      challenge_image_2_alt: form.challenge_image_2_alt || null,
      process: form.process.filter((p) => p.phase || p.time || p.body),
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
        <div className="adm-field">
          <label htmlFor="slug">Slug (URL)</label>
          <input id="slug" name="slug" required value={form.slug} onChange={handleSlugChange} />
        </div>
        <div className="adm-form-row">
          <div className="adm-field">
            <label htmlFor="category">Category (used by the Case Studies page filter)</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="adm-field">
            <label htmlFor="industry">Industry (used by the Work page filter)</label>
            <select id="industry" name="industry" value={form.industry} onChange={handleChange}>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
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
          <label>Snapshot facts</label>
          <RepeatField
            rows={form.snapshot}
            onChange={(rows) => setForm((prev) => ({ ...prev, snapshot: rows }))}
            columns={[
              { key: "label", placeholder: "Label — e.g. Industry" },
              { key: "value", placeholder: "Value — e.g. B2B SaaS" },
            ]}
            emptyRow={emptySnapshotRow}
            addLabel="Add fact"
          />
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
          <label>Process phases</label>
          <RepeatField
            rows={form.process}
            onChange={(rows) => setForm((prev) => ({ ...prev, process: rows }))}
            columns={[
              { key: "phase", placeholder: "Phase — e.g. Discovery & Analysis" },
              { key: "time", placeholder: "Time — e.g. 2 weeks" },
              { key: "body", placeholder: "What happened in this phase", type: "textarea" },
            ]}
            emptyRow={emptyProcessRow}
            addLabel="Add phase"
          />
        </div>

        <SectionHead>Outcomes</SectionHead>
        <div className="adm-field">
          <label>Outcomes</label>
          <RepeatField
            rows={form.outcomes}
            onChange={(rows) => setForm((prev) => ({ ...prev, outcomes: rows }))}
            columns={[
              { key: "value", placeholder: "Value — e.g. 42" },
              { key: "suffix", placeholder: "Suffix — e.g. %" },
              { key: "label", placeholder: "Label — e.g. increase in product views" },
            ]}
            emptyRow={emptyOutcomeRow}
            addLabel="Add outcome"
          />
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
