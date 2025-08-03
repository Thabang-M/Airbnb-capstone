import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewReservations = () => {
    navigate('/admin/reservations');
  };

  const handleViewListings = () => {
    navigate('/admin/listings');
  };

  const handleCreateListing = () => {
    navigate('/admin/create-listing');
  };

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto', background: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 40, color: '#333' }}>
        Welcome, {user?.firstName}!
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <button
          onClick={handleViewReservations}
          style={{
            background: '#ff385c',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '40px 20px',
            fontSize: 24,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
        >
          View Reservations
        </button>
        <button
          onClick={handleViewListings}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '40px 20px',
            fontSize: 24,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
        >
          View Listings
        </button>
        <button
          onClick={handleCreateListing}
          style={{
            background: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '40px 20px',
            fontSize: 24,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
        >
          Create Listing
        </button>
      </div>
    </div>
  );
};

export default HostDashboard; 