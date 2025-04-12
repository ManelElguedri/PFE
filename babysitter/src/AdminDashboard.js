import React, { useState } from "react";
import "./AdminDashboard.css";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaList,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

import AdminHome from "./AdminHome";
import AdminProfile from "./AdminProfile";
import ParentList from "./ParentList";
import BabysitterList from "./BabysitterList";
import AnnouncementList from "./AnnouncementList";
import ApplicationList from "./ApplicationList";
import RequestList from "./RequestList";  // Import du composant RequestList
import DocumentList from "./DocumentList";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <AdminHome />;
      case "profile":
        return <AdminProfile />;
      case "parents":
        return <ParentList searchQuery={searchQuery} />;
      case "babysitters":
        return <BabysitterList searchQuery={searchQuery} />;
      case "announcements":
        return <AnnouncementList searchQuery={searchQuery} />;
      case "applications":
        return <ApplicationList />;
      case "requests":
        return <RequestList />;  // Afficher RequestList ici
      case "documents":
        return <DocumentList />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin</h2>
        <ul>
          <li onClick={() => setActiveSection("home")}>
            <FaHome /> <span>Home</span>
          </li>
          <li onClick={() => setActiveSection("profile")}>
            <FaUser /> <span>Profile</span>
          </li>
          <li onClick={() => setActiveSection("parents")}>
            <FaUsers /> <span>Parent List</span>
          </li>
          <li onClick={() => setActiveSection("babysitters")}>
            <FaUsers /> <span>Babysitter List</span>
          </li>
          <li onClick={() => setActiveSection("announcements")}>
            <FaList /> <span>Announcement List</span>
          </li>
          <li onClick={() => setActiveSection("applications")}>
            <FaClipboardList /> <span>Application List</span>
          </li>
          <li onClick={() => setActiveSection("requests")}>
            <FaClipboardList /> <span>Request List</span> {/* Lien vers RequestList */}
          </li>
          <li onClick={() => setActiveSection("documents")}>
            <FaFileAlt /> <span>Document List</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Barre de recherche */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Section affichée */}
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;


