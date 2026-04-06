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
    <header className="navbar">
      <div className="navbar-left">
        <span className="brand">KN Social</span>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Feed
        </NavLink>
        <NavLink to="/friends" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Friends
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Messages
        </NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/notifications" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Notifications
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Settings
        </NavLink>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}
