import React, { useState, useEffect } from "react";
import api from "./api";
import "./BookingRequestsSection.css";

const BookingRequestsSection = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReqs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/babysitter/booking-requests");
        setRequests(res.data);
      } catch {
        setError("Booking requests yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchReqs();
  }, []);

  const respond = async (id, action) => {
    try {
      await api.post(`/babysitter/booking-requests/${id}/${action}`);
      setRequests((r) => r.filter((x) => x._id !== id));
    } catch {
      setError("İşlem başarısız.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="booking-requests-section">
      <h2>Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No new requests.</p>
      ) : (
        requests.map((r) => (
          <div key={r._id} className="booking-request-item">
            <p>
              {r.parentName} wants {r.date} {r.startTime}-{r.endTime}
            </p>
            <button onClick={() => respond(r._id, "accept")}>Accept</button>
            <button onClick={() => respond(r.__id, "decline")}>Decline</button>
          </div>
        ))
      )}
    </div>
  );
};
export default BookingRequestsSection;
