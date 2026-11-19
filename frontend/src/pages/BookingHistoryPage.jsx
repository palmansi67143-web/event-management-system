import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import '../styles/booking_history.css';

export default function BookingHistoryPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      const data = await apiService.getUserBookings(user?.email);
      setBookings(data);
    }
    loadBookings();
  }, [user]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
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

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '80vh' }}>
      <div className="booking-history-container">
        <h2>My Booking History</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event</th>
              <th>Venue</th>
              <th>Service</th>
              <th>Transport</th>
              <th>Event Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.event?.name || '-'}</td>
                  <td>{b.venue?.name || '-'}</td>
                  <td>{b.service?.name || '-'}</td>
                  <td>{b.transport?.vehicle || '-'}</td>
                  <td>{formatDate(b.event_date)}</td>
                  <td className={`status ${b.status}`}>{b.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  No booking history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

