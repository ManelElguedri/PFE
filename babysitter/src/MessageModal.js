// MessageModal.js
import React from "react";
import "./MessageModal.css"; // Modal için stil dosyası
import MessageSection from "./MessageSection";

function MessageModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <MessageSection />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default MessageModal;
