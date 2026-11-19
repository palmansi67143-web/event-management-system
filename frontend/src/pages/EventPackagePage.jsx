import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import PackageCard from '../components/PackageCard';
import ContactCTA from '../components/ContactCTA';
import '../styles/e_package.css';

export default function EventPackagePage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function loadPackages() {
      const data = await apiService.getPackages();
      setPackages(data);
    }
    loadPackages();
  }, []);

  return (
    <div className="event-package-root">
      <section className="e_p-hero1">
        <div className="e_p-overlay1">
          <p>"Make Every Special Moment Unforgettable - Our Exclusive Event Packages"</p>
        </div>
      </section>

      <div className="package-content">
        <div className="img-content">
          <div className="image-container">
            <h2>
              <span className="explore">Explore The</span>{' '}
              <span className="venues">Packages</span>
            </h2>
          </div>
          <div className="content-container">
            <span>
              <p>
                At Dream Events, we know that every celebration is unique, and no two clients have
                the same vision or requirements. That’s why we’ve carefully crafted a range of event
                packages that balance flexibility, creativity, and precision. Each package is
                designed to simplify the planning process by offering clear inclusions—from venue
                selection and décor styling to entertainment, hospitality, and seamless logistics—so
                you know exactly what to expect. Whether you’re planning an intimate gathering, a
                grand wedding, or a corporate function, our packages provide tailored solutions
                that fit your budget and style.
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="card-head">
        <b>
          <h1>Our Packages</h1>
        </b>
        <div className="card-wrapper">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} variant="event_package" />
          ))}
        </div>
      </div>

      <section className="text-wrapper">
        <div className="event-card-text">
          <div className="p-column">
            <h1>The Full Work (Premium Package)</h1>
            <br />
            <br />
            <p>
              A Complete, end-to-end management solution for clients who want a hands-off,
              stress-free experience.
            </p>
          </div>
        </div>

        <div className="event-card-text">
          <div className="p-column">
            <h1>The Essential (Standard Packages)</h1>
            <br />
            <br />
            <p>
              Professional support for clients who want to manage key elements but need expert
              guidance to bring all together.
            </p>
          </div>
        </div>

        <div className="event-card-text">
          <div className="p-column">
            <h1>The Weekend Vibes (Destination Package)</h1>
            <br />
            <p>
              Specifically designed for multi-day celebrations, destination weddings, or
              out-of-town retreats.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}

