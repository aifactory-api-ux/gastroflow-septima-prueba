import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminLogin } from '../../src/pages/AdminLogin';

describe('AdminLogin', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    mockLogin.mockClear();
  });

  describe('renders login form with email and password fields', () => {
    it('The AdminLogin page must render a form with email and password input fields and a submit button', () => {
      render(<AdminLogin />);
      expect(screen.getByRole('textbox', { name: /email/i })).toBeTruthy();
      expect(screen.getByText('Password')).toBeTruthy();
      expect(screen.getByRole('button', { name: /submit/i })).toBeTruthy();
    });
  });

  describe('submits valid credentials and receives tokens', () => {
    it('Submitting the login form with valid email and password must call POST /api/auth/login', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ accessToken: 'token', refreshToken: 'refresh' }),
      });

      render(<AdminLogin />);
      fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
        target: { value: 'admin@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'ValidPass123' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/auth/login',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ email: 'admin@example.com', password: 'ValidPass123' }),
          })
        );
      });
    });
  });

  describe('shows error on invalid credentials', () => {
    it('Submitting the login form with invalid credentials must display an error message when the API returns 401', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      render(<AdminLogin />);
      fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
        target: { value: 'admin@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'wrongpass' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeTruthy();
      });
    });
  });

  describe('shows validation error if email is missing', () => {
    it('Submitting the login form without an email must show a validation error', async () => {
      render(<AdminLogin />);
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'ValidPass123' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      expect(screen.getByText(/email is required/i)).toBeTruthy();
    });
  });

  describe('shows validation error if password is missing', () => {
    it('Submitting the login form without a password must show a validation error', async () => {
      render(<AdminLogin />);
      fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
        target: { value: 'admin@example.com' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      expect(screen.getByText(/password is required/i)).toBeTruthy();
    });
  });

  describe('disables submit button while loading', () => {
    it('The submit button must be disabled while the login request is in progress', async () => {
      global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

      render(<AdminLogin />);
      fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
        target: { value: 'admin@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'ValidPass123' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    });
  });
});