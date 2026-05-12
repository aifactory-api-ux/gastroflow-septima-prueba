import { Module } from '@nestjs/common';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { CategoryController } from './modules/category/category.controller';
import { CategoryService } from './modules/category/category.service';
import { ProductController } from './modules/product/product.controller';
import { ProductService } from './modules/product/product.service';
import { BrandingController } from './modules/branding/branding.controller';
import { BrandingService } from './modules/branding/branding.service';
import { MediaController } from './modules/media/media.controller';
import { MediaService } from './modules/media/media.service';

@Module({
  controllers: [
    AuthController,
    CategoryController,
    ProductController,
    BrandingController,
    MediaController,
  ],
  providers: [
    AuthService,
    CategoryService,
    ProductService,
    BrandingService,
    MediaService,
  ],
})
export class AppModule {}