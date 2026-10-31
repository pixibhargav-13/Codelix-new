import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RELATED_READING, HIRE_PRIORITY } from "../../lib/relatedReading";
import { HIRE_ROLES } from "../HireDevelopersV2/hireDevelopersData";

const MAX_HIRE = 3;
const rank = (slug) => {
  const i = HIRE_PRIORITY.indexOf(slug);
  return i === -1 ? HIRE_PRIORITY.length : i;
};

/* "Related reading" for a hub page — see src/lib/relatedReading.js. Uses the
   same cards as the service pages' "Explore More" row, followed by the hire
   pages for the technologies the service is built with; renders nothing on a
   page with neither. */
export default function RelatedReading({ className = "" }) {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const listed = RELATED_READING[path] || [];
  const hire = HIRE_ROLES
    .filter((r) => r.services.includes(path))
    .sort((a, b) => rank(a.slug) - rank(b.slug))
    .map((r) => ({
      label: r.title,
      path: `/hire-developers/${r.slug}`,
      body: `Dedicated ${r.tech} developers from India, monthly or fixed scope.`,
    }));
  const seen = new Set(listed.map((item) => item.path));
  const items = [...listed, ...hire.filter((item) => !seen.has(item.path)).slice(0, MAX_HIRE)];
  if (!items.length) return null;

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
