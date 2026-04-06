import React, { useEffect, useState } from 'react';
import { fetchNotifications, markAllRead } from '../api/notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError('Unable to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    } catch (err) {
      setError('Unable to mark notifications as read.');
    }
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h2>Notifications</h2>
        <button className="primary-button" onClick={handleMarkAllRead}>
          Mark all as read
        </button>
      </div>
      {loading && <p>Loading notifications…</p>}
      {error && <p className="form-error">{error}</p>}
      {notifications.length === 0 && !loading ? <p>No notifications yet.</p> : null}
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification-card ${notification.read ? 'notification-read' : ''}`}>
            <div>
              <strong>{notification.title}</strong>
              <p>{notification.message || notification.description}</p>
            </div>
            <small>{new Date(notification.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
