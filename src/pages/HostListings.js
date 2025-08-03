import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocationsUpdate } from '../hooks/useLocationsUpdate';
import { getApiUrl } from '../config';

const HostListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { removeLocationFromList } = useLocationsUpdate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(getApiUrl('api/listings/host'), {
        credentials: 'include'
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to fetch listings');
      }
      const data = await response.json();
      setListings(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load listings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (listingId, listing) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      const response = await fetch(`getApiUrl('api/listings/${listingId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete listing');
      
      // Removes the location from the locations list if it's the last listing in that city/country
      if (listing.address?.city && listing.address?.country) {
        // Check if there are other listings in the same city/country
        const otherListingsInSameLocation = listings.filter(l => 
          l._id !== listingId && 
          l.address?.city === listing.address.city && 
          l.address?.country === listing.address.country
        );
        
        // If no other listings in the same location, remove it from the dropdown
        if (otherListingsInSameLocation.length === 0) {
          removeLocationFromList(listing.address.city, listing.address.country);
        }
      }
      
      fetchListings(); // Refresh the list
    } catch (err) {
      setError('Failed to delete listing');
    }
  };

  const handleUpdate = (listingId) => {
    navigate(`/admin/edit-listing/${listingId}`);
  };

  const handleBack = () => {
    navigate('/admin');
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: '0 auto', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ color: '#333' }}>My Listings</h1>
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
      
      {listings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>
          No listings found. <button onClick={() => navigate('/admin/create-listing')} style={{ color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Create your first listing</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 24 }}>
          {listings.map((listing) => (
            <div key={listing._id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <img 
                src={listing.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80'} 
                alt={listing.title}
                style={{ width: '100%', height: 250, objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                  {listing.propertyDetails?.roomType} - {listing.address?.city}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  {listing.title}
                </h3>
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                  {listing.propertyDetails?.maxGuests} guests - {listing.propertyDetails?.roomType} - {listing.propertyDetails?.bedNum} bedrooms - {listing.propertyDetails?.bathNum} bathrooms
                </div>
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                  Amenities: {listing.amenities?.slice(0, 3).join(', ')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 14, color: '#666' }}>
                    ⭐ {listing.ratings?.averageRating || 'N/A'} ({listing.ratings?.totalReviews || 0} reviews)
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>
                    R{listing.pricing?.basePrice}/night
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleUpdate(listing._id)}
                    style={{
                      background: '#1976d2',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: 14,
                      flex: 1
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id, listing)}
                    style={{
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: 14,
                      flex: 1
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostListings; 