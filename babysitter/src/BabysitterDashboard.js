// BabysitterDashboard.js
import React from "react";
import "./BabysitterDashboard.css";

const BabysitterDashboard = () => {
  // Örnek veriler; normalde bunları API'den veya global state'ten çekebilirsiniz.
  const babysitterProfile = {
    name: "Mariem Guesmi",
    profilePicture: "/profilebabysitter.jpg", // Yer tutucu resim URL'si
    bio: "Experienced and caring babysitter with over 5 years in child care. Passionate about creating a safe and fun environment.",
    rating: 4.8,
  };

  // Ebeveyn verilerini kart formatında güncelledik:
  const workingParents = [
    {
      id: 1,
      name: "Manel Gedri",
      profilePicture: "/parent1.jpg",
      bio: "Loves outdoor activities and is looking for a caring babysitter for his energetic son, Tom.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      profilePicture: "/parent2.jpg",
      bio: "Busy professional needing someone trustworthy to care for her daughter, Emily.",
    },
    {
      id: 3,
      name: "Yasmin Bouzid",
      profilePicture: "/parent3.jpg",
      bio: "Looking for a reliable babysitter for his son, Alex.",
    },
  ];

  const availabilityDays = ["Monday", "Wednesday", "Friday", "Saturday"];

  return (
    <div className="dashboard-container">
      <h1>Babysitter Dashboard</h1>

      {/* Profil Bilgileri Bölümü */}
      <div className="dashboard-section profile-info">
        <h2>Profile Information</h2>
        <div className="profile-details">
          <img
            src={babysitterProfile.profilePicture}
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-text">
            <h3>{babysitterProfile.name}</h3>
            <p>{babysitterProfile.bio}</p>
            <p>Rating: {babysitterProfile.rating}</p>
          </div>
        </div>
      </div>

      {/* Working Parents Bölümü Kart biçiminde */}
      <div className="dashboard-section working-parents">
        <h2>Working Parents</h2>
        <div className="parent-cards">
          {workingParents.map((parent) => (
            <div className="parent-card" key={parent.id}>
              <img
                src={parent.profilePicture}
                alt={parent.name}
                className="parent-img"
              />
              <h4>{parent.name}</h4>
              <p>{parent.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Müsaitlik Bilgileri Bölümü */}
      <div className="dashboard-section availability">
        <h2>Availability</h2>
        <ul>
          {availabilityDays.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BabysitterDashboard;
