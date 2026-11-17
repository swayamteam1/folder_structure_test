import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 text-center p-4">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <p className="text-slate-600 mt-2 mb-6">The requested page does not exist.</p>
      <Link to="/"><Button>Back to Home</Button></Link>
    </div>
  );
}
