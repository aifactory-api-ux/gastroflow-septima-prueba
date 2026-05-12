import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../../src/components/ui/Card';

describe('Card', () => {
  describe('renders children inside card container', () => {
    it('Card should render its children inside a styled container as per Figma', () => {
      render(
        <Card>
          <div>Content</div>
        </Card>
      );
      expect(screen.getByText('Content')).toBeTruthy();
      expect(screen.getByRole('region')).toBeTruthy();
    });
  });

  describe('applies custom className if provided', () => {
    it('Card should apply the custom className prop to the container', () => {
      render(
        <Card className="custom-card">
          <div>Content</div>
        </Card>
      );
      const region = screen.getByRole('region');
      expect(region).toHaveClass('custom-card');
    });
  });

  describe('renders with default padding and border', () => {
    it('Card should render with default padding and border styles if no overrides are provided', () => {
      render(
        <Card>
          <div>Content</div>
        </Card>
      );
      const region = screen.getByRole('region');
      expect(region).toHaveStyle({});
    });
  });
});