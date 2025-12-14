import React, { useState, useEffect, useRef } from "react";
import "./WhatMakesUsDifferent.css";
import underline from "../Images/what-we-build-underline.png"; // underline image

export const WhatMakesUsDifferent = () => {
  const [animatedValues, setAnimatedValues] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // ⭐ RIGHT SIDE STATS (REUSABLE)
  const stats = [
    { id: 1, value: "25+", label: "Projects Completed", suffix: "+" },
    { id: 2, value: "95%", label: "Success Rate", suffix: "%" },
    { id: 3, value: "30+", label: "Tech Stacks & Tools", suffix: "+" },
    { id: 4, value: "2+", label: "Countries Served", suffix: "+" },
  ];

  // Extract numeric value from string like "25+", "95%", etc.
  const getNumericValue = (value) => {
    return parseInt(value.replace(/[^0-9]/g, ""));
  };

  // Animation function
  const animateValue = (id, target, duration = 2000) => {
    const start = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (target - start) * progress);

      setAnimatedValues((prev) => ({
        ...prev,
        [id]: current,
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start animations for all stats
            stats.forEach((stat) => {
              const numericValue = getNumericValue(stat.value);
              animateValue(stat.id, numericValue);
            });
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="what-different-section pt-5 pb-7">
      <div className="container">

        {/* HEADING */}
        <h2 className="text-center heading-provide mb-4">
          What Makes{" "}
          <span className="underline-wrapper fw-bold">
            Us Different
            <img src={underline} alt="" className="underline-img" />
          </span>
        </h2>

        <div className="row g-4 mt-4">

          {/* LEFT SIDE TEXT*/}
          <div className="col-lg-7">
            <h4 className="fw-bold mb-3">
              Our Young, Passionate Tech Team
            </h4>

            <p className="gray-font mb-4">
              — driven to build Tech solutions that make businesses faster, smarter, 
              and more connected.
            </p>

            <p className="gray-font mb-4">
              From custom software systems and mobile applications to sleek e-commerce 
              stores, every project at <span className="codelix-blue">Codelix</span> reflects our core motto.
            </p>

            <h5 className="fw-bold deliver-text">
              <span className="line"></span>
              “Deliver Before The Deadline.”
            </h5>
          </div>

          {/* RIGHT SIDE CARDS — generated using .map() */}
          <div className="col-lg-5">
            <div className="row g-3">
              {stats.map((item) => (
                <div className="col-6" key={item.id}>
                  <div className="stats-card p-3 h-100">
                    <h3 className="fw-bold">
                      {animatedValues[item.id] || 0}{item.suffix}
                    </h3>
                    <p className="different-label mt-2 mb-0">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};