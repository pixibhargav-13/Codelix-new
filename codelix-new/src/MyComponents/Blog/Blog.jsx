import React from "react";
import "./Blog.css";
import { SEO } from "../../components/SEO";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { HomepageFaq } from "../HomepageFaq/HomepageFaq";
import { useNavigate } from "react-router-dom";
import { blogs, slugify } from "../../data/blogData";
import rightArrow from "../Images/blackArrow.png";
import underline from "../Images/what-we-build-underline.png";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Blog = () => {
  const [activeCategory, setActiveCategory] = React.useState("All Articles");
  const [visibleCount, setVisibleCount] = React.useState(6); // Show 6 items initially

  const bottomBlogs = activeCategory === "All Articles" 
    ? blogs 
    : blogs.filter(blog => blog.tags.includes(activeCategory));

  useScrollAnimation();

  const categories = [
    "All Articles",
    "business",
    "CMS",
    "UI/UX",
    "Tech",
    "E-Commerce",
    "Development",
    "Artificial Intelligence",
  ];

  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Blog | Tech Insights & Development Tips | Codelix IT Solutions"
        description="Discover the latest in web development, app development, AI technology, and design trends. Expert insights from the Codelix team."
        keywords="blog, tech blog, development tips, web development insights, coding tutorials"
      />

      <div className="blog-page">
        {/* Hero Section */}
        <div className="blog-hero-section">
          <Navbar />
          <div className="blog-hero-content">
            <h1>Blog</h1>
            <p>
              We help startups and enterprises craft human-centered digital
              products that perform beautifully and deliver measurable business
              value.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="blog-posts-section scroll-animate">
          <div className="container">
            <div className="row g-4">
              {blogs.slice(0, 6).map((blog) => (
                <div className="col-lg-4 col-md-6" key={blog.id}>
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
          </div>
        </section>

        {/* Keep Exploring Blogs Section */}
        <section className="blog-explore-section py-7 scroll-animate">
          <div className="container">
            {/* Header */}
            <div className="blog-explore-header text-center">
              <h2 className="heading-provide mb-2">
                Keep Exploring{" "}
                <span className="underline-wrapper fw-bold">
                  Blogs
                  <img src={underline} alt="" className="underline-img" />
                </span>
              </h2>
              <p className="blog-explore-tagline mb-5 mt-2">
                Scroll Down to Dive Into Innovation Creativity.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="row mt-5">
              {/* Categories Sidebar - Left */}
              <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <div className="blog-categories-sidebar">
                  <h3 className="blog-categories-title">Categories</h3>
                  <div className="blog-categories-grid">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`blog-category-btn ${
                          activeCategory === category ? "active" : ""
                        }`}
                        onClick={() => {
                          setActiveCategory(category);
                          setVisibleCount(6); // Reset visible count on category change
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blog Cards - Right */}
              <div className="col-lg-8 col-md-12">
                <div className="blog-explore-cards">
                  {bottomBlogs.length > 0 ? (
                    bottomBlogs.slice(0, visibleCount).map((blog) => (
                      <div className="blog-explore-card" key={blog.id}>
                        {/* Thumbnail */}
                        <div className="blog-explore-thumbnail" style={{ cursor: "pointer" }} onClick={() => navigate(`/blog/${slugify(blog.title)}`)}>
                          <img src={blog.image} alt={blog.title} loading="lazy" />
                        </div>

                        {/* Card Content */}
                        <div className="blog-explore-content" style={{ cursor: "pointer" }} onClick={() => navigate(`/blog/${slugify(blog.title)}`)}>
                          <h3 className="blog-explore-card-title">{blog.title}</h3>
                          <p className="blog-explore-card-date">{blog.date}</p>
                          <div className="blog-explore-tags">
                            {blog.tags.map((tag, index) => (
                              <span key={index} className="blog-explore-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center w-100 py-5">
                      <h4 className="text-muted">No articles found in this category.</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Load More Button - Centered on Full Screen */}
            {visibleCount < bottomBlogs.length && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="text-center">
                    <button 
                      className="blog-load-more-btn"
                      onClick={() => setVisibleCount(prev => prev + 6)}
                    >
                      Load More
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQs Section */}
        <div className="scroll-animate">
          <HomepageFaq />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Blog;