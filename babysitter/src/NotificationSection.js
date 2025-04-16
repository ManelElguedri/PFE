import React, { useState, useEffect } from "react";
import api from "./api";
import "./NotificationSection.css";

const NotificationSection = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/notifications");
        setNotes(res.data);
      } catch {
        setError("Bildirimler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);
      setNotes((n) => n.map((x) => (x._id === id ? { ...x, read: true } : x)));
    } catch {
      setError("İşaretleme başarısız.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="notification-section">
      <h2>Notifications</h2>
      <ul>
        {notes.map((n) => (
          <li key={n._id} style={{ background: n.read ? "#f0f0f0" : "#fff" }}>
            {n.message}
            {!n.read && (
              <button onClick={() => markRead(n._id)}>Mark Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NotificationSection;
