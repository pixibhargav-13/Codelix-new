import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/* One component, three sections. Each public form gets its own page in the
   sidebar because the three are read for different reasons and by different
   people — a booking needs acting on today, an application goes to whoever
   is hiring, a contact enquiry is sales. A single mixed list made you filter
   every time to find the one you came for.

   The columns differ per type for the same reason: a booking is useless
   without its slot, an application without its discipline.

   Read-only on purpose. An enquiry records something that happened, so there
   is nothing to edit, and no delete button — losing enquiries is the problem
   this table exists to solve. */

const VIEWS = {
  contact: {
    eyebrow: "Enquiries",
    heading: "Contact Enquiries",
    empty: "No contact enquiries yet. They appear here as soon as someone uses the contact form.",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email", email: true },
      { key: "company", label: "Company" },
      { key: "service", label: "Service" },
      { key: "budget", label: "Budget" },
    ],
    detail: [
      ["Phone", "phone"],
      ["Designation", "designation"],
      ["Timeline", "timeline"],
      ["How they heard", "referral"],
      ["About the project", "message"],
    ],
  },
  booking: {
    eyebrow: "Enquiries",
    heading: "Consultation Bookings",
    empty: "No bookings yet. Consultations booked from the site appear here.",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email", email: true },
      { key: "phone", label: "Phone" },
      { key: "booking_date", label: "Requested date" },
      { key: "booking_time", label: "Time" },
    ],
    detail: [
      ["Company", "company"],
      ["Service", "service"],
      ["Message", "message"],
    ],
  },
  careers: {
    eyebrow: "Hiring",
    heading: "Job Applications",
    empty: "No applications yet. Submissions from the careers page appear here.",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email", email: true },
      { key: "discipline", label: "Discipline" },
      { key: "portfolio", label: "Portfolio", link: true },
    ],
    /* message stays here: it is free-form prose and would either stretch the
       table or be truncated to a useless fragment */
    detail: [
      ["Phone", "phone"],
      ["Message", "message"],
    ],
  },
};

/* Portfolio links are shown without the scheme and trimmed, so a long URL
   cannot stretch the table. The full address stays on the href and the
   title attribute. */
function shortUrl(value) {
  const bare = String(value)
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  return bare.length > 34 ? bare.slice(0, 34) + "…" : bare;
}

function when(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminEnquiriesList({ type = "contact" }) {
  const view = VIEWS[type] || VIEWS.contact;
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    let active = true;
    setRows(null);
    setOpenId(null);
    supabase
      .from("enquiries")
      .select("*")
      .eq("form_type", type)
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) setError(err.message);
        else setRows(data);
      });
    return () => { active = false; };
  }, [type]);

  const newThisWeek = useMemo(() => {
    if (!rows) return 0;
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return rows.filter((r) => new Date(r.created_at).getTime() > weekAgo).length;
  }, [rows]);

  return (
    <div>
      <div className="adm-main-head">
        <div>
          <span className="adm-main-eyebrow">{view.eyebrow}</span>
          <h1>{view.heading}</h1>
        </div>
        {rows !== null && rows.length > 0 && (
          <span className="adm-enq-summary">
            {rows.length} total
            {newThisWeek > 0 && <strong> · {newThisWeek} this week</strong>}
          </span>
        )}
      </div>

      {error && <p className="adm-error">{error}</p>}

      {rows === null ? (
        <p className="adm-empty">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="adm-empty">{view.empty}</p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Received</th>
                {view.columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <React.Fragment key={r.id}>
                  <tr>
                    <td>{when(r.created_at)}</td>
                    {view.columns.map((c) => (
                      <td key={c.key}>
                        {c.email && r[c.key] ? (
                          <a href={`mailto:${r[c.key]}`}>{r[c.key]}</a>
                        ) : c.link && r[c.key] ? (
                          <a href={r[c.key]} target="_blank" rel="noopener noreferrer" title={r[c.key]}>
                            {shortUrl(r[c.key])}
                          </a>
                        ) : (
                          r[c.key] || "—"
                        )}
                      </td>
                    ))}
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
                      <td colSpan={view.columns.length + 2}>
                        <dl className="adm-enq-detail">
                          {view.detail
                            .filter(([, key]) => r[key])
                            .map(([label, key]) => (
                              <div key={key}>
                                <dt>{label}</dt>
                                <dd>{r[key]}</dd>
                              </div>
                            ))}
                          {!view.detail.some(([, key]) => r[key]) && (
                            <div>
                              <dd>No further details were provided.</dd>
                            </div>
                          )}
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
