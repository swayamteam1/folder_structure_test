import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Card } from '../../components/ui/Card';
import type { User } from '../../types';

export function UserList() {
  const { data: users, loading, error } = useFetch<User[]>('/users');

  if (loading) return <div className="text-slate-500 text-sm">Loading users from PostgreSQL...</div>;
  if (error) return <div className="text-red-500 text-sm">Failed to load users: {error}</div>;

  return (
    <Card title="System Users" subtitle="Managed via PostgreSQL pg driver">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Roles</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map((u) => (
              <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 font-mono text-xs">{u.id}</td>
                <td className="py-2 font-medium">{u.name}</td>
                <td className="py-2 text-slate-600">{u.email}</td>
                <td className="py-2">
                  <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 font-semibold">
                    {Array.isArray(u.roles) ? u.roles.join(', ') : 'user'}
                  </span>
                </td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
