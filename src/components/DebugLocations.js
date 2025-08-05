import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../redux/locationsSlice';
import { getApiUrl } from '../config';

const DebugLocations = () => {
  const dispatch = useDispatch();
  const { locations, loading, error, lastUpdated } = useSelector(state => state.locations);
  const [apiTest, setApiTest] = useState(null);

  useEffect(() => {
    // Test direct API call
    const testApi = async () => {
      try {
        console.log('Testing API call...');
        const response = await fetch(getApiUrl('api/cities'));
        console.log('API Response status:', response.status);
        const data = await response.json();
        console.log('API Response data:', data);
        setApiTest({ success: true, data });
      } catch (error) {
        console.error('API Test error:', error);
        setApiTest({ success: false, error: error.message });
      }
    };

    testApi();
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '20px' }}>
      <h2>Debug Locations</h2>
      
      <h3>Direct API Test:</h3>
      <pre>{JSON.stringify(apiTest, null, 2)}</pre>
      
      <h3>Redux State:</h3>
      <div>
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {error || 'None'}</p>
        <p><strong>Last Updated:</strong> {lastUpdated || 'Never'}</p>
        <p><strong>Locations Count:</strong> {locations?.length || 0}</p>
        <p><strong>Locations:</strong></p>
        <ul>
          {locations?.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebugLocations; 