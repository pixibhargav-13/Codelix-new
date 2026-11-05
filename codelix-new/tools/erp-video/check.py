"""Layout check for the edition videos, run before rendering.

    python check.py <edition> [--step 0.25]

Steps through the whole timeline and reports, for any moment where a scene
is fully visible (not mid-fade):
  - text that runs outside the 1920x1080 frame
  - text that dips into the blue wave at the bottom (y > 930)
  - text that overflows its own box (clipped)
  - two text blocks that overlap each other
"""
import argparse
import functools
import http.server
import os
import threading

from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(HERE, "dist")

PROBE = r"""
() => {
  const out = [];
  const layers = [...document.querySelectorAll('.vs-layer')].filter(l => parseFloat(l.style.opacity || 1) > 0.99);
  for (const layer of layers) {
    /* leaf text blocks inside the scene, but not inside the ERP screens or phones,
       which are drawn small on purpose and checked as whole boxes instead */
    const els = [...layer.querySelectorAll('h1 span, p, strong, li, figcaption, .vs-pill, .vs-callout, .vs-module span, .vs-end-cta, .vs-sample')]
      .filter(e => !e.closest('.erp2-mock') && !e.closest('.vs-ph'));
    const boxes = [];
    for (const e of els) {
      const cs = getComputedStyle(e);
      let o = 1; for (let n = e; n && n !== layer; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
      if (o < 0.99 || cs.visibility === 'hidden') continue;
      const r = e.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const name = (e.className || e.tagName) + ' "' + e.textContent.trim().slice(0, 40) + '"';
      if (r.left < 0 || r.right > 1920 || r.top < 0 || r.bottom > 1080) out.push('off-frame ' + name);
      else if (r.bottom > 930 && !e.classList.contains('vs-sample')) out.push('in-wave ' + name + ' bottom=' + Math.round(r.bottom));
      if (e.scrollWidth > e.clientWidth + 1 && cs.overflow !== 'visible') out.push('clipped ' + name);
      boxes.push([r, name, e]);
    }
    /* whole-box checks: screens and phones inside the frame and above the wave */
    for (const e of layer.querySelectorAll('.vs-screen, .vs-ph, .vs-card, .vs-portal, .vs-module')) {
      const r = e.getBoundingClientRect();
      let o = 1; for (let n = e; n && n !== layer; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
      if (o < 0.99) continue;
      if (r.right > 1920 || r.left < 0) out.push('box off-frame ' + e.className);
      if (r.bottom > 945) out.push('box in-wave ' + e.className + ' bottom=' + Math.round(r.bottom));
    }
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const [a, an, ae] = boxes[i], [b, bn, be] = boxes[j];
      if (ae.contains(be) || be.contains(ae)) continue;
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ix > 4 && iy > 4) out.push('overlap ' + an + ' / ' + bn);
    }
  }
  /* the corner badge must not sit on scene text */
  const bug = document.querySelector('.vs-bug');
  if (bug) {
    const br = bug.getBoundingClientRect();
    for (const e of document.querySelectorAll('.vs-layer h1 span, .vs-layer .vs-pill')) {
      const r = e.getBoundingClientRect();
      if (r.left < br.right && r.right > br.left && r.top < br.bottom && r.bottom > br.top && parseFloat(getComputedStyle(e).opacity) > 0.5) out.push('under badge "' + e.textContent.trim().slice(0, 30) + '"');
    }
  }
  return out;
}
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("edition")
    ap.add_argument("--step", type=float, default=0.25)
    a = ap.parse_args()

    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *x):
            pass

    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=DIST))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={"width": 1920, "height": 1080})
        page.goto(f"http://127.0.0.1:{httpd.server_address[1]}/index.html?ed={a.edition}")
        page.wait_for_function("window.__ready === true")
        page.evaluate("document.fonts.ready")
        dur = page.evaluate("window.__duration")
        seen = {}
        t = 0.0
        while t < dur:
            page.evaluate("t => window.__seek(t)", t)
            for issue in page.evaluate(PROBE):
                seen.setdefault(issue, []).append(round(t, 2))
            t += a.step
        b.close()
    if not seen:
        print(f"{a.edition}: no layout issues ({dur:.1f}s checked every {a.step}s)")
    for issue, ts in seen.items():
        print(f"{a.edition}: {issue}  at {ts[0]}s..{ts[-1]}s ({len(ts)}x)")


if __name__ == "__main__":
    main()
