export class Product {
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

  constructor(data: {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
    categoryId: string;
    available?: boolean;
    order?: number;
    createdAt: string;
    updatedAt: string;
  }) {
    if (!data.id || !data.name || data.price === undefined || !data.categoryId) {
      throw new Error('Missing required fields: id, name, price, categoryId');
    }
    if (data.price < 0) {
      throw new Error('Price cannot be negative');
    }
    this.id = data.id;
    this.name = data.name;
    this.description = data.description ?? null;
    this.price = data.price;
    this.imageUrl = data.imageUrl ?? null;
    this.categoryId = data.categoryId;
    this.available = data.available ?? true;
    this.order = data.order ?? 0;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}