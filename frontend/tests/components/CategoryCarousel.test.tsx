import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryCarousel } from '../../src/components/ui/CategoryCarousel';
import { Category } from '../../src/types/category';

describe('CategoryCarousel', () => {
  const mockOnSelect = jest.fn();
  const categories: Category[] = [
    {
      id: '1',
      name: 'Pizza',
      imageUrl: 'pizza.png',
      description: null,
      order: 1,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Pasta',
      imageUrl: 'pasta.png',
      description: null,
      order: 2,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe('renders all categories as carousel items', () => {
    it('CategoryCarousel should render each category as a carousel item with name and image', () => {
      render(
        <CategoryCarousel
          categories={categories}
          activeCategoryId=""
          onSelect={mockOnSelect}
        />
      );
      expect(screen.getByAltText('Pizza')).toBeTruthy();
      expect(screen.getByAltText('Pasta')).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Pizza' })).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Pasta' })).toBeTruthy();
    });
  });

  describe('calls onSelectCategory with category id when item clicked', () => {
    it('CategoryCarousel should call onSelectCategory with the correct category id when a category is clicked', () => {
      render(
        <CategoryCarousel
          categories={categories}
          activeCategoryId=""
          onSelect={mockOnSelect}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Pizza' }));
      expect(mockOnSelect).toHaveBeenCalledWith('1');
    });
  });

  describe('renders empty state when categories array is empty', () => {
    it('CategoryCarousel should render an empty state or fallback UI when categories prop is an empty array', () => {
      render(
        <CategoryCarousel
          categories={[]}
          activeCategoryId=""
          onSelect={mockOnSelect}
        />
      );
      expect(screen.getByRole('status')).toHaveTextContent('No categories available');
    });
  });
});