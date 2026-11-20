import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [openSection, setOpenSection] = useState({
    col1: true,
    col2: false,
    col3: false,
    col4: false,
  });

  const toggleSection = (col) => {
    // Only toggles on mobile screens
    if (window.innerWidth >= 768) return;
    setOpenSection((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className={`footer-col ${openSection.col1 ? 'is-open' : ''}`}>
          <h3
            className="footer-logo footer-accordion-title"
            onClick={() => toggleSection('col1')}
            role="button"
            tabIndex={0}
            aria-expanded={openSection.col1}
          >
            <span>Company Name</span>
            <span className="accordion-icon d-md-none">
              <i className="fas fa-chevron-down"></i>
            </span>
          </h3>
          <div className="footer-accordion-content">
            <p className="footer-text">
              We provide high-quality services and smart solutions to help your business grow.
              Join our community for updates and offers.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className={`footer-col ${openSection.col2 ? 'is-open' : ''}`}>
          <h4
            className="footer-accordion-title"
            onClick={() => toggleSection('col2')}
            role="button"
            tabIndex={0}
            aria-expanded={openSection.col2}
          >
            <span>Quick Links</span>
            <span className="accordion-icon d-md-none">
              <i className="fas fa-chevron-down"></i>
            </span>
          </h4>
          <div className="footer-accordion-content">
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/service">Services</Link></li>
              <li><Link to="/Contact">Contact</Link></li>
              <li><Link to="/event">Event</Link></li>
              <li><Link to="/Blogs">Blogs</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>
        </div>

        {/* Column 3 */}
        <div className={`footer-col ${openSection.col3 ? 'is-open' : ''}`}>
          <h4
            className="footer-accordion-title"
            onClick={() => toggleSection('col3')}
            role="button"
            tabIndex={0}
            aria-expanded={openSection.col3}
          >
            <span>Contact Us</span>
            <span className="accordion-icon d-md-none">
              <i className="fas fa-chevron-down"></i>
            </span>
          </h4>
          <div className="footer-accordion-content">
            <div className="contact-item">
              <img src="/static/user/image/address-pin-location-svgrepo-com.svg" alt="Address" />
              <span>221, Jaipur, Rajasthan</span>
            </div>
            <div className="contact-item">
              <img src="/static/user/image/phone-call-ringing-svgrepo-com.svg" alt="Phone" />
              <a href="tel:+913232568895">+91 32325 68895</a>
            </div>
            <div className="contact-item">
              <img src="/static/user/image/email-svgrepo-com.svg" alt="Email" />
              <a href="mailto:dreameventmanagement@gmail.com">dreameventmanagement@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Column 4 */}
        <div className={`footer-col ${openSection.col4 ? 'is-open' : ''}`}>
          <h4
            className="footer-accordion-title"
            onClick={() => toggleSection('col4')}
            role="button"
            tabIndex={0}
            aria-expanded={openSection.col4}
          >
            <span>Follow Us</span>
            <span className="accordion-icon d-md-none">
              <i className="fas fa-chevron-down"></i>
            </span>
          </h4>
          <div className="footer-accordion-content">
            <div className="social-icons">
              <a href="#">
                <img src="/static/user/image/twitter-154-svgrepo-com.svg" alt="twitter" />
              </a>
              <a href="#">
                <img src="/static/user/image/facebook-square-svgrepo-com.svg" alt="Facebook" />
              </a>
              <a href="#">
                <img src="/static/user/image/whatsapp-alt-svgrepo-com.svg" alt="whatsapp" />
              </a>
              <a href="#">
                <img src="/static/user/image/instagram-svgrepo-com.svg" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 dreamevent . All Rights Reserved.
      </div>
    </footer>
  );
}
