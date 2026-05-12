import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { generateUUID } from '../shared/utils';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  findAll(): Category[] {
    return [...this.categories].sort((a, b) => a.order - b.order);
  }

  async create(data: { name: string; description?: string; imageUrl?: string; order?: number }): Promise<Category> {
    const now = new Date().toISOString();
    const category = new Category({
      id: generateUUID(),
      name: data.name,
      description: data.description ?? null,
      imageUrl: data.imageUrl ?? null,
      order: data.order ?? 0,
      createdAt: now,
      updatedAt: now,
    });
    this.categories.push(category);
    return category;
  }

  async update(id: string, data: { name?: string; description?: string; imageUrl?: string; order?: number }): Promise<Category> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    const category = this.categories[index];
    if (data.name !== undefined) category.name = data.name;
    if (data.description !== undefined) category.description = data.description;
    if (data.imageUrl !== undefined) category.imageUrl = data.imageUrl;
    if (data.order !== undefined) category.order = data.order;
    category.updatedAt = new Date().toISOString();
    return category;
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    this.categories.splice(index, 1);
  }
}