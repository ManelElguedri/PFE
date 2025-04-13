import React, { useState } from "react";
import "./AvailabilityModal.css"; // Modal stil dosyasını oluşturabilirsin

function AvailabilityModal({ onClose }) {
  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    // Diğer günler...
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada müsaitlik bilgilerini kaydet (örneğin, context, global state veya backend API)
    // ve profil sayfasında bu bilgileri gösterecek şekilde yönet.
    alert("Availability updated!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Set Your Availability</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="checkbox"
                name="monday"
                checked={availability.monday}
                onChange={handleChange}
              />
              Monday
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="tuesday"
                checked={availability.tuesday}
                onChange={handleChange}
              />
              Tuesday
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="tuesday"
                checked={availability.tuesday}
                onChange={handleChange}
              />
              Wednesday
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="tuesday"
                checked={availability.tuesday}
                onChange={handleChange}
              />
              Thursday
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="tuesday"
                checked={availability.tuesday}
                onChange={handleChange}
              />
              Friday
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="tuesday"
                checked={availability.tuesday}
                onChange={handleChange}
              />
              Saturday
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="tuesday"
                checked={availability.tuesday}
                onChange={handleChange}
              />
              Sunday
            </label>
          </div>
          {/* Diğer günler için benzer inputlar */}
          <button type="submit" className="btn">
            Save Availability
          </button>
          <button type="button" className="btn cancel" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AvailabilityModal;
