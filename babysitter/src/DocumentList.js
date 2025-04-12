import React, { useState, useEffect } from "react";
import "./DocumentList.css";

const DocumentList = ({ searchQuery }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer la liste des documents depuis le backend
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/documents?search=${searchQuery}`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(); // Re-fetch documents when the search query changes
  }, [searchQuery]);

  const handleDownload = (documentId) => {
    // Implémentation pour télécharger un document
    window.location.href = `/api/documents/download/${documentId}`;
  };

  const handleDelete = async (documentId) => {
    // Implémentation pour supprimer un document
    const confirmDelete = window.confirm("Are you sure you want to delete this document?");
    if (confirmDelete) {
      try {
        await fetch(`/api/documents/${documentId}`, { method: "DELETE" });
        // Refetch documents after deletion
        fetchDocuments();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  if (loading) return <p>Loading documents...</p>;

  return (
    <div className="document-list">
      <h2>Document List</h2>
      {documents.length === 0 ? (
        <p>No documents found</p>
      ) : (
        <ul>
          {documents.map((document) => (
            <li key={document.id} className="document-item">
              <span className="document-name">{document.name}</span>
              <button onClick={() => handleDownload(document.id)} className="download-btn">
                Download
              </button>
              <button onClick={() => handleDelete(document.id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
