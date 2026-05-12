import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CTAButton } from '../../src/components/ui/CTAButton';

describe('CTAButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe('renders button with correct label and style', () => {
    it('CTAButton should render with the provided label and primary styling as per Figma', () => {
      render(
        <CTAButton onClick={mockOnClick} variant="primary">
          Save
        </CTAButton>
      );
      const button = screen.getByRole('button', { name: 'Save' });
      expect(button).toBeTruthy();
      expect(button).toHaveClass('cta-primary');
    });
  });

  describe('calls onClick handler when clicked', () => {
    it('CTAButton should call the provided onClick handler when the button is clicked', () => {
      render(
        <CTAButton onClick={mockOnClick}>
          Click Me
        </CTAButton>
      );
      fireEvent.click(screen.getByRole('button', { name: 'Click Me' }));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('renders disabled state when disabled prop is true', () => {
    it('CTAButton should render as disabled and not call onClick when disabled prop is true', () => {
      render(
        <CTAButton onClick={mockOnClick} disabled={true}>
          Disabled Button
        </CTAButton>
      );
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});