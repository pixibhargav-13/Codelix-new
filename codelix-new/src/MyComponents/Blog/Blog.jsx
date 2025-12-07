import React from "react";
import "./Blog.css";
import { SEO } from "../../components/SEO";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { HomepageFaq } from "../HomepageFaq/HomepageFaq";
import blogImg1 from "../Images/homepage-blog-image.png";
import blogImg2 from "../Images/homepage-blog-image2.png";
import blogImg3 from "../Images/homepage-blog-image3.png";
import rightArrow from "../Images/blackArrow.png";
import underline from "../Images/what-we-build-underline.png";

const Blog = () => {
  const [activeCategory, setActiveCategory] = React.useState("All Articles");

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

  const blogs = [
    {
      id: 1,
      title: "Why digital presence matters more than ever in 2025",
      date: "20 October 2024",
      readTime: "5 min read",
      image: blogImg1,
      tags: ["All Articles", "business"],
    },
    {
      id: 2,
      title: "Design system & component-based UIS: Efficiency at scale",
      date: "20 October 2024",
      readTime: "5 min read",
      image: blogImg2,
      tags: ["All Articles", "UI/UX"],
    },
    {
      id: 3,
      title: "Progressive web apps (PWAS) as the new standard",
      date: "20 October 2024",
      readTime: "5 min read",
      image: blogImg3,
      tags: ["All Articles", "Tech"],
    },
    {
      id: 4,
      title: "SaaS vs. On-Premise: What's Best for Your Business?",
      date: "20 October 2024",
      readTime: "5 min read",
      image: blogImg1,
      tags: ["All Articles", "business"],
    },
    {
      id: 5,
      title: "How E-Commerce Platforms Boost Retail Transformation",
      date: "20 October 2024",
      readTime: "5 min read",
      image: blogImg2,
      tags: ["All Articles", "E-Commerce"],
    },
    {
      id: 6,
      title: "How End-to-End Web Development Delivers Better Results",
      date: "20 October 2024",
      readTime: "5 min read",
      image: blogImg3,
      tags: ["All Articles", "Development"],
    },
    {
      id: 7,
      title: "Top 5 Reasons to choose laravel for faster web app development.",
      date: "31 October 2025",
      readTime: "5 min read",
      image: blogImg1,
      tags: ["All Articles", "business"],
    },
    {
      id: 8,
      title: "AI-Powered Solutions Transforming Modern Businesses",
      date: "31 October 2025",
      readTime: "5 min read",
      image: blogImg2,
      tags: ["All Articles", "Artificial Intelligence"],
    },
    {
      id: 9,
      title: "Mastering WordPress: Advanced CMS Techniques",
      date: "31 October 2025",
      readTime: "5 min read",
      image: blogImg3,
      tags: ["All Articles", "CMS"],
    },
    {
      id: 10,
      title: "Building Scalable Web Applications with Modern Frameworks",
      date: "31 October 2025",
      readTime: "5 min read",
      image: blogImg1,
      tags: ["All Articles", "Development"],
    },
    {
      id: 11,
      title: "The Future of Mobile App Development: Trends and Insights",
      date: "31 October 2025",
      readTime: "5 min read",
      image: blogImg2,
      tags: ["All Articles", "Tech"],
    },
    {
      id: 12,
      title: "Optimizing User Experience Through Better UI/UX Design",
      date: "31 October 2025",
      readTime: "5 min read",
      image: blogImg3,
      tags: ["All Articles", "UI/UX"],
    },
  ];


  return (
    <>
      <SEO
        title="Blog | Tech Insights & Development Tips | Codelix"
        description="Discover the latest in web development, app development, AI technology, and design trends. Expert insights from the Codelix team."
        keywords="blog, tech blog, development tips, web development insights, coding tutorials"
        canonical="https://codelix.com/blog"
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
        <section className="blog-posts-section">
          <div className="container">
            <div className="row g-4">
              {blogs.slice(0, 6).map((blog) => (
                <div className="col-lg-4 col-md-6" key={blog.id}>
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

        {/* Keep Exploring Blogs Section */}
        <section className="blog-explore-section py-7">
          <div className="container">
            {/* Header */}
            <div className="blog-explore-header text-center">
              <h2 className="heading-provide mb-2">
                Keep Exploring{" "}
                <span className="underline-wrapper fw-bold">
                  Blogs
                  <img src={underline} alt="underline" className="underline-img" />
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
                        onClick={() => setActiveCategory(category)}
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
                  {blogs.slice(6, 12).map((blog) => (
                    <div className="blog-explore-card" key={blog.id}>
                      {/* Thumbnail */}
                      <div className="blog-explore-thumbnail">
                        <img src={blog.image} alt={blog.title} />
                      </div>

                      {/* Card Content */}
                      <div className="blog-explore-content">
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
                  ))}
                </div>
              </div>
            </div>

            {/* Load More Button - Centered on Full Screen */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="text-center">
                  <button className="blog-load-more-btn">Load More</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <HomepageFaq />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Blog;