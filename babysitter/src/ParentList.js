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
          params: { search: searchQuery },
        });
        setParents(res.data);
      } catch {
        setError("Ebeveyn verileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchParents();
  }, [searchQuery]);

  if (loading) return <p className="loading">Yükleniyor...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="parent-list">
      <h2>Parent List</h2>
      <p>Search Query: {searchQuery}</p>
      <div className="parent-cards">
        {parents.length === 0 ? (
          <p>No parents found</p>
        ) : (
          parents.map((p) => (
            <div key={p._id} className="parent-card">
              <p>
                <strong>FirstName:</strong> {p.firstname}
              </p>
              <p>
                <strong>LastName:</strong> {p.lastname}
              </p>
              <p>
                <strong>Email:</strong> {p.email}
              </p>
              <p>
                <strong>Address:</strong> {p.address}
              </p>
              <p>
                <strong>Number of Children:</strong> {p.numberOfChildren}
              </p>
              <p>
                <strong>Gender:</strong> {p.gender}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default ParentList;
