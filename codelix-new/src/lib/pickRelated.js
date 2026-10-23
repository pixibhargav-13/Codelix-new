/* "Related" picks for blog posts and case studies. Both used to take the
   first three matches from the top of the list, so every page linked the
   same three items and the rest of the archive got almost no internal links
   — Google read most posts as unimportant and left several unindexed.

   Highest score first (shared topic), and among equal scores the items that
   come next in the list, wrapping round to the start. Each item is then
   linked from the ones just before it, so links spread across the whole
   archive instead of piling onto the first few. */
export function pickRelated(items, currentIndex, count, score = () => 0) {
  const n = items.length;
  return items
    .map((item, i) => ({ item, dist: (i - currentIndex + n) % n }))
    .filter(({ dist }) => dist !== 0)
    .map((x) => ({ ...x, score: score(x.item) }))
    .sort((a, b) => b.score - a.score || a.dist - b.dist)
    .slice(0, count)
    .map(({ item }) => item);
}
