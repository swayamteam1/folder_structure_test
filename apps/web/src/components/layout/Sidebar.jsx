import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const links = [
    { label: 'Overview', path: '/dashboard' },
    { label: 'Users & Roles', path: '/dashboard/users' },
    { label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 bg-slate-800 text-slate-200 flex flex-col p-4 space-y-2 min-h-screen">
      <div className="text-xs font-semibold uppercase text-slate-400 px-3 py-2">Navigation</div>
      {links.map((link) => {
        const active = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              active ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
}
