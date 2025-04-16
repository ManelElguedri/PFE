import React, { useState, useEffect } from "react";
import api from "./api";
import "./BabysitterList.css";

const BabysitterList = ({ searchQuery }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/babysitters", {
          params: { search: searchQuery },
        });
        setBabysitters(res.data);
      } catch {
        setError("Babysitter verileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchList();
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
          babysitters.map((b) => (
            <div key={b._id} className="babysitter-card">
              <p>
                <strong>FirstName:</strong> {b.firstname}
              </p>
              <p>
                <strong>LastName:</strong> {b.lastname}
              </p>
              <p>
                <strong>Email:</strong> {b.email}
              </p>
              <p>
                <strong>Location:</strong> {b.location}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default BabysitterList;
