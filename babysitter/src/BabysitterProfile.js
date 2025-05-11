import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./BabysitterProfile.css";
import PaymentModal from "./PaymentModal";
import api from "./api";

const BabysitterProfile = ({ selectedBabysitter, onClose }) => {
  const [isRequested, setIsRequested] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const babysitterId = selectedBabysitter?._id;
  const fallbackLocation = [36.8, 10.1];
  const token = localStorage.getItem("token");

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
  });

  // 🔹 Mesajları çek
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${babysitterId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Mesajlar alınamadı:", err);
      }
    };

    if (babysitterId) fetchMessages();
  }, [babysitterId]);

  // 🔹 Mesaj gönder
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await api.post(
        "/messages",
        { to: babysitterId, text: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Mesaj gönderilemedi:", err);
    }
  };

  // 🔹 Booking gönder
  const handleBookingRequest = async () => {
    try {
      await api.post(
        "/booking-requests",
        { babysitterId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsRequested(true);
      setTimeout(() => {
        setIsAccepted(true);
        setIsPaymentOpen(true);
      }, 2000);
    } catch (err) {
      console.error("Booking isteği başarısız:", err);
    }
  };

  // 🔹 Ödeme sonrası işlem
  const handlePaymentSuccess = () => {
    setIsBooked(true);
    setIsPaymentOpen(false);
    alert(`You have booked ${selectedBabysitter.name} successfully!`);
  };

  // 🔹 Yorum gönder
  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      setReviews((prev) => [...prev, reviewText]);
      setReviewText("");
    }
  };

  if (!selectedBabysitter) return <h2>Babysitter not found</h2>;

  return (
    <div className="profile-container">
      <div className="scrollable-content">
        <button className="back-btn" onClick={onClose}>
          ← Back
        </button>

        {/* Profil başlık */}
        <div className="profile-header">
          <div className="profile-img-container">
            {selectedBabysitter.profilePicture ? (
              <img
                src={`http://localhost:5000/uploads/${selectedBabysitter.profilePicture}`}
                alt={selectedBabysitter.name}
                className="profile-img"
              />
            ) : (
              <div className="profile-img-placeholder">No Image</div>
            )}
            <div className="hourly-rate">
              {selectedBabysitter.cost || "N/A"}
            </div>
          </div>

          <div className="profile-info">
            <h2>
              {selectedBabysitter.name} {selectedBabysitter.surname}
            </h2>
            <p>
              {selectedBabysitter.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Detaylar */}
        <div className="details-section">
          <h3>Details</h3>
          <ul>
            <li>
              <strong>Smoker:</strong> {selectedBabysitter.isSmoker || "N/A"}
            </li>
            <li>
              <strong>Education:</strong>{" "}
              {selectedBabysitter.educationLevel || "N/A"}
            </li>
            <li>
              <strong>Preferred Location:</strong>{" "}
              {selectedBabysitter.babysittingPlace || "N/A"}
            </li>
            <li>
              <strong>Frequency:</strong>{" "}
              {selectedBabysitter.babysittingFrequency || "N/A"}
            </li>
            <li>
              <strong>Age:</strong> {selectedBabysitter.age || "N/A"}
            </li>
            <li>
              <strong>Address:</strong> {selectedBabysitter.address || "N/A"}
            </li>
          </ul>
        </div>

        {/* Harita */}
        <div className="map-section">
          <h3>Location:</h3>
          <MapContainer
            center={fallbackLocation}
            zoom={12}
            className="map-container"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={fallbackLocation} icon={customIcon}>
              <Popup>{selectedBabysitter.address || "Unknown location"}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Yorumlar */}
        <div className="reviews-section">
          <h3>Parent Reviews</h3>
          <ul>
            {reviews.length ? (
              reviews.map((r, i) => <li key={i}>{r}</li>)
            ) : (
              <li>No reviews yet</li>
            )}
          </ul>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Leave your review here..."
          />
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>

        {/* Mesajlaşma */}
        <div className="messaging-section">
          <h3>Chat with {selectedBabysitter.name}</h3>
          <div className="messages-box">
            {messages.length ? (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.from === babysitterId ? "babysitter" : "parent"
                  }`}
                >
                  <strong>
                    {msg.from === babysitterId
                      ? selectedBabysitter.name
                      : "You"}
                    :
                  </strong>{" "}
                  {msg.text}
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
        </div>
      </div>

      {/* Alt booking butonu + ödeme */}
      <div className="sticky-footer">
        <button
          className={`booking-btn ${isBooked ? "booked" : ""}`}
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
