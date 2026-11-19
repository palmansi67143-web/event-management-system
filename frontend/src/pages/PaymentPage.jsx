import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import '../styles/payment.css';

export default function PaymentPage() {
  const { bookingId } = useParams();
  const { showFlash } = useAuth();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [event, setEvent] = useState(null);
  const [method, setMethod] = useState('');
  const [scanState, setScanState] = useState('idle'); // idle | scanning | success

  useEffect(() => {
    async function loadBooking() {
      const b = await apiService.getBookingById(bookingId);
      if (b) {
        setBooking(b);
        const ev = await apiService.getEventById(b.event_id || 1);
        setEvent(ev);
      }
    }
    loadBooking();
  }, [bookingId]);

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('success');
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!method) {
      alert('Please select a payment method');
      return;
    }
    await apiService.processPayment(bookingId, method, event?.price || '0');
    showFlash('Payment Successful! Your event is confirmed.', 'success');
    navigate('/booking_history');
  };

  if (!booking || !event) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
        <h3>Loading booking details...</h3>
      </div>
    );
  }

  const isCash = method === 'Cash';
  const buttonText = isCash ? 'Confirm Booking' : `Pay ₹${event.price}`;

  return (
    <div className="payment-page-root" style={{ paddingTop: '100px', minHeight: '85vh' }}>
      <div className="payment-box">
        <h2>Complete Your Payment</h2>

        <p>
          <strong>Event:</strong> {event.name}
        </p>
        <p>
          <strong>Amount:</strong> ₹{event.price}
        </p>

        <form onSubmit={handleSubmit}>
          <h4>Select Payment Method</h4>

          <label className="payment-option">
            <input
              type="radio"
              name="payment_method"
              value="UPI"
              checked={method === 'UPI'}
              onChange={() => setMethod('UPI')}
              required
            />
            UPI (Google Pay / PhonePe)
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment_method"
              value="Card"
              checked={method === 'Card'}
              onChange={() => setMethod('Card')}
            />
            Debit / Credit Card
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment_method"
              value="QR"
              checked={method === 'QR'}
              onChange={() => setMethod('QR')}
            />
            Scan QR Code
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment_method"
              value="Cash"
              checked={method === 'Cash'}
              onChange={() => setMethod('Cash')}
            />
            Pay By Cash
          </label>

          {/* CARD DETAILS */}
          {method === 'Card' && (
            <div id="cardBox" style={{ display: 'block', marginTop: '15px' }}>
              <h4>Enter Card Details</h4>
              <input type="text" name="card_name" placeholder="Card Holder Name" />
              <input type="text" name="card_number" placeholder="Card Number" />
              <input type="text" name="expiry" placeholder="MM/YY" />
              <input type="password" name="cvv" placeholder="CVV" />
            </div>
          )}

          {/* UPI */}
          {method === 'UPI' && (
            <div id="upiBox" style={{ display: 'block', marginTop: '15px' }}>
              <h4>Enter UPI ID</h4>
              <input type="text" name="upi_id" placeholder="example@upi" />
            </div>
          )}

          {/* QR CODE */}
          {method === 'QR' && (
            <div id="qrBox" style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}>
              <h4>Scan QR Code</h4>
              <img
                src="/static/user/image/OIP.jpeg"
                width="200"
                alt="QR Code"
                style={{ margin: '10px auto' }}
              />
              <p>Scan using Google Pay / PhonePe</p>

              <button type="button" onClick={handleScan} className="scan-btn">
                Scan Payment
              </button>

              {scanState === 'scanning' && (
                <div id="scanLoader" style={{ marginTop: '20px' }}>
                  <p>Scanning Payment...</p>
                  <div className="loader"></div>
                </div>
              )}

              {scanState === 'success' && (
                <div id="scanSuccess" style={{ color: 'green', marginTop: '20px' }}>
                  ✅ Payment Successful
                </div>
              )}
            </div>
          )}

          {/* CASH */}
          {method === 'Cash' && (
            <div id="cashBox" style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}>
              <h4>Cash Payment</h4>
              <p>You can pay cash on the event day.</p>
            </div>
          )}

          <button type="submit" className="pay-btn" id="payButton" style={{ marginTop: '20px' }}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

