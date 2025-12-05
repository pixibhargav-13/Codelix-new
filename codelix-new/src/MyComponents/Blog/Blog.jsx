import React from "react";
import "./Blog.css";
import { SEO } from "../../components/SEO";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Blog = () => {
  return (
    <>
      <SEO
        title="Blog | Tech Insights & Development Tips | Codelix"
        description="Discover the latest in web development, app development, AI technology, and design trends. Expert insights from the Codelix team."
        keywords="blog, tech blog, development tips, web development insights, coding tutorials"
        canonical="https://codelix.com/blog"
      />
      <div className="blog">
        <Navbar />
        <div className="blog-main">
          <div className="blog-inner">
            <span className="blog-badge">Articles coming soon</span>
            <h1 className="blog-title">
              Our <span className="blog-highlight">insights</span> are on the
              way
            </h1>
            <p className="blog-text">
              We&apos;re preparing in-depth articles on AI, product design, and
              engineering best practices. Check back soon to explore case
              studies, behind-the-scenes breakdowns, and practical guides from
              the Codelix team.
            </p>
            <div className="blog-pill-row">
              <span className="blog-pill">AI & automation</span>
              <span className="blog-pill">Product design stories</span>
              <span className="blog-pill">Developer tips</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Blog;