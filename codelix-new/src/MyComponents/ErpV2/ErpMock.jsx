import React from "react";

/* A Codelix ERP screen drawn in code, in the same style as the real
   screenshots (blue window bar, white app, KPI cards), for the editions
   that have no screenshots of their own yet. Everything is sized in em off
   one container-relative font size, so the whole screen scales like an
   image. Read as one picture: the alt text goes on the wrapper and the
   sample numbers inside are hidden from screen readers. */
export default function ErpMock({ screen, alt }) {
  const { title, sub, action, kpis, body } = screen;
  return (
    <div className="erp2-mockwrap" role="img" aria-label={alt}>
      <div className="erp2-mock" aria-hidden="true">
        <div className="erp2-mock-bar"><i /><i /><i /></div>
        <div className="erp2-mock-app">
          <div className="erp2-mock-head">
            <div>
              <p className="erp2-mock-title">{title}</p>
              {sub && <p className="erp2-mock-sub">{sub}</p>}
            </div>
            {action && <span className="erp2-mock-action">+ {action}</span>}
          </div>

          {kpis && (
            <div className="erp2-mock-kpis">
              {kpis.map((k) => (
                <div className="erp2-mock-kpi" key={k.l}>
                  <span className={`erp2-mock-kpi-v is-${k.tone || "ink"}`}>{k.v}</span>
                  <span className="erp2-mock-kpi-l">{k.l}</span>
                </div>
              ))}
            </div>
          )}

          {body.type === "chart" && <Chart {...body} />}
          {body.type === "cards" && <Cards {...body} />}
          {body.type === "table" && <Table {...body} />}
        </div>
      </div>
    </div>
  );
}

function Chip({ tone, children }) {
  return <span className={`erp2-mock-chip is-${tone || "blue"}`}>{children}</span>;
}

/* bars on the left, a "needs attention" list on the right */
function Chart({ heading, bars, max, alertsHeading, alerts }) {
  const top = max || Math.max(...bars.map((b) => b.v));
  return (
    <div className="erp2-mock-split">
      <div className="erp2-mock-panel">
        <p className="erp2-mock-panel-h">{heading}</p>
        <div className="erp2-mock-bars">
          {bars.map((b) => (
            <div className="erp2-mock-barcol" key={b.l}>
              <span className="erp2-mock-barval">{b.label}</span>
              <span className={`erp2-mock-barfill ${b.today ? "is-today" : ""}`} style={{ height: `${(b.v / top) * 100}%` }} />
              <span className="erp2-mock-barl">{b.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="erp2-mock-panel">
        <p className="erp2-mock-panel-h">{alertsHeading}</p>
        <ul className="erp2-mock-alerts">
          {alerts.map((a) => (
            <li key={a.text}>
              <i className={`is-${a.tone}`} />
              <span><strong>{a.ref}</strong>{a.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* one card per work order, batch or lot, with its stage trail */
function Cards({ stages, cards }) {
  return (
    <div className="erp2-mock-cards">
      {cards.map((c) => (
        <div className="erp2-mock-card" key={c.code}>
          <div className="erp2-mock-card-top">
            <span className="erp2-mock-avatar" style={{ background: c.color }}>{c.initials}</span>
            <div className="erp2-mock-card-name">
              <span className="erp2-mock-code">{c.code}</span>
              <span className="erp2-mock-card-title">{c.title}</span>
            </div>
            <Chip tone={c.tone}>{c.status}</Chip>
          </div>
          <p className="erp2-mock-meta">{c.meta}</p>
          {stages && (
            <ol className="erp2-mock-stages">
              {stages.map((s, i) => (
                <li key={s} className={i < c.stage ? "is-done" : i === c.stage ? "is-now" : ""}>
                  <i />
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          )}
          <div className="erp2-mock-prog">
            <span>{c.progLabel}</span>
            <span>{c.progress}%</span>
          </div>
          <div className="erp2-mock-track"><span style={{ width: `${c.progress}%` }} /></div>
          <div className="erp2-mock-card-foot">
            <span>{c.foot}</span>
            <span className={`is-${c.footTone || "ink"}`}>{c.footR}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* a list screen; a cell given as { chip, tone } renders as a status chip */
function Table({ cols, rows, align }) {
  return (
    <div className="erp2-mock-panel erp2-mock-tablewrap">
      <table className="erp2-mock-table">
        <thead>
          <tr>{cols.map((c, i) => <th key={c} className={align?.[i] === "r" ? "is-r" : undefined}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (
                <td key={i} className={align?.[i] === "r" ? "is-r" : undefined}>
                  {cell && typeof cell === "object" ? <Chip tone={cell.tone}>{cell.chip}</Chip> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
