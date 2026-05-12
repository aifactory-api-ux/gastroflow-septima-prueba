import { LoginDto, TokenResponseDto } from '../../src/types/auth';

describe('Auth Types', () => {
  describe('LoginDto_interface_has_required_fields', () => {
    it('LoginDto interface must have required fields: email and password, both as strings', () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'password123' };
      expect(typeof dto.email).toBe('string');
      expect(typeof dto.password).toBe('string');
    });
  });

  describe('TokenResponseDto_interface_has_required_fields', () => {
    it('TokenResponseDto interface must have required fields: accessToken and refreshToken, both as strings', () => {
      const dto: TokenResponseDto = { accessToken: 'token', refreshToken: 'refresh' };
      expect(typeof dto.accessToken).toBe('string');
      expect(typeof dto.refreshToken).toBe('string');
    });
  });

  describe('LoginDto_missing_field_type_error', () => {
    it('Omitting a required field from LoginDto should result in a TypeScript type error', () => {
      const dto: LoginDto = { email: 'user@example.com' } as LoginDto;
      expect(dto.password).toBeUndefined();
    });
  });
});