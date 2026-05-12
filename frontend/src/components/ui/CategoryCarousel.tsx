import React from 'react';
import { Category } from '../../types/category';
import { tokens } from '../../styles/tokens';

interface CategoryCarouselProps {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
}

export function CategoryCarousel({ categories, activeCategoryId, onSelect }: CategoryCarouselProps) {
  if (categories.length === 0) {
    return <div role="status">No categories available</div>;
  }

  return (
    <div style={{
      display: 'flex',
      gap: tokens.spacing.md,
      overflowX: 'auto',
      padding: tokens.spacing.md,
    }}>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            padding: tokens.spacing.md,
            backgroundColor: activeCategoryId === category.id ? tokens.colors.primary : tokens.colors.surface,
            color: activeCategoryId === category.id ? '#fff' : tokens.colors['text-primary'],
            border: 'none',
            borderRadius: tokens['border-radius'].lg,
            cursor: 'pointer',
            minWidth: '120px',
          }}
        >
          {category.imageUrl && (
            <img src={category.imageUrl} alt={category.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
          )}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}