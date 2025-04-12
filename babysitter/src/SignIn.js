import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "parent", // rôle par défaut
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Authentification fictive avec des comptes pour chaque rôle
    if (
      (formData.email === "parent@example.com" &&
        formData.password === "parent123" &&
        formData.role === "parent") ||
      (formData.email === "babysitter@example.com" &&
        formData.password === "babysitter123" &&
        formData.role === "babysitter") ||
      (formData.email === "admin@example.com" &&
        formData.password === "admin123" &&
        formData.role === "admin")
    ) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", formData.role);
      setError("");

      // Redirection en fonction du rôle
      if (formData.role === "parent") {
        navigate("/parent-page");
      } else if (formData.role === "babysitter") {
        navigate("/babysitter-page");
      } else if (formData.role === "admin") {
        navigate("/admin-dashboard"); // Redirection vers la page admin
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="parent">Parent</option>
            <option value="babysitter">Babysitter</option>
            <option value="admin">Admin</option> {/* Ajout du rôle Admin */}
          </select>
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="signin-btn">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;

