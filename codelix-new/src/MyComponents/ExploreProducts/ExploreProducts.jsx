import React from "react";
import "./ExploreProducts.css";

import underline from "../Images/what-we-build-underline.png"; // underline img
import rightArrow from "../Images/whiteArrow.png";              // arrow img
import productOneImg from "../Images/homepage-product-one.png";     // product image  (replace if needed)

export const ExploreProducts = () => {
  const products = [
    {
      id: 1,
      title: "AangonOne - Smart Society Management",
      description:
        "Aangonone is a modern Society & Apartment Management SaaS platform built to simplify everyday operations in gated communities. From visitor tracking to finance management, Aangonone unites residents, secretaries, staff, and security under one intelligent system, making society life smarter, safer, and more connected.",
      tags: [
        "Maintenance",
        "Pre-Approve",
        "Finance",
        "Community",
        "Marketplace",
        "Amenities",
        "Local Business",
      ],
      buttonText: "Explore Product",
      image: productOneImg,
    },
  ];

  return (
    <section className="explore-products-section py-7">
      <div className="container">

        {/* HEADING */}
        <h2 className="text-center explore-heading mb-2">
          Explore Our{" "}
          <span className="underline-wrapper fw-bold">
            Product
            <img src={underline} alt="" className="underline-img" />
          </span>
        </h2>

        <p className="gray-font mb-5 mt-3 gray-font-margin-top text-center">
        AanganOne is a smart society management platform that simplifies security, communication, and daily operations for residential communities.
        </p>

        {/* PRODUCT LIST */}
        {products.map((p) => (
          <div className="row explore-product-box p-4 align-items-center" key={p.id}>

            {/* LEFT SIDE CONTENT */}
            <div className="col-lg-6">
              <h3 className="fw-bold">{p.title}</h3>

              <p className="gray-font mt-3 explore-prod-desc">{p.description}</p>

              {/* TAGS */}
              <div className="d-flex flex-wrap gap-3 mt-3">
                {p.tags.map((tag, index) => (
                  <span key={index} className="tag-badge">
                    {tag}
                  </span>
                ))}
              </div>

              {/* BUTTON */}
              <button className="btn explore-btn mt-5 d-flex align-items-center justify-content-between gap-5" onClick={() => window.open('https://www.aanganone.com/', '_blank')}>
                {p.buttonText}
                <img src={rightArrow} alt="arrow" className="arrow-icon" />
              </button>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="col-lg-6 explore-product-img-div">
              <img src={p.image} alt="product" className="explore-product-img" />
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};
