import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="app-shell">
      <NavBar />
      <div className="content-grid">
        <main className="main-content">
          <Outlet />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}
