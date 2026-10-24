import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RELATED_READING } from "../../lib/relatedReading";

/* "Related reading" for a hub page — see src/lib/relatedReading.js. Uses the
   same cards as the service pages' "Explore More" row; renders nothing on a
   page with no entry. */
export default function RelatedReading({ className = "" }) {
  const { pathname } = useLocation();
  const items = RELATED_READING[pathname.replace(/\/+$/, "") || "/"];
  if (!items) return null;

  return (
    <section className={`v2-section ${className}`.trim()} id="related-reading">
      <p className="v2-label is-in">Related Reading</p>
      <h2 className="v2-heading is-in">Guides and services that go with this.</h2>
      <div className="sd2-other-list">
        {items.map((item, i) => (
          <Link className="sd2-other is-in" to={item.path} key={item.path}>
            <div className="sd2-other-top">
              <span className="sd2-other-icon"><ArrowUpRight size={17} strokeWidth={1.5} /></span>
              <span className="sd2-other-n">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <span className="sd2-other-title">{item.label}</span>
            <p className="sd2-other-body">{item.body}</p>
            <span className="sd2-other-go">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
