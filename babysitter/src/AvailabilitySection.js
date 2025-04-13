import React, { useState, useEffect } from "react";
import "./AvailabilitySection.css";

function AvailabilitySection() {
  const [availability, setAvailability] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch("/api/babysitter/availability", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Sunucu yanıtında hata var mı kontrol edin
        if (!response.ok) {
          // Yanıt JSON formatında değilse veya hata mesajı içeriyorsa text olarak loglayın
          const errorText = await response.text();
          console.error("Fetch error:", response.status, errorText);
          setIsLoading(false);
          return;
        }

        // Eğer yanıt sorunsuzsa JSON olarak ayrıştırın
        const data = await response.json();
        setAvailability(data);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability((prevAvailability) => ({
      ...prevAvailability,
      [name]: value,
    }));
  };

  const handleAddAvailability = async () => {
    const response = await fetch("/api/babysitter/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newAvailability),
    });

    if (response.ok) {
      alert("Availability added successfully");
      const updatedAvailability = await response.json();
      setAvailability(updatedAvailability);
      setNewAvailability({ day: "", startTime: "", endTime: "" });
      setIsEditing(false);
    } else {
      alert("Failed to add availability");
    }
  };

  const handleDeleteAvailability = async (id) => {
    const response = await fetch(`/api/babysitter/availability/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Availability deleted successfully");
      setAvailability(availability.filter((avail) => avail._id !== id));
    } else {
      alert("Failed to delete availability");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="availability-section">
      <h2>My Availability</h2>
      {isEditing ? (
        <div className="availability-form">
          <div className="form-group">
            <label htmlFor="day">Day:</label>
            <select
              id="day"
              name="day"
              value={newAvailability.day}
              onChange={handleChange}
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={newAvailability.startTime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={newAvailability.endTime}
              onChange={handleChange}
            />
          </div>
          <button className="save-button" onClick={handleAddAvailability}>
            Save Availability
          </button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {availability.length === 0 ? (
            <p>You have not added any availability yet.</p>
          ) : (
            <div className="availability-list">
              {availability.map((avail) => (
                <div key={avail._id} className="availability-item">
                  <p>
                    <strong>{avail.day}</strong>: {avail.startTime} -{" "}
                    {avail.endTime}
                  </p>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteAvailability(avail._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Add Availability
          </button>
        </div>
      )}
    </div>
  );
}

export default AvailabilitySection;
