import { renderHook, act } from '@testing-library/react';
import { useProducts } from '../../src/hooks/useProducts';

describe('useProducts', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('should fetch products successfully', () => {
    it('When useProducts is used, it should fetch products from GET /api/products', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{ id: '1', name: 'Test Product' }]),
      });

      const { result } = renderHook(() => useProducts());
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(global.fetch).toHaveBeenCalledWith('/api/products', expect.any(Object));
    });
  });

  describe('should fetch products by categoryId', () => {
    it('When useProducts is called with a categoryId, it should fetch only products in that category', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{ id: '1', name: 'Test', categoryId: 'cat-123' }]),
      });

      const { result } = renderHook(() => useProducts('cat-123'));
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/products?categoryId=cat-123',
        expect.any(Object)
      );
    });
  });

  describe('should handle API error when fetching products', () => {
    it('If GET /api/products returns an error, the hook should set an error state', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const { result } = renderHook(() => useProducts());
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('should add a new product successfully', () => {
    it('When addProduct is called with valid data, it should POST to /api/products', async () => {
      global.fetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 201,
          json: () => Promise.resolve({ id: '1', name: 'New Product' }),
        });

      const { result } = renderHook(() => useProducts());
      await act(async () => {
        await result.current.createProduct({ name: 'New Product', price: 10, categoryId: 'cat-123' });
      });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});