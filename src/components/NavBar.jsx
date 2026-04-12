import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white h-14 flex items-center justify-between px-4 fixed top-0 w-full z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <div className="text-2xl font-bold mr-4">facebook</div>
      </div>
      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Search Facebook"
          className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      {/* Right: Icons */}
      <div className="flex items-center space-x-2">
        <NavLink to="/" className="p-2 rounded-full hover:bg-blue-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-6 6A1 1 0 004 9v8a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1V9a1 1 0 00-.293-.707l-6-6z"/>
          </svg>
        </NavLink>
        <NavLink to="/friends" className="p-2 rounded-full hover:bg-blue-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </NavLink>
        <NavLink to="/messages" className="p-2 rounded-full hover:bg-blue-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
          </svg>
        </NavLink>
        <NavLink to="/notifications" className="p-2 rounded-full hover:bg-blue-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </NavLink>
        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-blue-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
