import React from 'react';
import './GiftCards.css';

const GiftCards = () => {
  return (
    <section className="giftcards-section">
      <div className="giftcards-text">
        <h2>Shop Airbnb Gift Cards</h2>
      </div>
      <div className="giftcards-container">
        <div className="gift-card card1"></div>
        <div className="gift-card card2"></div>
      </div>
    </section>
  );
};

export default GiftCards;