import React from "react";
import "./BabysitterWelcome.css";

function BabysitterWelcome() {
  return (
    <div className="welcome-container">
      <h2>Welcome to your Babysitting Dashboard</h2>
      <p>We are excited to have you as part of our community. You can manage your profile, availability, and booking requests all in one place.</p>
      <div className="action-buttons">
        <button className="btn" onClick={() => window.location.href = "/profile"}>Go to My Profile</button>
        <button className="btn" onClick={() => window.location.href = "/availability"}>Set My Availability</button>
      </div>
    </div>
  );
}

export default BabysitterWelcome;
