import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./WorkHeroVisual.css";
import { useProjects } from "../CaseStudyDetailV2/useCaseStudies";

const WorkHeroVisual = () => {
  const containerRef = useRef(null);

  // We'll use a subset of actual project images to create the scrolling columns
  // Using real work to avoid any "AI generated" feel.
  const projects = useProjects();
  const col1Images = projects.slice(0, 5).map(p => p.image);
  const col2Images = projects.slice(5, 10).map(p => p.image);
  const col3Images = projects.slice(10, 15).map(p => p.image);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the entire wrapper
      gsap.fromTo(containerRef.current,
        { opacity: 0, x: 40, rotateY: -15, scale: 0.95 },
        { opacity: 1, x: 0, rotateY: -10, scale: 1, duration: 1.4, ease: "power3.out" }
      );

      // Infinite scroll animations for the columns
      // We clone the items in React (see render) so we can translate them seamlessly.
      // Column 1 scrolls up
      gsap.to(".whv-col-1 .whv-track", {
        yPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1
      });

      // Column 2 scrolls down
      gsap.set(".whv-col-2 .whv-track", { yPercent: -50 });
      gsap.to(".whv-col-2 .whv-track", {
        yPercent: 0,
        ease: "none",
        duration: 30,
        repeat: -1
      });

      // Column 3 scrolls up
      gsap.to(".whv-col-3 .whv-track", {
        yPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="whv-container" ref={containerRef}>
      <div className="whv-gradient-mask top" />
      <div className="whv-gradient-mask left" />
      <div className="whv-gradient-mask right" />
      
      <div className="whv-grid">
        <div className="whv-col whv-col-1">
          <div className="whv-track">
            {/* Render twice for seamless infinite scroll loop */}
            {[...col1Images, ...col1Images].map((img, i) => (
              <div className="whv-card" key={`c1-${i}`}>
                <img src={img} alt="Project work" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="whv-col whv-col-2">
          <div className="whv-track">
            {[...col2Images, ...col2Images].map((img, i) => (
              <div className="whv-card" key={`c2-${i}`}>
                <img src={img} alt="Project work" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="whv-col whv-col-3">
          <div className="whv-track">
            {[...col3Images, ...col3Images].map((img, i) => (
              <div className="whv-card" key={`c3-${i}`}>
                <img src={img} alt="Project work" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="whv-gradient-mask bottom" />
    </div>
  );
};

export default WorkHeroVisual;
