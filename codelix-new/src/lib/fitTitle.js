/* Google cuts a result title off at roughly 60 characters, so a long post or
   case-study title plus a fixed " | Codelix IT Solutions" lost its own end
   to an ellipsis. Append the longest suffix that still fits; a title that is
   already too long on its own goes out bare rather than with a half-shown
   brand.

   A headline that is too long even bare ("AI Chatbot Cost in India: What
   You'll Pay to Build and Run One") is shortened to its lead clause, the part
   before the colon or dash, which is where these headlines put the search
   phrase. The scheduled blog writer publishes straight to Supabase, so this
   is what keeps its titles inside the limit without a hand-written entry in
   seoTitles.js. The on-page H1 keeps the full headline. */
const MAX = 60;
const MIN_LEAD = 20;

export function fitTitle(title, suffixes) {
  const withSuffix = (t) => {
    for (const suffix of suffixes) {
      if ((t + suffix).length <= MAX) return t + suffix;
    }
    return null;
  };
  const fitted = withSuffix(title);
  if (fitted) return fitted;
  if (title.length <= MAX) return title;

  const lead = title.split(/\s*(?::|\s[–—-])\s/)[0].trim();
  if (lead.length >= MIN_LEAD && lead.length < title.length) return withSuffix(lead) || lead;
  return title;
}
