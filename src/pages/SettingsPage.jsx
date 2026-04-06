import React from 'react';

export default function SettingsPage() {
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="settings-card">
        <div>
          <h3>Account</h3>
          <p>Manage user preferences, change password, and update privacy settings.</p>
        </div>
      </div>
      <div className="settings-card">
        <div>
          <h3>Notifications</h3>
          <p>Adjust push alerts, email notifications, and activity updates.</p>
        </div>
      </div>
    </div>
  );
}
