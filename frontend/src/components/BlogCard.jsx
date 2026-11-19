import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BlogCard({ blog, linkToSlug = false }) {
  const navigate = useNavigate();

  const imageSrc = blog.image
    ? (blog.image.startsWith('/')
        ? blog.image
        : (blog.image.startsWith('blog')
            ? `/static/user/image/${blog.image}`
            : `/static/admin/image/${blog.image}`))
    : '/static/user/image/blog1.jpg';

  // Format date DD-MM-YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return dateStr;
    }
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    if (linkToSlug && blog.slug) {
      navigate(`/blog/${blog.slug}`);
    } else {
      navigate('/Blogs');
    }
  };

  return (
    <div className="blog-card">
      <div className="blog-img">
        <img
          src={imageSrc}
          alt={blog.title}
          onError={(e) => {
            e.currentTarget.src = '/static/user/image/blog1.jpg';
          }}
        />
        <div className="blog-date">{formatDate(blog.blog_date)}</div>
      </div>
      <div className="blog-content">
        <div className="text">
          <h3>{blog.title}</h3>
        </div>
        <div className="para">
          <p>{blog.short_description ? blog.short_description.slice(0, 200) : ''}...</p>
        </div>
        <div className="read">
          <a
            className="read-more"
            style={{ cursor: 'pointer' }}
            onClick={handleReadMore}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

