import React from 'react'

import './Inspiration.css';

const tripData = [
  {
    imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    description: 'Explore the mountains and enjoy nature at its finest.',
  },
  {
    imgSrc: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    description: 'Discover the vibrant city life in the heart of urban spaces.',
  },
  {
    imgSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    description: 'Relax on the serene beaches with beautiful sunsets.',
  },
  {
    imgSrc: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    description: 'Visit historic landmarks and delve into the past.',
  },
  {
    imgSrc: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop',
    description: 'Take a road trip and experience scenic routes.',
  },
];

const Inspiration = () => {
  return (
    <section className="inspiration-section">
      <h2>Inspiration for Your Next Trip</h2>

      <div className="tiles-container">
        
        {tripData.map((trip, index) => (
          <div key={index} className="tile">
            <div className="tile-image">
              <img src={trip.imgSrc} alt={`trip ${index + 1}`} />
            </div>
            <div className="tile-description">
              <p>{trip.description}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Inspiration