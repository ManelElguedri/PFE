// BabysitterWelcome.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router v6
import "./BabysitterWelcome.css";
import AvailabilityModal from "./AvailabilityModal"; // Eğer müsaitlik ayarlaması için modal kullanıyorsanız

function BabysitterWelcome() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDashboardClick = () => {
    // Babysitter dashboard sayfasına yönlendir
    navigate("/babysitterdashboard");
  };

  const handleAvailabilityClick = () => {
    // Modal açarak müsaitlik ayarlama işlemi yapılabilir
    setShowModal(true);
  };

  return (
    <div className="welcome-container">
      <h2>Welcome to your Babysitting Dashboard</h2>
      <p>
        We are excited to have you as part of our community. You can manage your
        profile, availability, and booking requests all in one place.
      </p>
      <div className="action-buttons">
        <button className="btn" onClick={handleDashboardClick}>
          Go to My Dashboard
        </button>
        <button className="btn" onClick={handleAvailabilityClick}>
          Set My Availability
        </button>
      </div>
      {showModal && <AvailabilityModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default BabysitterWelcome;
