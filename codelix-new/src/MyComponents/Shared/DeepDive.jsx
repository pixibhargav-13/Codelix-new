import { Link, useLocation } from "react-router-dom";
import { DEEP_DIVES } from "../../lib/deepDives";
import "./DeepDive.css";

const isInternal = (href) => href.startsWith("/");

function Anchor({ href, children }) {
  return isInternal(href)
    ? <Link to={href}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

/* The page's own question-and-answer sections — see src/lib/deepDives.js.
   Each block is a question as the H2, a direct answer a reader (or an AI
   answer) can quote on its own, then the detail: big-number stat cards,
   price cards, a table (with its answer column highlighted) or text cards.
   Renders nothing on a page without an entry. Classes carry `is-in` because
   the pages' reveal observers are set up before this content is known. */
export default function DeepDive({ className = "" }) {
  const { pathname } = useLocation();
  const blocks = DEEP_DIVES[pathname.replace(/\/+$/, "") || "/"];
  if (!blocks) return null;

  return blocks.map((b, bi) => (
    <section
      className={`v2-section dd2 ${bi % 2 ? "v2-section--void" : ""} ${className}`.replace(/\s+/g, " ").trim()}
      id={b.id}
      key={b.id}
    >
      <div className="dd2-head">
        <div>
          <p className="v2-label is-in">{b.label}</p>
          <h2 className="v2-heading is-in">{b.question}</h2>
        </div>
        <p className="dd2-answer">{b.answer}</p>
      </div>

      {b.stats && (
        <div className="dd2-stats">
          {b.stats.map((st) => (
            <article className="dd2-stat" key={st.label}>
              <span className="dd2-stat-value">{st.value}</span>
              <h3 className="dd2-stat-label">{st.label}</h3>
              <p className="dd2-stat-body">{st.body}</p>
            </article>
          ))}
        </div>
      )}

      {b.cards && (
        <div className="dd2-prices">
          {b.cards.map((c, i) => (
            <article className="dd2-price" key={c.label}>
              <span className="dd2-price-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="dd2-price-label">{c.label}</h3>
              <span className="dd2-price-value">{c.value}</span>
              <p className="dd2-price-body">{c.body}</p>
            </article>
          ))}
        </div>
      )}

      {b.table && (
        <div className="dd2-table-wrap">
          <table className="dd2-table">
            <thead>
              <tr>
                {b.table.cols.map((c, i) => (
                  <th scope="col" key={c} className={i === b.table.highlight ? "is-key" : undefined}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (i === 0
                    ? <th scope="row" key={i}>{cell}</th>
                    : <td key={i} className={i === b.table.highlight ? "is-key" : undefined}>{cell}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {b.points && (
        <div className="dd2-points">
          {b.points.map((p) => (
            <article className="dd2-point" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              {p.links && (
                <p className="dd2-point-links">
                  {p.links.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 && " · "}
                      <Anchor href={l.href}>{l.label}</Anchor>
                    </span>
                  ))}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {(b.source || b.more) && (
        <div className="dd2-foot">
          {b.source && (
            <p className="dd2-source">
              Source: <Anchor href={b.source.href}>{b.source.label}</Anchor>
            </p>
          )}
          {b.more && (
            <p className="dd2-more">
              {b.more.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && " · "}
                  <Anchor href={l.href}>{l.label} →</Anchor>
                </span>
              ))}
            </p>
          )}
        </div>
      )}
    </section>
  ));
}
