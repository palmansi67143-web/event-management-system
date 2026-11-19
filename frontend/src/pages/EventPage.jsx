import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../services/api';
import EventCard from '../components/EventCard';
import '../styles/event.css';

export default function EventPage() {
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('type');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      const data = await apiService.getEvents(packageType);
      setEvents(data);
    }
    loadEvents();
  }, [packageType]);

  return (
    <div className="event-page-root">
      <section className="Contact-hero1">
        <div className="Contact-overlay1">
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

      <div className="card-wrapper">
        {events.length > 0 ? (
          events.map((ev) => <EventCard key={ev.id} event={ev} />)
        ) : (
          <div style={{ textAlign: 'center', width: '100%', padding: '60px 20px' }}>
            <h3>No events found for this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

