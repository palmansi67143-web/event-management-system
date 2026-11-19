import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import ContactCTA from '../components/ContactCTA';
import '../styles/blog_detail.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    async function loadData() {
      const current = await apiService.getBlogBySlug(slug);
      setBlog(current);
      const all = await apiService.getBlogs();
      setLatestBlogs(all.filter((b) => b.slug !== slug).slice(0, 8));
    }
    loadData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
        <h2>Loading blog post...</h2>
      </div>
    );
  }

  const imageSrc = blog.image
    ? (blog.image.startsWith('/')
        ? blog.image
        : (blog.image.startsWith('blog')
            ? `/static/user/image/${blog.image}`
            : `/static/admin/image/${blog.image}`))
    : '/static/user/image/blog1.jpg';

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="blog-detail-root">
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>{blog.title}</h1>
        </div>
      </section>

      <div className="package-content">
        <div className="img-content">
          <div className="image-container">
            <h2>
              <span className="explore">Explore The</span>{' '}
              <span className="venues">Blogs</span>
            </h2>
          </div>
          <div className="content-container">
            <span>
              <p>
                At Dream Events, we understand that every celebration is unique, with each client
                bringing their own vision and requirements. To make the journey effortless, we’ve
                carefully crafted a range of event packages that balance flexibility, creativity, and
                precision. From venue selection and décor styling to entertainment, hospitality, and
                seamless logistics, our packages provide clear inclusions so you know exactly what to
                expect. Whether it’s an intimate gathering, a grand wedding, or a corporate function,
                our tailored solutions are designed to fit your budget and style, ensuring that every
                event becomes an unforgettable experience.
              </p>
            </span>
          </div>
        </div>
      </div>

      <section className="blog-detail">
        <div className="blog-page">
          {/* Blog Content */}
          <div className="blog-content">
            {/* Blog Banner */}
            <div className="blog-hero">
              <img
                src={imageSrc}
                alt={blog.title}
                onError={(e) => {
                  e.currentTarget.src = '/static/user/image/blog1.jpg';
                }}
              />
            </div>

            <p className="blog-date">{formatDate(blog.blog_date)}</p>
            <div className="para">
              <p>{blog.short_description ? blog.short_description.slice(0, 200) : ''}...</p>
            </div>
            <div
              className="blog-text"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          <div className="blog-page2">
            <div className="blog-heading">
              <h3>Latest Blogs</h3>
            </div>
            <div className="blog-wrapper">
              {latestBlogs.map((b) => (
                <div className="blog-card" key={b.id}>
                  <div className="blog-content">
                    <div className="text">
                      <Link to={`/blog/${b.slug}`}>{b.title}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="about-content">
        <ContactCTA />
      </div>
    </div>
  );
}

