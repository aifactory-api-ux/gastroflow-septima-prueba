import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query('categoryId') categoryId?: string): Promise<Product[]> {
    return this.productService.findAll(categoryId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
    available?: boolean;
    order?: number;
  }): Promise<Product> {
    return this.productService.create(data);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() data: {
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    categoryId?: string;
    available?: boolean;
    order?: number;
  }): Promise<Product> {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.productService.delete(id);
    return { success: true };
  }
}