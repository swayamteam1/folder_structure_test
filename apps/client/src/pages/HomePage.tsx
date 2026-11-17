import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function HomePage() {
  return (
    <MainLayout>
      <div className="py-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          PERN Monorepo Architecture
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          PostgreSQL <span className="text-blue-600 font-semibold">(pg)</span> + Express (TS) + React Vite (TSX) + Tailwind CSS + Node.js
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/dashboard">
            <Button variant="primary">Open Dashboard</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Card title="⚡ React + Vite + Tailwind (TSX)" subtitle="apps/client">
            Type-safe frontend with hot-reload, design tokens, reusable components, and Tailwind styling.
          </Card>
          <Card title="🐘 Express + PostgreSQL (TS)" subtitle="apps/server">
            Connection pooling via <code className="text-xs bg-slate-100 p-1 rounded font-mono">pg.Pool</code>, relational schema, JWT auth, and typed controllers.
          </Card>
          <Card title="📦 Monorepo Workspace (TS)" subtitle="packages/*">
            Shared packages for validation, common constants, TypeScript types, and centralized ESLint & Prettier.
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
