import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AdminDashboard } from '../../src/pages/AdminDashboard';

describe('AdminDashboard', () => {
  describe('renders dashboard with branding and navigation links', () => {
    it('The AdminDashboard page must display the restaurantName from /api/branding and navigation links', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          restaurantName: 'Test Restaurant',
          logoUrl: null,
          primaryColor: '#E67E22',
          id: 'uuid',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        }),
      });

      render(<AdminDashboard />);

      await waitFor(() => {
        expect(screen.getByText('Test Restaurant')).toBeTruthy();
      });
      expect(screen.getByText(/categor/i)).toBeTruthy();
      expect(screen.getByText(/product/i)).toBeTruthy();
    });
  });

  describe('shows loading state while fetching branding', () => {
    it('The AdminDashboard page must show a loading indicator while the branding data is being fetched', async () => {
      global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

      render(<AdminDashboard />);

      expect(screen.getByRole('status')).toBeTruthy();
    });
  });

  describe('shows error message if branding fetch fails', () => {
    it('If the /api/branding request fails, the AdminDashboard page must display an error message', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      render(<AdminDashboard />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeTruthy();
      });
    });
  });
});