import React from "react";
import "./Auth.css";

const AuthForm = ({ title, children, onSubmit }) => (
  <div className="auth-form-container">
    <h2>{title}</h2>
    <form onSubmit={onSubmit} className="auth-form">
      {children}
    </form>
  </div>
);

export default AuthForm;
