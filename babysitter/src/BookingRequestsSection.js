// src/components/RequestList.jsx
import React, { useState, useEffect } from "react";
import api from "./api"; // baseURL http://localhost:5000/api olarak tanımlı olmalı
import "./RequestList.css";

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/booking-requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching booking requests:", err);
        setError("Failed to load booking requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="request-list">
      <h2>Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req._id}>
              <strong>{new Date(req.date).toLocaleDateString()}</strong> –{" "}
              {req.parentName} requested from {req.startTime} to {req.endTime} (
              {req.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RequestList;
