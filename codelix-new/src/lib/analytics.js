/* Thin wrapper around GA4's gtag.

   Everything here is defensive on purpose: gtag is loaded from an external
   script that ad blockers routinely block, and this code also runs during
   prerendering where there is no window at all. A missing analytics tag must
   never be able to break a form submit — so every call is guarded and silent
   if the tag isn't there. */

const isBrowser = () => typeof window !== "undefined";

function send(name, params = {}) {
  if (!isBrowser()) return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", name, params);
  } catch {
    /* analytics must never surface an error to the user */
  }
}

/* Route changes in a single-page app don't produce page views on their own.
   The gtag snippet in index.html fires exactly one on first load; without
   this, GA4 records every visit as a single-page session unless Enhanced
   Measurement happens to be enabled on the property. Sending it explicitly
   means the data doesn't depend on a dashboard setting. */
export function trackPageView(path, title) {
  if (!isBrowser()) return;
  send("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title || document.title,
  });
}

/* GA4's recommended event name for a lead, so it shows up in the standard
   reports rather than only as a custom event. */
export function trackLead(source, extra = {}) {
  send("generate_lead", { lead_source: source, ...extra });
}

