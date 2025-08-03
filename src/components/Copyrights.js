// src/components/Copyrights.js
import React from 'react';
import './Copyrights.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';

const Copyrights = () => {
  return (
    <section className="copyrights-section">
      <div className="copyrights-left">
        <p>© 2022 Airbnb, Inc ∙ <a href="/">Privacy</a> ∙ <a href="/">Terms</a> ∙ <a href="/">Sitemap</a></p>
      </div>
      <div className="copyrights-right">
        <div className="language-currency">
          <FaGlobe className="icon-globe" /> English (ZA) R ZAR
        </div>
        <div className="social-media-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Copyrights;
