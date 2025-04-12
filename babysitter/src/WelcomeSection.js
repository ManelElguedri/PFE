import React from "react";
import AnnouncementsImage1 from "./assets/b1.jpg";
import AnnouncementsImage2 from "./assets/b2.jpg";
import AnnouncementsImage3 from "./assets/b3.jpg";
import AnnouncementsImage4 from "./assets/b4.jpg";
import "./WelcomeSection.css";

const babysitters = [
  { 
    id: 1, 
    name: "Emna Ouni", 
    image: AnnouncementsImage1, 
    description: "Hi! I'm Emna from Tunis, an experienced babysitter with over 5 years of childcare experience. I love organizing fun and educational activities for kids!" 
  },
  { 
    id: 2, 
    name: "Sinda Sassi", 
    image: AnnouncementsImage2, 
    description: "Hello! I'm Sinda from Sfax, a psychology student passionate about child development. I'm gentle and patient, perfect for toddlers!" 
  },
  { 
    id: 3, 
    name: "Mirlen Ali", 
    image: AnnouncementsImage3, 
    description: "Hey there! I'm Mirlen from Sousse, a bilingual babysitter who enjoys sharing my language skills with kids. I offer interactive and educational games!" 
  },
  { 
    id: 4, 
    name: "Layla Ibrahim", 
    image: AnnouncementsImage4, 
    description: "Hi! I'm Layla from Nabeul, with a background in early childhood education. I love creating a safe and fun environment for kids!" 
  },
];

const WelcomeSection = ({ onSelectBabysitter }) => {
  return (
    <div className="welcome-container">
      <h2> Babysitters available :</h2>
      <div className="babysitter-list">
        {babysitters.map((babysitter) => (
          <div
            key={babysitter.id}
            className="babysitter-card"
            onClick={() => onSelectBabysitter(babysitter)}
          >
            <img src={babysitter.image} alt={babysitter.name} className="babysitter-image" />
            <div className="babysitter-info">
              <h3>{babysitter.name}</h3>
              <p>{babysitter.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeSection;





