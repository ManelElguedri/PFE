import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaClock, FaBell, FaEnvelope, FaBriefcase } from "react-icons/fa";
import "./BabysitterPage.css";
import BabysitterWelcome from "./BabysitterWelcome";
import BabysitterProfileSection from "./BabysitterProfileSection";
import AvailabilitySection from "./AvailabilitySection";
import BookingRequestsSection from "./BookingRequestsSection";
import JobApplicationsSection from "./JobApplicationsSection";
import MessageSection from "./MessageSection";
import NotificationSection from "./NotificationSection";

function BabysitterPage() {
  const [activeSection, setActiveSection] = useState("welcome");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="parent-container">
      <aside className="sidebar">
        
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
            <li className="menu-item" onClick={() => handleMenuClick("availability")}>
              <FaClock />
              <span>Availability</span>
            </li>
            <li className="menu-item" onClick={() => handleMenuClick("requests")}>
              <FaBell />
              <span>Booking Requests</span>
            </li>
            <li className="menu-item" onClick={() => handleMenuClick("applications")}>
              <FaBriefcase />
              <span>Applications</span>
            </li>
            <li className="menu-item" onClick={() => handleMenuClick("messages")}>
              <FaEnvelope />
              <span>Messages</span>
            </li>
            <li className="menu-item" onClick={() => handleMenuClick("notifications")}>
              <FaBell />
              <span>Notifications</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="greeting-container">
            <div className="greeting">
              Good Morning Babysitter
            </div>
          </div>
          <div className="header-icons">
            <div className="icon-wrapper notification-icon" onClick={() => handleMenuClick("notifications")}>
              <span className="dot"></span>
              <FaBell />
            </div>
            <div className="icon-wrapper" onClick={() => handleMenuClick("messages")}>
              <FaEnvelope />
            </div>
           </div>
        </header>

        <section className="section-content">
          {activeSection === "welcome" && <BabysitterWelcome />}
          {activeSection === "profile" && <BabysitterProfileSection />}
          {activeSection === "availability" && <AvailabilitySection />}
          {activeSection === "requests" && <BookingRequestsSection />}
          {activeSection === "applications" && <JobApplicationsSection />}
          {activeSection === "messages" && <MessageSection />}
          {activeSection === "notifications" && <NotificationSection />}
        </section>
      </main>
    </div>
  );
}

export default BabysitterPage;
