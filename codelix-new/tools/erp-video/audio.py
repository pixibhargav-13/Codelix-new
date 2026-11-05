"""Soundtrack for the edition videos: original music plus sound effects,
all synthesized here, so there is nothing licensed in it.

    python audio.py <events.json> <duration seconds> <out.wav>

The music is 120 BPM in A minor (Am F C G, one chord per bar) to match the
stage's beat grid: every scene cut falls on a downbeat. The effects are
placed at the cue times the stage exports (window.__events): a whoosh on
every swipe, a pop as each card lands, a tick for each check mark, an
impact on the hook, the logo and the end card, and so on.
"""
import json
import sys
import wave

import numpy as np

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(7)  # fixed seed: the same soundtrack every render


def note(n):  # MIDI number -> Hz
    return 440.0 * 2 ** ((n - 69) / 12)


def env(n, attack, decay):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-t / max(decay, 1e-4))


def saw(f, n, harmonics=8):
    t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * k * t) / k for k in range(1, harmonics + 1)) * 0.6


def smooth(x, w):  # moving average: a cheap low-pass
    if w <= 1:
        return x
    k = np.ones(w) / w
    return np.convolve(x, k, mode="same")


def add(buf, at, sig, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= buf.shape[1] or i + len(sig) <= 0:
        return
    if i < 0:
        sig = sig[-i:]; i = 0
    sig = sig[: buf.shape[1] - i]
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[0, i:i + len(sig)] += sig * gain * l * 1.414
    buf[1, i:i + len(sig)] += sig * gain * r * 1.414


# ── drums ──────────────────────────────────────────────────────────────
def kick():
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 48 + 110 * np.exp(-t / 0.03)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.16)
    click = rng.standard_normal(n) * np.exp(-t / 0.004) * 0.3
    return np.tanh((body + click) * 1.6)


def clap():
    n = int(0.25 * SR); t = np.arange(n) / SR
    x = np.diff(rng.standard_normal(n + 1))
    x = smooth(x, 3)
    e = np.exp(-t / 0.07)
    for d in (0.0, 0.011, 0.022):  # three quick hits make it a clap
        e += np.where(t > d, np.exp(-(t - d) / 0.012), 0) * 0.6
    return x * e * 0.35


def hat(open_=False):
    n = int((0.18 if open_ else 0.05) * SR); t = np.arange(n) / SR
    x = np.diff(np.diff(rng.standard_normal(n + 2)))
    return x * np.exp(-t / (0.06 if open_ else 0.012)) * 0.12


# ── music ──────────────────────────────────────────────────────────────
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Am F C G


def music(dur):
    n = int(dur * SR) + SR
    drums = np.zeros((2, n)); bass = np.zeros((2, n)); keys = np.zeros((2, n))
    K, C = kick(), clap()
    bars = int(np.ceil(dur / BAR))
    for b in range(bars):
        t0 = b * BAR
        root, third, fifth = CHORDS[b % 4]
        last = t0 + BAR > dur - 2.5
        for beat in range(4):
            tb = t0 + beat * BEAT
            if not last or beat == 0:
                add(drums, tb, K, 0.9)
            if beat in (1, 3) and not last:
                add(drums, tb, C, 0.8, 0.1)
            for half in (0, 0.5):
                add(drums, tb + half * BEAT, hat(open_=(half and beat == 3)), 1.0 if half else 0.6, -0.3)
        # bass: off-beat eighth notes on the root, with a lift on the last beat
        for e in range(8):
            if e % 2 == 0:
                continue
            f = note(root - 24 + (7 if e == 7 else 0))
            seg = int(BEAT / 2 * SR * 0.9)
            add(bass, t0 + e * BEAT / 2, saw(f, seg, 6) * env(seg, 0.005, 0.12), 0.55)
        # pluck arpeggio, sixteenths, up and down the chord
        arp = [root, third, fifth, root + 12, fifth + 12, root + 12, fifth, third]
        for s16 in range(16):
            f = note(arp[s16 % 8] + 12)
            seg = int(0.16 * SR)
            tri = np.sin(2 * np.pi * f * np.arange(seg) / SR) + 0.25 * np.sin(2 * np.pi * 2 * f * np.arange(seg) / SR)
            add(keys, t0 + s16 * BEAT / 4, tri * env(seg, 0.002, 0.06), 0.09, 0.5 if s16 % 2 else -0.5)
        # pad: the chord, soft attack, across the bar
        seg = int(BAR * SR)
        pad = sum(saw(note(m) * d, seg, 5) for m in (root, third, fifth) for d in (0.997, 1.003))
        pe = np.minimum(1, np.arange(seg) / (0.25 * SR)) * np.minimum(1, (seg - np.arange(seg)) / (0.2 * SR))
        add(keys, t0, smooth(pad, 4) * pe, 0.035)
    # sidechain: bass and keys duck under every kick, the classic pump
    duck = np.ones(n)
    tt = np.arange(int(BEAT * SR)) / SR
    shape = 1 - 0.65 * np.exp(-tt / 0.09)
    for b in range(int(np.ceil(dur / BEAT))):
        i = int(b * BEAT * SR)
        if i < n:
            m = min(len(shape), n - i)
            duck[i:i + m] = shape[:m]
    mix = drums + (bass + keys) * duck
    # fade in over the first beat, fade out over the last 2.5 s
    t = np.arange(n) / SR
    fade = np.clip(t / 0.3, 0, 1) * np.clip((dur - t) / 2.5, 0, 1)
    return mix * fade


