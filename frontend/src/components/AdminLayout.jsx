import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlashAlert from './FlashAlert';
import '../styles/dashboard.css';

export default function AdminLayout() {
  const { admin, adminLogout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin');
  };

  const adminName = admin?.name || 'Admin';

  return (
    <div className="admin-body">
      <div className="container" style={{ maxWidth: '100%', padding: 0 }}>
        {/* Sidebar */}
        <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <h2>Admin</h2>
          </div>

          <ul className="sidebar-menu">
            <li className="view-site-li">
              <Link to="/" target="_blank">
                <i className="fas fa-globe"></i>
                <span>View Site</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <i className="fas fa-th-large"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_user">
                <i className="fas fa-users"></i>
                <span>Contacts</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_package">
                <i className="fas fa-gift"></i>
                <span>Packages</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_event">
                <i className="fas fa-calendar-alt"></i>
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_venue">
                <i className="fas fa-landmark"></i>
                <span>Venues</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_service">
                <i className="fas fa-concierge-bell"></i>
                <span>Services</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_transportation">
                <i className="fas fa-car"></i>
                <span>Transport</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_gallery">
                <i className="fas fa-photo-video"></i>
                <span>Gallery</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_blog">
                <i className="fas fa-file-alt"></i>
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_booking">
                <i className="fas fa-check-square"></i>
                <span>Booking</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_payment">
                <i className="fas fa-money-bill-wave"></i>
                <span>Payments</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage_client">
                <i className="fas fa-user"></i>
                <span>Clients</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <div className="header">
            <button
              id="sidebarToggleBtn"
              className="sidebar-toggle"
              type="button"
              onClick={() => setCollapsed(!collapsed)}
            >
              <i className="fas fa-bars"></i>
            </button>

            <div className="user-info">
              Welcome, <strong>{adminName}</strong>
            </div>

            {/* ADMIN PROFILE */}
            <div
              className="admin-profile"
              onClick={() => setProfileOpen(!profileOpen)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              {admin && admin.image ? (
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

              <span className="admin-name">{adminName}</span>
              <i className="fas fa-chevron-down"></i>

              <div
                className="profile-dropdown"
                id="profileDropdown"
                style={{ display: profileOpen ? 'block' : 'none' }}
              >
                <Link to="/profile">
                  <i className="fas fa-user"></i> My Profile
                </Link>
                <Link to="/edit-profile">
                  <i className="fas fa-edit"></i> Edit Profile
                </Link>
                <Link to="/" target="_blank">
                  <i className="fas fa-globe"></i> View Site
                </Link>
                <hr style={{ margin: '5px 0', borderColor: '#eee' }} />
                <a
                  onClick={handleLogout}
                  style={{ color: 'red', cursor: 'pointer' }}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </div>
            </div>
          </div>

          <FlashAlert />

          <Outlet />
        </main>
      </div>
    </div>
  );
}

