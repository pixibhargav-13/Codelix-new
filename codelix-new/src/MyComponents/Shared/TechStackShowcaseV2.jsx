import React, { useEffect, useRef } from "react";
import { Monitor, Server, Database, Cloud, PenTool, Lock } from "lucide-react";
import "./TechStackShowcaseV2.css";

const TECH_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: Monitor,
    tools: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
    colSpan: 2,
  },
  {
    id: "backend",
    title: "Backend Core",
    icon: Server,
    tools: ["Node.js", "Python / Django", "Go", "Java Spring", "GraphQL"],
    colSpan: 1,
  },
  {
    id: "database",
    title: "Data & Storage",
    icon: Database,
    tools: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
    colSpan: 1,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    tools: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Vercel"],
    colSpan: 2,
  },
  {
    id: "design",
    title: "Design & UX",
    icon: PenTool,
    tools: ["Figma", "Adobe CC", "Prototyping", "Wireframing"],
    colSpan: 1.5,
  },
  {
    id: "security",
    title: "Security & QA",
    icon: Lock,
    tools: ["Pen Testing", "Jest", "Cypress", "OAuth 2.0"],
    colSpan: 1.5,
  }
];

const DEFAULT_METRICS = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "2x", label: "Faster Delivery" },
  { value: "Top 1%", label: "Engineering Talent" }
];

export default function TechStackShowcaseV2({ 
  title = "Our Technology Stack", 
  description = "We use modern, battle-tested tools to build scalable and maintainable solutions.",
  categories = TECH_CATEGORIES,
  metrics = DEFAULT_METRICS
}) {
  const containerRef = useRef(null);

  // Mouse tracking for the glow effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      for (const card of container.getElementsByClassName("tech-v2-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="tech-v2-section">
      <div className="tech-v2-header">
        <h2 className="tech-v2-title">{title}</h2>
        <p className="tech-v2-description">{description}</p>
      </div>

      <div className="tech-v2-grid" ref={containerRef}>
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="tech-v2-card"
            style={{ 
              gridColumn: `span ${cat.colSpan === 1.5 ? (window.innerWidth > 768 ? 6 : 12) : cat.colSpan === 2 ? 8 : 4}` 
            }}
          >
            <div className="tech-v2-card-border" />
            <div className="tech-v2-card-content">
              <div className="tech-v2-card-icon">
                <cat.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="tech-v2-card-title">{cat.title}</h3>
              <div className="tech-v2-tags">
                {cat.tools.map(tool => (
                  <span key={tool} className="tech-v2-tag">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High-Impact Metrics Strip */}
      <div className="tech-v2-metrics">
        {metrics.map((metric, index) => (
          <React.Fragment key={index}>
            <div className="tech-v2-metric">
              <span className="tech-v2-metric-val">{metric.value}</span>
              <span className="tech-v2-metric-lbl">{metric.label}</span>
            </div>
            {index < metrics.length - 1 && <div className="tech-v2-metric-divider" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
