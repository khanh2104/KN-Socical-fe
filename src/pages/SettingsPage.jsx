import React from 'react';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Account</h3>
        <p className="text-gray-600">Manage user preferences, change password, and update privacy settings.</p>
      </div>
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Notifications</h3>
        <p className="text-gray-600">Adjust push alerts, email notifications, and activity updates.</p>
      </div>
    </div>
  );
}
