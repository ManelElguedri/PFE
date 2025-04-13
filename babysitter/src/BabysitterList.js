import React, { useState, useEffect } from "react";
import "./BabysitterList.css";

const BabysitterList = ({ searchQuery }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBabysitters = async () => {
      try {
        setLoading(true);
        // Simüle edilen ağ gecikmesi
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Dummy (örnek) babysitter verileri
        const dummyData = [
          {
            id: 1,
            firstname: "Alice",
            lastname: "Brown",
            email: "alice.brown@example.com",
            location: "New York",
            educationlevel: "College Graduate",
            smoker: "No",
            babysittingfrequency: "Weekly",
          },
          {
            id: 2,
            firstname: "Emily",
            lastname: "Davis",
            email: "emily.davis@example.com",
            location: "Los Angeles",
            educationlevel: "High School",
            smoker: "No",
            babysittingfrequency: "Occasionally",
          },
          {
            id: 3,
            firstname: "Sophia",
            lastname: "Johnson",
            email: "sophia.johnson@example.com",
            location: "Chicago",
            educationlevel: "Bachelor's",
            smoker: "No",
            babysittingfrequency: "Daily",
          },
        ];

        // Eğer searchQuery varsa, dummy verileri filtreleyelim:
        const filteredData = dummyData.filter(
          (babysitter) =>
            babysitter.firstname
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            babysitter.lastname
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            babysitter.location
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        setBabysitters(filteredData);
      } catch (error) {
        setError("Unable to load babysitter data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBabysitters();
  }, [searchQuery]);

  if (loading) return <p className="loading">Loading babysitter data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="babysitter-list">
      <h2>Babysitter List</h2>
      {/* <p>Search Query: {searchQuery}</p> */}
      <div className="babysitter-cards">
        {babysitters.length === 0 ? (
          <p>No babysitters found</p>
        ) : (
          babysitters.map((babysitter) => (
            <div className="babysitter-card" key={babysitter.id}>
              <p>
                <strong>FirstName:</strong> {babysitter.firstname}
              </p>
              <p>
                <strong>LastName:</strong> {babysitter.lastname}
              </p>
              <p>
                <strong>Email:</strong> {babysitter.email}
              </p>
              
              <p>
                <strong>Location:</strong> {babysitter.location}
              </p>
              <p>
                <strong>EducationLevel:</strong> {babysitter.educationlevel}
              </p>
              <p>
                <strong>Smoker:</strong> {babysitter.smoker}
              </p>
              <p>
                <strong>BabysittingFrequency:</strong>{" "}
                {babysitter.babysittingfrequency}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BabysitterList;
