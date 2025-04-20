// src/components/DocumentList.jsx
import React, { useState, useEffect } from "react";
import api from "./api"; // axios.create({ baseURL: ... })
import "./DocumentList.css";

function DocumentList() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/documents");
        setDocs(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="document-list">
      <h2>Document List</h2>
      {docs.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <table className="document-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Uploaded At</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc._id}>
                <td>{doc._id}</td>
                <td>{doc.name}</td>
                <td>{doc.type}</td>
                <td>{new Date(doc.createdAt).toLocaleString()}</td>
                <td>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DocumentList;
