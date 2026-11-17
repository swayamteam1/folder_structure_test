import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Card } from '../../components/ui/Card';

export function StatsGrid() {
  const { data: stats, loading } = useFetch('/dashboard/stats');

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers ?? '...', sub: 'Registered in PostgreSQL' },
    { label: 'Active Users', value: stats?.activeUsers ?? '...', sub: 'Active accounts' },
    { label: 'Roles Defined', value: stats?.totalRoles ?? '...', sub: 'RBAC groups' },
    { label: 'System Health', value: stats?.systemHealth ?? '...', sub: 'Postgres & API pool' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cards.map((c, i) => (
        <Card key={i}>
          <p className="text-xs text-slate-500 font-medium">{c.label}</p>
          <p className="text-2xl font-bold text-slate-800 my-1">{loading ? '...' : c.value}</p>
          <p className="text-xs text-slate-400">{c.sub}</p>
        </Card>
      ))}
    </div>
  );
}
