import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomepageBlog.css";

import underline from "../Images/what-we-build-underline.png"; // underline image
import blogImg1 from "../Images/homepage-blog-image.png"; // replace with real image
import blogImg2 from "../Images/homepage-blog-image2.png"; // replace with real image
import blogImg3 from "../Images/homepage-blog-image3.png"; // replace with real image
import rightArrow from "../Images/blackArrow.png";
import whiteArrow from "../Images/whiteArrow.png";

export const HomepageBlog = () => {
  const navigate = useNavigate();
  const blogs = [
    {
      id: 1,
      title: "Top 5 Reasons to choose laravel for faster web app development.",
      date: "20 November 2025",
      image: blogImg1,
    },
    {
      id: 2,
      title: "Design Systems & Component Based UIS: Efficiency At Scale.",
      date: "23 November 2025",
      image: blogImg2,
    },
    {
      id: 3,
      title: "Progressive Web App (PWAS) As The New Standard.",
      date: "28 November 2025",
      image: blogImg3,
    },
  ];

  return (
    <section className="homepage-blog-section py-7">
      <div className="container text-center">

        {/* Heading */}
        <h2 className="heading-provide mb-5">
          Read Our Insightful & Trending{" "}
          <span className="underline-wrapper fw-bold">
            Blogs
            <img src={underline} className="underline-img" alt="underline" />
          </span>
        </h2>

        {/* Blog Cards */}
        <div className="row g-4">
          {blogs.map((blog) => (
            <div className="col-lg-4" key={blog.id}>
              <div className="blog-card h-100">

                {/* Image */}
                <img src={blog.image} alt={blog.title} className="homepage-blog-img" />

                {/* Card Content */}
                <div className="p-3 text-start">
                  <p className="homepage-blog-title">{blog.title}</p>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className="homepage-blog-date">{blog.date}</span>

                    <button className="btn blog-btn d-flex align-items-center gap-2">
                      Read Blog
                      <img src={rightArrow} alt="arrow" className="arrow-icon" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="d-flex justify-content-center mt-3">
          <button className="btn blue-common-btn mt-4 d-flex align-items-center justify-content-between view-all-button" onClick={() => navigate('/blog')}>
            <span>See Blogs</span>
            <img src={whiteArrow} alt="arrow" className="arrow-icon" />
          </button>
        </div>

      </div>
    </section>
  );
};