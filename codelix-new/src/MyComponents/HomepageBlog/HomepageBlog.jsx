import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomepageBlog.css";

import underline from "../Images/what-we-build-underline.png"; // underline image
import { blogs as allBlogs, slugify } from "../../data/blogData";
import rightArrow from "../Images/blackArrow.png";
import whiteArrow from "../Images/whiteArrow.png";

export const HomepageBlog = () => {
  const navigate = useNavigate();
  const blogs = allBlogs.slice(0, 3);

  return (
    <section className="homepage-blog-section py-7">
      <div className="container text-center">

        {/* Heading */}
        <h2 className="heading-provide mb-5">
          Read Our Insightful & Trending{" "}
          <span className="underline-wrapper fw-bold">
            Blogs
            <img src={underline} className="underline-img" alt="" />
          </span>
        </h2>

        {/* Blog Cards */}
        <div className="row g-4">
          {blogs.map((blog) => (
            <div className="col-lg-4" key={blog.id}>
              <div className="blog-card h-100">

                {/* Image */}
                <img src={blog.image} alt={blog.title} className="homepage-blog-img" loading="lazy" />

                {/* Card Content */}
                <div className="p-3 text-start">
                  <p className="homepage-blog-title">{blog.title}</p>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className="homepage-blog-date">{blog.date}</span>

                    <button className="btn blog-btn d-flex align-items-center gap-2" onClick={() => navigate(`/blog/${slugify(blog.title)}`)}>
                      Read Blog
                      <img src={rightArrow} alt="" className="arrow-icon" />
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
            <img src={whiteArrow} alt="" className="arrow-icon" />
          </button>
        </div>

      </div>
    </section>
  );
};