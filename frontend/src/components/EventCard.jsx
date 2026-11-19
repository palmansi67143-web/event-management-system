import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  const [isOpen, setIsOpen] = useState(false);

  // Helper for image src
  const imageSrc = event.image
    ? (event.image.startsWith('/')
        ? event.image
        : (event.image.startsWith('card')
            ? `/static/user/image/${event.image}`
            : `/static/admin/image/${event.image}`))
    : '/static/user/image/card1.jpg';

  const venueName = event.venue?.name || '-';

  return (
    <>
      <div
        className="event-card"
        data-form={`form${event.id}`}
        data-category={event.category}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-image">
          <img
            src={imageSrc}
            width="100%"
            alt={event.name}
            onError={(e) => {
              e.currentTarget.src = '/static/user/image/card1.jpg';
            }}
          />
          <span className="price">₹ {event.price}</span>
        </div>
        <div className="card-body">
          <h3>{event.name}</h3>
          <p className="location">📍 {event.city}, {venueName}</p>
        </div>
        <div className="tags">
          <span>{event.category}</span>
        </div>
        <div className="info">
          <div>🍽 {event.food_type}</div>
          <div>👥 {event.pax} Pax</div>
          <div>🏨 {event.room} room</div>
        </div>
      </div>

      <div className={`event-form ${isOpen ? 'active' : ''}`} id={`form${event.id}`}>
        <span
          className="close-form"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          style={{ cursor: 'pointer' }}
        >
          ✖
        </span>
        <h2>{event.name}</h2>
        <ul className="detail-list">
          <li>
            <span className="label">Price:</span>
            <span className="value">₹ {event.price}</span>
          </li>
          <li>
            <span className="label">Food Type:</span>
            <span className="value">{event.food_type}</span>
          </li>
          <li>
            <span className="label">Pax:</span>
            <span className="value">{event.pax}</span>
          </li>
          <li>
            <span className="label">Room:</span>
            <span className="value">{event.room}</span>
          </li>
          <li>
            <span className="label">City:</span>
            <span className="value">{event.city}</span>
          </li>
          <li>
            <span className="label">Venue:</span>
            <span className="value">{venueName}</span>
          </li>
          <li>
            <span className="label">Package:</span>
            <span className="value">{event.category}</span>
          </li>
        </ul>
        <Link to={`/book_event?event_id=${event.id}`} className="book-btn">
          Book Now
        </Link>
      </div>
    </>
  );
}

