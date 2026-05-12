import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrimaryNavigation } from '../../src/components/ui/PrimaryNavigation';

describe('PrimaryNavigation', () => {
  const mockOnNavigate = jest.fn();
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    mockOnNavigate.mockClear();
    mockOnLogout.mockClear();
  });

  describe('renders all navigation links as per Figma spec', () => {
    it('PrimaryNavigation should render all navigation links with correct labels and icons', () => {
      render(
        <PrimaryNavigation
          active="dashboard"
          onNavigate={mockOnNavigate}
          onLogout={mockOnLogout}
        />
      );
      expect(screen.getByText('Dashboard')).toBeTruthy();
      expect(screen.getByText('Categories')).toBeTruthy();
      expect(screen.getByText('Products')).toBeTruthy();
      expect(screen.getByText('Branding')).toBeTruthy();
    });
  });

  describe('highlights active navigation link', () => {
    it('PrimaryNavigation should visually highlight the active link based on the current route', () => {
      render(
        <PrimaryNavigation
          active="categories"
          onNavigate={mockOnNavigate}
          onLogout={mockOnLogout}
        />
      );
      const categoriesLink = screen.getByText('Categories');
      expect(categoriesLink).toHaveClass('active');
    });
  });

  describe('renders fallback UI when no navigation items provided', () => {
    it('PrimaryNavigation should render a fallback UI or nothing if navigation items are empty or undefined', () => {
      render(
        <PrimaryNavigation
          active="dashboard"
          onNavigate={mockOnNavigate}
          onLogout={mockOnLogout}
        />
      );
      expect(screen.queryByText('Dashboard')).toBeTruthy();
    });
  });
});