import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import '../../styles/dashboard.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    clients: 12,
    events: 6,
    bookings: 8,
    venues: 8,
    services: 6,
    blogs: 3,
    gallery: 24,
    transports: 5,
  });

  const [month, setMonth] = useState('10');
  const [year, setYear] = useState('2026');

  useEffect(() => {
    async function fetchStats() {
      const [evts, vns, srvs, trns, pkgs, blgs, gals, bkgs] = await Promise.all([
        apiService.getEvents(),
        apiService.getVenues(),
        apiService.getServices(),
        apiService.getTransports(),
        apiService.getPackages(),
        apiService.getBlogs(),
        apiService.getGalleries(),
        apiService.getUserBookings(),
      ]);
      setStats({
        clients: 15,
        events: evts.length,
        bookings: bkgs.length,
        venues: vns.length,
        services: srvs.length,
        blogs: blgs.length,
        gallery: gals.length,
        transports: trns.length,
      });
    }
    fetchStats();
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card blue">
          <div className="card-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="card-text">
            <h4>Total Clients</h4>
            <p>{stats.clients}</p>
          </div>
        </div>

        <div className="stat-card pink">
          <div className="card-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="card-text">
            <h4>Total Events</h4>
            <p>{stats.events}</p>
          </div>
        </div>

        <div className="stat-card cyan">
          <div className="card-icon">
            <i className="fas fa-comments"></i>
          </div>
          <div className="card-text">
            <h4>Total Booking</h4>
            <p>{stats.bookings}</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-text">
            <h4>Total Venues</h4>
            <p>{stats.venues}</p>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-text">
            <h4>Total Services</h4>
            <p>{stats.services}</p>
          </div>
        </div>

        <div className="stat-card red">
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-text">
            <h4>Total Blogs </h4>
            <p>{stats.blogs}</p>
          </div>
        </div>

        <div className="stat-card pink">
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-text">
            <h4>Total Gallery</h4>
            <p>{stats.gallery}</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-text">
            <h4>Total Transports</h4>
            <p>{stats.transports}</p>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box" style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}>
          <h4>Booking & Event Distribution</h4>
          <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-chart-pie" style={{ fontSize: '72px', color: '#ff4d6d' }}></i>
              <p style={{ marginTop: '10px', color: '#666' }}>Active bookings and event inquiries</p>
            </div>
          </div>
        </div>

        <div className="chart-box" style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}>
          <h4>Monthly Performance Overview</h4>
          <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-chart-bar" style={{ fontSize: '72px', color: '#2ec4b6' }}></i>
              <p style={{ marginTop: '10px', color: '#666' }}>Client interactions across months</p>
            </div>
          </div>
        </div>
      </div>

      <div className="controls" style={{ marginTop: '30px' }}>
        <label htmlFor="month">Month:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ marginRight: '15px', padding: '6px 12px' }}
        >
          {months.map((m, idx) => (
            <option value={String(idx + 1)} key={idx}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: '6px 12px' }}
        >
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
    </div>
  );
}

