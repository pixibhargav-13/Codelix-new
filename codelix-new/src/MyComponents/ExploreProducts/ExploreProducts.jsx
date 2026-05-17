import React from "react";
import "./ExploreProducts.css";

import underline from "../Images/what-we-build-underline.png"; // underline img
import rightArrow from "../Images/whiteArrow.png";              // arrow img
import productOneImg from "../Images/Product Section.png";     // product image
import productTwoImg from "../Images/Product-Section2.png"; // 4bitx product image

export const ExploreProducts = () => {
  const products = [
    {
      id: 1,
      title: "AanganOne - Smart Living",
      description:
        "Aanganone is a modern Society & Apartment Management SaaS platform built to simplify everyday operations in gated communities. From visitor tracking to finance management, Aanganone unites residents, secretaries, staff, and security under one intelligent system, making society life smarter, safer, and more connected.",
      tags: [
        "Maintenance",
        "Pre-Approve",
        "Finance",
        "Community",
        "Marketplace",
        "Amenities",
        "Local Business",
      ],
      buttonText: "Explore AanganOne",
      image: productOneImg,
      link: "https://www.aanganone.com/",
    },
    {
      id: 2,
      title: "4bitx - Simplified Business Operations",
      description:
        "Run your business without the chaos. 4BitX centralizes stock levels, orders, invoices, and payment reminders into one clear, calm workspace, ensuring nothing slips through the cracks and your team stays focused.",
      tags: [
        "Inventory Management",
        "Order Tracking",
        "Invoicing",
        "Payment Reminders",
        "Operations",
        "Scalability",
      ],
      buttonText: "Explore 4bitx",
      image: productTwoImg,
      link: "https://www.4bitx.com/",
    },
  ];

  return (
    <section className="explore-products-section py-7">
      <div className="container">

        {/* HEADING */}
        <h2 className="text-center explore-heading mb-2">
          Explore Our{" "}
          <span className="underline-wrapper fw-bold">
            Products
            <img src={underline} alt="" className="underline-img" />
          </span>
        </h2>

        <p className="gray-font mb-5 mt-3 gray-font-margin-top text-center">
          Discover our innovative software solutions designed to simplify management, streamline operations, and boost efficiency for businesses and communities.
        </p>

        {/* PRODUCT LIST */}
        {products.map((p, index) => (
          <div className={`row explore-product-box p-4 align-items-center mb-5 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`} key={p.id}>

            {/* CONTENT (Right for odd index, Left for even index) */}
            <div className="col-lg-6">
              <h3 className="fw-bold">{p.title}</h3>

              <p className="gray-font mt-3 explore-prod-desc">{p.description}</p>

              {/* TAGS */}
              <div className="d-flex flex-wrap gap-3 mt-3">
                {p.tags.map((tag, idx) => (
                  <span key={idx} className="tag-badge">
                    {tag}
                  </span>
                ))}
              </div>

              {/* BUTTON */}
              <button className="btn explore-btn mt-5 d-flex align-items-center justify-content-between gap-5" onClick={() => window.open(p.link, '_blank')}>
                {p.buttonText}
                <img src={rightArrow} alt="" className="arrow-icon" />
              </button>
            </div>

            {/* IMAGE (Left for odd index, Right for even index) */}
            <div className="col-lg-6 explore-product-img-div">
              <img src={p.image} alt="product" className="explore-product-img" />
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};
