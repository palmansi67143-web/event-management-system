import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import '../styles/booking.css';

export default function BookEventPage() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event_id');
  const { user, showFlash } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [services, setServices] = useState([]);
  const [transports, setTransports] = useState([]);

  const [formData, setFormData] = useState({
    user_name: user?.name || '',
    user_email: user?.email || '',
    user_phone: user?.phone || '',
    service_id: '',
    transport_id: '',
    event_date: '',
  });

  // Tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (!user) {
      showFlash('Please login first to book event', 'error');
      navigate('/login');
      return;
    }

    async function loadData() {
      const allEvents = await apiService.getEvents();
      const currentEv = allEvents.find((e) => String(e.id) === String(eventId)) || allEvents[0];
      setEvent(currentEv);

      const [srvs, trns] = await Promise.all([
        apiService.getServices(),
        apiService.getTransports(),
      ]);
      setServices(srvs);
      setTransports(trns);
    }
    loadData();
  }, [eventId, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event) return;

    const selectedService = services.find((s) => String(s.id) === String(formData.service_id));
    const selectedTransport = transports.find((t) => String(t.id) === String(formData.transport_id));

    const bookingPayload = {
      event_id: event.id,
      event: { name: event.name },
      venue_id: event.venue_id,
      venue: { name: event.venue?.name || '' },
      service_id: formData.service_id || null,
      service: selectedService ? { name: selectedService.name } : null,
      transport_id: formData.transport_id || null,
      transport: selectedTransport ? { vehicle: selectedTransport.vehicle } : null,
      user_name: formData.user_name,
      user_email: formData.user_email,
      user_phone: formData.user_phone,
      event_date: formData.event_date,
    };

    const res = await apiService.createBooking(bookingPayload);
    showFlash('Booking Successful. Please complete payment.', 'success');
    navigate(`/payment/${res.booking_id}`);
  };

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
        <h3>Loading event details...</h3>
      </div>
    );
  }

  return (
    <div className="booking-page-root" style={{ paddingTop: '100px', minHeight: '85vh' }}>
      <div className="booking-form">
        <h2>Book Your Event</h2>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="event_id" value={event.id} />

          <label>Event Name</label>
          <input type="text" value={event.name} readOnly />

          <label>Price</label>
          <input type="text" value={`₹ ${event.price}`} readOnly />

          <label>City</label>
          <input type="text" value={event.city || ''} readOnly />

          <label>Venue</label>
          <input type="text" value={event.venue?.name || ''} readOnly />

          <label>Select Service</label>
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <label>Select Transport</label>
          <select
            name="transport_id"
            value={formData.transport_id}
            onChange={handleChange}
          >
            <option value="">Select Transport</option>
            {transports.map((t) => (
              <option value={t.id} key={t.id}>
                {t.vehicle}
              </option>
            ))}
          </select>

          <label>Your Name</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />

          <label>Your Email</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            name="user_phone"
            value={formData.user_phone}
            onChange={handleChange}
          />

          <label>Event Date</label>
          <input
            type="date"
            name="event_date"
            min={minDate}
            value={formData.event_date}
            onChange={handleChange}
            required
          />

          <button type="submit">Book Now</button>
        </form>
      </div>
    </div>
  );
}

