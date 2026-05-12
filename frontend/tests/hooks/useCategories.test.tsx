import { renderHook, act } from '@testing-library/react';
import { useCategories } from '../../src/hooks/useCategories';

describe('useCategories', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('should fetch categories successfully', () => {
    it('When useCategories is used, it should fetch categories from GET /api/categories', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{ id: '1', name: 'Test' }]),
      });

      const { result } = renderHook(() => useCategories());
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(global.fetch).toHaveBeenCalledWith('/api/categories', expect.any(Object));
    });
  });

  describe('should handle API error when fetching categories', () => {
    it('If GET /api/categories returns an error, the hook should set an error state', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const { result } = renderHook(() => useCategories());
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('should add a new category successfully', () => {
    it('When addCategory is called with valid data, it should POST to /api/categories', async () => {
      global.fetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 201,
          json: () => Promise.resolve({ id: '1', name: 'New Category' }),
        });

      const { result } = renderHook(() => useCategories());
      await act(async () => {
        await result.current.createCategory({ name: 'New Category', order: 1 });
      });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});