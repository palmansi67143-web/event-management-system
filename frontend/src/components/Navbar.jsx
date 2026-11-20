import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, admin, logout, adminLogout } = useAuth();
  const [serviceOpen, setServiceOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [mobileAuthOpen, setMobileAuthOpen] = useState(false);
  const scrollNavRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.toLowerCase();

  // Close menus on route change
  useEffect(() => {
    setServiceOpen(false);
    setUserMenuOpen(false);
    setAdminMenuOpen(false);
    setMobileAuthOpen(false);

    // Auto-scroll active link into view in the horizontal scroll bar
    if (scrollNavRef.current) {
      const activeEl = scrollNavRef.current.querySelector('.scroll-link.active');
      if (activeEl) {
        const containerWidth = scrollNavRef.current.offsetWidth;
        const linkLeft = activeEl.offsetLeft;
        const linkWidth = activeEl.offsetWidth;
        scrollNavRef.current.scrollTo({
          left: linkLeft - containerWidth / 2 + linkWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [location.pathname]);

  const handleUserLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdminLogout = () => {
    adminLogout();
    navigate('/admin');
  };

  const isLinkActive = (path) => {
    const p = path.toLowerCase();
    if (p === '/' && currentPath === '/') return true;
    if (p !== '/' && currentPath.startsWith(p)) return true;
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top site-navbar">
      {/* Top Header Row */}
      <div className="nav-top-header">
        <Link className="navbar-brand" to="/">
          <img
            src="/static/user/image/Your paragraph text1.png"
            alt="Dream Events"
            className="brand-logo"
          />
        </Link>

        {/* Mobile Top Header Auth Action (< 992px) */}
        <div className="mobile-header-auth d-lg-none">
          {admin ? (
            <div className="dropdown" style={{ position: 'relative' }}>
              <div
                className="mobile-auth-trigger"
                onClick={() => setMobileAuthOpen(!mobileAuthOpen)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <i className="fa fa-user-secret" style={{ fontSize: '22px', color: 'brown' }}></i>
                {admin.image ? (
                  <img
                    src={`/static/admin/image/${admin.image}`}
                    alt="Admin"
                    width="34"
                    height="34"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: '#6c757d',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className="fas fa-user" style={{ color: 'white', fontSize: '14px' }}></i>
                  </div>
                )}
              </div>
              {mobileAuthOpen && (
                <div
                  className="dropdown-menu dropdown-menu-right show"
                  style={{ position: 'absolute', right: 0, top: '42px', zIndex: 1100 }}
                >
                  <Link className="dropdown-item" to="/dashboard">
                    <i className="fa fa-th-large mr-2"></i> Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/profile">
                    <i className="fa fa-user mr-2"></i> Admin Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item text-danger btn btn-link"
                    onClick={handleAdminLogout}
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="fa fa-sign-out mr-2"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : user ? (
            <div className="dropdown" style={{ position: 'relative' }}>
              <div
                className="mobile-auth-trigger"
                onClick={() => setMobileAuthOpen(!mobileAuthOpen)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={user.image ? `/static/user/image/${user.image}` : '/static/user/image/1769841445_db24a411-678a-46df-a42b-6431213e2b96.jpg'}
                  alt={user.name || 'User'}
                  className="nav-profile"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              {mobileAuthOpen && (
                <div
                  className="dropdown-menu dropdown-menu-right show"
                  style={{ position: 'absolute', right: 0, top: '42px', zIndex: 1100 }}
                >
                  <Link className="dropdown-item" to="/client_profile">
                    <i className="fa fa-user-circle mr-2"></i> Edit Profile
                  </Link>
                  <Link className="dropdown-item" to="/booking_history">
                    <i className="fa fa-history mr-2"></i> Booking History
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item text-danger btn btn-link"
                    onClick={handleUserLogout}
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="fa fa-sign-out mr-2"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="mobile-auth-btn login-btn">
                Login
              </Link>
              <Link to="/register" className="mobile-auth-btn signup-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation (>= 992px) */}
      <div className="collapse navbar-collapse d-none d-lg-flex" id="navbar">
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
              <span
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'brown',
                }}
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
              >
                <i className="fa fa-user-secret" style={{ fontSize: '28px' }}></i>
                {admin.image ? (
                  <img
                    src={`/static/admin/image/${admin.image}`}
                    alt="Admin"
                    width="40"
                    height="40"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
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
              </span>
              <div
                className={`dropdown-menu dropdown-menu-left ${adminMenuOpen ? 'show' : ''}`}
                style={{ display: adminMenuOpen ? 'block' : 'none' }}
              >
                <Link className="dropdown-item" to="/dashboard">
                  <i className="fa fa-th-large mr-2"></i> Dashboard
                </Link>
                <Link className="dropdown-item" to="/profile">
                  <i className="fa fa-user mr-2"></i> Admin Profile
                </Link>
                <div className="dropdown-divider"></div>
                <button
                  className="dropdown-item text-danger btn btn-link"
                  onClick={handleAdminLogout}
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fa fa-sign-out mr-2"></i> Admin Logout
                </button>
              </div>
            </div>
          ) : user ? (
            <div
              className="dropdown"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <img
                  src={
                    user.image
                      ? `/static/user/image/${user.image}`
                      : '/static/user/image/1769841445_db24a411-678a-46df-a42b-6431213e2b96.jpg'
                  }
                  className="nav-profile"
                  alt={user.name || 'User'}
                />
              </span>
              <div
                className={`dropdown-menu dropdown-menu-right ${userMenuOpen ? 'show' : ''}`}
                style={{ display: userMenuOpen ? 'block' : 'none' }}
              >
                <Link className="dropdown-item" to="/client_profile">
                  <i className="fa fa-user-circle mr-2"></i> Edit Profile
                </Link>
                <Link className="dropdown-item" to="/booking_history">
                  <i className="fa fa-history mr-2"></i> Booking History
                </Link>
                <div className="dropdown-divider"></div>
                <button
                  className="dropdown-item text-danger btn btn-link"
                  onClick={handleUserLogout}
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fa fa-sign-out mr-2"></i> Logout
                </button>
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

      {/* Mobile Horizontally Scrollable Navigation Strip (< 992px) - Option 3 */}
      <div className="mobile-scroll-nav d-lg-none" ref={scrollNavRef}>
        <div className="scroll-nav-inner">
          <Link to="/" className={`scroll-link ${isLinkActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`scroll-link ${isLinkActive('/about') ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/event_package" className={`scroll-link ${isLinkActive('/event_package') ? 'active' : ''}`}>
            Packages
          </Link>
          <Link to="/venue" className={`scroll-link ${isLinkActive('/venue') ? 'active' : ''}`}>
            Venues
          </Link>
          <Link to="/transportation" className={`scroll-link ${isLinkActive('/transportation') ? 'active' : ''}`}>
            Transport
          </Link>
          <Link to="/service" className={`scroll-link ${isLinkActive('/service') ? 'active' : ''}`}>
            Services
          </Link>
          <Link to="/event" className={`scroll-link ${isLinkActive('/event') ? 'active' : ''}`}>
            Events
          </Link>
          <Link to="/gallery" className={`scroll-link ${isLinkActive('/gallery') ? 'active' : ''}`}>
            Gallery
          </Link>
          <Link to="/Blogs" className={`scroll-link ${isLinkActive('/blogs') ? 'active' : ''}`}>
            Blogs
          </Link>
          <Link to="/Contact" className={`scroll-link ${isLinkActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
