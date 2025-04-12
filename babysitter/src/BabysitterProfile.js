import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./BabysitterProfile.css";
import PaymentModal from "./PaymentModal";

const BabysitterProfile = ({ selectedBabysitter, onClose }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Nouvelle section messagerie
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const babysitterLocations = {
    "Sinda Sassi": { location: [34.7333, 10.7667], city: "Sfax" },
    "Emna Ouni": { location: [36.8065, 10.1815], city: "Tunis" },
    "Mirlen Ali": { location: [35.8254, 10.636], city: "Sousse" },
    "Layla Ibrahim": { location: [36.4513, 10.7361], city: "Nabeul" }
  };

  const babysitterDetails = {
    "Sinda Sassi": {
      smoker: "No",
      educationLevel: "Bac+6",
      preferredLocation: "At family's home",
      babysittingFrequency: "Daily",
      cost: "40 DT/hour",
      availability: ["Monday", "Wednesday", "Friday"]
    },
    "Emna Ouni": {
      smoker: "No",
      educationLevel: "Bac+1",
      preferredLocation: "At my home",
      babysittingFrequency: "Occasionally",
      cost: "80 DT/hour",
      availability: ["Tuesday", "Thursday", "Saturday"]
    },
    "Mirlen Ali": {
      smoker: "Yes",
      educationLevel: "Bac+5",
      preferredLocation: "At my home",
      babysittingFrequency: "At family's home",
      cost: "60 DT/hour",
      availability: ["Tuesday", "Thursday", "Saturday"]
    },
    "Layla Ibrahim": {
      smoker: "No",
      educationLevel: "Bac+2",
      preferredLocation: "At my home",
      babysittingFrequency: "Occasionally",
      cost: "78 DT/hour",
      availability: ["Tuesday", "Thursday", "Saturday"]
    }
  };

  if (!selectedBabysitter) return <h2>Babysitter not found</h2>;

  const handleBookingRequest = () => {
    setIsRequested(true);
    setTimeout(() => {
      setIsAccepted(true);
      alert(`${selectedBabysitter.name} has accepted your booking request.`);
      setIsPaymentOpen(true);
    }, 3000);
  };

  const handlePaymentSuccess = () => {
    setIsBooked(true);
    setIsPaymentOpen(false);
    alert(`You have booked ${selectedBabysitter.name} successfully!`);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      setReviews([...reviews, reviewText]);
      setReviewText("");
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "Parent", text: newMessage }]);
      setNewMessage("");
    }
  };

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="profile-container">
      <div className="scrollable-content">
        <button className="back-btn" onClick={onClose}>← Back</button>

        <div className="profile-header">
          <div className="profile-img-container">
            <img src={selectedBabysitter.image} alt={selectedBabysitter.name} className="profile-img" />
            <div className="hourly-rate">
              {babysitterDetails[selectedBabysitter.name]?.cost}
            </div>
          </div>
          <div className="profile-info">
            <h2>{selectedBabysitter.name}</h2>
            <p>{selectedBabysitter.description}</p>
          </div>
        </div>

        <div className="details-section">
          <h3>Details</h3>
          <ul>
            <li><strong>Smoker:</strong> {babysitterDetails[selectedBabysitter.name]?.smoker}</li>
            <li><strong>Education:</strong> {babysitterDetails[selectedBabysitter.name]?.educationLevel}</li>
            <li><strong>Location:</strong> {babysitterDetails[selectedBabysitter.name]?.preferredLocation}</li>
            <li><strong>Frequency:</strong> {babysitterDetails[selectedBabysitter.name]?.babysittingFrequency}</li>
          </ul>
        </div>

        <div className="availability-section">
          <h3>Availability</h3>
          <table className="availability-table">
            <thead>
              <tr>
                {daysOfWeek.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {daysOfWeek.map((day, index) => (
                  <td 
                    key={index} 
                    className={babysitterDetails[selectedBabysitter.name]?.availability.includes(day) ? "available-day" : ""}
                  >
                    {babysitterDetails[selectedBabysitter.name]?.availability.includes(day) ? "✔" : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="map-section">
          <h3>Location:</h3>
          <MapContainer center={babysitterLocations[selectedBabysitter.name]?.location} zoom={12} className="map-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={babysitterLocations[selectedBabysitter.name]?.location} icon={customIcon}>
              <Popup>
                {selectedBabysitter.name} is located in {babysitterLocations[selectedBabysitter.name]?.city}.
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="reviews-section">
          <h3>Parent Reviews</h3>
          <ul>
            {reviews.length > 0 ? reviews.map((review, index) => <li key={index}>{review}</li>) : <li>No reviews yet</li>}
          </ul>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Leave your review here..." />
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>

        {/* Messagerie accessible tout le temps */}
        <div className="messaging-section">
          <h3>Chat with {selectedBabysitter.name}</h3>

          <div className="messages-box">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))
            ) : (
              <p className="no-messages">No messages yet</p>
            )}
          </div>

          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>

          {!isBooked && (
            <p className="chat-warning">* You can chat before booking. Once booked, the chat will stay open.</p>
          )}
        </div>
      </div>

      <div className="sticky-footer">
        <button
          className={`booking-btn ${isBooked ? 'booked' : ''}`}
          onClick={handleBookingRequest}
          disabled={isBooked || isRequested}
        >
          {isBooked
            ? "✓ Booked Successfully"
            : isRequested && !isAccepted
            ? "Waiting for Acceptance..."
            : "Request Booking"}
        </button>

        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

export default BabysitterProfile;
