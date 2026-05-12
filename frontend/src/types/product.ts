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