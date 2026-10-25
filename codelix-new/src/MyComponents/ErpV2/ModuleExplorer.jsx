import React, { useRef } from "react";
import ErpMock from "./ErpMock";

/* An edition's modules, one at a time: a tab list beside the selected
   module's screen and points. Construction shows its real screenshots
   (`img`); the other editions show screens drawn in code (`screen`). Replaces twelve stacked sections (about
   6,400px of scrolling) with one panel. Every panel stays in the page, only
   the inactive ones are hidden, so all twelve are still read by search
   engines and screen readers can reach them through the tabs.

   `active` / `onSelect` are owned by the page, so the module cards above
   can open a module here. */
export default function ModuleExplorer({ spotlights, icons, active, onSelect }) {
  const tabsRef = useRef(null);

  /* arrow keys move between tabs, as a tab list should */
  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const n = spotlights.length;
    const next = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (active + step + n) % n;
    onSelect(next);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <div className="erp2-explorer">
      <div className="erp2-explorer-tabs" role="tablist" aria-label="Modules" aria-orientation="vertical" ref={tabsRef} onKeyDown={onKeyDown}>
        {spotlights.map((s, i) => {
          const Icon = s.icon || icons?.[i];
          return (
            <button
              key={s.label}
              type="button"
              role="tab"
              id={`erp2-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`erp2-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              className={`erp2-explorer-tab ${i === active ? "is-active" : ""}`}
              onClick={() => onSelect(i)}
            >
              <span className="erp2-explorer-tab-n">{String(i + 1).padStart(2, "0")}</span>
              {Icon && <Icon size={16} strokeWidth={1.75} />}
              <span className="erp2-explorer-tab-label">{s.label}</span>
            </button>
          );
        })}
      </div>

      {spotlights.map((s, i) => (
        <article
          key={s.label}
          id={`erp2-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`erp2-tab-${i}`}
          hidden={i !== active}
          className="erp2-explorer-panel"
        >
          {s.screen ? (
            <ErpMock screen={s.screen} alt={s.alt} />
          ) : (
            <figure className="erp2-shot erp2-explorer-shot">
              <img src={s.img} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
            </figure>
          )}
          <div className="erp2-explorer-body">
            <span className="erp2-spot-label">{String(i + 1).padStart(2, "0")} · {s.label}</span>
            <h3>{s.title}</h3>
            <dl>
              {s.points.map((pt) => (
                <div key={pt.title}>
                  <dt>{pt.title}</dt>
                  <dd>{pt.body}</dd>
                </div>
              ))}
            </dl>
            <p className="erp2-spot-simple"><strong>In simple words:</strong> {s.simple}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
