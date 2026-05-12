import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { InputField } from '../components/ui/InputField';
import { CTAButton } from '../components/ui/CTAButton';
import { tokens } from '../styles/tokens';

export function AdminLogin() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.surface,
    }}>
      <form onSubmit={handleSubmit} style={{
        padding: tokens.spacing.xl,
        backgroundColor: tokens.colors.background,
        borderRadius: tokens['border-radius'].lg,
        boxShadow: tokens.shadows.elevated,
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ marginBottom: tokens.spacing.lg, textAlign: 'center' }}>Admin Login</h1>

        {error && (
          <div role="alert" style={{
            padding: tokens.spacing.sm,
            marginBottom: tokens.spacing.md,
            backgroundColor: tokens.colors.error,
            color: '#fff',
            borderRadius: tokens['border-radius'].md,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: tokens.spacing.md }}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            error={emailError || undefined}
            name="email"
          />
        </div>

        <div style={{ marginBottom: tokens.spacing.lg }}>
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            error={passwordError || undefined}
            name="password"
          />
        </div>

        <CTAButton type="submit" disabled={loading} loading={loading}>
          Login
        </CTAButton>
      </form>
    </div>
  );
}