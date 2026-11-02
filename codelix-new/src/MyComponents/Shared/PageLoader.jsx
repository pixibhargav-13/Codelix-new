import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { introWillPlay, handOffIntro } from "../../lib/introGate";
import codelixLogo from "../Images/codelix-logo.webp";
import "./PageLoader.css";

/* Module scope, so it resets on a real page load but persists across
   re-renders and client-side navigation back to "/" — the intro plays when
   the page is actually loaded, and doesn't replay while browsing around. */
let hasPlayed = false;

const TAGLINE = "We live in IT";

/* the hero's own three beats (PLAN / BUILD / SCALE), set large, one after
   another, before the logo */
const WORDS = ["Plan.", "Build.", "Scale."];

/* Homepage intro, once per browser session.

   The live Codelix logo (the same asset the navbar uses, so the intro and
   the header can't drift apart) over the tagline, on a dark plate with two
   slowly drifting fields of brand light behind it.

   The handoff is the structural part: the homepage hero runs its own wipe
   on mount, so an intro that merely sits in front of it burns that
   animation behind the plate and reveals an already-finished, static hero.
   The hero is held paused and released as the plate lifts. */
export default function PageLoader() {
  /* always false on server and first client render — matching the server's
     output avoids a hydration mismatch; the real decision happens below */
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const auraARef = useRef(null);
  const auraBRef = useRef(null);
  const barRef = useRef(null);
  const barWrapRef = useRef(null);
  const shineRef = useRef(null);
  const metaRef = useRef(null);
  const wordRefs = useRef([]);
  const gridRef = useRef(null);
  const vignetteRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const letterRefs = useRef([]);
  const lenis = useLenis();

  useEffect(() => {
    if (hasPlayed || !introWillPlay()) return;
    hasPlayed = true;
    setMounted(true);
  }, []);

  /* Hand over from the pre-boot plate baked into the homepage's HTML (see
     scripts/ssg-build.mjs).

     Layout effect, not a passive one, so when the intro DOES play the
     removal commits in the same frame our own plate paints — otherwise the
     page shows through for a frame between the two.

     The second condition matters just as much: on a repeat visit within the
     session the intro is skipped and nothing else would clear the plate, so
     the page sat behind a black screen until the inline 4s fallback fired. */
  useLayoutEffect(() => {
    const willPlay = introWillPlay();
    if (!mounted && willPlay) return;

    const preboot = document.getElementById("pl-preboot");
    if (preboot && preboot.parentNode) preboot.parentNode.removeChild(preboot);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let handedOff = false;
    const releaseHero = () => {
      if (handedOff) return;
      handedOff = true;
      handOffIntro();
    };

    const cleanup = () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      /* never leave the hero waiting on a signal that isn't coming */
      releaseHero();
    };

    const finish = () => {
      cleanup();
      setMounted(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = gsap.to(rootRef.current, { opacity: 0, duration: 0.25, onComplete: finish });
      return () => { t.kill(); cleanup(); };
    }

    /* The shine is a gradient band masked by the logo's alpha channel, so
       moving its background-position reads as light travelling through the
       artwork itself rather than a highlight crossing a box. */
    const sweep = { x: 140 };
    const applySweep = () => {
      const el = shineRef.current;
      if (!el) return;
      el.style.backgroundPosition = `${sweep.x}% 0`;
    };
    applySweep();

    const tl = gsap.timeline({ onComplete: finish });

    /* the ambient fields and the grid drift in for the whole runtime */
    tl.fromTo(
      auraARef.current,
      { opacity: 0, scale: 0.8, xPercent: -6 },
      { opacity: 1, scale: 1.08, xPercent: 3, duration: 2.2, ease: "power2.out" },
      0
    )
      .fromTo(
        auraBRef.current,
        { opacity: 0, scale: 1.12, xPercent: 8 },
        { opacity: 1, scale: 0.92, xPercent: -5, duration: 2.2, ease: "power2.out" },
        0.05
      )
      .fromTo(gridRef.current, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0);

    /* Plan. / Build. / Scale. — each rises out of its mask and leaves upward */
    const words = wordRefs.current.filter(Boolean);
    words.forEach((w, i) => {
      const at = 0.12 + i * 0.46;
      tl.fromTo(w, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.36, ease: "power3.out" }, at)
        .to(w, { yPercent: -110, opacity: 0, duration: 0.24, ease: "power3.in" }, at + 0.3);
    });

    tl
      /* logo rises out of its mask once the three words have passed */
      .fromTo(
        logoRef.current,
        { yPercent: 42, opacity: 0, filter: "blur(10px)" },
        { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, ease: "expo.out" },
        1.52
      )
      /* light travels through the logo's own silhouette */
      .to(sweep, { x: -140, duration: 0.95, ease: "power2.inOut", onUpdate: applySweep }, 1.8)
      .fromTo(
        letterRefs.current.filter(Boolean),
        { yPercent: 115, opacity: 0, filter: "blur(5px)" },
        { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.028, ease: "power3.out" },
        1.72
      )

      /* hairline progress across the foot of the screen, with its caption */
      .fromTo([barWrapRef.current, metaRef.current], { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2)
      .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 2.2, ease: "power1.inOut" }, 0.3)
      .to(barRef.current, {
        boxShadow: "0 0 22px rgba(62,125,252,.95)",
        duration: 0.22,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      }, 2.45)

      .to({}, { duration: 0.12 })

      .to([logoRef.current, taglineRef.current], {
        opacity: 0,
        scale: 1.06,
        filter: "blur(7px)",
        duration: 0.35,
        ease: "power2.in",
      }, "exit")
      .to([auraARef.current, auraBRef.current, gridRef.current, vignetteRef.current, barWrapRef.current, metaRef.current], {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      }, "exit")

      /* Split: the plate parts at the middle, top half up and bottom half
         down, so the homepage is revealed between them */
      .to(topRef.current, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "exit+=0.22")
      .to(bottomRef.current, { yPercent: 100, duration: 0.95, ease: "expo.inOut" }, "exit+=0.22")
      .add(releaseHero, "exit+=0.4");

    return () => { tl.kill(); cleanup(); };
  }, [mounted, lenis]);

  if (!mounted) return null;

  return (
    <div className="pl-root pl-root--split" ref={rootRef} aria-hidden="true">
      {/* the plate itself, in two halves that part on exit */}
      <span className="pl-half pl-half--top" ref={topRef} />
      <span className="pl-half pl-half--bottom" ref={bottomRef} />
      <span className="pl-grid" ref={gridRef} />
      <span className="pl-vignette" ref={vignetteRef} />

      {/* two drifting fields of brand light, so the whole screen moves
          rather than one small element in a static black void */}
      <span className="pl-aura pl-aura--a" ref={auraARef} />
      <span className="pl-aura pl-aura--b" ref={auraBRef} />

      <div className="pl-words">
        {WORDS.map((w, i) => (
          <span className="pl-word-mask" key={w}>
            <span className={`pl-word${i === WORDS.length - 1 ? " is-accent" : ""}`} ref={(el) => (wordRefs.current[i] = el)}>{w}</span>
          </span>
        ))}
      </div>

      <div className="pl-stack">
        <span className="pl-logo-mask">
          <span className="pl-logo-holder" ref={logoRef}>
            <img className="pl-logo" src={codelixLogo} alt="Codelix IT Solutions" />
            {/* band of light, clipped to the logo's own alpha */}
            <span
              className="pl-shine"
              ref={shineRef}
              style={{
                WebkitMaskImage: `url(${codelixLogo})`,
                maskImage: `url(${codelixLogo})`,
              }}
            />
          </span>
        </span>

        <span className="pl-tagline-mask" ref={taglineRef}>
          {TAGLINE.split("").map((ch, i) => (
            <span className="pl-letter-mask" key={i}>
              <span
                className={`pl-letter${i >= TAGLINE.length - 2 ? " is-accent" : ""}`}
                ref={(el) => (letterRefs.current[i] = el)}
              >
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </span>

      </div>

      <div className="pl-meta" ref={metaRef}>
        <span>Codelix IT Solutions</span>
        <span>Ahmedabad, India</span>
      </div>
      <div className="pl-bar" ref={barWrapRef}>
        <span className="pl-bar-fill" ref={barRef} />
      </div>
    </div>
  );
}
