import React from 'react';
import { tokens } from '../../styles/tokens';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
}

export function CTAButton({ children, onClick, variant = 'primary', disabled, loading, type = 'button' }: CTAButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cta-${variant}`}
      style={{
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        backgroundColor: isPrimary ? tokens.colors.primary : 'transparent',
        color: isPrimary ? '#fff' : tokens.colors.primary,
        border: isPrimary ? 'none' : `2px solid ${tokens.colors.primary}`,
        borderRadius: tokens['border-radius'].md,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontWeight: 'bold',
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}