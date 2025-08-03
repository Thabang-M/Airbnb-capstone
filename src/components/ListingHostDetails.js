import React from 'react';

const iconStyle = { fontSize: 18, marginRight: 6, color: '#ff385c', verticalAlign: 'middle' };

const ListingHostDetails = ({ host = {} }) => {
  const {
    hostName = 'Host',
    profilePicture = 'https://randomuser.me/api/portraits/men/1.jpg',
    dateJoined = 'June 2024',
    isSuperhost = true,
    responseRate = 100,
    responseTime = 'within an hour',
    totalReviews = 320,
    verification = { email: true, identity: true },
  } = host;

  return (
    <div style={{ margin: '32px 0', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24, maxWidth: 500 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <img src={profilePicture} alt={hostName} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginRight: 18 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 22 }}>Hosted By {hostName}</div>
          <div style={{ color: '#888', fontSize: 15 }}>Joined {dateJoined}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, margin: '12px 0 18px 0', flexWrap: 'wrap' }}>
        <span style={{ color: '#ff385c', fontWeight: 500, fontSize: 15 }}>
          <span style={iconStyle}>★</span>{totalReviews} Reviews
        </span>
        <span style={{ color: '#ff385c', fontWeight: 500, fontSize: 15 }}>
          <span style={iconStyle}>✔️</span>Identity verified
        </span>
        {isSuperhost && (
          <span style={{ color: '#ff385c', fontWeight: 500, fontSize: 15 }}>
            <span style={iconStyle}>🏅</span>Superhost
          </span>
        )}
      </div>
      {isSuperhost && (
        <div style={{ fontWeight: 600, marginBottom: 4 }}> {hostName} is a super host</div>
      )}
      <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>
        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
      </div>
      <div style={{ color: '#888', fontSize: 15, marginBottom: 2 }}>Response rate: {responseRate}%</div>
      <div style={{ color: '#888', fontSize: 15, marginBottom: 18 }}>Response time: {responseTime}</div>
      <button style={{ padding: '12px 32px', borderRadius: 8, border: '1px solid #222', background: '#fff', fontWeight: 600, fontSize: 17, cursor: 'pointer', marginBottom: 18 }}>
        Contact Host
      </button>
      <div style={{ display: 'flex', alignItems: 'center', color: '#888', fontSize: 15, marginTop: 8 }}>
        <span style={{ fontSize: 20, marginRight: 8 }}>🛡️</span>
        To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
      </div>
    </div>
  );
};

export default ListingHostDetails; 