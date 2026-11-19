import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, admin, logout, adminLogout } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setNavOpen(false);
    setServiceOpen(false);
    setUserMenuOpen(false);
    setAdminMenuOpen(false);
  }, [location.pathname]);

  const handleUserLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdminLogout = () => {
    adminLogout();
    navigate('/admin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <Link className="navbar-brand" to="/">
        <img
          src="/static/user/image/Your paragraph text1.png"
          alt="Dream Events"
          style={{ height: '80px' }}
        />
      </Link>

      <button
        className="navbar-toggler ml-auto"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setNavOpen(!navOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbar">
        <div className="navbar-nav ml-auto navbar-link">
          <Link id="home" to="/">Home</Link>
          <Link id="Reviews" to="/about">About Us</Link>

          <div
            className="dropdown d-inline-block"
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >
            <span
              className="dropdown-toggle"
              id="serviceDropdown"
              style={{ color: 'brown', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                setServiceOpen(!serviceOpen);
              }}
            >
              Services
            </span>
            <div
              className={`dropdown-menu ${serviceOpen ? 'show' : ''}`}
              style={{ display: serviceOpen ? 'block' : 'none' }}
            >
              <Link className="dropdown-item" to="/event_package">
                Event Package
              </Link>
              <Link className="dropdown-item" to="/venue">
                Venues
              </Link>
              <Link className="dropdown-item" to="/transportation">
                Transport
              </Link>
              <Link className="dropdown-item" to="/service">
                Other Services
              </Link>
            </div>
          </div>

          <Link id="gallery" to="/gallery">Gallery</Link>
          <Link id="Blogs" to="/Blogs">Blogs</Link>
          <Link id="Contact" to="/Contact">Contact</Link>

          {/* TEEN CONDITIONS: Admin / User / Guest */}
          {admin ? (
            <div
              className="dropdown"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setAdminMenuOpen(true)}
              onMouseLeave={() => setAdminMenuOpen(false)}
            >
              <a
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setAdminMenuOpen(!adminMenuOpen);
                }}
              >
                <i className="fa fa-user-secret" style={{ fontSize: '28px', color: 'brown' }}></i>
                {admin.image ? (
                  <img
                    src={`/static/admin/image/${admin.image}`}
                    width="40"
                    height="40"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                    alt="Admin"
                  />
                ) : (
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#6c757d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className="fas fa-user" style={{ color: 'white' }}></i>
                  </div>
                )}
              </a>
              <div
                className={`dropdown-menu dropdown-menu-left ${adminMenuOpen ? 'show' : ''}`}
                style={{ display: adminMenuOpen ? 'block' : 'none' }}
              >
                <Link className="dropdown-item" to="/dashboard">
                  <i className="fa fa-th-large"></i>&nbsp;Dashboard
                </Link>
                <Link className="dropdown-item" to="/profile">
                  <i className="fa fa-user"></i>&nbsp;Admin Profile
                </Link>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item text-danger"
                  style={{ cursor: 'pointer' }}
                  onClick={handleAdminLogout}
                >
                  <i className="fa fa-sign-out"></i>&nbsp;Admin Logout
                </a>
              </div>
            </div>
          ) : user ? (
            <div
              className="dropdown"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <a
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault();
                  setUserMenuOpen(!userMenuOpen);
                }}
              >
                <img
                  src={
                    user.image
                      ? `/static/user/image/${user.image}`
                      : '/static/user/image/1769841445_db24a411-678a-46df-a42b-6431213e2b96.jpg'
                  }
                  className="nav-profile"
                  alt={user.name || 'User Profile'}
                  onError={(e) => {
                    e.currentTarget.src = '/static/user/image/user.png';
                  }}
                />
              </a>
              <div
                className={`dropdown-menu ${userMenuOpen ? 'show' : ''}`}
                style={{ display: userMenuOpen ? 'block' : 'none' }}
              >
                <Link className="dropdown-item" to="/client_profile">
                  Edit Profile
                </Link>
                <Link className="dropdown-item" to="/booking_history">
                  Booking History
                </Link>
                <a
                  className="dropdown-item text-danger"
                  style={{ cursor: 'pointer' }}
                  onClick={handleUserLogout}
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

