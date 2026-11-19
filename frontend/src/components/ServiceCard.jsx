import React from 'react';

export default function ServiceCard({ service }) {
  const imageSrc = service.image
    ? (service.image.startsWith('/')
        ? service.image
        : (service.image.startsWith('service')
            ? `/static/user/image/${service.image}`
            : `/static/admin/image/${service.image}`))
    : '/static/user/image/service1.jpg';

  return (
    <div className="service-card">
      <img
        src={imageSrc}
        alt={service.name}
        width="100%"
        onError={(e) => {
          e.currentTarget.src = '/static/user/image/service1.jpg';
        }}
      />
      <h3>{service.name}</h3>
    </div>
  );
}

