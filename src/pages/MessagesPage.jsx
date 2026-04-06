import React, { useEffect, useState } from 'react';
import { fetchThreads, fetchThread, sendMessage, startThread } from '../api/messages';

export default function MessagesPage() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [newThreadUser, setNewThreadUser] = useState('');
  const [newThreadMessage, setNewThreadMessage] = useState('');

  const loadThreads = async () => {
    try {
      setLoading(true);
      const data = await fetchThreads();
      setThreads(data);
      if (data.length > 0) {
        setSelectedThread(data[0]);
      }
    } catch (err) {
      setError('Unable to load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadThreads();
  }, []);

  useEffect(() => {
    const loadSelectedThread = async () => {
      if (!selectedThread) {
        setMessages([]);
        return;
      }
      try {
        const data = await fetchThread(selectedThread.id);
        setMessages(data.messages || []);
      } catch (err) {
        setError('Unable to load thread.');
      }
    };
    loadSelectedThread();
  }, [selectedThread]);

  const handleSelectThread = (thread) => {
    setSelectedThread(thread);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedThread) return;
    try {
      await sendMessage(selectedThread.id, newMessage);
      setNewMessage('');
      const data = await fetchThread(selectedThread.id);
      setMessages(data.messages || []);
    } catch (err) {
      setError('Unable to send message.');
    }
  };

  const handleStartThread = async (event) => {
    event.preventDefault();
    if (!newThreadUser.trim() || !newThreadMessage.trim()) return;
    try {
      await startThread(newThreadUser, newThreadMessage);
      setNewThreadUser('');
      setNewThreadMessage('');
      await loadThreads();
    } catch (err) {
      setError('Unable to start new conversation.');
    }
  };

  return (
    <div className="messages-page">
      <div className="page-header">
        <h2>Messages</h2>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="message-grid">
        <aside className="message-sidebar">
          <div className="settings-card">
            <h3>New conversation</h3>
            <form onSubmit={handleStartThread} className="search-form">
              <input
                type="text"
                placeholder="Username"
                value={newThreadUser}
                onChange={(e) => setNewThreadUser(e.target.value)}
              />
              <textarea
                placeholder="Start message"
                rows={3}
                value={newThreadMessage}
                onChange={(e) => setNewThreadMessage(e.target.value)}
              />
              <button className="primary-button" type="submit">
                Start
              </button>
            </form>
          </div>
          <div className="message-list">
            {loading && <p>Loading conversations…</p>}
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`message-card ${selectedThread?.id === thread.id ? 'message-active' : ''}`}
                onClick={() => handleSelectThread(thread)}
              >
                <strong>{thread.partnerName || thread.title || 'Conversation'}</strong>
                <span>{thread.lastMessage || 'No messages yet'}</span>
                <small>{thread.updatedAt ? new Date(thread.updatedAt).toLocaleString() : ''}</small>
              </div>
            ))}
          </div>
        </aside>
        <section className="message-preview">
          {selectedThread ? (
            <>
              <h3>{selectedThread.partnerName || 'Conversation'}</h3>
              <div className="thread-messages">
                {messages.map((message) => (
                  <div key={message.id} className={`message-bubble ${message.sentByMe ? 'message-outgoing' : 'message-incoming'}`}>
                    <p>{message.content}</p>
                    <small>{new Date(message.createdAt).toLocaleString()}</small>
                  </div>
                ))}
              </div>
              <div className="message-write">
                <textarea
                  rows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write a message..."
                />
                <button className="primary-button" onClick={handleSend}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="message-empty">
              <h3>Select a conversation</h3>
              <p>Pick a thread or start a new message.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
