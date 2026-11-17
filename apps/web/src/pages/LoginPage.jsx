import React from 'react';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthCard } from '../features/auth/AuthCard';

export function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard />
    </AuthLayout>
  );
}
