import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="p-4 space-y-4">
      <div className="widget">
        <h3 className="font-semibold mb-2">Your Pages</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">P</span>
            </div>
            <span>KN Social Page</span>
          </div>
        </div>
      </div>
      <div className="widget">
        <h3 className="font-semibold mb-2">Contacts</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">J</span>
            </div>
            <span>John Doe</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">A</span>
            </div>
            <span>Alice Smith</span>
          </div>
        </div>
      </div>
      <div className="widget">
        <h3 className="font-semibold mb-2">Sponsored</h3>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm">Ad content here</p>
        </div>
      </div>
    </aside>
  );
}
