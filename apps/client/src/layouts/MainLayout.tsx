import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/common/Footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
