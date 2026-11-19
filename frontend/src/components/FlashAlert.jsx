import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function FlashAlert() {
  const { flash, clearFlash } = useAuth();

  if (!flash) return null;

  const isError = flash.type === 'error';
  const alertClass = isError ? 'alert alert-danger' : 'alert alert-success';

  return (
    <div
      className={`${alertClass} alter-dismissable fade show`}
      role="alert"
      style={{
        position: 'fixed',
        top: '90px',
        right: '20px',
        zIndex: 9999,
        minWidth: '280px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      {flash.message}
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={clearFlash}
        style={{ marginLeft: '15px' }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

