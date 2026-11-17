import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-800">PERN Monorepo Dashboard</h2>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-slate-600">{user?.name || 'Guest User'}</span>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
          {user?.name ? user.name[0] : 'U'}
        </div>
      </div>
    </header>
  );
}
