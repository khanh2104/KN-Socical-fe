import React, { useEffect, useState } from 'react';
import { fetchFriends, fetchFriendRequests, sendFriendRequest, respondFriendRequest } from '../api/friends';
import { searchUsers } from '../api/users';

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [friendList, requestList] = await Promise.all([fetchFriends(), fetchFriendRequests()]);
      setFriends(friendList);
      setRequests(requestList);
    } catch (err) {
      setError('Unable to load friend data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      const users = await searchUsers(searchTerm);
      setSearchResults(users);
      setFeedback(null);
    } catch (err) {
      setFeedback('Search failed.');
    }
  };

  const handleRequest = async (username) => {
    try {
      await sendFriendRequest(username);
      setFeedback(`Friend request sent to ${username}.`);
    } catch (err) {
      setFeedback('Unable to send friend request.');
    }
  };

  const handleResponse = async (requestId, accept) => {
    try {
      await respondFriendRequest(requestId, accept);
      await loadData();
    } catch (err) {
      setFeedback('Unable to update request.');
    }
  };

  return (
    <div className="friends-page">
      <h2>Friends</h2>
      {feedback && <p className="form-error">{feedback}</p>}
      {loading && <p>Loading your friends…</p>}
      {error && <p className="form-error">{error}</p>}

      <section className="settings-card">
        <h3>Find friends</h3>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by name or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="primary-button">
            Search
          </button>
        </form>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((user) => (
              <div key={user.id} className="friend-card">
                <div>
                  <strong>{user.displayName || user.username}</strong>
                  <span>{user.email}</span>
                </div>
                <button className="primary-button" onClick={() => handleRequest(user.username)}>
                  Add friend
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="settings-card">
        <h3>Friend requests</h3>
        {requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="friend-card">
              <div>
                <strong>{request.sender.displayName || request.sender.username}</strong>
                <span>{request.sender.email}</span>
              </div>
              <div className="friend-actions">
                <button onClick={() => handleResponse(request.id, true)} className="primary-button">
                  Accept
                </button>
                <button onClick={() => handleResponse(request.id, false)} className="logout-button">
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="friends-list">
        <h3>Your friends</h3>
        {friends.length === 0 && !loading ? <p>No friends yet. Search to connect.</p> : null}
        <div className="friend-list">
          {friends.map((friend) => (
            <div key={friend.id} className="friend-card">
              <strong>{friend.displayName || friend.username}</strong>
              <span>{friend.email}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
