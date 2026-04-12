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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          onClick={handleMarkAllRead}
        >
          Mark All as Read
        </button>
      </div>
      {loading && <p className="text-center text-gray-500">Loading notifications…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {notifications.length === 0 && !loading ? <p className="text-center text-gray-500">No notifications yet.</p> : null}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 ${
              notification.read
                ? 'bg-gray-50 border-gray-300'
                : 'bg-blue-50 border-blue-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-600 mt-1">{notification.message || notification.description}</p>
              </div>
              <small className="text-xs text-gray-500 ml-4">
                {new Date(notification.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
