import React, { useState, useEffect } from 'react';
import './RequestList.css';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Simuler la récupération des demandes depuis un backend
  useEffect(() => {
    // Remplacer par un appel à l'API backend pour obtenir les demandes
    const fetchRequests = async () => {
      setLoading(true);
      try {
        // Exemple d'appel API
        const response = await fetch('https://api.example.com/requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Fonction pour filtrer les demandes selon la recherche
  const filteredRequests = requests.filter((request) =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Gérer l'action de traitement des demandes
  const handleAction = (action, requestId) => {
    console.log(`Action "${action}" sur la demande ${requestId}`);
    // Ajouter la logique de backend pour accepter, rejeter, etc.
  };

  return (
    <div className="request-list">
      <h2>Request List</h2>
      {/* Affichage du chargement */}
      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button onClick={() => handleAction('accept', request.id)} className="accept">
                    Accept
                  </button>
                  <button onClick={() => handleAction('reject', request.id)} className="reject">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestList;
