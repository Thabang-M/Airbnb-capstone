import React from 'react';

const WhereYoullSleep = ({ bedrooms = [], images = [] }) => {
  const mainBedroom = bedrooms[0] || {};
  const image = images[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';
  return (
    <div style={{ margin: '32px 0' }}>
      <h2>Where You'll Sleep</h2>
      <img src={image} alt="Bedroom" style={{ width: 220, height: 150, objectFit: 'cover', borderRadius: 12, display: 'block', marginBottom: 8 }} />
      <div style={{ color: '#888', fontSize: 15, marginBottom: 2 }}>
        {mainBedroom.bedType ? `Spacious bedroom with comfortable ${mainBedroom.bedType.toLowerCase()}.` : 'Spacious bedroom with comfortable bed.'}
      </div>
      <div style={{ color: '#888', fontSize: 14 }}>Total bedrooms: {bedrooms.length || 1}</div>
    </div>
  );
};

export default WhereYoullSleep; 