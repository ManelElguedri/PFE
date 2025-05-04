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
        setError("Notifications could not be loaded.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const markRead = async (id) => {
    try {
      const res = await api.put(`/notifications/${id}`);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: res.data.isRead } : n))
      );
    } catch {
      setError("Marking notification as read failed.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="notification-section">
      <h2>Notifications</h2>
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
    </div>
  );
};

export default NotificationSection;