# ── sound effects ──────────────────────────────────────────────────────
def whoosh():
    n = int(0.5 * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    lo = smooth(x, 18); hi = x - smooth(x, 4)
    # sweeps from dull to bright and back as the band crosses
    m = np.sin(np.pi * t / t[-1])
    sig = lo * (1 - m) + (lo + hi * 0.4) * m
    e = np.exp(-((t - 0.25) / 0.1) ** 2)
    return sig * e * 0.5


def pop():
    n = int(0.12 * SR); t = np.arange(n) / SR
    f = 260 + 700 * np.exp(-t / 0.018)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.035) * 0.55


def tick():
    n = int(0.07 * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * 2400 * t) * 0.6 + np.sin(2 * np.pi * 3600 * t) * 0.3
    return s * env(n, 0.0005, 0.022) * 0.75


def error():
    out = []
    for f in (466, 349):
        n = int(0.075 * SR); t = np.arange(n) / SR
        s = np.sign(np.sin(2 * np.pi * f * t)) * 0.4 + np.sin(2 * np.pi * f * t) * 0.6
        out.append(smooth(s, 6) * env(n, 0.002, 0.05))
    return np.concatenate(out) * 0.28


def impact():
    n = int(1.2 * SR); t = np.arange(n) / SR
    f = 42 + 90 * np.exp(-t / 0.05)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.45)
    crack = smooth(rng.standard_normal(n), 3) * np.exp(-t / 0.05) * 0.5
    tail = smooth(rng.standard_normal(n), 30) * np.exp(-t / 0.35) * 0.6
    return np.tanh((boom + crack + tail) * 1.3) * 0.8


def riser(length=1.5):
    n = int(length * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    p = t / length
    sig = smooth(x, 24) * (1 - p) + (x - smooth(x, 3)) * p * 0.6
    tone = np.sin(2 * np.pi * np.cumsum(200 + 900 * p ** 2) / SR) * 0.15
    return (sig * 0.5 + tone) * p ** 2.2 * 0.6


def sparkle():
    n = int(0.6 * SR); out = np.zeros(n)
    for i, m in enumerate([81, 88, 84, 93, 91]):
        s = int(i * 0.07 * SR); seg = n - s; t = np.arange(seg) / SR
        out[s:] += np.sin(2 * np.pi * note(m) * t) * np.exp(-t / 0.12) * 0.32
    return out


def chime():
    n = int(1.6 * SR); t = np.arange(n) / SR
    f = note(81)  # A5, in key
    s = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / d)
            for r, a, d in [(1, 0.5, 0.9), (2.76, 0.25, 0.4), (5.4, 0.12, 0.2), (2, 0.2, 0.6)])
    return s * np.minimum(1, t / 0.003) * 0.5


def scribble():
    n = int(0.55 * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    band = smooth(x, 4) - smooth(x, 20)
    trem = 0.5 + 0.5 * np.sin(2 * np.pi * 22 * t)
    return band * trem * np.sin(np.pi * t / t[-1]) * 0.35


PENTA = [69, 72, 74, 76, 79, 81, 84, 86, 88, 91, 93, 96]


def blip(i):
    n = int(0.09 * SR); t = np.arange(n) / SR
    f = note(PENTA[i % len(PENTA)])
    return (np.sin(2 * np.pi * f * t) + 0.2 * np.sin(4 * np.pi * f * t)) * env(n, 0.001, 0.03) * 0.6


def soundtrack(events, dur):
    n = int(dur * SR) + SR
    fx = np.zeros((2, n))
    run, last_blip = 0, -9
    for e in events:
        t, kind = e["t"], e["type"]
        if kind == "whoosh":
            # pans left to right, like the swipe
            w = whoosh()
            half = len(w) // 2
            add(fx, t - 0.05, w[:half], 0.9, -0.6)
            add(fx, t - 0.05 + half / SR, w[half:], 0.9, 0.6)
        elif kind == "swoosh":
            # the screen sliding in from the right: a shorter, softer whoosh
            w = whoosh()[int(0.12 * SR):int(0.42 * SR)]
            add(fx, t, w * np.linspace(1, 0.4, len(w)), 0.8, 0.5)
        elif kind == "pop":
            add(fx, t, pop(), 0.9, rng.uniform(-0.3, 0.3))
        elif kind == "tick":
            add(fx, t, tick(), 0.9, 0.2)
        elif kind == "error":
            add(fx, t, error(), 1.0, 0.15)
        elif kind == "impact":
            if t > 1:
                r = riser()
                add(fx, t - len(r) / SR, r, 0.8)
            add(fx, t, impact(), 1.0)
        elif kind == "sparkle":
            add(fx, t, sparkle(), 0.9, 0.3)
        elif kind == "chime":
            add(fx, t, chime(), 0.8)
        elif kind == "scribble":
            add(fx, t, scribble(), 0.9, 0.4)
        elif kind == "blip":
            run = run + 1 if t - last_blip < 0.4 else 0
            last_blip = t
            add(fx, t, blip(run), 1.0, -0.5 + (run % 5) * 0.25)
    m = music(dur)[:, :n]
    # the music steps back a little under every effect, so each one reads
    level = smooth(np.abs(fx).max(axis=0), int(0.03 * SR))
    level = smooth(np.maximum.accumulate(level[::-1])[::-1] * 0 + level, int(0.12 * SR))
    m = m * (1 - 0.45 * np.clip(level / 0.15, 0, 1))
    mix = m * 0.42 + fx[:, :n] * 0.8
    mix = np.tanh(mix * 1.15) * 0.9  # gentle glue and a hard ceiling
    return mix[:, : int(dur * SR)]


def write_wav(path, stereo):
    data = (np.clip(stereo.T, -1, 1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(data.tobytes())


if __name__ == "__main__":
    events = json.load(open(sys.argv[1], encoding="utf8"))
    dur = float(sys.argv[2])
    write_wav(sys.argv[3], soundtrack(events, dur))
    print("wrote", sys.argv[3])
