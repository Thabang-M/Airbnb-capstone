import React from 'react';

// Helper for bar width
function getBarWidth(rating) {
  return `${(rating / 5) * 100}%`;
}

const mockReviews = [
  { name: 'Alice', date: 'March 2023', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', text: 'Amazing place, very clean and well-located.' },
  { name: 'Bob', date: 'February 2023', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', text: 'Great communication with the host and easy check-in process.' },
  { name: 'Carol', date: 'January 2023', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', text: 'The apartment was exactly as described. Highly recommend.' },
  { name: 'Dave', date: 'December 2022', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', text: 'Fantastic stay! The location is perfect.' },
  { name: 'Eve', date: 'November 2022', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', text: 'Very clean and spacious. Would definitely come back.' },
  { name: 'Frank', date: 'October 2022', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', text: 'Excellent value for the price. Loved the neighborhood.' },
];

const ratingCategories = [
  { label: 'Cleanliness', key: 'cleanliness' },
  { label: 'Communication', key: 'communication' },
  { label: 'Check-in', key: 'accuracy' },
  { label: 'Accuracy', key: 'accuracy' },
  { label: 'Location', key: 'location' },
  { label: 'Value', key: 'value' },
];

const ListingReviews = ({ ratings = {} }) => {
  const totalReviews = ratings.totalReviews || mockReviews.length;
  const averageRating = ratings.averageRating || 5.0;
  return (
    <div style={{ margin: '32px 0', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24 }}>
      <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
        <span style={{ color: '#ff385c', fontWeight: 700 }}>★ {averageRating.toFixed(1)}</span> - {totalReviews} reviews
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          {['Cleanliness', 'Communication', 'Check-in'].map((cat, i) => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ flex: 1 }}>{cat}</span>
              <div style={{ background: '#eee', borderRadius: 4, width: 120, height: 8, margin: '0 12px', position: 'relative' }}>
                <div style={{ background: '#111', borderRadius: 4, width: getBarWidth(ratings[cat.toLowerCase()] || 5), height: 8 }} />
              </div>
              <span style={{ minWidth: 28, textAlign: 'right' }}>{(ratings[cat.toLowerCase()] || 5).toFixed(1)}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          {['Accuracy', 'Location', 'Value'].map((cat, i) => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ flex: 1 }}>{cat}</span>
              <div style={{ background: '#eee', borderRadius: 4, width: 120, height: 8, margin: '0 12px', position: 'relative' }}>
                <div style={{ background: '#111', borderRadius: 4, width: getBarWidth(ratings[cat.toLowerCase()] || 5), height: 8 }} />
              </div>
              <span style={{ minWidth: 28, textAlign: 'right' }}>{(ratings[cat.toLowerCase()] || 5).toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {mockReviews.slice(0, 6).map((review, idx) => (
          <div key={idx} style={{ flex: '1 1 40%', minWidth: 220, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <img src={review.avatar} alt={review.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', marginRight: 12 }} />
              <div>
                <div style={{ fontWeight: 600 }}>{review.name}</div>
                <div style={{ color: '#888', fontSize: 14 }}>{review.date}</div>
              </div>
            </div>
            <div style={{ fontSize: 15, color: '#444' }}>{review.text}</div>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 8, padding: '8px 16px', borderRadius: 6, border: '1px solid #888', background: '#fff', cursor: 'pointer', fontSize: 15 }}>
        Show all {totalReviews} reviews
      </button>
    </div>
  );
};

export default ListingReviews; 