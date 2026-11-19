import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import VenueCard from '../components/VenueCard';
import ContactCTA from '../components/ContactCTA';
import '../styles/venue.css';

export default function VenuePage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function loadVenues() {
      const data = await apiService.getVenues();
      setVenues(data);
    }
    loadVenues();
  }, []);

  return (
    <div className="venue-page-root">
      <section className="venueimage">
        <div className="venueoverlay">
          <div className="text-wrapper">
            <p className="slide-right" style={{ fontSize: '24px', fontWeight: 'bold' }}>
              "We don't create events, we create memories that last a lifetime."
            </p>
            <br />
            <p className="slide-right" style={{ fontSize: '20px' }}>
              "Events are where stories begin and memories are born."
            </p>
          </div>
        </div>
      </section>

      <div className="service-content">
        <div className="img-content">
          <div className="image-container">
            <h2>
              <span className="explore">Explore The</span>{' '}
              <span className="venues">Venues</span>
            </h2>
          </div>
          <div className="content-container">
            <span>
              <p>
                At Dream Event Company, our services are designed to transform ordinary occasions
                into extraordinary experiences. Whether it’s a lavish wedding, a high-profile
                corporate gathering, or an intimate private celebration, we handle every detail with
                precision and creativity. From concept development and venue selection to décor,
                choosing us means choosing peace of mind, knowing that your special day will be
                managed by professionals who care as much about your event as you do.
              </p>
            </span>
          </div>
        </div>
      </div>

      <section className="venues1">
        <h2>Our Venues</h2>
        <div className="venue-wrapper">
          {venues.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}

