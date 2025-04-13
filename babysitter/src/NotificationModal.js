// NotificationModal.js
import React from "react";
import "./NotificationModal.css"; // Modal için stil dosyası
import NotificationSection from "./NotificationSection";

function NotificationModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <NotificationSection />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default NotificationModal;
