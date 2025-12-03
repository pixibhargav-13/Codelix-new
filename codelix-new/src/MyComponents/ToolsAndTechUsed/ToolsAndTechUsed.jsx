import React from "react";
import "./ToolsAndTechUsed.css";
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
import reactNativeLogo from "../Images/react.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import flutterLogo from "../Images/flutter.png";
import androidLogo from "../Images/android.png";
import swiftLogo from "../Images/swift.png";
import shopifyLogo from "../Images/shopify.png";
import woocommerceLogo from "../Images/woocommerce.png";
import webflowLogo from "../Images/webflow.png";
import n8nLogo from "../Images/n8n.png";
import zapierLogo from "../Images/zapier.png";
import makeLogo from "../Images/make.png";

import underline from "../Images/what-we-build-underline.png";

export const ToolsAndTechUsed = () => {
  const techData = [
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
    { name: "Node", img: nodeLogo },
    { name: "Laravel", img: laravelLogo },
    { name: "PHP", img: phpLogo },
    { name: "Python", img: pythonLogo },
    { name: "Spring Boot", img: springLogo },
    { name: "Java", img: javaLogo },
    { name: "Docker", img: dockerLogo },
    { name: "Django", img: djangoLogo },
    { name: "C#", img: csharpLogo },
    { name: "React Native", img: reactLogo },
    { name: "Figma", img: figmaLogo },
    { name: "Adobe XD", img: adobeXdLogo },
    { name: "Sketch", img: sketchLogo },
    { name: "Framer", img: framerLogo },
    { name: "Canva", img: canvaLogo },
    { name: "Flutter", img: flutterLogo },
    { name: "Android", img: androidLogo },
    { name: "Swift", img: swiftLogo },
    { name: "Shopify", img: shopifyLogo },
    { name: "WooCommerce", img: woocommerceLogo },
    { name: "Webflow", img: webflowLogo },
    { name: "n8n", img: n8nLogo },
    { name: "Zapier", img: zapierLogo },
    { name: "Make", img: makeLogo },
  ];

  return (
    <section className="tools-all-section container pb-7">
      <h2 className="tools-all-heading text-center">
        Tools & Technologies{" "}
        <span className="tools-all-underline-wrapper fw-bold">
          We Use
          <img
            src={underline}
            alt="underline"
            className="tools-all-underline-img"
          />
        </span>
      </h2>

      <p className="gray-font mb-5 mt-3 gray-font-margin-top text-center">
        Our work is driven by a carefully selected tech stack and tools that ensure reliability, efficiency, and seamless user experiences.
      </p>

      {/* TECH GRID */}
      <div className="tools-all-tech-table">
        {techData.map((item, index) => (
          <div className="tools-all-tech-card" key={index}>
            <img src={item.img} alt={item.name} className="tools-all-tech-icon" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

