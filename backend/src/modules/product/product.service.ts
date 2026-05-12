import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { generateUUID } from '../shared/utils';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  findAll(categoryId?: string): Product[] {
    let filtered = [...this.products];
    if (categoryId) {
      filtered = filtered.filter(p => p.categoryId === categoryId);
    }
    return filtered.sort((a, b) => a.order - b.order);
  }

  async create(data: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
    available?: boolean;
    order?: number;
  }): Promise<Product> {
    const now = new Date().toISOString();
    const product = new Product({
      id: generateUUID(),
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      imageUrl: data.imageUrl ?? null,
      categoryId: data.categoryId,
      available: data.available ?? true,
      order: data.order ?? 0,
      createdAt: now,
      updatedAt: now,
    });
    this.products.push(product);
    return product;
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    categoryId?: string;
    available?: boolean;
    order?: number;
  }): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const product = this.products[index];
    if (data.name !== undefined) product.name = data.name;
    if (data.description !== undefined) product.description = data.description;
    if (data.price !== undefined) product.price = data.price;
    if (data.imageUrl !== undefined) product.imageUrl = data.imageUrl;
    if (data.categoryId !== undefined) product.categoryId = data.categoryId;
    if (data.available !== undefined) product.available = data.available;
    if (data.order !== undefined) product.order = data.order;
    product.updatedAt = new Date().toISOString();
    return product;
  }

  async delete(id: string): Promise<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}