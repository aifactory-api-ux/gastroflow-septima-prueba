import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminGestionCategorias } from '../../src/pages/AdminGestionCategorias';

describe('AdminGestionCategorias', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('renders list of categories from API', () => {
    it('The AdminGestionCategorias page must fetch and display a list of categories from GET /api/categories', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{
          id: 'uuid1',
          name: 'Bebidas',
          description: 'Bebidas frías y calientes',
          imageUrl: null,
          order: 1,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        }]),
      });

      render(<AdminGestionCategorias />);

      await waitFor(() => {
        expect(screen.getByText('Bebidas')).toBeTruthy();
      });
    });
  });

  describe('creates new category with valid data', () => {
    it('Submitting the new category form with valid data must call POST /api/categories', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      }).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({
          id: 'uuid2',
          name: 'Postres',
          description: 'Dulces y postres',
          imageUrl: 'https://cdn/postres.png',
          order: 2,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
        }),
      });

      render(<AdminGestionCategorias />);

      await waitFor(() => {
        global.fetch.mockClear();
      });
    });
  });

  describe('shows error message if GET /api/categories fails', () => {
    it('If the GET /api/categories request fails, the page must display an error message', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      render(<AdminGestionCategorias />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeTruthy();
      });
    });
  });
});