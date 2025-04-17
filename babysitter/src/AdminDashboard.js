// src/pages/AdminDashboard.jsx
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
import RequestList from "./RequestList";
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
        return <RequestList />;
      case "documents":
        return <DocumentList />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="logo">Admin</h2>
        <ul>
          <li onClick={() => setActiveSection("home")}>
            <FaHome /> Home
          </li>
          <li onClick={() => setActiveSection("profile")}>
            <FaUser /> Profile
          </li>
          <li onClick={() => setActiveSection("parents")}>
            <FaUsers /> Parent List
          </li>
          <li onClick={() => setActiveSection("babysitters")}>
            <FaUsers /> Babysitter List
          </li>
          <li onClick={() => setActiveSection("announcements")}>
            <FaList /> Announcement List
          </li>
          <li onClick={() => setActiveSection("applications")}>
            <FaClipboardList /> Application List
          </li>
          <li onClick={() => setActiveSection("requests")}>
            <FaClipboardList /> Request List
          </li>
          <li onClick={() => setActiveSection("documents")}>
            <FaFileAlt /> Document List
          </li>
        </ul>
      </aside>
      <div className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
