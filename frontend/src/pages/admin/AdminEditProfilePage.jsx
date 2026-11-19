import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/edit_profile.css';

export default function AdminEditProfilePage() {
  const { admin, showFlash } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: admin?.name || 'Admin',
    email: admin?.email || 'admin@gmail.com',
    phone: admin?.phone || '9999999999',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showFlash('Admin Profile Updated Successfully', 'success');
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Admin Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

