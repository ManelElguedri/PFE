// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // ← Doğru yol: src/api.js
import "./Signup.css";
import parentImage from "./assets/parent1.jpg";
import babysitterImage from "./assets/Babysitter2.jpg";

function Signup() {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isSmoker: "",
    educationLevel: "",
    babysittingPlace: "",
    babysittingFrequency: "",
    profilePicture: null,
    idCard: null,
    gender: "",
    numberOfChildren: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setError(""); // Rol seçildikten sonra önceki hatayı temizle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Önceki hataları temizle

    // FormData’a dönüştür
    const data = new FormData();
    data.append("role", role);
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== "") {
        data.append(key, val);
      }
    });

    try {
      await api.post("http://localhost:5000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Kayıt başarılı → SignIn sayfasına yönlendir
      navigate("/signin");
    } catch (err) {
      // Backend’den gelen mesaj varsa onu, yoksa genel bir hata
      const msg =
        err.response?.data?.message ||
        "Kayıt sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin.";
      setError(msg);
    }
  };

  return (
    <div className="signup-container">
      {!role ? (
        <div className="role-selection"style={{textAlign: "center"}}>
          <h2>Select Your Role</h2>
          <div
            className="role-option"
            onClick={() => handleRoleSelection("parent")}
          >
            <img src={parentImage} alt="Parent" />
            <p>I am a Parent</p>
          </div>
          <div
            className="role-option"
            onClick={() => handleRoleSelection("babysitter")}
          >
            <img src={babysitterImage} alt="Babysitter" />
            <p>I am a Babysitter</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>
            {role === "babysitter" ? "Babysitter Signup" : "Parent Signup"}
          </h2>

          {/* Ortak alanlar */}
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Babysitter’a özel alanlar */}
          {role === "babysitter" && (
            <>
              <div className="form-group">
                <label htmlFor="educationLevel">Education Level</label>
                <input
                  type="text"
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="isSmoker">Smoker</label>
                <select
                  id="isSmoker"
                  name="isSmoker"
                  value={formData.isSmoker}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="babysittingPlace">
                  Preferred Babysitting Location
                </label>
                <select
                  id="babysittingPlace"
                  name="babysittingPlace"
                  value={formData.babysittingPlace}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="atHome">At my home</option>
                  <option value="atFamily">At family’s home</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="babysittingFrequency">
                  Babysitting Frequency
                </label>
                <select
                  id="babysittingFrequency"
                  name="babysittingFrequency"
                  value={formData.babysittingFrequency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="occasional">Occasionally</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture">Upload Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="idCard">Upload ID Card</label>
                <input
                  type="file"
                  id="idCard"
                  name="idCard"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </>
          )}

          {/* Parent’a özel alanlar */}
          {role === "parent" && (
            <>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="numberOfChildren">Number of Children</label>
                <input
                  type="number"
                  id="numberOfChildren"
                  name="numberOfChildren"
                  value={formData.numberOfChildren}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture">Upload Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

export default Signup;
