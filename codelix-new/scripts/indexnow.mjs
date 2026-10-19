/* Tells IndexNow — Bing, and through it ChatGPT search, plus Yandex, Seznam
   and the others that share submissions — that the site's pages have
   changed, instead of waiting for them to be recrawled.

   Runs from .github/workflows/indexnow.yml after each production deploy
   reports success. Can also be run by hand:

     node scripts/indexnow.mjs            submit the live sitemap
     node scripts/indexnow.mjs --dry-run  print what would be sent, send nothing

   The key is the file in public/ named <key>.txt whose content is the key.
   IndexNow proves the site owns that key by fetching it from the live
   domain, which is why this has to run after a deploy and never during the
   build: the new files are not served until the build has finished. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const HOST = "www.codelixitsolutions.com";
const ORIGIN = `https://${HOST}`;
const DRY = process.argv.includes("--dry-run");
const here = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(here, "../public");

const keyFile = fs.readdirSync(PUBLIC).find((f) => {
  const m = /^([a-f0-9]{32})\.txt$/.exec(f);
  return m && fs.readFileSync(path.join(PUBLIC, f), "utf8").trim() === m[1];
});
if (!keyFile) {
  console.error("No IndexNow key file in public/ (expected <32 hex chars>.txt containing its own name).");
  process.exit(1);
}
const KEY = keyFile.replace(/\.txt$/, "");
const KEY_LOCATION = `${ORIGIN}/${keyFile}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const parseUrls = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    // IndexNow rejects the whole request if any URL is on another host
    .filter((u) => new URL(u).host === HOST);

/* Every workflow run before this check submitted 0 URLs and still reported
   success: from GitHub's runners the live sitemap request came back without
   a single <loc> (most likely a firewall or bot-check page rather than the
   file), and nothing looked at the response. Now the response is checked,
   retried, and the run fails loudly if no URLs come back. */
async function sitemapUrls() {
  if (DRY) return parseUrls(fs.readFileSync(path.join(here, "../dist/sitemap.xml"), "utf8"));
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(`${ORIGIN}/sitemap.xml?ts=${Date.now()}`, {
        cache: "no-store",
        headers: { "User-Agent": "CodelixIndexNow/1.0 (+https://www.codelixitsolutions.com)", Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8" },
      });
      const body = await res.text();
      const urls = parseUrls(body);
      if (res.ok && urls.length) return urls;
      console.log(`sitemap attempt ${attempt}: HTTP ${res.status}, ${res.headers.get("content-type")}, ${body.length} bytes, ${urls.length} URLs — starts: ${JSON.stringify(body.slice(0, 160))}`);
    } catch (e) {
      console.log(`sitemap attempt ${attempt} failed: ${e.message}`);
    }
    await sleep(15000);
  }
  return [];
}

async function keyIsLive() {
  // the production alias can trail the deploy's success status by a little
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const res = await fetch(KEY_LOCATION, { cache: "no-store" });
      if (res.ok && (await res.text()).trim() === KEY) return true;
      console.log(`key not live yet (attempt ${attempt}, HTTP ${res.status})`);
    } catch (e) {
      console.log(`key not reachable yet (attempt ${attempt}): ${e.message}`);
    }
    await sleep(15000);
  }
  return false;
}

const urlList = await sitemapUrls();
if (!urlList.length) {
  console.error(`No URLs found in ${ORIGIN}/sitemap.xml after 5 attempts — not submitting. See the attempt lines above for what came back.`);
  process.exit(1);
}
const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

if (DRY) {
  console.log(`dry run — would submit ${urlList.length} URLs`);
  console.log(JSON.stringify({ ...body, urlList: [...urlList.slice(0, 3), `… ${urlList.length - 3} more`] }, null, 2));
  process.exit(0);
}

if (!(await keyIsLive())) {
  console.error(`Key file never became reachable at ${KEY_LOCATION} — not submitting.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

/* 200 and 202 both mean accepted; 202 means the key is still being checked.
   The rest are worth spelling out, since a failure here is otherwise silent. */
const meaning = {
  200: "accepted",
  202: "accepted — key validation pending",
  400: "bad request",
  403: "key not valid for this host",
  422: "a URL does not belong to the host, or the key does not match",
  429: "too many requests — try again later",
};
console.log(`IndexNow: HTTP ${res.status} ${meaning[res.status] || ""} — ${urlList.length} URLs`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
