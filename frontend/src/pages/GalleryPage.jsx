import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import '../styles/gallery.css';

export default function GalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    async function loadGalleries() {
      const data = await apiService.getGalleries();
      setGalleries(data);
    }
    loadGalleries();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const getImgSrc = (imgName) => {
    if (!imgName) return '/static/user/image/gallery1.jpg';
    if (imgName.startsWith('/')) return imgName;
    if (imgName.startsWith('gallery')) return `/static/user/image/${imgName}`;
    return `/static/admin/image/${imgName}`;
  };

  const visibleGalleries = galleries.slice(0, visibleCount);
  const hasMore = visibleCount < galleries.length;

  return (
    <div className="gallery-page-root">
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1> Photos Gallery of Dream. </h1>
          <p>
            Capturing your precious moments, one frame at a time ✨
            <br />
            Where every celebration becomes a timeless memory
          </p>
        </div>
      </section>

      <div className="gallery">
        {visibleGalleries.map((g) => {
          const src = getImgSrc(g.image);
          return (
            <div
              className="gallery-card"
              key={g.id}
              onClick={() => setLightboxImg(src)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={src}
                alt="Gallery Image"
                onError={(e) => {
                  e.currentTarget.src = '/static/user/image/gallery1.jpg';
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="lightbox"
          id="lightbox"
          style={{ display: 'flex' }}
          onClick={(e) => {
            if (e.target.id !== 'lightbox-img') {
              setLightboxImg(null);
            }
          }}
        >
          <span
            className="close"
            onClick={() => setLightboxImg(null)}
            style={{ cursor: 'pointer' }}
          >
            &times;
          </span>
          <img id="lightbox-img" src={lightboxImg} alt="Enlarged" />
        </div>
      )}

      {hasMore && (
        <div className="load-more-container">
          <a
            href="javascript:void(0)"
            id="loadMore"
            onClick={handleLoadMore}
            style={{ cursor: 'pointer' }}
          >
            Load More
          </a>
        </div>
      )}
    </div>
  );
}

