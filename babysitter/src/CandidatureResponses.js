// src/CandidatureResponses.jsx

import React, { useState, useEffect } from "react";
import api from "./api"; // axios.create({ baseURL: ... })
import "./CandidatureResponses.css";

function CandidatureResponses() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get("/job-applications");
        setApplications(data);
      } catch (err) {
        console.error("Failed to load applications:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleResponse = async (id, newStatus) => {
    try {
      await api.put(`/job-applications/${id}`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status.");
    }
  };

  if (loading) return <div className="candidature-responses">Loading…</div>;
  if (error) return <div className="candidature-responses error">{error}</div>;

  return (
    <div className="candidature-responses">
      <h2>Received Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="candidature-list">
          {applications.map((app) => {
            const babysitterName =
              app.babysitter?.name || app.babysitter?.fullName || "-";
            const babysitterEmail = app.babysitter?.email || "-";
            const announcementTitle = app.announcement?.title || "-";
            const status = app.status || "-";

            return (
              <li key={app._id} className="candidature-item">
                <div className="candidature-info">
                  <p>
                    <strong>Babysitter:</strong> {babysitterName}
                  </p>
                  <p>
                    <strong>Email:</strong> {babysitterEmail}
                  </p>
                  <p>
                    <strong>Announcement:</strong> {announcementTitle}
                  </p>
                  <p>
                    <strong>Status:</strong> {status}
                  </p>
                </div>

                {!["Accepted", "Declined"].includes(status) && (
                  <div className="candidature-actions">
                    <button
                      className="accept-btn"
                      onClick={() => handleResponse(app._id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleResponse(app._id, "Declined")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CandidatureResponses;
