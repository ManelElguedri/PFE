import React, { useState, useEffect } from "react";
import "./BookingRequestsSection.css";

function BookingRequestsSection() {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch booking requests from backend
    const fetchBookingRequests = async () => {
      const response = await fetch("/api/babysitter/booking-requests", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setBookingRequests(data);
      setIsLoading(false);
    };

    fetchBookingRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    const response = await fetch(`/api/babysitter/booking-requests/${requestId}/accept`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Booking request accepted");
      setBookingRequests(bookingRequests.filter((req) => req._id !== requestId));
    } else {
      alert("Failed to accept booking request");
    }
  };

  const handleDeclineRequest = async (requestId) => {
    const response = await fetch(`/api/babysitter/booking-requests/${requestId}/decline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Booking request declined");
      setBookingRequests(bookingRequests.filter((req) => req._id !== requestId));
    } else {
      alert("Failed to decline booking request");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-requests-section">
      <h2>Booking Requests</h2>
      {bookingRequests.length === 0 ? (
        <p>No new booking requests.</p>
      ) : (
        <div className="booking-requests-list">
          {bookingRequests.map((request) => (
            <div key={request._id} className="booking-request-item">
              <p>
                <strong>{request.parentName}</strong> has requested your services
                for <strong>{request.date}</strong> from {request.startTime} to{" "}
                {request.endTime}.
              </p>
              <div className="booking-request-actions">
                <button
                  className="accept-button"
                  onClick={() => handleAcceptRequest(request._id)}
                >
                  Accept
                </button>
                <button
                  className="decline-button"
                  onClick={() => handleDeclineRequest(request._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingRequestsSection;
