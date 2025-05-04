// src/components/AvailabilitySection.jsx

import React, { useState, useEffect } from "react";
import api from "./api"; // axios instance’ınız, interceptor’ı burada tanımlı
import "./AvailabilitySection.css";

function AvailabilitySection() {
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ day: "", startTime: "", endTime: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mevcut müsaitlikleri çek
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await api.get("/availability");
        setSlots(res.data);
      } catch (err) {
        console.error("Error fetching availability:", err);
        setError("Failed to load availability.");
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, []);

  // Form alanlarını güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Yeni slot ekle
  const handleAdd = async () => {
    const { day, startTime, endTime } = form;
    if (!day || !startTime || !endTime) {
      setError("All fields are required");
      return;
    }
    try {
      const res = await api.post("/availability", form);
      setSlots((prev) => [...prev, res.data]);
      setForm({ day: "", startTime: "", endTime: "" });
      setError("");
    } catch (err) {
      console.error("Error adding slot:", err);
      setError(err.response?.data?.message || "Failed to add slot");
    }
  };

  return (
    <div className="availability-container">
      <h2>Your Availability</h2>

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="form-row">
            <input
              name="day"
              type="text"
              placeholder="Day (e.g. Monday)"
              value={form.day}
              onChange={handleChange}
            />
            <input
              name="startTime"
              type="time"
              value={form.startTime}
              onChange={handleChange}
            />
            <input
              name="endTime"
              type="time"
              value={form.endTime}
              onChange={handleChange}
            />
            <button onClick={handleAdd}>Add Availability</button>
          </div>

          <ul className="slots-list">
            {slots.map((s) => (
              <li key={s._id}>
                {s.day}: {s.startTime} – {s.endTime}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AvailabilitySection;
