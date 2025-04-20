// src/components/RequestList.jsx

import React, { useState, useEffect } from "react";
import api from "./api"; // axios instance
import "./RequestList.css";

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError("");
      try {
        // /api/booking-requests rotasına istek at
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

  if (loading) return <p>Loading booking requests...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="request-list">
      <h2>Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No booking requests found.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Parent Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req._id}</td>
                <td>{req.parentName}</td>
                <td>{new Date(req.date).toLocaleDateString()}</td>
                <td>{req.startTime}</td>
                <td>{req.endTime}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RequestList;
