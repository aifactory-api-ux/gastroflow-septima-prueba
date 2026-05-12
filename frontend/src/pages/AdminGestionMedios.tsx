import React, { useState } from 'react';
import { ImageUpload } from '../components/ui/ImageUpload';
import { CTAButton } from '../components/ui/CTAButton';
import { tokens } from '../styles/tokens';

interface MediaItem {
  url: string;
}

export function AdminGestionMedios() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (url: string | null) => {
    if (url) {
      setMedia(prev => [...prev, { url }]);
      setError(null);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: tokens.spacing.lg }}>Media Management</h2>

      {error && <div role="alert" style={{ color: tokens.colors.error, marginBottom: tokens.spacing.md }}>{error}</div>}

      <div style={{ marginBottom: tokens.spacing.xl }}>
        <ImageUpload value={null} onChange={handleImageUpload} />
      </div>

      <h3 style={{ marginBottom: tokens.spacing.md }}>Uploaded Media</h3>
      {media.length === 0 ? (
        <div role="status">No media uploaded yet</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: tokens.spacing.md }}>
          {media.map((item, index) => (
            <div key={index} style={{ border: `1px solid ${tokens.colors.border}`, borderRadius: tokens['border-radius'].md, padding: tokens.spacing.sm }}>
              <img src={item.url} alt={`Media ${index + 1}`} style={{ width: '100%', borderRadius: tokens['border-radius'].md }} />
              <p style={{ marginTop: tokens.spacing.xs, fontSize: tokens.typography.small, wordBreak: 'break-all' }}>{item.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}