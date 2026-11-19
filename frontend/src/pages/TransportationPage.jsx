import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import TransportCard from '../components/TransportCard';
import ContactCTA from '../components/ContactCTA';
import '../styles/tr_tion.css';

export default function TransportationPage() {
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    async function loadTransports() {
      const data = await apiService.getTransports();
      setTransports(data);
    }
    loadTransports();
  }, []);

  return (
    <div className="transport-page-root">
      <section className="tra_tion-hero1">
        <div className="tra_tion-overlay1">
          <div className="tra_tion-content">
            <p className="slide-right">
              "Arrive in style, leave with memories - premium wedding transportation at its finest."
            </p>
          </div>
        </div>
      </section>

      <div className="transport-content">
        <div className="img-content">
          <div className="image-container">
            <h2>
              <span className="explore">Your Life</span>{' '}
              <span className="venues">Journey</span>
            </h2>
          </div>
          <div className="content-container">
            <span>
              <p>
                <b>Arrive in style, leave with memories</b> - premium wedding transportation at its
                finest. Our fleet of luxury and vintage vehicles ensures{' '}
                <b>you make a grand entrance on your special day.</b> With professional chauffeurs
                and beautifully decorated cars, your journey becomes part of the celebration. Your
                journey to forever starts with the perfect ride. Choose from our collection of
                elegant sedans, classic vintage cars, and luxury limousines. We provide comfortable,{' '}
                <b>
                  stylish transportation that complements your wedding theme and creates
                  picture-perfect moments.
                </b>
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="trans-head">
        <b>
          <h1>Transportation Services</h1>
        </b>
      </div>

      <div className="tra_tion-wrapper">
        {transports.map((t) => (
          <TransportCard key={t.id} transport={t} />
        ))}
      </div>

      <ContactCTA />
    </div>
  );
}

