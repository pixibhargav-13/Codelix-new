/* Google cuts a result title off at roughly 60 characters, so a long post or
   case-study title plus a fixed " | Codelix IT Solutions" lost its own end
   to an ellipsis. Append the longest suffix that still fits; a title that is
   already too long on its own goes out bare rather than with a half-shown
   brand. */
const MAX = 60;

export function fitTitle(title, suffixes) {
  for (const suffix of suffixes) {
    if ((title + suffix).length <= MAX) return title + suffix;
  }
  return title;
}
