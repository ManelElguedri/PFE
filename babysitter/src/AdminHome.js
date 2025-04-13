import React, { useState, useEffect } from "react";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Gerçek API henüz olmadığı için mock veriyi tanımlıyoruz.
  const mockAdminData = {
    name: "Mariem Guesmi",
    email: "mariem.guesmi@admincorp.com",
    role: "Super Administrator",
    department: "IT & Operations",
    phone: "+216-123-45-67",
    address: "Sfax, Tunisia",
    joinedDate: "2022-01-15",
    bio: "Alice has been the backbone of AdminCorp’s IT strategy, overseeing major projects and ensuring smooth operations. She is committed to innovation, operational excellence, and high standards of service.",
    profilePicture: "/avataradmin.png", // Yer tutucu profil resmi
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Ağ gecikmesini simüle ediyoruz.
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAdmin(mockAdminData);
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
      <h2>Admin Dashboard</h2>
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={admin.profilePicture}
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
          <p>
            <strong>Department:</strong> {admin.department}
          </p>
          <p>
            <strong>Phone:</strong> {admin.phone}
          </p>
          <p>
            <strong>Address:</strong> {admin.address}
          </p>
          <p>
            <strong>Joined Date:</strong> {admin.joinedDate}
          </p>
          <p>
            <strong>Bio:</strong> {admin.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
