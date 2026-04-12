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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex gap-4 h-96">
        {/* Sidebar */}
        <aside className="w-80 bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">New Conversation</h3>
            <form onSubmit={handleStartThread} className="space-y-2">
              <input
                type="text"
                placeholder="Username"
                value={newThreadUser}
                onChange={(e) => setNewThreadUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <textarea
                placeholder="Start message"
                rows={2}
                value={newThreadMessage}
                onChange={(e) => setNewThreadMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm">
                Start
              </button>
            </form>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading && <p className="p-4 text-sm text-gray-500">Loading…</p>}
            {threads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => handleSelectThread(thread)}
                className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedThread?.id === thread.id ? 'bg-blue-50' : ''
                }`}
              >
                <p className="font-semibold text-gray-900 text-sm">{thread.partnerName || thread.title || 'Conversation'}</p>
                <p className="text-xs text-gray-600 truncate">{thread.lastMessage || 'No messages yet'}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat */}
        <section className="flex-1 bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col">
          {selectedThread ? (
            <>
              <div className="p-4 border-b border-gray-300">
                <h3 className="font-semibold text-gray-900">{selectedThread.partnerName || 'Conversation'}</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sentByMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sentByMe
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <small className="text-xs opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-300 space-y-2">
                <textarea
                  rows={2}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-lg font-semibold text-gray-900">Select a Conversation</p>
              <p className="text-sm text-gray-600">Pick a thread or start a new message.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
