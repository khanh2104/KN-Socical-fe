import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="widget">
        <h3>Quick Actions</h3>
        <NavLink to="/profile/me" className="sidebar-link">
          My Profile
        </NavLink>
        <NavLink to="/friends" className="sidebar-link">
          Friend Requests
        </NavLink>
      </div>
      <div className="widget">
        <h3>Suggestions</h3>
        <p>Search for friends and follow people you know.</p>
      </div>
    </aside>
  );
}
