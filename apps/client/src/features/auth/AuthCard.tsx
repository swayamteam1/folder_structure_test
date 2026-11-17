import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/forms/InputField';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function AuthCard() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123456');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Card title="Sign in to your account" subtitle="Use PostgreSQL credentials">
      {error && <div className="p-3 mb-4 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </Card>
  );
}
