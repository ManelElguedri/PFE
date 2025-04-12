import React, { useState } from "react";
import "./AnnoucementSection.css";

const AnnoucementSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [childrenCount, setChildrenCount] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, childrenCount, image });
    alert("Announcement published!");
    setShowForm(false); // Close the form after publishing
  };

  return (
    <div className="announcement-container">
      <form className="announcement-form" onSubmit={handleSubmit}>
        <label>Announcement Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Number of Children:</label>
        <input
          type="number"
          value={childrenCount}
          onChange={(e) => setChildrenCount(e.target.value)}
          required
        />

        <label>Image:</label>
        <input type="file" onChange={handleImageChange} required />

        <button type="submit" className="submit-btn">
          Publish Announcement
        </button>

        <button type="button" className="close-btn" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AnnoucementSection;

