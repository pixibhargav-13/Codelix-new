import React, { useState } from "react";
import "./ToolsAndTechUsedWeb.css";
import reactLogo from "../Images/react.png";
import angularLogo from "../Images/angular.png";
import bootstrapLogo from "../Images/bootstrap.png";
import nust from "../Images/nust.png";
import vueLogo from "../Images/vue.png";
import tsLogo from "../Images/typescript.png";
import jsLogo from "../Images/javascript.png";
import viteLogo from "../Images/vite.png";
import tailwindLogo from "../Images/tailwind.png";
import nextLogo from "../Images/next.png";
import nodeLogo from "../Images/node.png";
import laravelLogo from "../Images/laravel.png";
import phpLogo from "../Images/php.png";
import pythonLogo from "../Images/python.png";
import springLogo from "../Images/springboot.png";
import javaLogo from "../Images/java.png";
import dockerLogo from "../Images/docker.png";
import djangoLogo from "../Images/django.png";
import csharpLogo from "../Images/csharp.png";
import figmaLogo from "../Images/figma.png";
import flutterLogo from "../Images/flutter.png";
import androidLogo from "../Images/android.png";
import swiftLogo from "../Images/swift.png";
import shopifyLogo from "../Images/shopify.png";
import woocommerceLogo from "../Images/woocommerce.png";
import webflowLogo from "../Images/webflow.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import n8nLogo from "../Images/n8n.png";
import zapierLogo from "../Images/zapier.png";
import makeLogo from "../Images/make.png";
import underline from "../Images/what-we-build-underline.png";

export const ToolsAndTechUsedWeb = ({ 
  showGeneralTech = false, 
  showTabs = true,
  customTechnologies = null,
  customFrontend = null,
  customBackend = null
}) => {
  const [activeTab, setActiveTab] = useState("frontend");

  const defaultTechData = {
    frontend: [
      { name: "React", img: reactLogo },
      { name: "Angular", img: angularLogo },
      { name: "Bootstrap", img: bootstrapLogo },
      { name: "Nust", img: nust },
      { name: "Vue", img: vueLogo },
      { name: "Typescript", img: tsLogo },
      { name: "Javascript", img: jsLogo },
      { name: "Vite", img: viteLogo },
      { name: "Tailwind", img: tailwindLogo },
      { name: "Next", img: nextLogo },
    ],

    backend: [
      { name: "Node", img: nodeLogo },
      { name: "Laravel", img: laravelLogo },
      { name: "PHP", img: phpLogo },
      { name: "Python", img: pythonLogo },
      { name: "Spring Boot", img: springLogo },
      { name: "Java", img: javaLogo },
      { name: "Docker", img: dockerLogo },
      { name: "Django", img: djangoLogo },
      { name: "C#", img: csharpLogo },
    ],
  };

  // Use custom technologies if provided, otherwise use default
  const techData = customFrontend || customBackend 
    ? { frontend: customFrontend || defaultTechData.frontend, backend: customBackend || defaultTechData.backend }
    : defaultTechData;

  // Use custom technologies for no-tabs view if provided
  const technologiesToShow = customTechnologies || [
    ...techData.frontend,
    ...techData.backend,
  ];

  // Pad arrays to always have 10 items for 10-column grid
  const padToTen = (arr) => {
    const padded = [...arr];
    while (padded.length < 10) {
      padded.push(null); // Add null placeholders for empty cells
    }
    return padded.slice(0, 10); // Ensure exactly 10 items
  };

  const frontendPadded = padToTen(techData.frontend);
  const backendPadded = padToTen(techData.backend);
  const technologiesToShowPadded = padToTen(technologiesToShow);

  const generalTechnologies = [
    { name: "Figma", img: figmaLogo },
    { name: "Flutter", img: flutterLogo },
    { name: "Android", img: androidLogo },
    { name: "Swift", img: swiftLogo },
    { name: "Shopify", img: shopifyLogo },
    { name: "WooCommerce", img: woocommerceLogo },
    { name: "Webflow", img: webflowLogo },
  ];

  return (
    <section className="tools-section container">
      <h2 className="tools-heading text-center">
        Tools & Technologies{" "}
        <span className="underline-wrapper fw-bold">
          We Use
          <img
            src={underline}
            alt="underline"
            className="underline-img"
          />
        </span>
      </h2>

      {/* TAB BUTTONS - Only show if showTabs is true */}
      {showTabs && (
        <>
          <div className="tab-buttons">
            <button
              className={activeTab === "frontend" ? "active-tab" : "inactive-tab"}
              onClick={() => setActiveTab("frontend")}
            >
              Frontend
            </button>
            <button
              className={activeTab === "backend" ? "active-tab" : "inactive-tab"}
              onClick={() => setActiveTab("backend")}
            >
              Backend
            </button>
          </div>

          {/* TABLE */}
          <div className="tech-table">
            {(activeTab === "frontend" ? frontendPadded : backendPadded).map((item, index) => (
              <div className={`tech-card ${item ? '' : 'empty-cell'}`} key={index}>
                {item && (
                  <>
                    <img src={item.img} alt={item.name} className="tech-icon" />
                    <p>{item.name}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* TABLE - Show all technologies when tabs are hidden */}
      {!showTabs && (
        <div className="tech-table no-tabs">
          {technologiesToShowPadded.map((item, index) => (
            <div className={`tech-card ${item ? '' : 'empty-cell'}`} key={index}>
              {item && (
                <>
                  <img src={item.img} alt={item.name} className="tech-icon" />
                  <p>{item.name}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* GENERAL TECHNOLOGIES SECTION - Only show if showGeneralTech prop is true */}
      {showGeneralTech && (
        <div className="general-tech-section">
          <h3 className="general-tech-heading text-center">Technologies</h3>
          <div className="general-tech-table">
            {generalTechnologies.map((item, index) => (
              <div className="general-tech-card" key={index}>
                <img src={item.img} alt={item.name} className="general-tech-icon" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
