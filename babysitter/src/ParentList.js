import React, { useState, useEffect } from "react";
import "./ParentList.css";

const ParentList = ({ searchQuery }) => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        setLoading(true);
        // Ağ gecikmesini simüle ediyoruz.
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Dummy veriler
        const dummyData = [
          {
            id: 1,
            firstname: "Ali",
            lastname: "Damok",
            email: "ali.damok@example.com",
            address: "Sfax, Tunisia",
            numberofchildren: 2,
            gender: "Male",
             // Bu alan dummy veri içinde olsa da, listelemede kullanılmayacak.
          },
          {
            id: 2,
            firstname: "Rahma",
            lastname: "Guesmi",
            email: "rahma.guesmi@example.com",
            address: "Tunis, Tunisia",
            numberofchildren: 1,
            gender: "Female",
            
          },
          {
            id: 3,
            firstname: "Yasmin",
            lastname: "Treki",
            email: "yasmin.treki@example.com",
            address: "Kairouan, Tunisia",
            numberofchildren: 3,
            gender: "Female",
            
          },
        ];

        // Arama sorgusuna göre filtreleme: (isim, soyisim veya adres alanında arama yapar)
        const filteredData = dummyData.filter(
          (parent) =>
            parent.firstname
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            parent.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            parent.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setParents(filteredData);
      } catch (error) {
        setError("Unable to load parent data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, [searchQuery]);

  if (loading) return <p className="loading">Loading parent data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="parent-list">
      <h2>Parent List</h2>
      <p>Search Query: {searchQuery}</p>
      <div className="parent-cards">
        {parents.length === 0 ? (
          <p>No parents found</p>
        ) : (
          parents.map((parent) => (
            <div className="parent-card" key={parent.id}>
              <p>
                <strong>FirstName:</strong> {parent.firstname}
              </p>
              <p>
                <strong>LastName:</strong> {parent.lastname}
              </p>
              <p>
                <strong>Email:</strong> {parent.email}
              </p>
              <p>
                <strong>Address:</strong> {parent.address}
              </p>
              <p>
                <strong>Number of Children:</strong> {parent.numberofchildren}
              </p>
              <p>
                <strong>Gender:</strong> {parent.gender}
              </p>
              {/* Telefon numarası listelemeye dahil edilmedi */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParentList;
