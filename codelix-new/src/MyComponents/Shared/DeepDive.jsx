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
   answer) can quote on its own, then a table or cards with the detail.
   Renders nothing on a page without an entry. Classes carry `is-in` because
   the pages' reveal observers are set up before this content is known. */
export default function DeepDive({ className = "" }) {
  const { pathname } = useLocation();
  const blocks = DEEP_DIVES[pathname.replace(/\/+$/, "") || "/"];
  if (!blocks) return null;

  return blocks.map((b) => (
    <section className={`v2-section dd2 ${className}`.trim()} id={b.id} key={b.id}>
      <p className="v2-label is-in">{b.label}</p>
      <h2 className="v2-heading is-in">{b.question}</h2>
      <p className="dd2-answer">{b.answer}</p>

      {b.table && (
        <div className="dd2-table-wrap">
          <table className="dd2-table">
            <thead>
              <tr>{b.table.cols.map((c) => <th scope="col" key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {b.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>))}
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
    </section>
  ));
}
