import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../src/hooks/useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn();
  });

  describe('should login successfully and store tokens', () => {
    it('When login is called with valid email and password, it should call POST /api/auth/login and store tokens', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ accessToken: 'token', refreshToken: 'refresh' }),
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.login('user@example.com', 'ValidPass123');
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/login',
        expect.objectContaining({ method: 'POST' })
      );
      expect(localStorage.getItem('accessToken')).toBe('token');
      expect(localStorage.getItem('refreshToken')).toBe('refresh');
    });
  });

  describe('should return error on invalid credentials', () => {
    it('When login is called with invalid credentials, it should return an error', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.login('user@example.com', 'WrongPass');
      });

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('should clear tokens on logout', () => {
    it('When logout is called, it should remove tokens from localStorage', async () => {
      localStorage.setItem('accessToken', 'token');
      localStorage.setItem('refreshToken', 'refresh');

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        result.current.logout();
      });

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });
  });

  describe('should initialize auth state from localStorage', () => {
    it('On hook initialization, if tokens exist in localStorage, auth state should reflect logged-in status', () => {
      localStorage.setItem('accessToken', 'abc');
      localStorage.setItem('refreshToken', 'def');

      const { result } = renderHook(() => useAuth());
      expect(result.current.accessToken).toBe('abc');
    });
  });
});