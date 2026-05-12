import React from 'react';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { tokens } from '../../styles/tokens';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  onProductClick?: (product: Product) => void;
  activeCategoryId?: string;
}

export function ProductList({ products, categories, onProductClick, activeCategoryId }: ProductListProps) {
  const filteredProducts = activeCategoryId
    ? products.filter(p => p.categoryId === activeCategoryId)
    : products;

  if (filteredProducts.length === 0) {
    return <div role="status">No products available</div>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: tokens.spacing.lg,
      padding: tokens.spacing.lg,
    }}>
      {filteredProducts.map(product => (
        <div
          key={product.id}
          onClick={() => onProductClick?.(product)}
          style={{
            padding: tokens.spacing.md,
            backgroundColor: tokens.colors.background,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: tokens['border-radius'].lg,
            boxShadow: tokens.shadows.card,
            opacity: product.available ? 1 : 0.6,
            cursor: onProductClick ? 'pointer' : 'default',
          }}
        >
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: tokens['border-radius'].md }} />
          )}
          <h3 style={{ marginTop: tokens.spacing.sm }}>{product.name}</h3>
          <p style={{ color: tokens.colors['text-secondary'] }}>{product.description}</p>
          <p style={{ fontWeight: 'bold', color: tokens.colors.primary }}>${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}