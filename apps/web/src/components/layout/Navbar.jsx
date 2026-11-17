import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="bg-blue-600 px-2 py-0.5 rounded text-sm font-black">PERN</span>
          Monorepo
        </Link>
        <div className="hidden md:flex space-x-4 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </div>
      </div>
      <div>
        {user ? (
          <Button variant="secondary" onClick={logout} className="text-xs">Logout</Button>
        ) : (
          <Link to="/login">
            <Button variant="primary" className="text-xs">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
