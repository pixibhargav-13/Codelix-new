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
import underline from "../Images/what-we-build-underline.png";
export const ToolsAndTechUsedWeb = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const techData = {
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

      {/* TAB BUTTONS */}
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
        {techData[activeTab].map((item, index) => (
          <div className="tech-card" key={index}>
            <img src={item.img} alt={item.name} className="tech-icon" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
