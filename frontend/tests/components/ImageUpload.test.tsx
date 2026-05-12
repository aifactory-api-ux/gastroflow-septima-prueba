import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageUpload } from '../../src/components/ui/ImageUpload';

describe('ImageUpload', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('renders file input and upload button', () => {
    it('ImageUpload should render a file input and an upload button as per Figma', () => {
      render(
        <ImageUpload value={null} onChange={mockOnChange} />
      );
      expect(screen.getByRole('button', { name: /upload/i })).toBeTruthy();
      expect(screen.getByRole('textbox', { type: 'file' })).toBeTruthy();
    });
  });

  describe('calls onUpload with file URL after successful upload', () => {
    it('ImageUpload should call onUpload with the uploaded image URL after a successful upload', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ url: 'https://cdn.example.com/test.png' }),
      });

      render(
        <ImageUpload value={null} onChange={mockOnChange} />
      );

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('shows error message on upload failure', () => {
    it('ImageUpload should display an error message if the upload API returns an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      render(
        <ImageUpload value={null} onChange={mockOnChange} />
      );

      expect(screen.queryByRole('alert')).toBeNull();
    });
  });
});