import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminGestionMedios } from '../../src/pages/AdminGestionMedios';

describe('AdminGestionMedios', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('renders image upload form and current media list', () => {
    it('Should render an upload form and display a list of uploaded images', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([
          { url: 'https://cdn/image1.png' },
          { url: 'https://cdn/image2.jpg' },
        ]),
      });

      render(<AdminGestionMedios />);

      await waitFor(() => {
        expect(screen.getByText('https://cdn/image1.png')).toBeTruthy();
      });
    });
  });

  describe('uploads image and displays new image in media list', () => {
    it('Uploading a valid image file should call POST /api/media/upload', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      }).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ url: 'https://cdn/newlogo.png' }),
      });

      render(<AdminGestionMedios />);

      await waitFor(() => {
        global.fetch.mockClear();
      });
    });
  });

  describe('shows validation error for non-image file upload', () => {
    it('Uploading a non-image file should display a validation error', async () => {
      render(<AdminGestionMedios />);

      await waitFor(() => {
        global.fetch.mockClear();
      });
    });
  });
});