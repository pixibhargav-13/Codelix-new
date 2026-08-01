import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminTestimonialsList() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    let active = true;
    supabase
      .from("testimonials")
      .select("id, name, role, is_featured, sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) setError(err.message);
        else setRows(data);
      });
    return () => { active = false; };
  }, [refreshIndex]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;
    const { error: err } = await supabase.from("testimonials").delete().eq("id", id);
    if (err) setError(err.message);
    else setRefreshIndex((n) => n + 1);
  };

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <span className="adm-main-eyebrow">Content</span>
          <h1>Testimonials</h1>
        </div>
        <Link className="adm-btn" to="/admin/testimonials/new">
          <Plus size={16} strokeWidth={2.2} />
          New Testimonial
        </Link>
      </div>
      {error && <p className="adm-error">{error}</p>}
      {rows === null ? (
        <p className="adm-empty">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="adm-empty">No testimonials yet — add your first one.</p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.role}</td>
                  <td>
                    <span className={`adm-pill ${t.is_featured ? "adm-pill--live" : "adm-pill--draft"}`}>
                      {t.is_featured ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-row-actions">
                      <Link className="adm-btn adm-btn--ghost" to={`/admin/testimonials/${t.id}`}>Edit</Link>
                      <button className="adm-btn adm-btn--danger" onClick={() => handleDelete(t.id, t.name)}>Delete</button>
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
