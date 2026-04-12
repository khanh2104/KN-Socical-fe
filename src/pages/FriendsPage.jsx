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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Friends</h2>
      {feedback && <p className="text-center text-red-500">{feedback}</p>}
      {loading && <p className="text-center text-gray-500">Loading your friends…</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <section className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Friends</h3>
        <form onSubmit={handleSearch} className="space-y-3">
          <input
            type="text"
            placeholder="Search by name or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
            Search
          </button>
        </form>
        {searchResults.length > 0 && (
          <div className="mt-4 space-y-3">
            {searchResults.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">{user.displayName || user.username}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => handleRequest(user.username)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Friend Requests</h3>
        {requests.length === 0 ? (
          <p className="text-gray-600">No pending requests.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <div key={request.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">{request.sender.displayName || request.sender.username}</p>
                  <p className="text-sm text-gray-600">{request.sender.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleResponse(request.id, true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleResponse(request.id, false)}
                    className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Friends</h3>
        {friends.length === 0 && !loading ? <p className="text-gray-600">No friends yet. Search to connect.</p> : null}
        <div className="space-y-3">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div>
                <p className="font-semibold text-gray-900">{friend.displayName || friend.username}</p>
                <p className="text-sm text-gray-600">{friend.email}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
