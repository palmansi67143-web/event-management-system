import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FlashAlert from './FlashAlert';

export default function UserLayout() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <FlashAlert />
      <main className="main-site-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

