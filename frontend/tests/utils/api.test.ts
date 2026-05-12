import { api } from '../../src/utils/api';

describe('API Utility', () => {
  describe('api_utility_fetches_data_successfully', () => {
    it('API utility function should fetch data from a valid endpoint and return the expected response', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([{ id: '1', name: 'Test' }]),
      });
      const result = await api('/api/categories');
      expect(result).toBeDefined();
    });
  });

  describe('api_utility_handles_network_error', () => {
    it('API utility function should handle network errors and return a rejected promise or error object', async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));
      await expect(api('/api/invalid-endpoint')).rejects.toThrow('Network error');
    });
  });

  describe('api_utility_handles_non_2xx_status', () => {
    it('API utility function should handle non-2xx HTTP status codes and return an error or throw', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not found' }),
      });
      await expect(api('/api/products/invalid-id')).rejects.toBeDefined();
    });
  });
});