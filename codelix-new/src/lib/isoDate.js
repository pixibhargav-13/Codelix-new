/* The twelve pre-Supabase posts carry their date as a display string
   ("20 October 2024"), and article:published_time and datePublished need
   ISO 8601. Parsed explicitly rather than handed to Date.parse, whose
   handling of that shape is implementation-defined — the prerender and the
   browser have to agree on the answer or the markup changes between them.

   Deliberately its own module with no imports. It used to live in
   data/useBlogPosts.js, and when StructuredData — mounted on every page —
   imported it from there, the bundler followed that file's imports and put
   the full text of every blog post and the whole Supabase client into the
   entry chunk, taking it from 276 KB to 528 KB. */
const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

export function toISODate(value) {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return new Date(value).toISOString();
  const m = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(String(value).trim());
  if (!m) return undefined;
  const month = MONTHS[m[2].toLowerCase()];
  if (month === undefined) return undefined;
  return new Date(Date.UTC(Number(m[3]), month, Number(m[1]))).toISOString();
}
