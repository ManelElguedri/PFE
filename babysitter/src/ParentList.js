// src/pages/ParentList.jsx
import React, { useState, useEffect } from "react";
import api from "./api";
import "./ParentList.css";

const ParentList = ({ searchQuery }) => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParents = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/parents", {
          params: searchQuery ? { search: searchQuery } : {},
        });
        setParents(res.data);
      } catch (err) {
        console.error("Error fetching parents:", err);
        setError("Unable to load parent data.");
      } finally {
        setLoading(false);
      }
    };
    fetchParents();
  }, [searchQuery]);

  if (loading) return <p className="loading">Loading parents...</p>;
  if (error) return <p className="error">{error}</p>;
  if (parents.length === 0) {
    return <p>No parents found</p>;
  }

  return (
    <div className="parent-list">
      <h2>Parent List</h2>
      <div className="parent-cards">
        {parents.map((p) => (
          <div className="parent-card" key={p._id}>
            <p>
              <strong>Name:</strong> {p.fullName || p.name}
            </p>
            <p>
              <strong>Email:</strong> {p.email}
            </p>
            {p.address && (
              <p>
                <strong>Address:</strong> {p.address}
              </p>
            )}
            {p.phone && (
              <p>
                <strong>Phone:</strong> {p.phone}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentList;
