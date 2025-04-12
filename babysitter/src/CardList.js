import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link bileşenini ekliyoruz
import "./Card.css";

function CardList() {
  const babysitters = [
    {
      name: "Aisha",
      location: "Sfax",
      image:
        "https://www.easyservicesolutions.com/wp-content/uploads/2013/05/baby-sitter-roma-italia.jpg",
      reviews: 5,
    },
    {
      name: "Fatima",
      location: "Tunis",
      image: "/babysitter00.jpg",
      reviews: 3,
    },
    {
      name: "Selma",
      location: "Sousse",
      image: "/babysitter01.jpg",
      reviews: 8,
    },
    {
      name: "Sara",
      location: "Sfax",
      image: "/babysitter02.jpg",
      reviews: 4,
    },
    {
      name: "Nour",
      location: "Bizerte",
      image: "/babysitter03.jpg",
      reviews: 6,
    },
    {
      name: "Mona",
      location: "Gabes",
      image: "/babysitter04.jpg",
      reviews: 7,
    },
    {
      name: "Lina",
      location: "Kairouan",
      image: "/babysitter05.jpg",
      reviews: 9,
    },
    {
      name: "Ranim",
      location: "Tunis",
      image: "/babysitter06.jpg",
      reviews: 10,
    },
    {
      name: "Rania",
      location: "Sousse",
      image: "/babysitter07.jpg",
      reviews: 2,
    },
    {
      name: "Noura",
      location: "Sfax",
      image: "/babysitter08.jpg",
      reviews: 4,
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (scrollIndex < babysitters.length - 8) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <div className="carousel-container">
        <div className="carousel">
          <button className="carousel-arrow left" onClick={handleScrollLeft}>
            ←
          </button>
          <div
            className="carousel-cards"
            style={{ transform: `translateX(-${scrollIndex * 280}px)` }}
          >
            {babysitters.slice(0, 10).map((babysitter, index) => (
              <div className="card" key={index}>
                {/* Link bileşenini ekliyoruz, her kartı tıklanabilir yapıyoruz */}
                <Link to={`/babysitter/${babysitter.name}`}>
                  <img
                    src={babysitter.image}
                    alt={babysitter.name}
                    className="card-image"
                  />
                  <div className="card-info">
                    <div className="card-name">{babysitter.name}</div>
                    <div className="card-location">{babysitter.location}</div>
                    <div className="card-reviews">
                      {babysitter.reviews} Reviews
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={handleScrollRight}>
            →
          </button>
        </div>
      </div>

      <button className="show-all-btn" onClick={toggleShowAll}>
        {showAll ? "View Less" : "View All"}
      </button>

      {showAll && (
        <div className="card-list">
          {babysitters.map((babysitter, index) => (
            <div className="card" key={index}>
              {/* Link bileşenini ekliyoruz, her kartı tıklanabilir yapıyoruz */}
              <Link to={`/babysitter/${babysitter.name}`}>
                <img
                  src={babysitter.image}
                  alt={babysitter.name}
                  className="card-image"
                />
                <div className="card-info">
                  <div className="card-name">{babysitter.name}</div>
                  <div className="card-location">{babysitter.location}</div>
                  <div className="card-reviews">
                    {babysitter.reviews} Reviews
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardList;
