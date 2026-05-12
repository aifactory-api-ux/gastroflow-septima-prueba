import React, { useState } from 'react';
import { useBranding } from '../hooks/useBranding';
import { useCategories } from '../hooks/useCategories';
import { PrimaryNavigation } from '../components/ui/PrimaryNavigation';
import { AdminGestionCategorias } from './AdminGestionCategorias';
import { AdminGestionProductos } from './AdminGestionProductos';
import { AdminGestionMedios } from './AdminGestionMedios';
import { AdminIdentidadVisual } from './AdminIdentidadVisual';
import { tokens } from '../styles/tokens';

type Section = 'dashboard' | 'categories' | 'products' | 'media' | 'branding';

export function AdminDashboard() {
  const { branding, loading: brandingLoading } = useBranding();
  const { categories } = useCategories();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const { logout } = { logout: () => {} };

  const renderContent = () => {
    switch (activeSection) {
      case 'categories':
        return <AdminGestionCategorias />;
      case 'products':
        return <AdminGestionProductos />;
      case 'media':
        return <AdminGestionMedios />;
      case 'branding':
        return <AdminIdentidadVisual />;
      default:
        return (
          <div>
            <h2 style={{ marginBottom: tokens.spacing.lg }}>Dashboard</h2>
            {brandingLoading ? (
              <div role="status">Loading...</div>
            ) : branding ? (
              <div>
                <h1 style={{ color: tokens.colors.primary }}>{branding.restaurantName}</h1>
                <p>Manage your restaurant from the navigation above.</p>
              </div>
            ) : (
              <div role="alert">Error loading branding</div>
            )}
          </div>
        );
    }
  };

  return (
    <div>
      <PrimaryNavigation
        active={activeSection}
        onNavigate={(section) => setActiveSection(section as Section)}
        onLogout={logout}
      />
      <main style={{ padding: tokens.spacing.lg }}>
        {renderContent()}
      </main>
    </div>
  );
}