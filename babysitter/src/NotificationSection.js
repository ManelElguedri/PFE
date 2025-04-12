import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationSection.css";

const NotificationSection = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token"); // Assure-toi que le token est bien stocké
        const response = await axios.get("http://localhost:5000/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notification-section">
      <table className="notification-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Notification</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <tr key={notification.id || index}>
                <td>{index + 1}</td>
                <td>{notification.message}</td>
                <td>{new Date(notification.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No notifications available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationSection;

;
