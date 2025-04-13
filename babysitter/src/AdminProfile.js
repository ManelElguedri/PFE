import React, { useState, useEffect } from "react";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Gerçek API olmadığı için, ağ gecikmesini simüle ediyoruz.
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Daha detaylı admin verileri içeren mock data:
        const mockData = {
          name: "Alice Johnson",
          email: "alice.johnson@admincorp.com",
          role: "Super Administrator",
          department: "IT & Operations",
          phone: "+216-24-467-123",
          address: "123 Admin Street, Admin City, AC 45678",
          joinedDate: "2022-01-15",
          bio: "Alice has been the backbone of AdminCorp’s IT strategy, overseeing major projects and ensuring smooth operations. She is committed to innovation, operational excellence, and high standards of service.",
        };
        setAdmin(mockData);
      } catch (err) {
        setError(err.message || "An unknown error occurred.");
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
      <h2>Admin Profile</h2>
      <div className="profile-card">
        <p>
          <strong>Name:</strong> {admin.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {admin.email || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {admin.role || "Admin"}
        </p>
        <p>
          <strong>Department:</strong> {admin.department || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {admin.phone || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {admin.address || "N/A"}
        </p>
        <p>
          <strong>Joined Date:</strong> {admin.joinedDate || "N/A"}
        </p>
        <p>
          <strong>Bio:</strong> {admin.bio || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
