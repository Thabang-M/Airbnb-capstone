import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../redux/locationsSlice';

const ReduxTest = () => {
  const dispatch = useDispatch();
  const { locations, loading, error, lastUpdated } = useSelector(state => state.locations);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleManualFetch = () => {
    dispatch(fetchCities());
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '10px', border: '2px solid red' }}>
      <h3>🔍 Redux Test Component</h3>
      <button onClick={handleManualFetch} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Manual Fetch Cities
      </button>
      <div style={{ marginBottom: '10px' }}>
        <p><strong>Loading:</strong> {loading ? '🔄 Yes' : '✅ No'}</p>
        <p><strong>Error:</strong> {error ? `❌ ${error}` : '✅ None'}</p>
        <p><strong>Last Updated:</strong> {lastUpdated || '❌ Never'}</p>
        <p><strong>Locations Count:</strong> {locations.length}</p>
      </div>
      <div>
        <p><strong>Locations:</strong></p>
        <ul style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {locations.map((location, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>{location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReduxTest; 