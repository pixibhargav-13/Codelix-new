import React from 'react';
import './Blog.css';
import { SEO } from '../../components/SEO';

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
                <h1>This is blog</h1>
            </div>
        </>
    )
};

export default Blog;