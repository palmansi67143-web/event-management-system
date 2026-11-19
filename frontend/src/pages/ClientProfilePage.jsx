import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/edit-profile.css';

export default function ClientProfilePage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: null,
  });
  const [preview, setPreview] = useState('/static/user/image/user.png');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      image: user.image || null,
    });
    if (user.image) {
      setPreview(`/static/user/image/${user.image}`);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    });
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '80vh' }}>
      <div className="profile-container">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="profile-image">
            <img
              src={preview}
              alt="Profile"
              onError={(e) => {
                e.currentTarget.src = '/static/user/image/user.png';
              }}
            />
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

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

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

