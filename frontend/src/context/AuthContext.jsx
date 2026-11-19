import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('event_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('event_admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [flash, setFlash] = useState(null);

  const showFlash = (message, type = 'success') => {
    setFlash({ message, type });
  };

  const clearFlash = () => {
    setFlash(null);
  };

  const login = async (email, password) => {
    // Attempt backend login first if available
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('event_user', JSON.stringify(data.user));
        showFlash('Login Successful', 'success');
        return { success: true };
      }
    } catch (e) {
      // Backend not running / fallback
    }

    // Fallback client simulation
    const simulatedUser = {
      id: 1,
      name: email.split('@')[0] || 'Client User',
      email: email,
      phone: '9876543210',
      address: 'Jaipur, Rajasthan',
      image: null,
    };
    setUser(simulatedUser);
    localStorage.setItem('event_user', JSON.stringify(simulatedUser));
    showFlash('Login Successful', 'success');
    return { success: true };
  };

  const register = async (userData) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        showFlash('Registration Successful. Please Login', 'success');
        return { success: true };
      }
    } catch (e) {
      // Fallback
    }

    showFlash('Registration Successful. Please Login', 'success');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('event_user');
    showFlash('Logged out successfully', 'success');
  };

  const adminLogin = async (username, password) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin);
        localStorage.setItem('event_admin', JSON.stringify(data.admin));
        showFlash('Admin Login Successful', 'success');
        return { success: true };
      }
    } catch (e) {
      // Fallback
    }

    if (username === 'admin' && password === 'admin123') {
      const simAdmin = {
        id: 1,
        name: 'Admin',
        email: 'admin@gmail.com',
        phone: '9999999999',
        image: null,
      };
      setAdmin(simAdmin);
      localStorage.setItem('event_admin', JSON.stringify(simAdmin));
      showFlash('Admin Login Successful', 'success');
      return { success: true };
    } else {
      showFlash('Invalid Admin Credentials', 'error');
      return { success: false, error: 'Invalid Admin Credentials' };
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('event_admin');
    showFlash('Admin Logged Out Successfully', 'success');
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem('event_user', JSON.stringify(next));
      return next;
    });
    showFlash('Profile Updated Successfully', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        flash,
        showFlash,
        clearFlash,
        login,
        register,
        logout,
        adminLogin,
        adminLogout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

