import React, { useState, useEffect } from "react";
import api from "./api";
import "./MessageSection.css";

const MessageSection = () => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState({ receiverId: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMsgs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/messages");
        setMessages(res.data);
      } catch {
        setError("Mesajlar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchMsgs();
  }, []);

  const send = async () => {
    try {
      await api.post("/messages", newMsg);
      const res = await api.get("/messages");
      setMessages(res.data);
      setNewMsg({ receiverId: "", content: "" });
    } catch {
      setError("Mesaj gönderilemedi.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="message-section">
      <h2>Messages</h2>
      <ul>
        {messages.map((m) => (
          <li key={m._id}>
            {m.content} (from {m.from.name})
          </li>
        ))}
      </ul>
      <div className="new-message-form">
        <input
          name="receiverId"
          value={newMsg.receiverId}
          onChange={(e) =>
            setNewMsg((p) => ({ ...p, [e.target.name]: e.target.value }))
          }
          placeholder="Receiver ID"
        />
        <textarea
          name="content"
          value={newMsg.content}
          onChange={(e) =>
            setNewMsg((p) => ({ ...p, [e.target.name]: e.target.value }))
          }
          placeholder="Message"
        ></textarea>
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
};
export default MessageSection;
