import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./BabysittingAnnouncement.css";

const BabysittingAnnouncement = ({ selectedAnnouncement, onClose }) => {
  const babysittingLocations = {
    "Gabès": { location: [33.8811, 10.0984], city: "Gabès" },
    "Jendouba": { location: [36.5000, 8.7769], city: "Jendouba" },
    "Zaghouan": { location: [36.4046, 9.5007], city: "Zaghouan" }
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (!selectedAnnouncement) return <h2>Annonce non trouvée</h2>;

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
  });

  return (
    <div className="announcement-container">
      <button className="back-btn" onClick={onClose}>← Retour</button>

      <div className="announcement-header">
        <h2>{selectedAnnouncement.title}</h2>
        <p>{selectedAnnouncement.description}</p>
      </div>

      <div className="details-section">
        <h3>Détails</h3>
        <ul>
          <li><strong>Date:</strong> {selectedAnnouncement.date}</li>
          <li><strong>Heure:</strong> {selectedAnnouncement.time}</li>
          <li><strong>Durée:</strong> {selectedAnnouncement.duration}</li>
          <li><strong>Enfants:</strong> {selectedAnnouncement.children}</li>
          <li><strong>Lieu:</strong> {selectedAnnouncement.city}</li>
        </ul>
      </div>

      <div className="availability-section">
        <h3>Disponibilité</h3>
        <table className="availability-table">
          <thead>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map((day, index) => (
                <td key={index} className={selectedAnnouncement.availability.includes(day) ? "available-day" : ""}>
                  {selectedAnnouncement.availability.includes(day) ? "✔" : "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="map-section">
        <h3>Emplacement :</h3>
        <MapContainer center={babysittingLocations[selectedAnnouncement.city]?.location} zoom={12} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={babysittingLocations[selectedAnnouncement.city]?.location} icon={customIcon}>
            <Popup>
              L'annonce de babysitting se situe à {selectedAnnouncement.city}.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default BabysittingAnnouncement;

