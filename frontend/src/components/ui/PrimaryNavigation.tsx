import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { tokens } from '../../styles/tokens';

interface PrimaryNavigationProps {
  active: 'dashboard' | 'categories' | 'products' | 'media' | 'branding';
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

export function PrimaryNavigation({ active, onNavigate, onLogout }: PrimaryNavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'categories', label: 'Categories' },
    { id: 'products', label: 'Products' },
    { id: 'media', label: 'Media' },
    { id: 'branding', label: 'Branding' },
  ];

  return (
    <nav style={{
      display: 'flex',
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.surface,
      borderBottom: `1px solid ${tokens.colors.border}`,
    }}>
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
            backgroundColor: active === item.id ? tokens.colors.primary : 'transparent',
            color: active === item.id ? '#fff' : tokens.colors['text-primary'],
            border: 'none',
            borderRadius: tokens['border-radius'].md,
            cursor: 'pointer',
            fontWeight: active === item.id ? 'bold' : 'normal',
          }}
        >
          {item.label}
        </button>
      ))}
      <button
        onClick={onLogout}
        style={{
          marginLeft: 'auto',
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
          backgroundColor: 'transparent',
          color: tokens.colors.error,
          border: `1px solid ${tokens.colors.error}`,
          borderRadius: tokens['border-radius'].md,
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
}