import React from 'react';

export default function TransportCard({ transport }) {
  const imageSrc = transport.image
    ? (transport.image.startsWith('/')
        ? transport.image
        : (transport.image.startsWith('tr')
            ? `/static/user/image/${transport.image}`
            : `/static/admin/image/${transport.image}`))
    : '/static/user/image/tr_1.jpg';

  return (
    <div className="tra_tion-card">
      <img
        src={imageSrc}
        alt={transport.vehicle}
        width="100%"
        onError={(e) => {
          e.currentTarget.src = '/static/user/image/tr_1.jpg';
        }}
      />
      <h3>{transport.vehicle}</h3>
    </div>
  );
}

