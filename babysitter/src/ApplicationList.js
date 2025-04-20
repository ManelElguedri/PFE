// src/components/ApplicationList.jsx

import React, { useState, useEffect } from "react";
import api from "./api"; // axios.create({ baseURL: process.env.REACT_APP_API_URL })
import "./ApplicationList.css";

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError("");
      try {
        // GET /api/applications
        const res = await api.get("/job-applications");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="application-list">
      <h2>Job Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="application-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Babysitter Name</th>
              <th>Babysitter Email</th>
              <th>Announcement Title</th>
              <th>Announcement Date</th>
              <th>Applied At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const { _id, status, createdAt, babysitter, announcement } = app;
              const appliedDate = new Date(createdAt).toLocaleString();
              const annDate = announcement?.date
                ? new Date(announcement.date).toLocaleDateString()
                : "-";
              return (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{babysitter?.name || babysitter?.fullName || "-"}</td>
                  <td>{babysitter?.email || "-"}</td>
                  <td>{announcement?.title || "-"}</td>
                  <td>{annDate}</td>
                  <td>{appliedDate}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApplicationList;
