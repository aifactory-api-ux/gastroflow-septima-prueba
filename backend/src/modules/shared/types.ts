export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  available: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Branding {
  id: string;
  restaurantName: string;
  logoUrl: string | null;
  primaryColor: string;
  createdAt: string;
  updatedAt: string;
}