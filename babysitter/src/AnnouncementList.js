import React, { useState, useEffect } from "react";
import "./AnnouncementList.css";

const AnnouncementList = ({ searchQuery }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`/api/announcements?search=${searchQuery}`);
        if (!response.ok) {
          throw new Error("Failed to fetch announcement data");
        }

        const data = await response.json();
        setAnnouncements(data);
        setLoading(false);
      } catch (error) {
        setError("Unable to load announcement data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [searchQuery]);

  if (loading) return <p className="loading">Loading announcements...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="announcement-list">
      <h2>List of Announcements</h2>
      <p>Search Query: {searchQuery}</p>
      <div className="announcement-cards">
        {announcements.length === 0 ? (
          <p>No announcements found</p>
        ) : (
          announcements.map((announcement) => (
            <div className="announcement-card" key={announcement.id}>
              <p><strong>Title:</strong> {announcement.title}</p>
              <p><strong>Description:</strong> {announcement.description}</p>
              <p><strong>Date:</strong> {announcement.date}</p>
              <p><strong>Location:</strong> {announcement.location}</p>
              <p><strong>Posted by:</strong> {announcement.parentName}</p>
              <p><strong>Children Age:</strong> {announcement.childrenAge}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
