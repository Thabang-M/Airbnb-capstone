import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Cities({ listings = [], pagination = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  if (!listings.length) {
    return <div style={{ textAlign: 'center', margin: '32px 0' }}>No stays found for this location.</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', margin: '32px 0 24px', color: 'white' }}>
        {pagination ? `${pagination.totalItems} stays in this location` : `${listings.length} stays in this location`}
      </h2>
      
      {listings.map((listing, idx) => (
        <div
          key={listing._id || idx}
          style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: 24, padding: 24, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
          onClick={() => navigate(`/locations/${listing._id}`)}
        >
          <img 
            src={listing.images && listing.images[0] ? listing.images[0] : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80'} 
            alt={listing.title} 
            style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 8, marginRight: 24 }}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ color: '#888', fontSize: 14 }}>{listing.propertyDetails?.roomType || ''}</div>
            <div style={{ fontWeight: 700, fontSize: 22, margin: '4px 0 8px' }}>{listing.address?.city || listing.title}</div>
            <div style={{ color: '#555', fontSize: 15 }}>
              {listing.propertyDetails?.maxGuests} guests - {listing.propertyDetails?.roomType?.toLowerCase()} - {listing.propertyDetails?.bedNum} bedrooms - {listing.propertyDetails?.bathNum} bathrooms
              <br />
              {listing.amenities?.slice(0, 3).join(' - ')} {/* Limit amenities display */}
            </div>
            <div style={{ color: '#888', fontSize: 15, marginTop: 8 }}>
              <span style={{ marginRight: 8 }}>★ {listing.ratings?.averageRating} ({listing.ratings?.totalReviews} reviews)</span>
            </div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 22, color: '#222', minWidth: 100, textAlign: 'right' }}>
            R{listing.pricing?.basePrice} <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>/ night</span>
          </div>
        </div>
      ))}
      
      {/* Pagination controls */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
          <button 
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: pagination.hasPrevPage ? '#fff' : '#f5f5f5',
              cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed',
              color: pagination.hasPrevPage ? '#333' : '#999'
            }}
          >
            Previous
          </button>
          
          <span style={{ padding: '8px 16px', color: '#333' }}>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button 
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: pagination.hasNextPage ? '#fff' : '#f5f5f5',
              cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed',
              color: pagination.hasNextPage ? '#333' : '#999'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Cities; 