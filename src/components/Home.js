import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section className="home-section">

      <div className="background">
        <img 
          src="https://res.akamaized.net/domain/image/upload/t_web/v1629867843/65A_Champion_St_Brighton_VIC_1_bunjuj.jpg" 
          alt="homepage background" 
          className="home-image"
        />

        <div className="text-overlay">
          <h2>Not sure where to go? Perfect.</h2>
          <button className="flexible-button">I'm flexible</button>
        </div>
      </div>

    </section>
  );
}

export default Home;
