import React, { useState, useEffect } from "react";
import api from "./api";
import "./AvailabilitySection.css";

const AvailabilitySection = () => {
  const [availability, setAvailability] = useState([]);
  const [newAvail, setNewAvail] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAvail = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/babysitter/availability");
        setAvailability(res.data);
      } catch {
        setError("Availability yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchAvail();
  }, []);

  const handleChange = (e) =>
    setNewAvail((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addAvail = async () => {
    try {
      await api.post("/babysitter/availability", newAvail);
      const res = await api.get("/babysitter/availability");
      setAvailability(res.data);
      setNewAvail({ day: "", startTime: "", endTime: "" });
    } catch {
      setError("Ekleme başarısız oldu.");
    }
  };

  const deleteAvail = async (id) => {
    try {
      await api.delete(`/babysitter/availability/${id}`);
      setAvailability((a) => a.filter((x) => x._id !== id));
    } catch {
      setError("Silme başarısız oldu.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="availability-section">
      <h2>My Availability</h2>
      <button onClick={() => addAvail()}>Add Availability</button>
      <ul>
        {availability.map((av) => (
          <li key={av._id}>
            {av.day}: {av.startTime} - {av.endTime}{" "}
            <button onClick={() => deleteAvail(av._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AvailabilitySection;
