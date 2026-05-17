import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs, slugify } from '../../data/blogData';
import { Navbar } from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { SEO } from '../../components/SEO';
import { HomepageFaq } from '../HomepageFaq/HomepageFaq';
import NotFound from '../NotFound/NotFound';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = blogs.find(b => slugify(b.title) === slug);

  useScrollAnimation();

  if (!blog) {
    return <NotFound />;
  }

  const cleanDescription = blog.content
    .replace(/\\n/g, ' ')
    .replace(/#/g, '')
    .replace(/>/g, '')
    .replace(/-/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 155) + "...";

  const currentUrl = `https://www.codelixitsolutions.com/blog/${slug}`;

  return (
    <>
      <SEO 
        title={`${blog.title} | Codelix IT Solutions`}
        description={cleanDescription}
        keywords={blog.tags.join(", ")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": currentUrl
        },
        "headline": blog.title,
        "description": cleanDescription,
        "image": [
          `https://www.codelixitsolutions.com${blog.image}`
        ],
        "datePublished": new Date(blog.date).toISOString(),
        "dateModified": new Date(blog.date).toISOString(),
        "author": [{
          "@type": "Organization",
          "name": "Codelix IT Solutions",
          "url": "https://www.codelixitsolutions.com"
        }],
        "publisher": {
          "@type": "Organization",
          "name": "Codelix IT Solutions",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.codelixitsolutions.com/logo.png"
          }
        }
      })}} />
      <div className="blog-detail-page">
        <div className="blog-detail-header">
          <Navbar />
          <div className="container blog-detail-header-content">
            <div className="blog-meta">
              <span className="blog-category">{blog.tags[1] || blog.tags[0]}</span>
              <span className="blog-date">{blog.date}</span>
              <span className="blog-read-time">{blog.readTime}</span>
            </div>
            <h1 className="blog-detail-title">{blog.title}</h1>
          </div>
        </div>

        <div className="container mt-4">
          <nav aria-label="breadcrumb" className="blog-breadcrumb-container mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/blog" className="text-decoration-none text-muted">Blog</Link></li>
              <li className="breadcrumb-item active text-dark fw-medium" aria-current="page">{blog.title}</li>
            </ol>
          </nav>

          <div className="blog-detail-image-container">
            <img src={blog.image} alt={blog.title} className="blog-detail-main-image" />
          </div>
          
          <div className="blog-detail-content">
            {blog.content.split(/\n\n|\\n\\n/).map((block, index) => {
              const trimmed = block.trim();
              if (trimmed.startsWith('### ')) {
                return <h3 key={index} className="blog-h3">{trimmed.replace('### ', '')}</h3>;
              }
              if (trimmed.startsWith('## ')) {
                return <h2 key={index} className="blog-h2">{trimmed.replace('## ', '')}</h2>;
              }
              if (trimmed.startsWith('> ')) {
                return <blockquote key={index} className="blog-blockquote">{trimmed.replace('> ', '')}</blockquote>;
              }
              if (trimmed.startsWith('- ')) {
                const items = trimmed.split(/\\n|\\\\n|\n/).filter(l => l.trim().startsWith('- '));
                return (
                  <ul key={index} className="blog-list">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{trimmed}</p>;
            })}
          </div>

          <div className="blog-detail-footer">
            <Link to="/blog" className="btn blue-common-btn px-4 py-2 text-white">← Back to Blogs</Link>
          </div>

          {/* Related Articles Section for SEO & Engagement */}
          {blogs.filter(b => b.id !== blog.id && b.tags.some(tag => blog.tags.includes(tag))).length > 0 && (
            <div className="related-articles mt-5 pt-5 border-top">
              <h3 className="mb-4 font-weight-bold">Related Articles</h3>
              <div className="row g-4">
                {blogs
                  .filter(b => b.id !== blog.id && b.tags.some(tag => blog.tags.includes(tag)))
                  .slice(0, 2)
                  .map(relatedBlog => (
                    <div className="col-md-6" key={relatedBlog.id}>
                      <Link to={`/blog/${slugify(relatedBlog.title)}`} className="text-decoration-none text-dark">
                        <div className="card h-100 shadow-sm border-0 related-blog-card">
                          <img src={relatedBlog.image} className="card-img-top" alt={relatedBlog.title} style={{ height: '200px', objectFit: 'cover' }} />
                          <div className="card-body">
                            <h5 className="card-title fw-bold mb-2">{relatedBlog.title}</h5>
                            <p className="card-text text-muted small mb-0">{relatedBlog.date} • {relatedBlog.readTime}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="scroll-animate">
          <HomepageFaq />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BlogDetail;
