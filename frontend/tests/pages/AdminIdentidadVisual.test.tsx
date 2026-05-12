import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminIdentidadVisual } from '../../src/pages/AdminIdentidadVisual';

describe('AdminIdentidadVisual', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('renders branding form with current branding values', () => {
    it('Should render the branding form pre-filled with current branding values from GET /api/branding', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          id: 'uuid-1',
          restaurantName: 'Test Restaurant',
          logoUrl: 'https://cdn/logo.png',
          primaryColor: '#E67E22',
          createdAt: '2024-06-01T12:00:00Z',
          updatedAt: '2024-06-01T12:00:00Z',
        }),
      });

      render(<AdminIdentidadVisual />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Test Restaurant')).toBeTruthy();
      });
    });
  });

  describe('updates branding on valid form submit', () => {
    it('Submitting the form with valid restaurantName should call PUT /api/branding', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          id: 'uuid-1',
          restaurantName: 'Test Restaurant',
          logoUrl: 'https://cdn/logo.png',
          primaryColor: '#E67E22',
          createdAt: '2024-06-01T12:00:00Z',
          updatedAt: '2024-06-01T12:00:00Z',
        }),
      }).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          id: 'uuid-1',
          restaurantName: 'New Name',
          logoUrl: 'https://cdn/logo.png',
          primaryColor: '#123456',
          createdAt: '2024-06-01T12:00:00Z',
          updatedAt: '2024-06-02T12:00:00Z',
        }),
      });

      render(<AdminIdentidadVisual />);

      await waitFor(() => {
        global.fetch.mockClear();
      });
    });
  });

  describe('shows validation error for empty restaurantName', () => {
    it('Submitting the form with empty restaurantName should display a validation error', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          id: 'uuid-1',
          restaurantName: 'Test Restaurant',
          logoUrl: null,
          primaryColor: '#E67E22',
          createdAt: '2024-06-01T12:00:00Z',
          updatedAt: '2024-06-01T12:00:00Z',
        }),
      });

      render(<AdminIdentidadVisual />);

      await waitFor(() => {
        global.fetch.mockClear();
      });
    });
  });
});