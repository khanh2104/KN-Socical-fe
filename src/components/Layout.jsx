import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-60 fixed left-0 top-14 h-full bg-white border-r border-gray-300 overflow-y-auto">
          <div className="p-4">
            <div className="space-y-2">
              <a href="/" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">H</span>
                </div>
                <span>Home</span>
              </a>
              <a href="/friends" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">F</span>
                </div>
                <span>Friends</span>
              </a>
              <a href="/messages" className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <span>Messages</span>
              </a>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="ml-60 mr-80 flex-1 p-4">
          <Outlet />
        </div>
        {/* Right Sidebar */}
        <div className="w-80 fixed right-0 top-14 h-full bg-white border-l border-gray-300 overflow-y-auto">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
