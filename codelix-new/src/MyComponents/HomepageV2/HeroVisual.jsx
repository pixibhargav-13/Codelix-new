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
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

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

    let rotationY = 0;
    let rotationX = 0.2;
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let currentMouseRotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.8;
      targetRotationX = 0.2 + y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationY += 0.002;
      currentMouseRotY += (targetRotationY - currentMouseRotY) * 0.1;
      const currentRotY = rotationY + currentMouseRotY;
      rotationX += (targetRotationX - rotationX) * 0.1;

      const radius = 180;
      const zOffset = 450;

      // Transform and project points
      const projected = points.map(p => {
        let rx = p.x * Math.cos(currentRotY) - p.z * Math.sin(currentRotY);
        let rz = p.x * Math.sin(currentRotY) + p.z * Math.cos(currentRotY);
        let ry = p.y;

        let fy = ry * Math.cos(rotationX) - rz * Math.sin(rotationX);
        let fz = ry * Math.sin(rotationX) + rz * Math.cos(rotationX);

        const scale = 500 / (zOffset + fz * radius);
        const projX = width / 2 + (rx * radius * scale);
        const projY = height / 2 + (fy * radius * scale);

        return { ...p, projX, projY, fz, scale };
      });

      // Draw lines
      ctx.lineWidth = 1;
      const lineBuckets = {};
      
      projected.forEach(p1 => {
        p1.neighbors.forEach(p2Orig => {
          const p2 = projected[p2Orig.id];
          const avgZ = (p1.fz + p2.fz) / 2;
          if (avgZ > -0.5) {
            const alpha = Math.max(0.02, Math.min(0.25, (avgZ + 0.5)));
            // Group by alpha to reduce stroke calls
            const alphaKey = alpha.toFixed(2);
            if (!lineBuckets[alphaKey]) lineBuckets[alphaKey] = [];
            lineBuckets[alphaKey].push({ x1: p1.projX, y1: p1.projY, x2: p2.projX, y2: p2.projY });
          }
        });
      });

      for (const alphaKey in lineBuckets) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${alphaKey})`;
        ctx.beginPath();
        lineBuckets[alphaKey].forEach(line => {
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
        });
        ctx.stroke();
      }

      // Draw dots
      projected.forEach(p => {
        const depth = p.fz;
        const alpha = Math.max(0.05, Math.min(1, (depth + 1) / 2));
        const size = Math.max(0.5, p.scale * 1.2);

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        // Use fillRect instead of arc for better performance
        ctx.fillRect(p.projX - size, p.projY - size, size * 2, size * 2);

        // Add bright spot for frontmost points
        if (depth > 0.8) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          const brightSize = size * 2.5;
          ctx.fillRect(p.projX - brightSize, p.projY - brightSize, brightSize * 2, brightSize * 2);
        }

        // Highlighted pulsing nodes (Data processing effect)
        if (p.isHighlight) {
          const pulse = (Math.sin(Date.now() / 200 + p.pulsePhase) + 1) / 2; // 0 to 1
          if (pulse > 0.3 && depth > -0.2) {
            const hAlpha = Math.max(0, depth + 0.2); // fade back
            ctx.fillStyle = `rgba(0, 150, 255, ${hAlpha * pulse * 0.9})`;
            ctx.beginPath();
            ctx.arc(p.projX, p.projY, size * 6 * pulse, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
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
