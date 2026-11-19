import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res.success) {
      navigate('/login');
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '80vh', background: '#f5f5f5' }}>
      <div
        className="register-container"
        style={{
          width: '420px',
          maxWidth: '90%',
          margin: '40px auto',
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          User Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              pattern=".{6,}"
              title="Password must be at least 6 characters"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="register-btn"
            style={{
              width: '100%',
              padding: '10px',
              background: '#ff4d6d',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

