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
    <div className="profile-page">
      <section className="profile-card">
        <div className="profile-avatar">{profile.displayName?.charAt(0)}</div>
        <div className="profile-summary">
          <h2>{profile.displayName || profile.username}</h2>
          <p>{profile.bio || 'No bio yet.'}</p>
          <div className="profile-meta">
            <span>Friends: {profile.friendCount || 0}</span>
            <span>Posts: {profile.postCount || 0}</span>
          </div>
          {isMe && (
            <button className="primary-button" onClick={() => setEditing((current) => !current)}>
              {editing ? 'Cancel' : 'Edit profile'}
            </button>
          )}
        </div>
      </section>

      {feedback && <p className="form-error">{feedback}</p>}

      {editing && (
        <section className="settings-card profile-edit-form">
          <h3>Edit profile</h3>
          <form onSubmit={handleSave}>
            <label>
              Display name
              <input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            </label>
            <label>
              Bio
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} />
            </label>
            <label>
              Avatar URL
              <input value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} />
            </label>
            <button type="submit" className="primary-button">
              Save changes
            </button>
          </form>
        </section>
      )}

      <section className="profile-activity">
        <h3>Recent activity</h3>
        <p>Recent posts and interaction history will appear here.</p>
      </section>
    </div>
  );
}
