import React, { useEffect } from "react";
import "./PaymentModal.css";

function PaymentModal({ isOpen, onClose, onPaymentSuccess }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose(); // Ferme la modal avec la touche ESC
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null; // Ne rien afficher si modal fermée

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Secure Payment</h2>

        {/* Logos des cartes */}
        <div className="card-logos">
          <img src="/visa.png" alt="Visa" className="card-logo" />
          <img src="/mastercard.png" alt="MasterCard" className="card-logo" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Payment successful!");
            onPaymentSuccess(); // Déclenche la réussite du paiement
          }}
        >
          <label>Cardholder Name</label>
          <input type="text" name="cardName" placeholder="John Doe" required />

          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />

          <div className="payment-row">
            <div>
              <label>Expiry Date</label>
              <input type="month" name="expiryDate" required />
            </div>
            <div>
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="***"
                maxLength="4"
                required
              />
            </div>
          </div>

          <label>Billing Address</label>
          <input
            type="text"
            name="billingAddress"
            placeholder="123 Main St, City, Country"
            required
          />

          <button type="submit" className="submit-button">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
