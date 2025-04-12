import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApplicationList.css"; // Si tu as des styles spécifiques pour cette liste

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les applications depuis le backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      // Remplace l'URL par celle de ton API backend
      const response = await axios.get("/api/applications");
      setApplications(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement des applications.");
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour charger les données au montage du composant
  useEffect(() => {
    fetchApplications();
  }, []); // [] signifie que l'effet ne se déclenche qu'une seule fois au montage

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="application-list">
      <h2>Application List</h2>
      <table className="application-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of application</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.dateApplied}</td>
              <td>{application.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
