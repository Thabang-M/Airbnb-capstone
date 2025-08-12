import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastContext';
import { getApiUrl } from '../config';

const getNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const ListingPrice = ({ basePrice, cleaningFee, serviceFee, taxes, discount, listingId, maxGuests }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, role, token } = useAuth();
  const { showSuccess, showError, showWarning } = useToast();
  const navigate = useNavigate();

  const nights = getNights(checkIn, checkOut);
  const subtotal = basePrice * nights;
  const total = subtotal + cleaningFee + serviceFee + taxes - discount;

  const handleReserve = async () => {
    if (!user) {
      showWarning('You need to be logged in to make a reservation. Redirecting to login...', 3000);
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    if (role !== 'guest') {
      showError('Only guests can make reservations');
      return;
    }

    if (!checkIn || !checkOut) {
      showError('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkIn) <= new Date()) {
      showError('Check-in date must be in the future');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      showError('Check-out date must be after check-in date');
      return;
    }

    if (guests > maxGuests) {
      showError(`Maximum ${maxGuests} guests allowed for this property`);
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        listingId,
        checkIn,
        checkOut,
        numberOfGuests: guests,
        totalPrice: total
      };
      
      if (!token) {
        showError('No authentication token found');
        return;
      }
      
      const response = await fetch(getApiUrl('api/bookings'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      showSuccess('Reservation created successfully!');
      setTimeout(() => navigate('/locations'), 1500);
    } catch (error) {
      console.error('Booking error:', error);
      showError(error.message || 'Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, border: '1px solid #eee', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: 340, maxWidth: 380 }}>
      <div style={{ fontWeight: 600, fontSize: 24, marginBottom: 8 }}>R{basePrice} <span style={{ color: '#888', fontWeight: 400, fontSize: 16 }}>/ night</span></div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, color: '#888' }}>Check-in</label>
          <input 
            type="date" 
            value={checkIn} 
            onChange={e => setCheckIn(e.target.value)} 
            min={new Date().toISOString().split('T')[0]}
            style={{ display: 'block', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }} 
          />
        </div>
        <div>
          <label style={{ fontSize: 13, color: '#888' }}>Check-out</label>
          <input 
            type="date" 
            value={checkOut} 
            onChange={e => setCheckOut(e.target.value)} 
            min={checkIn || new Date().toISOString().split('T')[0]}
            style={{ display: 'block', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }} 
          />
        </div>
        <div>
          <label style={{ fontSize: 13, color: '#888' }}>Guests</label>
          <select 
            value={guests} 
            onChange={e => setGuests(Number(e.target.value))} 
            style={{ display: 'block', padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
          >
            {[...Array(maxGuests)].map((_, i) => <option key={i+1} value={i+1}>{i+1} guest{i>0?'s':''}</option>)}
          </select>
        </div>
      </div>
      
      {nights > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>R{basePrice} × {nights} night{nights > 1 ? 's' : ''}</span>
            <span>R{subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>Cleaning fee</span>
            <span>R{cleaningFee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>Service fee</span>
            <span>R{serviceFee}</span>
          </div>
          {taxes > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span>Taxes</span>
              <span>R{taxes}</span>
            </div>
          )}
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#28a745' }}>
              <span>Discount</span>
              <span>-R{discount}</span>
            </div>
          )}
          <div style={{ borderTop: '1px solid #eee', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
            <span>Total</span>
            <span>R{total}</span>
          </div>
        </div>
      )}
      
      <button 
        onClick={handleReserve}
        disabled={loading || !checkIn || !checkOut}
        style={{ 
          width: '100%', 
          background: loading ? '#ccc' : '#ff385c', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 8, 
          padding: '12px 0', 
          fontWeight: 600, 
          fontSize: 18, 
          marginBottom: 16,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing...' : 'Reserve'}
      </button>
    </div>
  );
};

export default ListingPrice; 