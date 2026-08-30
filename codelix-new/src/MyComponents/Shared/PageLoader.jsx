import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { introWillPlay, handOffIntro } from "../../lib/introGate";
import "./PageLoader.css";

const COLUMNS = 7;

/* Homepage intro, once per browser session.

   No logo, no wordmark, no counter — the plate carries nothing. It is
   split into vertical slices that shutter apart in alternating
   directions, and that motion is the whole idea.

   The handoff matters more than the look: the homepage hero runs its own
   wipe on mount, so an intro that merely sits in front of it burns that
   animation behind the plate and reveals a dead, static hero. The hero is
   held paused and released as the shutter opens, so both move together. */
export default function PageLoader() {
  /* always false on both server and first client render — SSR has no
     window/sessionStorage to check, and starting client state in sync
     with the server's output avoids a hydration mismatch. */
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef(null);
  const colRefs = useRef([]);
  const lenis = useLenis();

  useEffect(() => {
    if (introWillPlay()) setMounted(true);
  }, []);

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
      const t = gsap.to(rootRef.current, { opacity: 0, duration: 0.3, onComplete: finish });
      return () => { t.kill(); cleanup(); };
    }

    const cols = colRefs.current.filter(Boolean);
    const tl = gsap.timeline({ onComplete: finish });

    tl.to({}, { duration: 0.32 }) // settle before the shutter breaks
      .add(releaseHero, ">-0.02")
      .to(cols, {
        /* alternating travel — odd slices drop, even slices rise, so the
           plate splits apart rather than sliding off as one piece */
        yPercent: (i) => (i % 2 ? 100 : -100),
        duration: 1,
        ease: "expo.inOut",
        stagger: { each: 0.055, from: "center" },
      });

    return () => { tl.kill(); cleanup(); };
  }, [mounted, lenis]);

  if (!mounted) return null;

  return (
    <div className="pl-root" ref={rootRef} aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <span
          className="pl-col"
          key={i}
          ref={(el) => (colRefs.current[i] = el)}
        />
      ))}
    </div>
  );
}
