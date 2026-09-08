import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/* Every submission from the three public forms, newest first.

   Read-only on purpose: an enquiry is a record of something that happened, so
   there is nothing here to edit. Deleting is possible but deliberately not
   offered — losing enquiries is the problem this table exists to solve. */

const TYPES = [
  { key: "all", label: "All" },
  { key: "contact", label: "Contact" },
  { key: "booking", label: "Bookings" },
  { key: "careers", label: "Applications" },
];

const TYPE_LABEL = {
  contact: "Contact",
  booking: "Booking",
  careers: "Application",
};

function when(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminEnquiriesList() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) setError(err.message);
        else setRows(data);
      });
    return () => { active = false; };
  }, []);

  const shown = useMemo(
    () => (rows || []).filter((r) => filter === "all" || r.form_type === filter),
    [rows, filter]
  );

  const counts = useMemo(() => {
    const c = { all: (rows || []).length };
    for (const r of rows || []) c[r.form_type] = (c[r.form_type] || 0) + 1;
    return c;
  }, [rows]);

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <span className="adm-main-eyebrow">Enquiries</span>
          <h1>Form Submissions</h1>
        </div>
      </div>

      <div className="adm-enq-filters">
        {TYPES.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`adm-enq-filter ${filter === t.key ? "is-active" : ""}`}
            onClick={() => setFilter(t.key)}
          >
            {t.label}
            <span className="adm-enq-count">{counts[t.key] || 0}</span>
          </button>
        ))}
      </div>

      {error && <p className="adm-error">{error}</p>}

      {rows === null ? (
        <p className="adm-empty">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="adm-empty">
          {filter === "all"
            ? "No submissions yet. They will appear here as soon as someone uses a form."
            : "Nothing of this type yet."}
        </p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <React.Fragment key={r.id}>
                  <tr>
                    <td>{when(r.created_at)}</td>
                    <td>
                      <span className={`adm-enq-tag adm-enq-tag--${r.form_type}`}>
                        {TYPE_LABEL[r.form_type] || r.form_type}
                      </span>
                    </td>
                    <td>{r.name}</td>
                    <td>
                      <a href={`mailto:${r.email}`}>{r.email}</a>
                    </td>
                    <td>{r.service || "—"}</td>
                    <td>
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost"
                        onClick={() => setOpenId(openId === r.id ? null : r.id)}
                      >
                        {openId === r.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  {openId === r.id && (
                    <tr>
                      <td colSpan={6}>
                        <dl className="adm-enq-detail">
                          {[
                            ["Phone", r.phone],
                            ["Company", r.company],
                            ["Designation", r.designation],
                            ["Discipline", r.discipline],
                            ["Budget", r.budget],
                            ["Timeline", r.timeline],
                            ["Requested date", r.booking_date],
                            ["Requested time", r.booking_time],
                            ["How they heard", r.referral],
                            ["Message", r.message],
                          ]
                            .filter(([, v]) => v)
                            .map(([label, value]) => (
                              <div key={label}>
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                              </div>
                            ))}
                        </dl>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
