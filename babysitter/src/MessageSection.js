import React, { useState, useEffect } from "react";
import api from "./api";
import "./MessageSection.css";

const MessageSection = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState({ to: "", text: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Kullanıcıları çek
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data);
      } catch (e) {
        console.error("Kullanıcılar yüklenemedi:", e);
      }
    };
    fetchUsers();
  }, []);

  // Mesajları çek ve 10 saniyede bir kontrol et
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/babysitters/messages", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Yeni mesaj varsa uyarı göster
        if (res.data.length > messages.length) {
          const newMsg = res.data[res.data.length - 1];
          const sender = newMsg.from?.name || newMsg.from?.email || "Unknown";
          const text = newMsg.text || "";
          alert(`📩 New message from ${sender}: "${text}"`);
        }

        setMessages(res.data);
      } catch (e) {
        console.error("Mesajlar alınamadı:", e);
        setError("Mesajlar yüklenemedi.");
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // 10 saniyede bir

    return () => clearInterval(interval);
  }, [messages]);

  const send = async () => {
    if (!newMsg.to || !newMsg.text) {
      setError("Alıcı ve mesaj zorunludur.");
      return;
    }

    try {
      await api.post("/babysitters/messages", newMsg, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNewMsg({ to: "", text: "" });
      setError("");
    } catch {
      setError("Mesaj gönderilemedi.");
    }
  };

  return (
    <div className="message-section">
      <h2>Messages</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      <ul>
        {messages.map((m) => (
          <li key={m._id}>
            <strong>{m.from?.name || m.from?.email}:</strong> {m.text}
          </li>
        ))}
      </ul>

      <div className="new-message-form">
        <select
          name="to"
          value={newMsg.to}
          onChange={(e) => setNewMsg((p) => ({ ...p, to: e.target.value }))}
        >
          <option value="">Select recipient</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <textarea
          name="text"
          value={newMsg.text}
          onChange={(e) => setNewMsg((p) => ({ ...p, text: e.target.value }))}
          placeholder="Your message..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default MessageSection;
