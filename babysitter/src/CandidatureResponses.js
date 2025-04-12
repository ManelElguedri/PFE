import React, { useState, useEffect } from "react";
import "./CandidatureResponses.css";

function CandidatureResponses() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications from the backend
  useEffect(() => {
    fetch("http://localhost:3001/api/applications") // Adjust to your backend URL
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load applications:", err);
        setLoading(false);
      });
  }, []);

  // Accept or reject application
  const handleResponse = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:3001/api/applications/${id}/response`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Update state locally
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div className="candidature-responses">Loading...</div>;

  return (
    <div className="candidature-responses">
      <h2>Received Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="candidature-list">
          {applications.map((app) => (
            <li key={app.id} className="candidature-item">
              <div className="candidature-info">
                <strong>Name:</strong> {app.name} <br />
                <strong>Email:</strong> {app.email} <br />
                <strong>Message:</strong> {app.message}
              </div>

              {app.status ? (
                <span className={`candidature-statut ${app.status.toLowerCase()}`}>
                  {app.status === "accepted" ? "Accepted" : "Rejected"}
                </span>
              ) : (
                <div className="candidature-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleResponse(app.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleResponse(app.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CandidatureResponses;


