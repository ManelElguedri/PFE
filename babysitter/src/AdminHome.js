import React, { useState, useEffect } from "react";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/admin/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch admin profile.");
        }
        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="admin-profile"><p>Loading profile...</p></div>;
  }

  if (error) {
    return <div className="admin-profile error"><p>{error}</p></div>;
  }

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {admin?.name || "N/A"}</p>
        <p><strong>Email:</strong> {admin?.email || "N/A"}</p>
        <p><strong>Role:</strong> {admin?.role || "Admin"}</p>
      </div>
    </div>
  );
};

export default AdminProfile;


