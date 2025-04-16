import React, { useState, useEffect } from "react";
import api from "./api";
import "./ApplicationList.css";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApps = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/applications");
        setApplications(res.data);
      } catch {
        setError("Başvurular yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="application-list">
      <h2>Application List</h2>
      <table className="application-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app._id}</td>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.dateApplied}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ApplicationList;
