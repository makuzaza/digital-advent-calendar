import React from 'react';
import "./services.css"

const Services: React.FC = () => {
  return (
    <section className="services" id="services">
      <div className="max-width">
        <h1 className="title">Our Services</h1>
        <div className="serv-content">
          <div className="card">
            <div className="box">
              <i className="fas fa-laptop-code"></i>
              <div className="text">Browse</div>
              <p>Explore a world of enchanting advent calendars tailored to your tastes.</p>
            </div>
          </div>
          <div className="card">
            <div className="box">
              <i className="fas fa-user-secret"></i>
              <div className="text">Customize</div>
              <p>Personalize your advent calendar experience and make it uniquely yours.</p>
            </div>
          </div>
          <div className="card">
            <div className="box">
              <i className="fas fa-code"></i>
              <div className="text">Share</div>
              <p>Spread the holiday spirit far by sharing your custom advent calendar with friends and family.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;