// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // doğru import
import "./SignIn.css";

function SignIn() {
  const [formData, setFormData] = useState({
    role: "parent", // selectbox’u koruyoruz
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // /auth/login endpoint’ine relative olarak istek atıyoruz
      const res = await api.post("http://localhost:5000/api/auth/login", {
        role: formData.role, // dilersen backend’de kullanabilirsin
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;
      // Token ve role’ü sakla
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);

      // Rol bazlı yönlendirme
      if (formData.role === "parent") {
        navigate("/parent-page");
      } else if (formData.role === "babysitter") {
        navigate("/babysitter-page");
      } else if (formData.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Giriş başarısız. Lütfen bilgilerinizi kontrol edin."
      );
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        {/* Role seçimi */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="parent">Parent</option>
            <option value="babysitter">Babysitter</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Hata Mesajı */}
        {error && <p className="error-message">{error}</p>}

        {/* Gönder Butonu */}
        <button type="submit" className="signin-btn">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
