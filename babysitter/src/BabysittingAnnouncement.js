import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./BabysittingAnnouncement.css";

// Dummy data: babysitting duyuruları
const DUMMY_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Weekend Babysitting",
    description: "Looking for a reliable babysitter for Saturday evening.",
    date: "2023-09-16",
    time: "18:00",
    duration: "4 hours",
    children: "2 kids",
    city: "Gabès",
    availability: ["Saturday", "Sunday"],
  },
  {
    id: 2,
    title: "Weekday Morning Care",
    description: "Need help with morning routines on weekdays.",
    date: "2023-09-18",
    time: "07:30",
    duration: "2 hours",
    children: "1 child",
    city: "Jendouba",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: 3,
    title: "Afternoon Playtime",
    description: "Looking for someone to play and tutor after school.",
    date: "2023-09-20",
    time: "15:00",
    duration: "3 hours",
    children: "3 kids",
    city: "Zaghouan",
    availability: ["Monday", "Wednesday", "Friday"],
  },
];

// Konum sözlüğü
const LOCATIONS = {
  Gabès: [33.8811, 10.0984],
  Jendouba: [36.5, 8.7769],
  Zaghouan: [36.4046, 9.5007],
};

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

export default function BabysittingAnnouncementsPage() {
  const [selected, setSelected] = useState(null);

  // Geri dönme işlevi
  const handleBack = () => setSelected(null);

  // Eğer bir duyuru seçilmişse detay görünümü, aksi halde liste
  if (selected) {
    const a = selected;
    return (
      <div className="announcement-container">
        <button className="back-btn" onClick={handleBack}>
          ← Retour
        </button>
        <div className="announcement-header">
          <h2>{a.title}</h2>
          <p>{a.description}</p>
        </div>
        <div className="details-section">
          <h3>Details</h3>
          <ul>
            <li>
              <strong>Date:</strong> {a.date}
            </li>
            <li>
              <strong>Hour:</strong> {a.time}
            </li>
            <li>
              <strong>Duration:</strong> {a.duration}
            </li>
            <li>
              <strong>Kids:</strong> {a.children}
            </li>
            <li>
              <strong>Place:</strong> {a.city}
            </li>
          </ul>
        </div>
        <div className="availability-section">
          <h3>Disponibility</h3>
          <table className="availability-table">
            <thead>
              <tr>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <th key={d}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((d) => (
                  <td
                    key={d}
                    className={
                      a.availability.includes(d) ? "available-day" : ""
                    }
                  >
                    {a.availability.includes(d) ? "✔" : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="map-section">
          <h3>Place :</h3>
          <MapContainer
            center={LOCATIONS[a.city] || [0, 0]}
            zoom={12}
            className="map-container"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={LOCATIONS[a.city] || [0, 0]} icon={customIcon}>
              <Popup>Babysitting à {a.city}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
  }

  // Liste görünümü
  return (
    <div className="list-container">
      <h2>Available Babysitting Announcements</h2>
      <div className="card-grid">
        {DUMMY_ANNOUNCEMENTS.map((a) => (
          <div
            key={a.id}
            className="announcement-card"
            onClick={() => setSelected(a)}
          >
            <h3>{a.title}</h3>
            <p>
              {a.date} — {a.time}
            </p>
            <p>{a.children}</p>
            <p>
              <em>{a.city}</em>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
