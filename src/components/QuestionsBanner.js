// src/components/QuestionsBanner.js
import React from 'react';
import './QuestionsBanner.css';

const QuestionsBanner = () => {
  return (
    <section className="questions-banner">
      <div className="banner-content">
        <h1>Questions about hosting</h1>
        <button className="ask-button">Ask a Superhost</button>
      </div>
    </section>
  );
};

export default QuestionsBanner;
