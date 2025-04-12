import React from "react";
import "./Home.css";
import mamanImage1 from './assets/maman1.jpg';
import mamanImage2 from './assets/maman2.jpg';
import mamanImage3 from './assets/maman3.jpg';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Find Trusted Babysitters Near You</h1>
        <p>Safe, reliable, and experienced babysitters just a click away!</p>
        <div className="search-bar">
          <input type="text" placeholder="Find your Babysitter" />
          <button>Search</button>
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose KidCare?</h2>
        <div className="features">
          <div className="feature-card">Verified Babysitters</div>
          <div className="feature-card">Trusted by Thousands</div>
          <div className="feature-card">Easy Booking System</div>
          <div className="feature-card">Personalized Matches for Families</div>
          <div className="feature-card">Affordable Pricing Plans</div>
          <div className="feature-card">Childcare Experience Guaranteed</div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Parents Say</h2>
        <div className="testimonial-list">
          <div className="testimonial-card">
            <img
              src={require("./assets/maman3.jpg")} 
              alt="Sarah"
              className="testimonial-img"
            />
            <p>
              "I am very satisfied with the nanny Jalila. She took care of my baby with great kindness and professionalism. She is punctual, reliable and very attentive to the needs of my baby.
               Her attitude and commitment gave me complete confidence. I highly recommend it.."
            </p>
            <strong>Mrs Sarah yahyaoui,Sfax</strong>
          </div>

          <div className="testimonial-card">
            <img
              src={require("./assets/maman2.jpg")} // Lien vers l'image d'Amira
              alt="Amira"
              className="testimonial-img"
            />
            <p>"We are very satisfied with our occasional babysitter. Punctual, reliable and attentive, she has created a safe 
              and pleasant environment for our children. We highly recommend her!."</p>
            <strong>Mrs Amira rjab, Sousse</strong>
          </div>

          <div className="testimonial-card">
            <img
              src={require("./assets/maman1.jpg")} 
              alt="Samar"
              className="testimonial-img"
            />
            <p>
              "Mouna was not a babysister but a friend for me, a member of our family, and a big sister for my daughter. She was, a good person, very kind,
               and reliable I'm greatful for her services and also yours"
            </p>
            <strong>Mrs Samar ahmed, Kebili</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
