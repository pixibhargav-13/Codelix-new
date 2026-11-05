"""Render a Codelix ERP edition demo video from the stage page.

    python render.py <edition> [--stills 3,20,40] [--fps 30] [--out DIR]

Needs Playwright (Chromium) and imageio-ffmpeg. Build the stage first:
    npx vite build --config tools/erp-video/vite.config.mjs

Every frame is drawn from its time (window.__seek), screenshotted and piped
into ffmpeg as H.264, so the video is identical on every run.
"""
import argparse
import functools
import http.server
import os
import subprocess
import threading

import json

import imageio_ffmpeg

import audio
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(HERE, "dist")


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass

    handler = functools.partial(Quiet, directory=DIST)
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("edition")
    ap.add_argument("--stills", help="comma-separated times to save as PNGs instead of a video")
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--out", default=os.path.join(HERE, "out"))
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)

    httpd = serve()
    url = f"http://127.0.0.1:{httpd.server_address[1]}/index.html?ed={a.edition}"
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto(url)
        page.wait_for_function("window.__ready === true")
        page.evaluate("document.fonts.ready")
        page.wait_for_function("[...document.images].every(i => i.complete)")
        duration = page.evaluate("window.__duration")

        if a.stills:
            for t in [float(x) for x in a.stills.split(",")]:
                page.evaluate("t => window.__seek(t)", t)
                # images in a scene mount only when it starts
                page.wait_for_function("[...document.images].every(i => i.complete)")
                page.screenshot(path=os.path.join(a.out, f"{a.edition}-{t:05.1f}.png"))
            print(f"duration {duration:.1f}s")
            browser.close()
            return

        target = os.path.join(a.out, f"codelix-{a.edition}-erp-demo.mp4")
        silent = target.replace(".mp4", ".silent.mp4")
        events = page.evaluate("window.__events")
        ff = subprocess.Popen(
            [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
             "-f", "image2pipe", "-framerate", str(a.fps), "-c:v", "mjpeg", "-i", "-",
             "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-tune", "animation",
             "-pix_fmt", "yuv420p", silent],
            stdin=subprocess.PIPE,
        )
        frames = int(round(duration * a.fps))
        for i in range(frames):
            page.evaluate("t => window.__seek(t)", i / a.fps)
            if i % a.fps == 0:
                page.wait_for_function("[...document.images].every(i => i.complete)")
            ff.stdin.write(page.screenshot(type="jpeg", quality=95))
            if i % (a.fps * 10) == 0:
                print(f"{i}/{frames}", flush=True)
        ff.stdin.close()
        ff.wait()
        browser.close()

        # soundtrack: music on the beat grid plus a sound for every cue
        wav = target.replace(".mp4", ".wav")
        json.dump(events, open(target.replace(".mp4", ".events.json"), "w"), indent=1)
        audio.write_wav(wav, audio.soundtrack(events, duration))
        subprocess.run(
            [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-i", silent, "-i", wav,
             "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", target],
            check=True,
        )
        os.remove(silent)
        print(f"wrote {target} ({os.path.getsize(target) / 1e6:.1f} MB, {duration:.1f}s)")


if __name__ == "__main__":
    main()
