import React, { useState } from 'react';
import "./MessageSection.css";
function MessageSection() {
  const [messages, setMessages] = useState([]);  // Liste des messages envoyés
  const [newMessage, setNewMessage] = useState("");  // Texte du nouveau message

  // Fonction pour gérer le changement dans le champ de saisie
  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (newMessage.trim()) {  // Vérifie que le message n'est pas vide
      setMessages([...messages, { sender: "You", text: newMessage }]);  // Ajoute le message du parent
      setNewMessage("");  // Vide le champ de saisie après envoi

      // Ajouter une réponse automatique du babysitter après l'envoi d'un message
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Babysitter", text: "Thank you for your message! I'll get back to you shortly." }
        ]);
      }, 1000); // Réponse après 1 seconde (simule un délai de réponse)
    }
  };

  return (
    <div className="message-section">
      <div className="message-container">
        {/* Affichage des messages envoyés */}
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>

      {/* Champ de saisie de message */}
      <textarea
        value={newMessage}
        onChange={handleMessageChange}
        placeholder="Type your message here..."
      />

      {/* Bouton pour envoyer le message */}
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default MessageSection;


