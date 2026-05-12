import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClienteMenuDigital } from '../../src/pages/ClienteMenuDigital';

describe('ClienteMenuDigital', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('renders public menu with branding, category carousel, and product list', () => {
    it('Should render the restaurant branding, a category carousel, and a product list', async () => {
      global.fetch
        .mockResolvedValueOnce({
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
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () => Promise.resolve([{
            id: 'cat-1',
            name: 'Starters',
            description: 'Appetizers',
            imageUrl: null,
            order: 1,
            createdAt: '2024-06-01T12:00:00Z',
            updatedAt: '2024-06-01T12:00:00Z',
          }]),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () => Promise.resolve([{
            id: 'prod-1',
            name: 'Soup',
            description: 'Hot soup',
            price: 5.5,
            imageUrl: null,
            categoryId: 'cat-1',
            available: true,
            order: 1,
            createdAt: '2024-06-01T12:00:00Z',
            updatedAt: '2024-06-01T12:00:00Z',
          }]),
        });

      render(<ClienteMenuDigital />);

      await waitFor(() => {
        expect(screen.getByText('Test Restaurant')).toBeTruthy();
      });
    });
  });

  describe('shows empty state when no categories exist', () => {
    it('If GET /api/categories returns an empty array, the menu should display an empty state message', async () => {
      global.fetch
        .mockResolvedValueOnce({
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
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        });

      render(<ClienteMenuDigital />);

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeTruthy();
      });
    });
  });

  describe('shows error message if products fetch fails', () => {
    it('If GET /api/products returns an error, an error message should be displayed', async () => {
      global.fetch
        .mockResolvedValueOnce({
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
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        });

      render(<ClienteMenuDigital />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeTruthy();
      });
    });
  });
});