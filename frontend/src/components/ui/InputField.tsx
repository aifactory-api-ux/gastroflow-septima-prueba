import React from 'react';
import { tokens } from '../../styles/tokens';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
}

export function InputField({ label, value, onChange, type = 'text', error, disabled, placeholder, name }: InputFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
      <label style={{ fontWeight: 'bold', color: tokens.colors['text-primary'] }}>{label}</label>
      <input
        type={type}
        name={name}
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          padding: tokens.spacing.sm,
          border: `1px solid ${error ? tokens.colors.error : tokens.colors.border}`,
          borderRadius: tokens['border-radius'].md,
          fontSize: '16px',
        }}
      />
      {error && (
        <span role="alert" style={{ color: tokens.colors.error, fontSize: tokens.typography.small }}>
          {error}
        </span>
      )}
    </div>
  );
}