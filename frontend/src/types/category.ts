export interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}