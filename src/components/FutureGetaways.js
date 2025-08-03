// src/components/FutureGetaways.js
import React, { useState } from 'react';
import './FutureGetaways.css';

const tabs = ['Top Destinations', 'Near You', 'Weekend Getaways', 'International', 'Budget Friendly', 'Luxury'];
const cities = [
  { city: 'New York', state: 'New York' },
  { city: 'Los Angeles', state: 'California' },
  { city: 'Miami', state: 'Florida' },
  { city: 'Austin', state: 'Texas' },
  { city: 'Chicago', state: 'Illinois' },
  { city: 'Denver', state: 'Colorado' },
  { city: 'Seattle', state: 'Washington' },
  { city: 'Boston', state: 'Massachusetts' },
  { city: 'Las Vegas', state: 'Nevada' },
  { city: 'Atlanta', state: 'Georgia' },
  { city: 'Orlando', state: 'Florida' },
  { city: 'San Francisco', state: 'California' }
];

const FutureGetaways = () => {
  const [activeTab, setActiveTab] = useState(0); // Tracks which tab is selected

  return (
    <section className="future-getaways-section">
      {/* Navigation Bar */}
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Grid of 12 items */}
      <div className="cities-grid">
        {cities.map((city, index) => (
          <div key={index} className="city-item">
            <strong>{city.city}</strong>
            <p>{city.state}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FutureGetaways;
