import React, { useState, useEffect } from "react";
import "./ParentList.css";

const ParentList = ({ searchQuery }) => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        // Remplacer l'URL par celle de ton API
        const response = await fetch(`/api/parents?search=${searchQuery}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch parents data");
        }

        const data = await response.json();
        setParents(data);
        setLoading(false);
      } catch (error) {
        setError("Unable to load parent data. Please try again later.");
        setLoading(false);
      }
    };

    fetchParents();
  }, [searchQuery]);

  if (loading) return <p className="loading">Loading parent data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="parent-list">
      <h2>Parent List</h2>
      <p>Search Query: {searchQuery}</p>
      <div className="parent-cards">
        {parents.length === 0 ? (
          <p>No parents found</p>
        ) : (
          parents.map((parent) => (
            <div className="parent-card" key={parent.id}>
              <p><strong>FirstName:</strong> {parent.firstname}</p>
              <p><strong>LastName:</strong> {parent.lastname}</p>
              <p><strong>Email:</strong> {parent.email}</p>
              <p><strong>Phone:</strong> {parent.phone}</p>
              <p><strong>Address:</strong> {parent.address}</p>
              <p><strong>NumberofChildren:</strong> {parent.numberofchildren}</p>
              <p><strong>gender:</strong> {parent.gender}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParentList;
