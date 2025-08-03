import React, { useState } from 'react';

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  return Math.max(0, (outDate - inDate) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB');
}

const DateSelector = ({ city }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const nights = getNights(checkIn, checkOut);

  return (
    <div style={{ margin: '32px 0', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24, maxWidth: 420 }}>
      <h2 style={{ textAlign: 'center', fontWeight: 600, fontSize: 28, marginBottom: 8 }}>
        {nights > 0 ? `${nights} Night${nights > 1 ? 's' : ''} in ${city}` : `Select your dates in ${city}`}
      </h2>
      <div style={{ textAlign: 'center', color: '#888', marginBottom: 24, fontSize: 16 }}>
        {checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : 'Choose check-in and check-out dates'}
      </div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ textAlign: 'center', fontWeight: 500, marginBottom: 8 }}>Check-in</div>
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} style={{ fontSize: 16, padding: 8, borderRadius: 8, border: '1px solid #ccc' }} />
        </div>
        <div>
          <div style={{ textAlign: 'center', fontWeight: 500, marginBottom: 8 }}>Check-out</div>
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} style={{ fontSize: 16, padding: 8, borderRadius: 8, border: '1px solid #ccc' }} />
        </div>
      </div>
      {(checkIn || checkOut) && (
        <div style={{ textAlign: 'right', marginTop: 12 }}>
          <button onClick={() => { setCheckIn(''); setCheckOut(''); }} style={{ color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, textDecoration: 'underline' }}>
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
};

export default DateSelector; 