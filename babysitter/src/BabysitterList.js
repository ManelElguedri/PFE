import React, { useState, useEffect } from "react";
import "./BabysitterList.css";

const BabysitterList = ({ searchQuery }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBabysitters = async () => {
      try {
        // Remplacer l'URL par celle de ton API
        const response = await fetch(`/api/babysitters?search=${searchQuery}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch babysitter data");
        }

        const data = await response.json();
        setBabysitters(data);
        setLoading(false);
      } catch (error) {
        setError("Unable to load babysitter data. Please try again later.");
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
      <p>Search Query: {searchQuery}</p>
      <div className="babysitter-cards">
        {babysitters.length === 0 ? (
          <p>No babysitters found</p>
        ) : (
          babysitters.map((babysitter) => (
            <div className="babysitter-card" key={babysitter.id}>
              <p><strong>FirstName:</strong> {babysitter.firstname}</p>
              <p><strong>LastName:</strong> {babysitter.lastname}</p>
              <p><strong>Email:</strong> {babysitter.email}</p>
              <p><strong>Phone:</strong> {babysitter.phone}</p>
              <p><strong>Location:</strong> {babysitter.location}</p>
              <p><strong>EducationLevel:</strong> {babysitter.educationlevel}</p>
              <p><strong>Smoker:</strong> {babysitter.smoker}</p>
              <p><strong>BabysittingFrequency:</strong> {babysitter.babysittingfrequency}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BabysitterList;
