import React, { useState, useEffect } from "react";
import "./ApplicationList.css";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gerçek API olmadığı için dummy verilerle çalışıyoruz.
  const fetchApplications = async () => {
    try {
      setLoading(true);
      // Gerçek ağ gecikmesini simüle ediyoruz.
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy veri; ihtiyaçlarınıza göre güncelleyebilirsiniz.
      const dummyData = [
        {
          id: 1,
          name: "Ali Damok",
          email: "ali.damok@example.com",
          dateApplied: "2023-09-01",
          status: "Pending",
        },
        {
          id: 2,
          name: "Rahma Guesmi",
          email: "rahma.guesmi@example.com",
          dateApplied: "2023-09-02",
          status: "Approved",
        },
        {
          id: 3,
          name: "Yasmin Treki",
          email: "yasmin.treki@example.com",
          dateApplied: "2023-09-03",
          status: "Rejected",
        },
      ];

      // Konsola log ekleyerek dummy verileri kontrol edebilirsiniz.
      console.log("Dummy API Response:", dummyData);
      setApplications(dummyData);
    } catch (err) {
      console.error("Error fetching applications:", err.message);
      setError("Erreur lors du chargement des applications.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect yalnızca bileşen ilk yüklendiğinde çalışır.
  useEffect(() => {
    fetchApplications();
  }, []);

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
            <th>Date of Application</th>
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
