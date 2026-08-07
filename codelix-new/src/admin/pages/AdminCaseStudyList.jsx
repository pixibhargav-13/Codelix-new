import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminCaseStudyList() {
  const [studies, setStudies] = useState(null);
  const [error, setError] = useState("");
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    let active = true;
    supabase
      .from("case_studies")
      .select("id, title, slug, category, published, published_at, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) setError(err.message);
        else setStudies(data);
      });
    return () => { active = false; };
  }, [refreshIndex]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    const { error: err } = await supabase.from("case_studies").delete().eq("id", id);
    if (err) setError(err.message);
    else setRefreshIndex((n) => n + 1);
  };

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <span className="adm-main-eyebrow">Content</span>
          <h1>Case Studies</h1>
        </div>
        <Link className="adm-btn" to="/admin/case-studies/new">
          <Plus size={16} strokeWidth={2.2} />
          New Case Study
        </Link>
      </div>
      {error && <p className="adm-error">{error}</p>}
      {studies === null ? (
        <p className="adm-empty">Loading…</p>
      ) : studies.length === 0 ? (
        <p className="adm-empty">No case studies yet — create your first one.</p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Slug</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {studies.map((s) => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>{s.category}</td>
                  <td>
                    <span className={`adm-pill ${s.published ? "adm-pill--live" : "adm-pill--draft"}`}>
                      {s.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{s.slug}</td>
                  <td>
                    <div className="adm-row-actions">
                      <Link className="adm-btn adm-btn--ghost" to={`/admin/case-studies/${s.id}`}>Edit</Link>
                      <button className="adm-btn adm-btn--danger" onClick={() => handleDelete(s.id, s.title)}>Delete</button>
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
