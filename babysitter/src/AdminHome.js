// src/pages/AdminHome.jsx
import React, { useState, useEffect } from "react";
import api from "./api"; // axios instance with baseURL
import "./AdminHome.css";

const AdminHome = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // API'den dönen user objesini ata
        setAdmin(res.data.user);
      } catch (err) {
        console.error("AdminHome fetch error:", err);
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
      <div className="admin-home">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-home error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-home">
      <h2>Admin Dashboard</h2>
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={admin.profilePicture || "/avataradmin.png"}
            alt="Admin Profile"
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

export default AdminHome;
