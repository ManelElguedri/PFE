import React, { useState, useEffect } from "react";
import api from "./api";
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

  const respondToRequest = async (id, action) => {
    try {
      const res = await api.put(`/booking-requests/${id}`, { action });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: res.data.status } : r))
      );
    } catch (err) {
      console.error("Failed to update request:", err);
    }
  };

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
            <li key={req._id} className="request-item">
              {req.createdAt
                ? new Date(req.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "N/A"}s
              From: {req.parent?.name || req.parent?.email || "Unknown"} (
              Status: {req.status})
              {req.status === "pending" && (
                <span className="action-buttons">
                  <button onClick={() => respondToRequest(req._id, "accepted")}>
                    Accept
                  </button>
                  <button onClick={() => respondToRequest(req._id, "declined")}>
                    Decline
                  </button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RequestList;
