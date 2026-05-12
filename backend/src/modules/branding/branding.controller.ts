import { Controller, Get, Put, Body } from '@nestjs/common';
import { BrandingService } from './branding.service';
import { Branding } from './branding.entity';

@Controller('api/branding')
export class BrandingController {
  constructor(private readonly brandingService: BrandingService) {}

  @Get()
  async getBranding(): Promise<Branding> {
    return this.brandingService.getBranding();
  }

  @Put()
  async updateBranding(@Body() data: { restaurantName?: string; logoUrl?: string; primaryColor?: string }): Promise<Branding> {
    return this.brandingService.updateBranding(data);
  }
}