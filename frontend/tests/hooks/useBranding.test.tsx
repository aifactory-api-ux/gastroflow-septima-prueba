import { renderHook, act } from '@testing-library/react';
import { useBranding } from '../../src/hooks/useBranding';

describe('useBranding', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('should fetch branding successfully', () => {
    it('When useBranding is used, it should fetch branding data from GET /api/branding', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: '1', restaurantName: 'Test Restaurant' }),
      });

      const { result } = renderHook(() => useBranding());
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(global.fetch).toHaveBeenCalledWith('/api/branding', expect.any(Object));
    });
  });

  describe('should handle API error when fetching branding', () => {
    it('If GET /api/branding returns an error, the hook should set an error state', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const { result } = renderHook(() => useBranding());
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('should update branding successfully', () => {
    it('When updateBranding is called with valid data, it should PUT to /api/branding', async () => {
      global.fetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ id: '1', restaurantName: 'Test Restaurant' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ id: '1', restaurantName: 'Updated Name' }),
        });

      const { result } = renderHook(() => useBranding());
      await act(async () => {
        await result.current.updateBranding({ restaurantName: 'Updated Name' });
      });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});