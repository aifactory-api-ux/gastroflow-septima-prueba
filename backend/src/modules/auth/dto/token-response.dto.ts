export class TokenResponseDto {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}