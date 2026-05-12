import { renderHook, act } from '@testing-library/react';
import { useMediaUpload } from '../../src/hooks/useMediaUpload';

describe('useMediaUpload', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('should upload image successfully', () => {
    it('When uploadMedia is called with a valid image file, it should POST to /api/media/upload', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ url: 'https://cdn.example.com/image.png' }),
      });

      const { result } = renderHook(() => useMediaUpload());
      await act(async () => {
        await result.current.uploadImage(new File([''], 'image.png', { type: 'image/png' }));
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/media/upload',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('should handle API error during upload', () => {
    it('If POST /api/media/upload returns an error, the hook should set an error state', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const { result } = renderHook(() => useMediaUpload());
      await act(async () => {
        await result.current.uploadImage(new File([''], 'image.png', { type: 'image/png' }));
      });

      expect(result.current.uploadError).toBeTruthy();
    });
  });
});