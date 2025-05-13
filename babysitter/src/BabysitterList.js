import React, { useState, useEffect } from "react";
import api from "./api";
import "./BabysitterList.css";

const BabysitterList = ({ onSelectBabysitter }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minAge: "",
    maxAge: "",
    address: "", // 👈 lokasyon
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchBabysitters = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/babysitters", { params: filters });
      setBabysitters(res.data);
    } catch {
      setError("Babysitter verileri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBabysitters(); // sayfa açıldığında tüm babysitterları getir
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBabysitters(); // filtreyle tekrar getir
  };

  return (
    <div className="babysitter-list">
      <h2>Find Babysitter</h2>

      <form className="filter-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search by name/email"
          value={filters.search}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minAge"
          placeholder="Min Age"
          value={filters.minAge}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxAge"
          placeholder="Max Age"
          value={filters.maxAge}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Location"
          value={filters.address}
          onChange={handleChange}
        />
        <button type="submit">Apply</button>
      </form>

      <div className="babysitter-cards">
        {loading ? (
          <p className="loading">Loading babysitter data...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : babysitters.length === 0 ? (
          <p>No babysitters found</p>
        ) : (
          babysitters.map((b) => (
            <div key={b._id} className="babysitter-card">
              <p>
                <strong>Name:</strong> {b.name} {b.surname}
              </p>
              <p>
                <strong>Email:</strong> {b.email}
              </p>
              <p>
                <strong>Age:</strong> {b.age || "N/A"}
              </p>
              <p>
                <strong>Education:</strong> {b.educationLevel || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {b.address || "N/A"}
              </p>
              {onSelectBabysitter && (
                <button onClick={() => onSelectBabysitter(b)}>
                  View Profile
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BabysitterList;
