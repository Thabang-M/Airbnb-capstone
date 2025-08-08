import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';

const GuestReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      console.log('🔍 Fetching reservations...');
      const response = await fetch(getApiUrl('api/reservations/guest'), {
        credentials: 'include'
      });
      console.log('📊 Response status:', response.status);
      console.log('📋 Response headers:', response.headers);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Failed to fetch reservations:', errorData);
        throw new Error(errorData.error || 'Failed to fetch reservations');
      }
      
      const data = await response.json();
      console.log('✅ Reservations data:', data);
      setReservations(data);
    } catch (err) {
      console.error('❌ Error fetching reservations:', err);
      setError('Failed to load reservations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/guest');
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto' }}>
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
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Property Name</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Check-in Date</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Checkout Date</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Guests</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Total Price</th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px' }}>{reservation.propertyName || 'N/A'}</td>
                  <td style={{ padding: '16px' }}>{new Date(reservation.checkIn).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>{new Date(reservation.checkOut).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>{reservation.numberOfGuests}</td>
                  <td style={{ padding: '16px' }}>R{reservation.totalPrice}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 500,
                      background: reservation.status === 'confirmed' ? '#d4edda' : 
                                 reservation.status === 'pending' ? '#fff3cd' : '#f8d7da',
                      color: reservation.status === 'confirmed' ? '#155724' : 
                             reservation.status === 'pending' ? '#856404' : '#721c24'
                    }}>
                      {reservation.status}
                    </span>
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

export default GuestReservations; 