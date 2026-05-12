export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}