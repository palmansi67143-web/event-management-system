import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/profile.css';

export default function AdminProfilePage() {
  const { admin } = useAuth();

  const adminName = admin?.name || 'Admin';
  const adminEmail = admin?.email || 'admin@gmail.com';
  const adminPhone = admin?.phone || '9999999999';

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>
      <div className="profile-card">
        <img
          src={
            admin?.image
              ? `/static/admin/image/${admin.image}`
              : '/static/user/image/user.png'
          }
          alt="Admin Profile"
          onError={(e) => {
            e.currentTarget.src = '/static/user/image/user.png';
          }}
        />
        <h3>{adminName}</h3>
        <p>Email: {adminEmail}</p>
        <p>Phone: {adminPhone}</p>
        <Link to="/edit-profile" className="edit-btn">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

