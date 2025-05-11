// src/pages/ParentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBell,
  FaEnvelope,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import "./ParentPage.css";
import MessageSection from "./MessageSection";
import NotificationSection from "./NotificationSection";
import ProfileParent from "./ProfileParent";
import AnnoucementSection from "./AnnoucementSection";
import WelcomeSection from "./WelcomeSection";
import BabysitterProfile from "./BabysitterProfile";
import CandidatureResponses from "./CandidatureResponses";
import BabysitterList from "./BabysitterList";

function ParentPage() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [selectedBabysitter, setSelectedBabysitter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setSelectedBabysitter(null);
  };

  return (
    <div className="parent-container">
      <aside className="sidebar">
        <div className="logo-container">
          <video src="/logo1.mp4" className="logo-video" autoPlay loop muted />
        </div>
        <nav>
          <ul className="menu">
            <li className="menu-item" onClick={() => handleMenuClick("welcome")}>
              <FaHome />
              <span>Welcome</span>
            </li>
            <li className="menu-item" onClick={() => handleMenuClick("profile")}>
              <FaUser />
              <span>My profile</span>
            </li>
            <li
              className="menu-item"
              onClick={() => handleMenuClick("findBabysitter")}
            >
              <FaSearch />
              <span>Find Babysitter</span>
            </li>
            <li
              className="menu-item"
              onClick={() => handleMenuClick("announcements")}
            >
              <FaUsers />
              <span>Announcements</span>
            </li>
            <li
              className="menu-item"
              onClick={() => handleMenuClick("notifications")}
            >
              <FaBell />
              <span>Notifications</span>
            </li>
            <li
              className="menu-item"
              onClick={() => handleMenuClick("messages")}
            >
              <FaEnvelope />
              <span>Messages</span>
            </li>
            <li
              className="menu-item"
              onClick={() => handleMenuClick("candidatures")}
            >
              <FaUsers />
              <span>Applications</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="greeting">
            Good Morning Parent <span className="user-name"></span>
          </div>
        </header>

        <section className="section-content">
          {selectedBabysitter ? (
            <BabysitterProfile
              selectedBabysitter={selectedBabysitter}
              onClose={() => setSelectedBabysitter(null)}
            />
          ) : (
            <>
              {activeSection === "welcome" && (
                <WelcomeSection onSelectBabysitter={setSelectedBabysitter} />
              )}
              {activeSection === "profile" && <ProfileParent />}
              {activeSection === "messages" && <MessageSection />}
              {activeSection === "notifications" && <NotificationSection />}
              {activeSection === "announcements" && <AnnoucementSection />}
              {activeSection === "candidatures" && <CandidatureResponses />}
              {activeSection === "findBabysitter" && (
                <BabysitterList onSelectBabysitter={setSelectedBabysitter} />
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default ParentPage;
