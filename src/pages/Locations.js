import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cities from '../components/Cities';
import { getApiUrl } from '../config';

function Locations() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const city = params.get('city');
        const country = params.get('country');
        const page = params.get('page') || '1';
        
        // Build query string
        const queryParams = new URLSearchParams();
        if (city) queryParams.append('city', city);
        if (country) queryParams.append('country', country);
        queryParams.append('page', page);
        queryParams.append('limit', '20');
        
        const res = await fetch(`${getApiUrl('api/listings')}?${queryParams}`);
        const data = await res.json();
        
        setListings(data.listings || []);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [location.search]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: '0 24px' }}>
        <button
          onClick={handleBack}
          style={{
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          ← Back to Home
        </button>
      </div>
      <h1>Locations Page</h1>
      {loading ? (
        <div style={{ textAlign: 'center', margin: '32px 0' }}>Loading listings...</div>
      ) : (
        <Cities listings={listings} pagination={pagination} />
      )}
    </div>
  );
}

export default Locations; 