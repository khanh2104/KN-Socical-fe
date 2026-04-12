import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfile, fetchCurrentUser, updateProfile } from '../api/users';

export default function ProfilePage() {
  const { username } = useParams();
  const isMe = !username || username === 'me';
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: '', bio: '', avatarUrl: '' });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const user = isMe ? await fetchCurrentUser() : await fetchProfile(username);
        setProfile(user);
        setForm({ displayName: user.displayName || '', bio: user.bio || '', avatarUrl: user.avatarUrl || '' });
      } catch (err) {
        setFeedback('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [username, isMe]);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updated = await updateProfile(form);
      setProfile(updated);
      setEditing(false);
      setFeedback('Profile updated successfully.');
    } catch (err) {
      setFeedback('Unable to update profile.');
    }
  };

  if (loading) {
    return <p>Loading profile…</p>;
  }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-gray-300 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
            <span className="text-white text-4xl font-bold">{profile.displayName?.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.displayName || profile.username}</h2>
            <p className="text-gray-600 mb-3">{profile.bio || 'No bio yet.'}</p>
            <div className="flex space-x-4 text-sm mb-4">
              <span className="text-gray-600"><strong>{profile.friendCount || 0}</strong> Friends</span>
              <span className="text-gray-600"><strong>{profile.postCount || 0}</strong> Posts</span>
            </div>
            {isMe && (
              <button
                onClick={() => setEditing((current) => !current)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            )}
          </div>
        </div>
      </section>

      {feedback && <p className="text-red-500 text-center">{feedback}</p>}

      {editing && (
        <section className="bg-white border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Display Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.displayName}
                onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Bio</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Avatar URL</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.avatarUrl}
                onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
              Save Changes
            </button>
          </form>
        </section>
      )}

      <section className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-gray-600">Recent posts and interaction history will appear here.</p>
      </section>
    </div>
  );
}
