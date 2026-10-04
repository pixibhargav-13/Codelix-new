import React, { useEffect, useRef } from 'react';
import './HeroVisual.css';

const HeroVisual = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const width = 500;
    const height = 500;
    /* Capped at 2. A 3x phone would otherwise clear and redraw a 1500x1500
       backing store every frame — 2.25x the pixels of 2x — for one-pixel
       lines and dots that look the same at either density. */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const points = [];
    const numPoints = 350; // Optimized for wireframe visibility
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        id: i,
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        neighbors: [],
        isHighlight: Math.random() > 0.95, // 5% chance to be a pulsing data node
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Pre-calculate neighbors based on distance on unit sphere
    points.forEach(p1 => {
      points.forEach(p2 => {
        if (p1.id < p2.id) {
          const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);
          if (dist < 0.35) {
            p1.neighbors.push(p2);
          }
        }
      });
    });

    /* ── per-frame memory ─────────────────────────────────────────────────
       The loop used to build a fresh object for every point (350 spreads),
       a fresh bucket object, a fresh line object per edge and a fresh
       colour string per dot — every frame. Measured on the homepage that
       was ~9 MB of garbage a second and a collection every tenth of a
       second, which a fast laptop absorbs and an old phone feels as stutter.
       Everything below is allocated once here and overwritten in place; the
       maths and the draw order are unchanged. */

    // the neighbour graph, flattened in exactly the order the old nested
    // forEach walked it, so lines are still drawn in the same sequence
    const edgeA = [];
    const edgeB = [];
    points.forEach(p1 => p1.neighbors.forEach(p2 => { edgeA.push(p1.id); edgeB.push(p2.id); }));
    const EDGES = edgeA.length;
    const eA = Int16Array.from(edgeA);
    const eB = Int16Array.from(edgeB);

    const projX = new Float32Array(numPoints);
    const projY = new Float32Array(numPoints);
    const projZ = new Float32Array(numPoints);
    const projS = new Float32Array(numPoints);

    /* Line alphas were bucketed by alpha.toFixed(2) and clamped to
       0.02-0.25, so there are exactly 24 buckets. A counting sort into one
       shared coordinate buffer replaces the per-frame object of arrays, and
       `order` keeps each bucket in the order it was first seen, which is
       what `for...in` over the old object produced. */
    const BUCKETS = 24;
    const lineStyle = Array.from({ length: BUCKETS }, (_, b) => `rgba(255, 255, 255, ${((b + 2) / 100).toFixed(2)})`);
    const edgeBucket = new Int8Array(EDGES);
    const bucketCount = new Int32Array(BUCKETS);
    const bucketStart = new Int32Array(BUCKETS);
    const bucketFill = new Int32Array(BUCKETS);
    const order = new Int8Array(BUCKETS);
    const lineXY = new Float32Array(EDGES * 4);

    /* The canvas stores colour at 8 bits per channel, so an alpha is rounded
       to one of 256 steps before it is ever painted. Precomputing those 256
       strings gives the same pixels without building a string per dot. */
    const whiteAt = Array.from({ length: 256 }, (_, i) => `rgba(255, 255, 255, ${i / 255})`);
    const blueAt = Array.from({ length: 256 }, (_, i) => `rgba(0, 150, 255, ${i / 255})`);
    const a8 = (a) => (a <= 0 ? 0 : a >= 1 ? 255 : Math.round(a * 255));

    const highlight = Uint8Array.from(points, p => (p.isHighlight ? 1 : 0));
    const pulsePhase = Float32Array.from(points, p => p.pulsePhase);
    const px = Float32Array.from(points, p => p.x);
    const py = Float32Array.from(points, p => p.y);
    const pz = Float32Array.from(points, p => p.z);

    let rotationY = 0;
    let rotationX = 0.2;
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let currentMouseRotY = 0;

    const handleMouseMove = (e) => {
      /* getBoundingClientRect forces a synchronous layout, so skip it
         entirely once the globe is scrolled out of view — otherwise every
         mouse move anywhere on the page pays for a reflow the user can
         never see the result of */
      if (!onScreen) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.8;
      targetRotationX = 0.2 + y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    /* the projection maths below runs over 350 points and several hundred
       connecting lines every frame. Left unconditional it keeps doing that
       forever — while the user is scrolled far past the hero, and even
       while the tab is in the background — competing with Lenis and
       ScrollTrigger for the same main thread. That contention is what
       reads as general "stuttery" scrolling, so gate the loop on the
       canvas actually being visible. */
    let animationId = null;
    let onScreen = true;
    let pageVisible = !document.hidden;
    /* Someone who has asked their OS for less motion gets the globe as a
       still image: the first frame below still paints, the loop never runs.
       It is also the cheapest possible path on the devices most likely to
       have the setting on. */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isRunnable = () => onScreen && pageVisible && !reduceMotion;

    const start = () => {
      if (animationId === null && isRunnable()) animationId = requestAnimationFrame(render);
    };

    const stop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        isRunnable() ? start() : stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      isRunnable() ? start() : stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationY += 0.002;
      currentMouseRotY += (targetRotationY - currentMouseRotY) * 0.1;
      const currentRotY = rotationY + currentMouseRotY;
      rotationX += (targetRotationX - rotationX) * 0.1;

      const radius = 180;
      const zOffset = 450;

      // Transform and project points — same maths, written into the
      // preallocated arrays instead of 350 new objects
      const cosY = Math.cos(currentRotY), sinY = Math.sin(currentRotY);
      const cosX = Math.cos(rotationX), sinX = Math.sin(rotationX);
      for (let i = 0; i < numPoints; i++) {
        const rx = px[i] * cosY - pz[i] * sinY;
        const rz = px[i] * sinY + pz[i] * cosY;
        const ry = py[i];

        const fy = ry * cosX - rz * sinX;
        const fz = ry * sinX + rz * cosX;

        const scale = 500 / (zOffset + fz * radius);
        projX[i] = width / 2 + (rx * radius * scale);
        projY[i] = height / 2 + (fy * radius * scale);
        projZ[i] = fz;
        projS[i] = scale;
      }

      // Draw lines, grouped by alpha to reduce stroke calls
      ctx.lineWidth = 1;
      bucketCount.fill(0);
      let orderLen = 0;
      for (let e = 0; e < EDGES; e++) {
        const avgZ = (projZ[eA[e]] + projZ[eB[e]]) / 2;
        if (avgZ > -0.5) {
          const alpha = Math.max(0.02, Math.min(0.25, (avgZ + 0.5)));
          const b = Math.round(alpha * 100) - 2;
          edgeBucket[e] = b;
          if (bucketCount[b]++ === 0) order[orderLen++] = b;
        } else {
          edgeBucket[e] = -1;
        }
      }
      let run = 0;
      for (let b = 0; b < BUCKETS; b++) {
        bucketStart[b] = run;
        bucketFill[b] = run;
        run += bucketCount[b];
      }
      for (let e = 0; e < EDGES; e++) {
        const b = edgeBucket[e];
        if (b < 0) continue;
        const o = bucketFill[b]++ * 4;
        lineXY[o] = projX[eA[e]];
        lineXY[o + 1] = projY[eA[e]];
        lineXY[o + 2] = projX[eB[e]];
        lineXY[o + 3] = projY[eB[e]];
      }
      for (let k = 0; k < orderLen; k++) {
        const b = order[k];
        ctx.strokeStyle = lineStyle[b];
        ctx.beginPath();
        const end = (bucketStart[b] + bucketCount[b]) * 4;
        for (let o = bucketStart[b] * 4; o < end; o += 4) {
          ctx.moveTo(lineXY[o], lineXY[o + 1]);
          ctx.lineTo(lineXY[o + 2], lineXY[o + 3]);
        }
        ctx.stroke();
      }

      // Draw dots
      const now = Date.now();
      for (let i = 0; i < numPoints; i++) {
        const depth = projZ[i];
        const alpha = Math.max(0.05, Math.min(1, (depth + 1) / 2));
        const size = Math.max(0.5, projS[i] * 1.2);

        ctx.fillStyle = whiteAt[a8(alpha)];
        // Use fillRect instead of arc for better performance
        ctx.fillRect(projX[i] - size, projY[i] - size, size * 2, size * 2);

        // Add bright spot for frontmost points
        if (depth > 0.8) {
          ctx.fillStyle = whiteAt[a8(alpha * 0.5)];
          const brightSize = size * 2.5;
          ctx.fillRect(projX[i] - brightSize, projY[i] - brightSize, brightSize * 2, brightSize * 2);
        }

        // Highlighted pulsing nodes (Data processing effect)
        if (highlight[i]) {
          const pulse = (Math.sin(now / 200 + pulsePhase[i]) + 1) / 2; // 0 to 1
          if (pulse > 0.3 && depth > -0.2) {
            const hAlpha = Math.max(0, depth + 0.2); // fade back
            ctx.fillStyle = blueAt[a8(hAlpha * pulse * 0.9)];
            ctx.beginPath();
            ctx.arc(projX[i], projY[i], size * 6 * pulse, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationId = isRunnable() ? requestAnimationFrame(render) : null;
    };

    /* paint one frame immediately so the globe is never blank before the
       observer's first callback lands, then let the gates drive it */
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <div className="premium-globe-visual">
      {/* Deep Background Grid */}
      <div className="tech-grid-bg"></div>

      {/* Ambient Gradient Orbs for background depth */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>

      <div className="globe-glow"></div>

      {/* Multiple Complex Tech Rings */}
      <div className="tech-rings-container">
        <div className="tech-ring tr-1"></div>
        <div className="tech-ring tr-2"></div>
        <div className="tech-ring tr-3"></div>
        <div className="tech-ring tr-4"></div>
      </div>

      {/* Orbital Rings to add dimension */}
      <div className="orbital-rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>

      <canvas ref={canvasRef} className="globe-canvas"></canvas>

      {/* Floating Hologram UI Elements */}
      <div className="hologram-ui">
        {/* Top Left: Mini Chart */}
        <div className="floating-card mini-chart">
          <div className="card-title">Development Velocity</div>
          <div className="bars">
            <div className="bar b1"></div>
            <div className="bar b2"></div>
            <div className="bar b3"></div>
            <div className="bar b4"></div>
            <div className="bar b5"></div>
            <div className="bar b6"></div>
          </div>
        </div>

        {/* Top Right: Code Snippet */}
        <div className="floating-card mini-code">
          <div className="mac-dots">
            <span></span><span></span><span></span>
          </div>
          <pre><code>{`{
  "projects": 40,
  "satisfaction": "99%",
  "delivery": "on-time",
  "code": "clean"
}`}</code></pre>
        </div>

        {/* Bottom Left: Server Status */}
        <div className="floating-card server-status">
          <div className="status-indicator">
            <div className="pulse-ring"></div>
            <div className="pulse-dot"></div>
          </div>
          <div className="status-text">
            <span className="s-val">BUILDING</span>
            <span className="s-lbl">NEXT-GEN APPS</span>
          </div>
        </div>

        {/* Crosshairs & Reticles */}
        <div className="reticle reticle-tl"></div>
        <div className="reticle reticle-tr"></div>
        <div className="reticle reticle-bl"></div>
        <div className="reticle reticle-br"></div>
      </div>

      <div className="globe-overlay-stats">
        <div className="stat-item">
          <div className="stat-pulse"></div>
          <div className="stat-content">
            <span className="stat-val">40+</span>
            <span className="stat-lbl">Shipped</span>
          </div>
        </div>
        <div className="stat-item right">
          <div className="stat-pulse emerald"></div>
          <div className="stat-content">
            <span className="stat-val">Full-Stack</span>
            <span className="stat-lbl">Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
