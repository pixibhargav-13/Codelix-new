/* The Codelix ERP edition demo videos, drawn frame by frame.
   Every frame is a pure function of the time t (seconds), so render.py can
   step through it at 30 fps and screenshot each frame: no recording jitter,
   and the same video every time it is rendered. The look follows the
   construction pitch video (cream page, blue wave, bold Hinglish headline,
   the ERP screen in a window), and every screen is the edition's own
   sample-data screen from erpScreens.js, the same ones the page shows. */
import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { Factory, Grid2x2, Shirt, Check, X, ArrowRight, Sparkles } from "lucide-react";
import ErpMock from "../../src/MyComponents/ErpV2/ErpMock.jsx";
import { ERP_INDUSTRIES, erpMark } from "../../src/MyComponents/ErpV2/erpData.js";
import "../../src/MyComponents/ErpV2/ErpV2.css";
import "./stage.css";

/* ── the words for each edition; everything else comes from erpData ── */
const COPY = {
  manufacturing: {
    icon: Factory,
    hook: ["Haan, aap.", "Factory wale."],
    problem: "Factory chal rahi hai. Data nahi.",
    dashboard: ["Poori factory,", "ek screen pe."],
    alerts: "Kya atka hai? Pehle dikhega.",
    screens: [
      ["Kaunsa order late hai?", "Pehle pata chalega."],
      ["Kis godown mein kitna maal?", "Abhi dekho."],
      ["CNC ki photo kheencho.", "Entry ho gayi."],
      ["Rejection ka hisaab,", "wahin ke wahin."],
    ],
    portals: {
      heading: ["Vendor aur customer,", "apne login se."],
      cards: [
        { title: "Vendor portal", points: ["See material requirements", "Accept purchase orders", "Upload invoices", "Track payments"] },
        { title: "Customer portal", points: ["Place orders", "Track dispatch", "Download invoices", "See their ledger"] },
      ],
    },
    floor: "Factory floor pe ho?",
    phone: { worker: "Ramesh Patel", role: "CNC operator", where: "Plant 1, day shift", supplier: "Shree Metals", bill: "SM/26-27/418", po: "Brass rod, 240 kg", poAmt: "₹1,86,400", pay: "₹21,450" },
  },
  ceramic: {
    icon: Grid2x2,
    hook: ["Haan, aap.", "Tiles wale."],
    problem: "Boxes kiln se nikle. Hisaab nahi.",
    dashboard: ["Poora plant,", "ek screen pe."],
    alerts: "Breakage, stock, dealer credit. Sab dikhega.",
    screens: [
      ["Body prep se sorting tak,", "har batch."],
      ["Premium, standard, commercial.", "Alag alag."],
      ["Tooti tile bhi", "cost mein."],
      ["Order se truck tak,", "e-way bill ke saath."],
    ],
    portals: {
      heading: ["Dealer khud dekhega,", "order aur ledger."],
      cards: [
        { title: "Dealer portal", points: ["Place orders", "Track dispatch", "Download invoices", "Check their ledger"] },
        { title: "Vendor portal", points: ["Raw material and packing suppliers", "Accept purchase orders", "Upload invoices", "Track payments"] },
      ],
    },
    floor: "Plant floor pe ho?",
    phone: { worker: "Mahesh Chauhan", role: "Kiln operator", where: "Kiln 2, night shift", supplier: "Om Glaze Chem", bill: "OGC/26-27/77", po: "Glaze, 2 tonnes", poAmt: "₹2,40,000", pay: "₹19,800" },
  },
  textile: {
    icon: Shirt,
    hook: ["Haan, aap.", "Kapda wale."],
    problem: "Lot kahan hai? Kisi ko nahi pata.",
    dashboard: ["Poori mill,", "ek screen pe."],
    alerts: "Kaunsa lot late hai? Sab dikhega.",
    screens: [
      ["Har lot,", "yarn se fabric tak."],
      ["Kitna maal bahar hai?", "Sab dikhega."],
      ["Kg, metre, piece.", "Sab lot-wise."],
      ["Buyer ka order,", "lot se dispatch tak."],
    ],
    portals: {
      heading: ["Job worker aur buyer,", "apne login se."],
      cards: [
        { title: "Job worker portal", points: ["See requirements", "Accept purchase orders", "Upload invoices", "Track payments"] },
        { title: "Buyer portal", points: ["Buyers and agents place orders", "Track dispatch", "Download invoices", "See their ledger"] },
      ],
    },
    floor: "Mill ya unit mein ho?",
    phone: { worker: "Suresh Rathod", role: "Loom jobber", where: "Looms 12–20, day shift", supplier: "Laxmi Yarns", bill: "LY/26-27/305", po: "Cotton 40s yarn, 800 kg", poAmt: "₹2,12,000", pay: "₹18,600" },
  },
};

