import React, { useState, useEffect } from 'react';
import { useBranding } from '../hooks/useBranding';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import { CategoryCarousel } from '../components/ui/CategoryCarousel';
import { ProductList } from '../components/ui/ProductList';
import { tokens } from '../styles/tokens';

export function ClienteMenuDigital() {
  const { branding } = useBranding();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');

  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const loading = categoriesLoading || productsLoading;
  const error = categoriesError || productsError;

  if (loading) {
    return <div role="status">Loading menu...</div>;
  }

  if (error) {
    return <div role="alert">Error loading menu: {error}</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{
        padding: tokens.spacing.lg,
        backgroundColor: branding?.primaryColor || tokens.colors.primary,
        color: '#fff',
        textAlign: 'center',
      }}>
        {branding?.logoUrl && (
          <img src={branding.logoUrl} alt="Logo" style={{ maxHeight: '60px', marginBottom: tokens.spacing.sm }} />
        )}
        <h1 style={{ margin: 0 }}>{branding?.restaurantName || 'Menu'}</h1>
      </header>

      <main style={{ padding: tokens.spacing.lg }}>
        {categories.length === 0 ? (
          <div role="status">No categories available</div>
        ) : (
          <>
            <CategoryCarousel
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelect={setActiveCategoryId}
            />
            <ProductList
              products={products}
              categories={categories}
              activeCategoryId={activeCategoryId}
            />
          </>
        )}
      </main>
    </div>
  );
}