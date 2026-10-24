import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

/* Machine-readable dates for the pages that are not posts: when a page was
   first published and last changed, read from git history at build time —
   the first and the latest commit touching the page's source (plus, for a
   template shared by many URLs such as /industries/:slug, the data files
   next to it, which is where those pages' content lives).

   On a shallow clone (Vercel's default) the oldest commit git can see is not
   the real first one, so datePublished is left out rather than guessed; set
   VERCEL_DEEP_CLONE=true in the project's environment to get it. Without git
   at all, both are left out. */
export function createPageDates(repoDir) {
  const git = (args) => {
    try {
      return execFileSync("git", args, { cwd: repoDir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    } catch {
      return null;
    }
  };
  /* Vercel builds from a shallow clone, so `git log -- <file>` saw only the
     deploy commit and every page's lastmod and dateModified became the
     deploy date — 109 of 145 sitemap URLs on one day, which teaches Google
     to ignore lastmod. Fetch the rest of the history first (the repository
     is public, so no credentials are needed); if that fails, give no dates
     at all rather than wrong ones. */
  if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
    try {
      execFileSync("git", ["fetch", "--unshallow", "--quiet"], { cwd: repoDir, stdio: "ignore", timeout: 120000 });
    } catch {
      /* no network or no remote: dates are left out below */
    }
  }
  const shallow = git(["rev-parse", "--is-shallow-repository"]) === "true";
  if (shallow) {
    console.warn("⚠️ git history is shallow and could not be deepened — page dates and sitemap lastmod are left out");
    return () => null;
  }
  const cache = new Map();

  const datesOf = (files) => {
    const key = files.join("|");
    if (cache.has(key)) return cache.get(key);
    const out = git(["log", "--format=%cI", "--", ...files]);
    const stamps = out ? out.split("\n").filter(Boolean) : [];
    const result = stamps.length
      ? { modified: stamps[0], published: shallow ? undefined : stamps[stamps.length - 1] }
      : null;
    cache.set(key, result);
    return result;
  };

  return function pageDates({ file, template }) {
    const files = [file];
    if (template) {
      const dir = path.dirname(file);
      for (const f of fs.readdirSync(dir)) if (/Data\.js$/.test(f)) files.push(path.join(dir, f));
    }
    return datesOf(files.map((f) => path.relative(repoDir, f)));
  };
}
