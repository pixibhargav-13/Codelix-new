import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { uploadImage } from "../uploadImage";

const emptyForm = { name: "", role: "", quote: "", avatar_url: "", is_featured: true, sort_order: 0 };

export default function AdminTestimonialForm() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error: err } = await supabase.from("testimonials").select("*").eq("id", id).single();
      if (err) { setError(err.message); setLoading(false); return; }
      setForm({
        name: data.name, role: data.role || "", quote: data.quote,
        avatar_url: data.avatar_url || "", is_featured: data.is_featured, sort_order: data.sort_order,
      });
      setLoading(false);
    })();
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file, "testimonials");
      setForm((prev) => ({ ...prev, avatar_url: url }));
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
      name: form.name, role: form.role, quote: form.quote,
      avatar_url: form.avatar_url, is_featured: form.is_featured,
      sort_order: Number(form.sort_order) || 0,
    };

    const query = isNew
      ? supabase.from("testimonials").insert(payload)
      : supabase.from("testimonials").update(payload).eq("id", id);

    const { error: err } = await query;
    setSaving(false);
    if (err) setError(err.message);
    else navigate("/admin/testimonials");
  };

  if (loading) return <p className="adm-empty">Loading…</p>;

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <Link className="adm-back" to="/admin/testimonials">
            <ArrowLeft size={14} strokeWidth={2} />
            Testimonials
          </Link>
          <h1>{isNew ? "New Testimonial" : "Edit Testimonial"}</h1>
        </div>
      </div>
      {error && <p className="adm-error">{error}</p>}
      <form className="adm-form" onSubmit={handleSubmit}>
        <div className="adm-form-row">
          <div className="adm-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required value={form.name} onChange={handleChange} />
          </div>
          <div className="adm-field">
            <label htmlFor="role">Role / Company</label>
            <input id="role" name="role" placeholder="CEO, Harmony Inc." value={form.role} onChange={handleChange} />
          </div>
        </div>
        <div className="adm-field">
          <label htmlFor="quote">Quote</label>
          <textarea id="quote" name="quote" required value={form.quote} onChange={handleChange} rows={5} />
        </div>
        <div className="adm-field">
          <label htmlFor="avatar">Avatar / logo</label>
          <input id="avatar" type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
          {uploading && <span style={{ fontSize: 12, color: "#8b90a3" }}>Uploading…</span>}
          {form.avatar_url && (
            <div className="adm-file-preview">
              <img src={form.avatar_url} alt="" style={{ borderRadius: "50%", width: 64, height: 64 }} />
            </div>
          )}
        </div>
        <div className="adm-form-row">
          <div className="adm-field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <input id="is_featured" type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} style={{ width: "auto" }} />
            <label htmlFor="is_featured" style={{ margin: 0 }}>Show on the live site</label>
          </div>
          <div className="adm-field">
            <label htmlFor="sort_order">Sort order</label>
            <input id="sort_order" type="number" name="sort_order" value={form.sort_order} onChange={handleChange} />
          </div>
        </div>
        <div className="adm-form-actions">
          <button className="adm-btn" type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          <button className="adm-btn adm-btn--ghost" type="button" onClick={() => navigate("/admin/testimonials")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
