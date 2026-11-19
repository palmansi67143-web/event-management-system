import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">Company Name</h3>
          <p className="footer-text">
            We provide high-quality services and smart solutions to help your business grow.
            Join our community for updates and offers.
          </p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
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
        <div className="footer-col">
          <h4>Contact Us</h4>
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
        <div className="footer-col">
          <h4>Follow Us</h4>
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
      <div className="footer-bottom">
        © 2026 dreamevent . All Rights Reserved.
      </div>
    </footer>
  );
}

