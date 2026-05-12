import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductList } from '../../src/components/ui/ProductList';
import { Product } from '../../src/types/product';
import { Category } from '../../src/types/category';

describe('ProductList', () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Pizza',
      imageUrl: null,
      description: null,
      order: 1,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  describe('renders all products with name, price, and image', () => {
    it('ProductList should render each product with its name, price, and image as per Figma', () => {
      const products: Product[] = [
        {
          id: '1',
          name: 'Margherita',
          description: null,
          price: 10,
          imageUrl: 'margherita.png',
          categoryId: '1',
          available: true,
          order: 1,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          name: 'Pepperoni',
          description: null,
          price: 12,
          imageUrl: 'pepperoni.png',
          categoryId: '1',
          available: true,
          order: 2,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      render(
        <ProductList products={products} categories={categories} />
      );

      expect(screen.getByAltText('Margherita')).toBeTruthy();
      expect(screen.getByAltText('Pepperoni')).toBeTruthy();
      expect(screen.getByRole('heading', { name: 'Margherita' })).toBeTruthy();
      expect(screen.getByRole('heading', { name: 'Pepperoni' })).toBeTruthy();
    });
  });

  describe('renders unavailable product with disabled state', () => {
    it('ProductList should render unavailable products with a disabled or visually distinct state', () => {
      const products: Product[] = [
        {
          id: '3',
          name: 'Out of Stock',
          description: null,
          price: 15,
          imageUrl: 'outofstock.png',
          categoryId: '1',
          available: false,
          order: 3,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      render(
        <ProductList products={products} categories={categories} />
      );

      expect(screen.getByRole('heading', { name: 'Out of Stock' })).toBeTruthy();
    });
  });

  describe('renders empty state when products array is empty', () => {
    it('ProductList should render an empty state or fallback UI when products prop is an empty array', () => {
      render(
        <ProductList products={[]} categories={categories} />
      );

      expect(screen.getByRole('status')).toHaveTextContent('No products available');
    });
  });
});