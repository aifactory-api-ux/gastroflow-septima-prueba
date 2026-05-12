import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';
import { useMediaUpload } from '../../hooks/useMediaUpload';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
}

export function ImageUpload({ value, onChange, label = 'Image', disabled, error }: ImageUploadProps) {
  const { uploadImage, uploading, uploadError } = useMediaUpload();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setLocalError('Only image files are allowed');
      return;
    }

    try {
      const url = await uploadImage(file);
      onChange(url);
      setLocalError(null);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
      <label style={{ fontWeight: 'bold', color: tokens.colors['text-primary'] }}>{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        onClick={() => document.querySelector('input[type="file"]')?.click()}
        disabled={disabled || uploading}
        style={{
          padding: tokens.spacing.sm,
          backgroundColor: tokens.colors.primary,
          color: '#fff',
          border: 'none',
          borderRadius: tokens['border-radius'].md,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {value && <img src={value} alt="preview" style={{ maxWidth: '200px', borderRadius: tokens['border-radius'].md }} />}
      {(error || localError || uploadError) && (
        <span role="alert" style={{ color: tokens.colors.error, fontSize: tokens.typography.small }}>
          {error || localError || uploadError}
        </span>
      )}
    </div>
  );
}