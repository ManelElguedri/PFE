import React, { useState, useEffect } from "react";
import api from "./api";
import "./NotificationSection.css";

const NotificationSection = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError("Notifications could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    const interval = setInterval(fetchNotes, 15000); // 15 saniyede bir kontrol et (polling)
    return () => clearInterval(interval);
  }, []);

  const markRead = async (id) => {
    try {
      const res = await api.put(
        `/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: res.data.isRead } : n))
      );
    } catch (err) {
      console.error(err);
      setError("Marking notification as read failed.");
    }
  };

  if (loading) return <div className="loading">Loading notifications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="notification-section">
      <h2>Notifications</h2>
      {notes.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n._id} className={n.isRead ? "note read" : "note unread"}>
              <span>{n.message}</span>
              {!n.isRead && (
                <button onClick={() => markRead(n._id)}>Mark Read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationSection;
