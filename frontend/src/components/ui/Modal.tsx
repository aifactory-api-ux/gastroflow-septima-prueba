import React from 'react';
import { tokens } from '../../styles/tokens';

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export function Modal({ open, title, children, onClose, onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel', loading }: ModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{
        backgroundColor: tokens.colors.background,
        borderRadius: tokens['border-radius'].lg,
        padding: tokens.spacing.lg,
        maxWidth: '500px',
        width: '90%',
        boxShadow: tokens.shadows.modal,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.md }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
            X
          </button>
        </div>
        <div style={{ marginBottom: tokens.spacing.md }}>{children}</div>
        <div style={{ display: 'flex', gap: tokens.spacing.sm, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              backgroundColor: 'transparent',
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens['border-radius'].md,
              cursor: 'pointer',
            }}
          >
            {cancelLabel}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              disabled={loading}
              style={{
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                backgroundColor: tokens.colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: tokens['border-radius'].md,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Loading...' : confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}