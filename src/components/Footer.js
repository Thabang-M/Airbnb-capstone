import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-column">
        <h3>Support</h3>
        <ul>
          <li>Help Center</li>
          <li>Safety Information</li>
          <li>Cancellation Options</li>
          <li>Our COVID-19 Response</li>
          <li>Supporting People with Disabilities</li>
          <li>Report a Neighborhood Concern</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Community</h3>
        <ul>
          <li>Airbnb.org: Disaster Relief Housing</li>
          <li>Support Afghan Refugees</li>
          <li>Combating Discrimination</li>
          <li>Join the Community</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Hosting</h3>
        <ul>
          <li>Try Hosting</li>
          <li>AirCover: Protection for Hosts</li>
          <li>Explore Hosting Resources</li>
          <li>Visit our Community Forum</li>
          <li>How to Host Responsibly</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>About</h3>
        <ul>
          <li>How Airbnb Works</li>
          <li>Newsroom</li>
          <li>Investors</li>
          <li>Airbnb Plus</li>
          <li>Airbnb Luxe</li>
          <li>Careers</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;