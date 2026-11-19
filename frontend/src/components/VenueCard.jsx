import React from 'react';

export default function VenueCard({ venue }) {
  const imageSrc = venue.image
    ? (venue.image.startsWith('/')
        ? venue.image
        : (venue.image.startsWith('venue')
            ? `/static/user/image/${venue.image}`
            : `/static/admin/image/${venue.image}`))
    : '/static/user/image/venue1.jpg';

  return (
    <div className="venue-card">
      <div className="venue-image">
        <img
          src={imageSrc}
          width="100%"
          alt={venue.name}
          onError={(e) => {
            e.currentTarget.src = '/static/user/image/venue1.jpg';
          }}
        />
      </div>
      <div className="venue-card-body">
        <h3>{venue.name}</h3>
        <p className="venue-location">📍{venue.location}</p>
      </div>
    </div>
  );
}

