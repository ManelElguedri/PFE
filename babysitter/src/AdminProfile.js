import React, { useEffect, useState } from "react";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Remplacer l'URL par celle de ton API
        const response = await fetch("/api/admin/profile");
        
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError("Unable to load profile data. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="loading">Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Account Created:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AdminProfile;




