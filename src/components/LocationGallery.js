import React from 'react';

const LocationGallery = ({ images = [] }) => {
  //images for when not enough images are provided
  const fallbackImages = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
  ];
  
  const galleryImages = [
    ...images,
    ...fallbackImages.slice(0, 5 - images.length)
  ].slice(0, 5);

  return (
    <div style={{ display: 'flex', gap: 16, margin: '32px 0' }}>
      {/* Main large image */}
      <div style={{ flex: 2, minWidth: 0 }}>
        <img
          src={galleryImages[0]}
          alt="Main"
          style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 16 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>
      {/* 2x2 grid of smaller images */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8 }}>
        {galleryImages.slice(1, 5).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery ${idx + 2}`}
            style={{ width: '100%', height: 95, objectFit: 'cover', borderRadius: 8 }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationGallery; 