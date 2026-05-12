import React from 'react';
import { useBranding } from '../hooks/useBranding';
import { InputField } from '../components/ui/InputField';
import { CTAButton } from '../components/ui/CTAButton';
import { tokens } from '../styles/tokens';

export function AdminIdentidadVisual() {
  const { branding, loading, error, updateBranding } = useBranding();
  const [restaurantName, setRestaurantName] = React.useState(branding?.restaurantName || '');
  const [logoUrl, setLogoUrl] = React.useState(branding?.logoUrl || '');
  const [primaryColor, setPrimaryColor] = React.useState(branding?.primaryColor || '');

  React.useEffect(() => {
    if (branding) {
      setRestaurantName(branding.restaurantName);
      setLogoUrl(branding.logoUrl || '');
      setPrimaryColor(branding.primaryColor);
    }
  }, [branding]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName) return;
    try {
      await updateBranding({ restaurantName, logoUrl: logoUrl || undefined, primaryColor });
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: tokens.spacing.lg }}>Branding</h2>

      {error && <div role="alert" style={{ color: tokens.colors.error, marginBottom: tokens.spacing.md }}>{error}</div>}
      {loading && <div role="status">Loading...</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <InputField label="Restaurant Name" value={restaurantName} onChange={setRestaurantName} />
        <div style={{ marginTop: tokens.spacing.md }}>
          <InputField label="Logo URL" value={logoUrl} onChange={setLogoUrl} placeholder="https://example.com/logo.png" />
        </div>
        <div style={{ marginTop: tokens.spacing.md }}>
          <InputField label="Primary Color (HEX)" value={primaryColor} onChange={setPrimaryColor} placeholder="#E67E22" />
        </div>
        <div style={{ marginTop: tokens.spacing.lg }}>
          <CTAButton type="submit" disabled={loading} loading={loading}>
            Save
          </CTAButton>
        </div>
      </form>
    </div>
  );
}