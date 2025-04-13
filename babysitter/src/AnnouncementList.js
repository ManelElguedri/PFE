import React, { useState, useEffect } from "react";
import "./AnnouncementList.css";

const AnnouncementList = ({ searchQuery }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        // Ağ gecikmesini simüle ediyoruz
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Dummy veriler
        const dummyData = [
          {
            id: 1,
            title: "New Policy Update",
            description:
              "We have updated our child care policy to reflect current standards and ensure best practices for safety and comfort.",
            date: "2023-09-01",
            location: "Sfax, Tunisia",
            parentName: "Ali Damok",
            childrenAge: "5-10 years",
          },
          {
            id: 2,
            title: "Scheduled Maintenance",
            description:
              "There will be scheduled maintenance in the system on 2023-09-05. Please plan accordingly.",
            date: "2023-09-05",
            location: "Tunis, Tunisia",
            parentName: "Rahma Guesmi",
            childrenAge: "3-8 years",
          },
          {
            id: 3,
            title: "Holiday Announcement",
            description:
              "Our holiday schedule has been updated. Enjoy your holidays and please check the calendar for updated timings.",
            date: "2023-09-10",
            location: "Kairouan, Tunisia",
            parentName: "Yasmin Treki",
            childrenAge: "6-12 years",
          },
        ];

        // Arama sorgusuna göre filtreleme: başlık, açıklama, lokasyon veya göndereni içeren duyurular
        const filteredData = dummyData.filter(
          (announcement) =>
            announcement.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            announcement.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            announcement.location
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            announcement.parentName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        setAnnouncements(filteredData);
      } catch (err) {
        setError("Unable to load announcement data. Please try again later.");
      } finally {
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
              <p>
                <strong>Title:</strong> {announcement.title}
              </p>
              <p>
                <strong>Description:</strong> {announcement.description}
              </p>
              <p>
                <strong>Date:</strong> {announcement.date}
              </p>
              <p>
                <strong>Location:</strong> {announcement.location}
              </p>
              <p>
                <strong>Posted by:</strong> {announcement.parentName}
              </p>
              <p>
                <strong>Children Age:</strong> {announcement.childrenAge}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
