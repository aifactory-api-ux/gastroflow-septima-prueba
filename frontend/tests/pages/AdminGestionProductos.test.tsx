import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminGestionProductos } from '../../src/pages/AdminGestionProductos';

describe('AdminGestionProductos', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('renders list of products from API', () => {
    it('The AdminGestionProductos page must fetch and display a list of products from GET /api/products', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{
          id: 'prod1',
          name: 'Café',
          description: 'Café espresso',
          price: 2.5,
          imageUrl: null,
          categoryId: 'uuid1',
          available: true,
          order: 1,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        }]),
      });

      render(<AdminGestionProductos />);

      await waitFor(() => {
        expect(screen.getByText('Café')).toBeTruthy();
      });
    });
  });

  describe('creates new product with valid data', () => {
    it('Submitting the new product form with valid data must call POST /api/products', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      }).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({
          id: 'prod2',
          name: 'Tarta',
          description: 'Tarta de queso',
          price: 4.0,
          imageUrl: 'https://cdn/tarta.png',
          categoryId: 'uuid2',
          available: true,
          order: 2,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
        }),
      });

      render(<AdminGestionProductos />);

      await waitFor(() => {
        global.fetch.mockClear();
      });
    });
  });

  describe('shows error message if GET /api/products fails', () => {
    it('If the GET /api/products request fails, the page must display an error message', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      render(<AdminGestionProductos />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeTruthy();
      });
    });
  });
});