/* ── timing helpers ───────────────────────────────────────────────── */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
/* 0 → 1 over `dur` seconds from `at`, eased */
const ramp = (t, at, dur = 0.6) => ease((t - at) / dur);
/* style for an element that rises in at `at` */
const rise = (t, at, dist = 40, dur = 0.6) => {
  const p = ramp(t, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};
const pop = (t, at, dur = 0.5) => {
  const p = ramp(t, at, dur);
  return { opacity: p, transform: `scale(${0.85 + 0.15 * p})` };
};

/* ── shared pieces ────────────────────────────────────────────────── */
function Wave({ t }) {
  const shift = Math.sin(t * 0.6) * 40;
  return (
    <svg className="vs-wave" viewBox="0 0 1920 300" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 ${190 + shift * 0.3} C 480 ${80 - shift} 960 ${300 + shift} 1920 ${120 - shift * 0.4} L1920 300 L0 300 Z`} fill="#3e7dfc" opacity=".16" />
      <path d={`M0 ${240 - shift * 0.2} C 520 ${150 + shift} 1100 ${320 - shift} 1920 ${200 + shift * 0.3} L1920 300 L0 300 Z`} fill="#3e7dfc" />
    </svg>
  );
}

function Bug({ name }) {
  return (
    <div className="vs-bug">
      <img src={erpMark} alt="" />
      <span>Codelix ERP</span>
      <em>{name}</em>
    </div>
  );
}

function Pill({ children, style }) {
  return <span className="vs-pill" style={style}>{children}</span>;
}

function Headline({ lines, t, at, size }) {
  return (
    <h1 className="vs-h" style={size ? { fontSize: size } : undefined}>
      {lines.map((l, i) => (
        <span key={i} className={i === lines.length - 1 ? "is-blue" : ""} style={rise(t, at + i * 0.18, 50)}>
          {l}
        </span>
      ))}
    </h1>
  );
}

/* an edition screen in a window that slides in from the right */
function Screen({ screen, t, at, width = "100%" }) {
  const p = ramp(t, at, 0.8);
  return (
    <div className="vs-screen" style={{ width, opacity: p, transform: `translateX(${(1 - p) * 140}px) rotate(${(1 - p) * 2}deg)` }}>
      <ErpMock screen={screen} alt="" />
      <span className="vs-sample">Sample data</span>
    </div>
  );
}

/* ── scenes: [duration, render(localT, ed, copy)] ─────────────────── */
function Hook({ t, ed, copy }) {
  const Icon = copy.icon;
  return (
    <div className="vs-scene vs-hook">
      <div className="vs-hook-copy">
        <Headline lines={copy.hook} t={t} at={0.2} size={170} />
      </div>
      <div className="vs-hook-icon" style={pop(t, 0.6, 0.7)}>
        <Icon size={260} strokeWidth={1.4} />
        <span className="vs-hook-spark" style={pop(t, 1.3)}><Sparkles size={70} strokeWidth={1.6} /></span>
      </div>
    </div>
  );
}

function Problem({ t, ed, copy }) {
  return (
    <div className="vs-scene vs-problem">
      <Pill style={rise(t, 0)}>The problem</Pill>
      <h1 className="vs-h vs-h-md" style={rise(t, 0.15, 50)}>{copy.problem}</h1>
      <div className="vs-problem-grid">
        {ed.problem.points.map((pt, i) => {
          const Icon = pt.icon;
          return (
            <div className="vs-card" key={pt.title} style={rise(t, 0.9 + i * 0.45)}>
              <span className="vs-card-icon is-red"><Icon size={38} strokeWidth={1.8} /></span>
              <strong>{pt.title}</strong>
              <p>{pt.body}</p>
              <span className="vs-x" style={pop(t, 1.3 + i * 0.45)}><X size={30} strokeWidth={3} /></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Brand({ t, ed }) {
  const p = ramp(t, 0.1, 0.8);
  return (
    <div className="vs-scene vs-brand">
      <div className="vs-brand-lock" style={{ opacity: p, transform: `scale(${0.9 + 0.1 * p})` }}>
        <img src={erpMark} alt="" />
        <div>
          <strong>Codelix ERP</strong>
          <span>{ed.name} edition</span>
        </div>
      </div>
      <p className="vs-brand-sub" style={rise(t, 0.8)}>{ed.tagline}</p>
    </div>
  );
}

function Dashboard({ t, ed, copy }) {
  const alertP = ramp(t, 4.2, 0.6);
  return (
    <div className="vs-scene vs-split">
      <div className="vs-split-copy">
        <Pill style={rise(t, 0)}>Dashboard</Pill>
        <Headline lines={copy.dashboard} t={t} at={0.15} size={84} />
        <div className="vs-callout" style={{ opacity: alertP, transform: `translateY(${(1 - alertP) * 30}px)` }}>
          <ArrowRight size={34} strokeWidth={2.6} />
          <span>{copy.alerts}</span>
        </div>
      </div>
      <div className="vs-split-media">
        <Screen screen={ed.heroShot.screen} t={t} at={0.5} />
        {/* the hand-drawn ring around "needs attention", like the original */}
        <svg className="vs-ring" viewBox="0 0 400 260" style={{ opacity: alertP }} aria-hidden="true">
          <ellipse cx="200" cy="130" rx="190" ry="118" fill="none" stroke="#3e7dfc" strokeWidth="6"
            strokeDasharray="1200" strokeDashoffset={1200 * (1 - ramp(t, 4.2, 1))} strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function Explore({ t, ed, copy, idx }) {
  const item = ed.explorer.items[idx];
  const Icon = item.icon;
  return (
    <div className="vs-scene vs-split">
      <div className="vs-split-copy">
        <Pill style={rise(t, 0)}><Icon size={22} strokeWidth={2.4} /> {item.label}</Pill>
        <Headline lines={copy.screens[idx]} t={t} at={0.15} size={66} />
        <p className="vs-sub" style={rise(t, 0.7)}>{item.title}</p>
        <ul className="vs-points">
          {item.points.map((pt, i) => (
            <li key={pt.title} style={rise(t, 2.2 + i * 1.1, 30)}>
              <span className="vs-tick"><Check size={22} strokeWidth={3} /></span>
              <div>
                <strong>{pt.title}</strong>
                <span>{pt.body}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="vs-split-media">
        <Screen screen={item.screen} t={t} at={0.4} />
      </div>
    </div>
  );
}

function Portals({ t, copy }) {
  return (
    <div className="vs-scene vs-centered">
      <Pill style={rise(t, 0)}>Portals</Pill>
      <Headline lines={copy.portals.heading} t={t} at={0.15} size={92} />
      <div className="vs-portals">
        {copy.portals.cards.map((c, i) => (
          <div className="vs-portal" key={c.title} style={rise(t, 1.1 + i * 0.5)}>
            <div className="vs-portal-bar"><i /><i /><i /><span>{c.title} · own login</span></div>
            <ul>
              {c.points.map((p, j) => (
                <li key={p} style={rise(t, 1.8 + i * 0.5 + j * 0.35, 20)}>
                  <span className="vs-tick"><Check size={20} strokeWidth={3} /></span>{p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* phones drawn in code with this edition's sample data; the mobile
   screenshots on the site come from the construction app */
function PhoneShell({ title, children }) {
  return (
    <div className="vs-ph">
      <div className="vs-ph-status"><span>9:41</span><span className="vs-ph-notch" /><span>5G</span></div>
      <div className="vs-ph-head"><img src={erpMark} alt="" /><strong>{title}</strong></div>
      <div className="vs-ph-body">{children}</div>
    </div>
  );
}

function Mobile({ t, ed, copy }) {
  const ph = copy.phone;
  const phones = [
    ["Selfie attendance", (
      <PhoneShell title="Punch">
        <div className="vs-ph-avatar">{ph.worker.split(" ").map((w) => w[0]).join("")}</div>
        <p className="vs-ph-name is-center">{ph.worker}</p>
        <p className="vs-ph-muted is-center">{ph.role}</p>
        <div className="vs-ph-ok">GPS checked: {ph.where}</div>
        <div className="vs-ph-row"><span>In</span><b className="is-green">7:52 AM</b></div>
        <div className="vs-ph-btn">Punch out</div>
      </PhoneShell>
    )],
    ["Scan a bill", (
      <PhoneShell title="Purchase bill">
        <div className="vs-ph-bill"><i /><i /><i /><i /><i /></div>
        <div className="vs-ph-ok">Filled in from the scan</div>
        <div className="vs-ph-field"><span>Supplier</span><b>{ph.supplier}</b></div>
        <div className="vs-ph-field"><span>Bill no.</span><b>{ph.bill}</b></div>
        <div className="vs-ph-field"><span>Date</span><b>04 Nov 2026</b></div>
      </PhoneShell>
    )],
    ["Approve on the go", (
      <PhoneShell title="Approvals">
        <p className="vs-ph-muted">Purchase order, waiting on you</p>
        <p className="vs-ph-name">{ph.po}</p>
        <p className="vs-ph-amt">{ph.poAmt}</p>
        <div className="vs-ph-row"><span>Level 1</span><b className="is-green">Approved</b></div>
        <div className="vs-ph-row"><span>Level 2</span><b className="is-amber">You</b></div>
        <div className="vs-ph-actions"><span className="is-yes">Approve</span><span className="is-no">Reject</span></div>
      </PhoneShell>
    )],
    ["Payslip on phone", (
      <PhoneShell title="My payslips">
        <div className="vs-ph-slip"><span>Oct 2026</span><b>{ph.pay}</b><em>26 of 27 days</em></div>
        <div className="vs-ph-slip"><span>Sep 2026</span><b>{ph.pay}</b><em>27 of 27 days</em></div>
        <div className="vs-ph-row"><span>Leave left</span><b>4 days</b></div>
      </PhoneShell>
    )],
  ];
  return (
    <div className="vs-scene vs-mobile">
      <div className="vs-mobile-copy">
        <Pill style={rise(t, 0)}>Mobile app</Pill>
        <Headline lines={[copy.floor, "Phone kaafi hai."]} t={t} at={0.15} size={74} />
        <p className="vs-sub" style={rise(t, 0.8)}>{ed.mobile.body}</p>
      </div>
      <div className="vs-phones">
        {phones.map(([title, el], i) => (
          <figure className="vs-phone" key={title} style={rise(t, 0.9 + i * 0.35, 80, 0.8)}>
            {el}
            <figcaption>{title}</figcaption>
          </figure>
        ))}
      </div>
      <span className="vs-sample is-floating">Sample data</span>
    </div>
  );
}

function Ai({ t, ed }) {
  return (
    <div className="vs-scene vs-centered">
      <Pill style={rise(t, 0)}>AI that works with your data</Pill>
      <Headline lines={["Data sirf store nahi.", "Samjhata bhi hai."]} t={t} at={0.15} size={92} />
      <div className="vs-ai">
        {ed.ai.items.map((a, i) => {
          const Icon = a.icon;
          return (
            <div className="vs-card" key={a.title} style={rise(t, 1.1 + i * 0.5)}>
              <span className="vs-card-icon"><Icon size={36} strokeWidth={1.8} /></span>
              <strong>{a.title}</strong>
              <p>{a.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Modules({ t, ed }) {
  return (
    <div className="vs-scene vs-centered">
      <Pill style={rise(t, 0)}>The platform</Pill>
      <Headline lines={[`${ed.modules.items.length} modules.`, "Ek system."]} t={t} at={0.15} size={92} />
      <div className="vs-modules">
        {ed.modules.items.map((m, i) => {
          const Icon = m.icon;
          return (
            <div className="vs-module" key={m.n} style={pop(t, 0.9 + i * 0.16)}>
              <Icon size={34} strokeWidth={1.8} />
              <span>{m.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Trust({ t, ed }) {
  return (
    <div className="vs-scene vs-centered">
      <Pill style={rise(t, 0)}>Already in use</Pill>
      <Headline lines={["Live with paying clients.", "Not a prototype."]} t={t} at={0.15} size={92} />
      <div className="vs-trust">
        {ed.traction.slice(1, 4).map((x, i) => {
          const Icon = x.icon;
          return (
            <div className="vs-card" key={x.title} style={rise(t, 1.1 + i * 0.5)}>
              <span className="vs-card-icon"><Icon size={36} strokeWidth={1.8} /></span>
              <strong>{x.title}</strong>
              <p>{x.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function End({ t, ed }) {
  return (
    <div className="vs-scene vs-end">
      <Headline lines={["Grow your business", "with us."]} t={t} at={0.2} size={130} />
      <div className="vs-end-cta" style={pop(t, 1.2)}>Book a free demo <ArrowRight size={34} strokeWidth={2.6} /></div>
      <p className="vs-end-url" style={rise(t, 1.7)}>codelixitsolutions.com/products/codelix-erp/{ed.slug}</p>
    </div>
  );
}

function scenesFor(ed) {
  const list = [
    [4.5, Hook], [8, Problem], [4, Brand], [8.5, Dashboard],
    ...ed.explorer.items.map((_, idx) => [8.5, (p) => <Explore {...p} idx={idx} />]),
    [8, Portals], [7.5, Mobile], [8.5, Ai], [6.5, Modules],
  ];
  if (ed.traction) list.push([6.5, Trust]);
  list.push([6, End]);
  return list;
}

const FADE = 0.45;

function Video({ ed, t }) {
  const copy = COPY[ed.slug];
  const scenes = scenesFor(ed);
  let start = 0;
  const layers = [];
  scenes.forEach(([dur, Scene], i) => {
    const local = t - start;
    /* a dip, not a crossfade: the old scene clears in the first 0.2s of
       the next one, then the new one fades up, so text never doubles up */
    if (local >= 0 && local < dur + FADE) {
      const fadeIn = i === 0 ? 1 : clamp((local - 0.2) / 0.25);
      const fadeOut = local > dur ? 1 - clamp((local - dur) / 0.2) : 1;
      layers.push(
        <div className="vs-layer" key={i} style={{ opacity: Math.min(fadeIn, fadeOut) }}>
          <Scene t={local} ed={ed} copy={copy} />
        </div>
      );
    }
    start += dur;
  });
  return (
    <div className="vs-frame">
      <Wave t={t} />
      {layers}
      {t > 4.5 && <div style={{ opacity: ramp(t, 4.6, 0.4) }}><Bug name={ed.name} /></div>}
    </div>
  );
}

export const durationOf = (slug) =>
  scenesFor(ERP_INDUSTRIES.find((i) => i.slug === slug)).reduce((s, [d]) => s + d, 0);

/* render.py drives this: ?ed=<slug>, then window.__seek(t) per frame */
const params = new URLSearchParams(location.search);
const ed = ERP_INDUSTRIES.find((i) => i.slug === (params.get("ed") || "manufacturing"));
const root = createRoot(document.getElementById("root"));
window.__duration = durationOf(ed.slug);
window.__seek = (t) =>
  new Promise((resolve) => {
    flushSync(() => root.render(<Video ed={ed} t={t} />));
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
window.__seek(Number(params.get("t") || 0)).then(() => { window.__ready = true; });
