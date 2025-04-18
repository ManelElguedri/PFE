// src/pages/AdminProfile.jsx
import React, { useState, useEffect } from "react";
import api from "./api"; // axios instance with baseURL
import "./AdminProfile.css";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        // Token’ı Authorization header’da gönder
        const token = localStorage.getItem("token");
        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Backend’den dönen kullanıcı nesnesini ata
        // Eğer res.data.user varsa, ona göre ayarla:
        const userData = res.data.user || res.data;
        setAdmin(userData);
      } catch (err) {
        console.error("Admin profile fetch error:", err);
        setError(
          err.response?.data?.message ||
            "Profil bilgileri yüklenirken bir hata oluştu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="admin-profile">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-profile error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-profile">
      <h2>Admin Dashboard</h2>
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={admin.profilePicture || "/avataradmin.png"}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-basic-info">
            <h3>{admin.name}</h3>
            <p className="role">{admin.role}</p>
          </div>
        </div>
        <div className="profile-details">
          <p>
            <strong>Email:</strong> {admin.email}
          </p>
          {admin.department && (
            <p>
              <strong>Department:</strong> {admin.department}
            </p>
          )}
          {admin.phone && (
            <p>
              <strong>Phone:</strong> {admin.phone}
            </p>
          )}
          {admin.address && (
            <p>
              <strong>Address:</strong> {admin.address}
            </p>
          )}
          {admin.joinedDate && (
            <p>
              <strong>Joined Date:</strong> {admin.joinedDate}
            </p>
          )}
          {admin.bio && (
            <p>
              <strong>Bio:</strong> {admin.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
