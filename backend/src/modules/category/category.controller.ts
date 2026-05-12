import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() data: { name: string; description?: string; imageUrl?: string; order?: number }): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() data: { name?: string; description?: string; imageUrl?: string; order?: number }): Promise<Category> {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.categoryService.delete(id);
    return { success: true };
  }
}