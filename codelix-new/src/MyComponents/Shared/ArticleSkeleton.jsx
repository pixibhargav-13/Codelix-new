import React from "react";
import NavbarV2 from "./NavbarV2";
import "./ArticleSkeleton.css";

/* Shown while an article that lives only in Supabase is still on its way.
   Anything published from the admin panel misses the prerender until the site
   is rebuilt, so it takes a round trip the baked-in posts never take. The
   shapes mirror the real header and body, and the navbar is real, so the wait
   reads as the page loading rather than the page being broken. */
export default function ArticleSkeleton({ label = "Loading article" }) {
  return (
    <div className="v2 artsk" aria-busy="true">
      <NavbarV2 />
      <span className="artsk-sr" role="status" aria-live="polite">{label}…</span>

      <header className="artsk-header">
        <div className="artsk-inner">
          {/* breadcrumb */}
          <div className="artsk-row">
            <span className="artsk-bar" style={{ width: 48 }} />
            <span className="artsk-bar" style={{ width: 10 }} />
            <span className="artsk-bar" style={{ width: 42 }} />
          </div>
          {/* tag · date · read time */}
          <div className="artsk-row">
            <span className="artsk-bar" style={{ width: 88 }} />
            <span className="artsk-bar" style={{ width: 116 }} />
            <span className="artsk-bar" style={{ width: 74 }} />
          </div>
          {/* title, two lines like most real ones */}
          <div className="artsk-title">
            <span className="artsk-bar" style={{ width: "82%" }} />
            <span className="artsk-bar" style={{ width: "54%" }} />
          </div>
        </div>
      </header>

      <div className="artsk-body">
        <span className="artsk-bar artsk-hero" />
        {[0, 1, 2].map((block) => (
          <div className="artsk-para" key={block}>
            <span className="artsk-bar" style={{ width: "100%" }} />
            <span className="artsk-bar" style={{ width: "96%" }} />
            <span className="artsk-bar" style={{ width: "99%" }} />
            <span className="artsk-bar" style={{ width: "61%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
