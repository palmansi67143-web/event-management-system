import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactCTA() {
  const navigate = useNavigate();

  return (
    <section className="contact-cta">
      <div className="contact-cta-box">
        {/* Left Content */}
        <div className="contact-text">
          <h2>Let’s Talk</h2>
          <p>
            Have questions or want to plan your next event with us?
            We’re here to help you turn your ideas into reality.
          </p>
        </div>

        {/* Right Button */}
        <div className="contact-action">
          <a
            className="contact-btn"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/Contact');
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}

