import './Experiences.css';

const experienceData = [
  {
    imgSrc: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    title: 'Unique Stays',
    buttonText: 'Explore',
  },
  {
    imgSrc: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop',
    title: 'Outdoor Adventures',
    buttonText: 'Discover',
  },
];

const Experiences = () => {
  return (
    <section className="experiences-section">
      <h2>Discover Airbnb Experiences</h2>
      <div className="experiences-tiles-container">
        {experienceData.map((experience, index) => (
          <div
            key={index}
            className="experience-tile"
            style={{ backgroundImage: `url(${experience.imgSrc})` }}
          >
            <div className="experience-content">
              <h3>{experience.title}</h3>
              <button className="experience-button">{experience.buttonText}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences