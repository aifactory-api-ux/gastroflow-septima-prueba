import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '../../src/components/ui/InputField';

describe('InputField', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('renders input with label and placeholder', () => {
    it('InputField should render with the provided label and placeholder text', () => {
      render(
        <InputField
          label="Email"
          value=""
          onChange={mockOnChange}
          placeholder="Enter your email"
        />
      );
      expect(screen.getByLabelText('Email')).toBeTruthy();
      expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
    });
  });

  describe('shows validation error message when error prop is set', () => {
    it('InputField should display the error message when the error prop is provided', () => {
      render(
        <InputField
          label="Email"
          value=""
          onChange={mockOnChange}
          error="Email is required"
        />
      );
      expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
    });
  });

  describe('renders as disabled when disabled prop is true', () => {
    it('InputField should render as disabled when the disabled prop is true', () => {
      render(
        <InputField
          label="Email"
          value=""
          onChange={mockOnChange}
          disabled={true}
        />
      );
      expect(screen.getByLabelText('Email')).toBeDisabled();
    });
  });
});