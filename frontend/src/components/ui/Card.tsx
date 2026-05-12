import React from 'react';
import { tokens } from '../../styles/tokens';

interface CardProps {
  children: React.ReactNode;
  imageUrl?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Card({ children, imageUrl, title, description, actions, className }: CardProps) {
  return (
    <div
      role="region"
      className={className}
      style={{
        padding: tokens.spacing.md,
        backgroundColor: tokens.colors.background,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens['border-radius'].lg,
        boxShadow: tokens.shadows.card,
      }}
    >
      {imageUrl && (
        <img src={imageUrl} alt={title || 'image'} style={{ width: '100%', borderRadius: tokens['border-radius'].md }} />
      )}
      {title && <h3 style={{ marginTop: tokens.spacing.sm }}>{title}</h3>}
      {description && <p style={{ color: tokens.colors['text-secondary'] }}>{description}</p>}
      {children}
      {actions && <div style={{ marginTop: tokens.spacing.md }}>{actions}</div>}
    </div>
  );
}