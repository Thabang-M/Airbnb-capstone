import React from 'react';

// SVG icons for the location specs
const icons = {
  apartment: (
    <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 21V9h6v12"/></svg>
  ),
  cleaning: (
    <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21h18M9 17V8a3 3 0 1 1 6 0v9"/><rect x="5" y="17" width="14" height="4" rx="2"/></svg>
  ),
  checkin: (
    <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
  ),
  cancel: (
    <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 11h8M8 15h5"/></svg>
  ),
};

const LocationSpecs = ({ host = {}, maxGuests, bedrooms, bathrooms, description }) => {
  // Fallbacks for host
  const hostName = host.hostName || host.name || 'Host';
  const hostPic = host.profilePicture || host.avatar || '/logos/pngegg.png';

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>
        Entire apartment hosted by {hostName}
      </div>
      <div style={{ color: '#888', fontSize: 15, marginBottom: 18 }}>
        {maxGuests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <img src={hostPic} alt={hostName} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginRight: 16, border: '1px solid #eee' }} />
        <div>
          <div style={{ fontWeight: 600 }}>{hostName}</div>
          <div style={{ color: '#888', fontSize: 14 }}>{host.isSuperhost ? 'Superhost' : ''}</div>
        </div>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 24 }}>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <span style={{ marginRight: 16 }}>{icons.apartment}</span>
          <div>
            <div style={{ fontWeight: 600 }}>Entire apartment</div>
            <div style={{ color: '#888', fontSize: 15 }}>You'll have the apartment for yourself</div>
          </div>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <span style={{ marginRight: 16 }}>{icons.cleaning}</span>
          <div>
            <div style={{ fontWeight: 600 }}>Enhanced Cleaning:</div>
            <div style={{ color: '#888', fontSize: 15 }}>This Host committed to Airbnb's 5-step enhanced cleaning process.</div>
          </div>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <span style={{ marginRight: 16 }}>{icons.checkin}</span>
          <div>
            <div style={{ fontWeight: 600 }}>Self Check-in:</div>
            <div style={{ color: '#888', fontSize: 15 }}>Check yourself in with the keypad</div>
          </div>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <span style={{ marginRight: 16 }}>{icons.cancel}</span>
          <div>
            <div style={{ fontWeight: 600 }}>Free cancellation before Feb 14</div>
          </div>
        </li>
      </ul>
      <div style={{ color: '#555', fontSize: 16 }}>{description}</div>
    </div>
  );
};

export default LocationSpecs; 