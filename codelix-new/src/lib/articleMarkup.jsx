import React from "react";
import { Link } from "react-router-dom";

/* The blog's article markup, rendered without dangerouslySetInnerHTML.
   Blocks are separated by a blank line:
     "## " / "### "   headings ("## " ones get an id for the table of contents)
     "- "             bullet list (one item per line, whole list in one block)
     "1. "            numbered list
     "> "             quote
     "| a | b |"      table: every line starts with "|"; the first row is the
                      header, a "|---|" separator row is skipped
     anything else    paragraph
   Inside paragraphs, list items, quotes and table cells, [label](url) is a
   link: links to this site become router links, anything else opens in a
   new tab. Older posts store "\n" as a literal backslash-n, so both forms
   are accepted. */

const SITE = /^https?:\/\/(www\.)?codelixitsolutions\.com/i;
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const BLOCK_SPLIT = /\n\n|\\n\\n/;

export function inline(text, keyPrefix = "") {
  const out = [];
  let last = 0;
  let m;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    const key = `${keyPrefix}l${m.index}`;
    const local = href.startsWith("/") ? href : SITE.test(href) ? href.replace(SITE, "") || "/" : null;
    out.push(
      local !== null
        ? <Link key={key} to={local}>{label}</Link>
        : <a key={key} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* link markup reduced to its label, for places that need plain text */
const plain = (text) => text.replace(LINK, "$1");

/* a stable anchor for a heading, used by the table of contents */
export const headingId = (text) =>
  plain(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

const blocksOf = (content) => content.split(BLOCK_SPLIT).map((b) => b.trim()).filter(Boolean);

/* the article's "## " headings, in order, for the table of contents */
const FAQ_HEADING = /^## (frequently asked questions|faqs?)\b/i;

/* the article's "## " headings, in order, for the table of contents. The
   FAQ is left out: the page shows it as an accordion below the article. */
export const articleHeadings = (content) =>
  blocksOf(content)
    .filter((b) => b.startsWith("## ") && !FAQ_HEADING.test(b))
    .map((b) => ({ id: headingId(b.slice(3)), text: plain(b.slice(3)) }));

/* questions and answers under a "## Frequently asked questions" (or
   "## FAQ") heading: each "### " question takes the paragraphs after it as
   its answer, up to the next heading. Feeds the FAQPage markup, so it can
   only ever describe questions that are visible on the page. */
export function articleFaqs(content) {
  const blocks = blocksOf(content);
  const start = blocks.findIndex((b) => /^## (frequently asked questions|faqs?)\b/i.test(b));
  if (start < 0) return [];
  const faqs = [];
  for (const b of blocks.slice(start + 1)) {
    if (b.startsWith("## ")) break;
    if (b.startsWith("### ")) faqs.push({ q: plain(b.slice(4)), a: "" });
    /* the closing "book a consultation" line often follows the last answer */
    else if (CONTACT_LINK.test(b)) continue;
    else if (faqs.length) faqs[faqs.length - 1].a = `${faqs[faqs.length - 1].a} ${plain(b)}`.trim();
  }
  return faqs.filter((f) => f.a);
}

const lines = (block) => block.split(/\\n|\n/).map((l) => l.trim()).filter(Boolean);
const cells = (row) => row.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

/* options:
     insert   { beforeHeading: n, node } puts node just before the article's
              nth "## " heading (0-based), for a mid-article call to action
     skipFaq  leave out the "## Frequently asked questions" section (heading
              and everything up to the next "## "), when the page shows the
              questions in its own FAQ accordion instead */
export function renderArticle(content, { insert, skipFaq = false } = {}) {
  let h2 = -1;
  let inFaq = false;
  return content.split(BLOCK_SPLIT).map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (skipFaq) {
      if (FAQ_HEADING.test(trimmed)) { inFaq = true; return null; }
      if (inFaq && trimmed.startsWith("## ")) inFaq = false;
      /* the closing call to action can follow the FAQ; keep it */
      if (inFaq && !CONTACT_LINK.test(trimmed)) return null;
    }
    if (trimmed.startsWith("### ")) return <h3 key={index}>{plain(trimmed.slice(4))}</h3>;
    if (trimmed.startsWith("## ")) {
      h2 += 1;
      const text = trimmed.slice(3);
      const heading = <h2 key={index} id={headingId(text)}>{plain(text)}</h2>;
      return insert && h2 === insert.beforeHeading
        ? <React.Fragment key={index}>{insert.node}{heading}</React.Fragment>
        : heading;
    }
    if (trimmed.startsWith("> ")) return <blockquote key={index}>{inline(trimmed.slice(2), `${index}-`)}</blockquote>;
    if (trimmed.startsWith("- ")) {
      const items = lines(trimmed).filter((l) => l.startsWith("- "));
      return (
        <ul key={index}>
          {items.map((item, i) => <li key={i}>{inline(item.replace(/^-\s*/, ""), `${index}-${i}-`)}</li>)}
        </ul>
      );
    }
    if (/^1\.\s/.test(trimmed)) {
      const items = lines(trimmed).filter((l) => /^\d+\.\s/.test(l));
      return (
        <ol key={index}>
          {items.map((item, i) => <li key={i}>{inline(item.replace(/^\d+\.\s*/, ""), `${index}-${i}-`)}</li>)}
        </ol>
      );
    }
    if (trimmed.startsWith("|")) {
      const rows = lines(trimmed).filter((l) => l.startsWith("|") && !/^\|[\s:|-]+\|?$/.test(l));
      const [head, ...body] = rows.map(cells);
      return (
        <div className="bdv2-table" key={index}>
          <table>
            <thead><tr>{head.map((c, i) => <th key={i}>{inline(c, `${index}-h${i}-`)}</th>)}</tr></thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c, `${index}-${ri}-${ci}-`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    /* "Short answer: …" — the answer-first opening — is set apart as a
       callout, so a skimming reader gets the verdict without reading on */
    const short = trimmed.match(/^short answer:\s*/i);
    if (short) {
      return (
        <div className="bdv2-answer" key={index}>
          <span className="bdv2-answer-k">Short answer</span>
          <p>{inline(trimmed.charAt(short[0].length).toUpperCase() + trimmed.slice(short[0].length + 1), `${index}-`)}</p>
        </div>
      );
    }
    /* the paragraph inviting the reader to book ("…[Book a free
       consultation](…/contact)") is replaced by the site's standard button
       alone — the sentence only repeated what the button says. The "Book…"
       text also makes it open the booking modal (see bookingTrigger.js) */
    const contact = trimmed.match(CONTACT_LINK);
    if (contact) {
      const label = /book|consult/i.test(contact[1]) ? contact[1] : "Book a free consultation";
      return (
        <div className="bdv2-cta-row" key={index}>
          <Link className="v2-btn v2-btn--filled" to="/contact">
            <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
            <i className="v2-btn-arrow">→</i>
          </Link>
        </div>
      );
    }
    return <p key={index}>{inline(trimmed, `${index}-`)}</p>;
  });
}

const CONTACT_LINK = /\[([^\]]+)\]\((?:https?:\/\/(?:www\.)?codelixitsolutions\.com)?\/contact\/?\)/i;
