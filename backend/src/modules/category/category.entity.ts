export class Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    order: number;
    createdAt: string;
    updatedAt: string;
  }) {
    if (!data.id || !data.name || data.order === undefined) {
      throw new Error('Missing required fields: id, name, order');
    }
    this.id = data.id;
    this.name = data.name;
    this.description = data.description ?? null;
    this.imageUrl = data.imageUrl ?? null;
    this.order = data.order;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}