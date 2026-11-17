import React from 'react';

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
