import React, { useState } from 'react';
import { apiService } from '../services/api';
import '../styles/contact.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    MobileNo: '',
    event_type: 'Wedding',
    event_date: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.firstname.length < 2) {
      setError('First name must be at least 2 characters');
      return;
    }
    if (formData.MobileNo.length < 10) {
      setError('Mobile number must be at least 10 digits');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    try {
      await apiService.submitContact(formData);
      setSubmitted(true);
      setFormData({
        email: '',
        firstname: '',
        MobileNo: '',
        event_type: 'Wedding',
        event_date: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

  return (
    <div className="contact-page-root">
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1> Contact Us </h1>
          <p>
            Need help planning your next event? Look no further than <br />
            Dream event Management!{' '}
          </p>
        </div>
      </section>

      <div className="container-contact">
        <div className="contact-box">
          <div className="title">
            <h2>WANT TO WORK WITH US?</h2>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="icon">
                <img src="/static/user/image/address-pin-location-svgrepo-com.svg" alt="Address" />
              </div>
              <div className="info">
                <h4>Address</h4>
              </div>
            </div>
            <div className="info-text">
              <p> dghhiufh 221 hbgjh ,rajasthan</p>
            </div>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="icon">
                <img src="/static/user/image/phone-call-ringing-svgrepo-com.svg" alt="Phone" />
              </div>
              <div className="info">
                <h4> Talk to our client support</h4>
              </div>
            </div>
            <div className="info-text">
              <p> ‪+91 32325 68895‬</p>
            </div>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="icon">
                <img src="/static/user/image/email-svgrepo-com.svg" alt="Email" />
              </div>
              <div className="info">
                <h4> Write to us about your need</h4>
              </div>
            </div>
            <div className="info-text">
              <p> dreameventmanagement@gmail.com</p>
            </div>
            <div className="social-icons">
              <img src="/static/user/image/instagram-svgrepo-com.svg" alt="Instagram" />
              <img src="/static/user/image/facebook-square-svgrepo-com.svg" alt="Facebook" />
              <img src="/static/user/image/whatsapp-alt-svgrepo-com.svg" alt="WhatsApp" />
              <img src="/static/user/image/twitter-154-svgrepo-com.svg" alt="Twitter" />
            </div>
          </div>
        </div>

        <div className="contactform">
          <h2> Contact Us </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstname"> Name </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="MobileNo">MobileNo</label>
              <input
                type="text"
                className="form-control"
                id="MobileNo"
                name="MobileNo"
                placeholder="Enter your Mobile Number"
                value={formData.MobileNo}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label> Events Type </label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                >
                  <option>Wedding</option>
                  <option>Birthday Party</option>
                  <option>Corporate Event</option>
                  <option>Concert</option>
                  <option>Social Event</option>
                  <option>Social Gathering</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Event Date </label>
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <br />
              <textarea
                placeholder="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {submitted && (
        <div id="successMessage" className="success-message" style={{ display: 'block' }}>
          ✅ Your message has been sent successfully!
        </div>
      )}

      <p className="md-text">
        {' '}
        <b>We build your dream around you.</b>{' '}
      </p>
      <br />
    </div>
  );
}

