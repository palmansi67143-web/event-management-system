import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import BlogCard from '../components/BlogCard';
import ContactCTA from '../components/ContactCTA';
import '../styles/blog.css';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function loadBlogs() {
      const data = await apiService.getBlogs();
      setBlogs(data);
    }
    loadBlogs();
  }, []);

  return (
    <div className="blog-page-root">
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Blogs</h1>
          <p>
            Insights & Ideas for Your Perfect Event 💫
            <br />
            Expert tips and inspiring stories from the world of celebrations
          </p>
        </div>
      </section>

      <section className="blog-wrapper">
        {blogs.map((b) => (
          <BlogCard key={b.id} blog={b} linkToSlug={true} />
        ))}
      </section>

      <div className="about-content">
        <ContactCTA />
      </div>
    </div>
  );
}

