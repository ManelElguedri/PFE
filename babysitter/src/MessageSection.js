// src/components/MessageSection.jsx
import React, { useState, useEffect } from "react";
import api from "./api";
import "./MessageSection.css";

const MessageSection = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState({ receiverId: "", text: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1) Kullanıcıları çek
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (e) {
        console.error("Failed to load users", e);
      }
    };
    fetchUsers();
  }, []);

  // 2) Mesajları çek
  useEffect(() => {
    const fetchMsgs = async () => {
      setLoading(true);
      try {
        const res = await api.get("/messages");
        setMessages(res.data);
      } catch (e) {
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMsgs();
  }, []);

  const send = async () => {
    if (!newMsg.receiverId || !newMsg.text) {
      setError("Receiver and text are required.");
      return;
    }
    try {
      await api.post("/messages", newMsg);
      const res = await api.get("/messages");
      setMessages(res.data);
      setNewMsg({ receiverId: "", text: "" });
      setError("");
    } catch {
      setError("Message could not be sent.");
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
            {m.text} <em>(from {m.senderId?.name || m.senderId?.email})</em>
          </li>
        ))}
      </ul>
      <div className="new-message-form">
        <select
          name="receiverId"
          value={newMsg.receiverId}
          onChange={(e) =>
            setNewMsg((p) => ({ ...p, receiverId: e.target.value }))
          }
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
          placeholder="Message"
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default MessageSection;
