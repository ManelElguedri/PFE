// src/components/AnnouncementList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api"; // axios.create({ baseURL: process.env.REACT_APP_API_URL })
import "./AnnouncementList.css";

const AnnouncementList = ({ searchQuery }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        // Gerçek back-end endpoint’i
        const res = await api.get("/announcements", {
          params: { search: searchQuery },
        });
        setAnnouncements(res.data);
      } catch (err) {
        setError("Duyurular yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery]);

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="announcement-list">
      <h2>Duyurular</h2>
      {announcements.length === 0 ? (
        <p>Hiç duyuru bulunamadı.</p>
      ) : (
        <div className="grid">
          {announcements.map((a) => (
            <article key={a._id} className="card">
              <h3>{a.title}</h3>
              <p className="meta">
                {new Date(a.date).toLocaleDateString()} — {a.location}
              </p>
              <p className="excerpt">
                {a.description.length > 100
                  ? a.description.slice(0, 100) + "…"
                  : a.description}
              </p>
              <Link to={`/announcements/${a._id}`} className="btn">
                Detayları Gör
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AnnouncementList;
