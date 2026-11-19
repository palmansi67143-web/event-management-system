import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PackageCard({ pkg, variant = 'home' }) {
  const navigate = useNavigate();

  const imageSrc = pkg.image
    ? (pkg.image.startsWith('/')
        ? pkg.image
        : (pkg.image.startsWith('gallery')
            ? `/static/user/image/${pkg.image}`
            : `/static/admin/image/${pkg.image}`))
    : (pkg.fallbackImage || '/static/user/image/gallery20.jpg');

  const handleClick = () => {
    navigate(`/event?type=${encodeURIComponent(pkg.category)}`);
  };

  if (variant === 'event_package') {
    return (
      <div
        className="event-card"
        data-type={pkg.category}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-image">
          <img
            src={imageSrc}
            width="120%"
            alt={pkg.name}
            onError={(e) => {
              e.currentTarget.src = pkg.fallbackImage || '/static/user/image/gallery20.jpg';
            }}
          />
        </div>
        <div className="card-body">
          <h3>{pkg.name}</h3>
        </div>
      </div>
    );
  }

  return (
    <div
      className="package-card"
      data-type={pkg.category}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="package-text">
        <h3>{pkg.name}</h3>
      </div>
      <div className="package-image">
        <img
          src={imageSrc}
          alt={pkg.name}
          onError={(e) => {
            e.currentTarget.src = pkg.fallbackImage || '/static/user/image/gallery20.jpg';
          }}
        />
      </div>
    </div>
  );
}

