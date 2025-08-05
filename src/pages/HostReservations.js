import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';

const HostReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(getApiUrl('api/reservations/host'), {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch reservations');
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reservationId) => {
    if (!window.confirm('Are you sure you want to delete this reservation?')) return;
    
    try {
      const response = await fetch(getApiUrl(`api/reservations/${reservationId}`), {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete reservation');
      fetchReservations(); // Refresh the list
    } catch (err) {
      setError('Failed to delete reservation');
    }
  };

  const handleBack = () => {
    navigate('/admin');
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ color: '#333' }}>My Reservations</h1>
        <button 
          onClick={handleBack}
          style={{
            background: '#666',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
      
      {reservations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>
          <h2 style={{ marginBottom: 20, color: '#333' }}>You have no reservations booked</h2>
          <button 
            onClick={() => navigate('/locations')}
            style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '16px 32px',
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            Browse Listings
          </button>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Booked By</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Property Name</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Check-in Date</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Checkout Date</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px' }}>{reservation.guestName || 'N/A'}</td>
                  <td style={{ padding: '16px' }}>{reservation.propertyName || 'N/A'}</td>
                  <td style={{ padding: '16px' }}>{new Date(reservation.checkIn).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>{new Date(reservation.checkOut).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>
                    <button
                      onClick={() => handleDelete(reservation._id)}
                      style={{
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: 14
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HostReservations; 