import React from "react";
import "./HomepageBlog.css";

import underline from "../Images/what-we-build-underline.png"; // underline image
import blogImg from "../Images/homepage-blog-image.png"; // replace with real image
import rightArrow from "../Images/blackArrow.png";

export const HomepageBlog = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 5 Reasons to choose laravel for faster web app development.",
      date: "20 October 2024",
      image: blogImg,
    },
    {
      id: 2,
      title: "Top 5 Reasons to choose laravel for faster web app development.",
      date: "20 October 2024",
      image: blogImg,
    },
    {
      id: 3,
      title: "Top 5 Reasons to choose laravel for faster web app development.",
      date: "20 October 2024",
      image: blogImg,
    },
  ];

  return (
    <section className="homepage-blog-section py-5">
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
      </div>
    </section>
  );
};