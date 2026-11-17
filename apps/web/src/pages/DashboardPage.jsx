import React from 'react';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { StatsGrid } from '../features/dashboard/StatsGrid';
import { UserList } from '../features/users/UserList';

export function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="p-6 space-y-6">
          <StatsGrid />
          <UserList />
        </main>
      </div>
    </div>
  );
}
