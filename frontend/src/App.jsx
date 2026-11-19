import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';

// User Pages
import Home from './pages/Home';
import About from './pages/About';
import ServicePage from './pages/ServicePage';
import EventPackagePage from './pages/EventPackagePage';
import VenuePage from './pages/VenuePage';
import TransportationPage from './pages/TransportationPage';
import EventPage from './pages/EventPage';
import GalleryPage from './pages/GalleryPage';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookEventPage from './pages/BookEventPage';
import PaymentPage from './pages/PaymentPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import ClientProfilePage from './pages/ClientProfilePage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminEditProfilePage from './pages/admin/AdminEditProfilePage';
import AdminManagePage from './pages/admin/AdminManagePage';

// Global Styles
import './styles/base.css';
import './styles/style.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* USER FRONTEND ROUTES */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="event_package" element={<EventPackagePage />} />
            <Route path="venue" element={<VenuePage />} />
            <Route path="transportation" element={<TransportationPage />} />
            <Route path="event" element={<EventPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="Blogs" element={<Blogs />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="Contact" element={<ContactPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="book_event" element={<BookEventPage />} />
            <Route path="payment/:bookingId" element={<PaymentPage />} />
            <Route path="booking_history" element={<BookingHistoryPage />} />
            <Route path="client_profile" element={<ClientProfilePage />} />
          </Route>

          {/* ADMIN LOGIN */}
          <Route path="/admin" element={<AdminLoginPage />} />

          {/* ADMIN DASHBOARD & MANAGEMENT ROUTES */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<AdminProfilePage />} />
            <Route path="/edit-profile" element={<AdminEditProfilePage />} />
            <Route path="/admin/manage_user" element={<AdminManagePage />} />
            <Route path="/admin/manage_package" element={<AdminManagePage />} />
            <Route path="/admin/manage_event" element={<AdminManagePage />} />
            <Route path="/admin/manage_venue" element={<AdminManagePage />} />
            <Route path="/admin/manage_service" element={<AdminManagePage />} />
            <Route path="/admin/manage_transportation" element={<AdminManagePage />} />
            <Route path="/admin/manage_gallery" element={<AdminManagePage />} />
            <Route path="/admin/manage_blog" element={<AdminManagePage />} />
            <Route path="/admin/manage_booking" element={<AdminManagePage />} />
            <Route path="/admin/manage_payment" element={<AdminManagePage />} />
            <Route path="/admin/manage_client" element={<AdminManagePage />} />
          </Route>

          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

