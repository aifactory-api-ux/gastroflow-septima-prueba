import { Injectable } from '@nestjs/common';
import { Branding } from './branding.entity';
import { generateUUID } from '../shared/utils';
import { BRAND_PRIMARY_COLOR, BRAND_LOGO_URL } from '../shared/constants';

@Injectable()
export class BrandingService {
  private branding: Branding | null = null;

  getBranding(): Branding {
    if (!this.branding) {
      const now = new Date().toISOString();
      this.branding = new Branding({
        id: generateUUID(),
        restaurantName: 'GastroFlow',
        logoUrl: BRAND_LOGO_URL || null,
        primaryColor: BRAND_PRIMARY_COLOR,
        createdAt: now,
        updatedAt: now,
      });
    }
    return this.branding;
  }

  updateBranding(data: { restaurantName?: string; logoUrl?: string; primaryColor?: string }): Branding {
    const branding = this.getBranding();
    if (data.restaurantName !== undefined) branding.restaurantName = data.restaurantName;
    if (data.logoUrl !== undefined) branding.logoUrl = data.logoUrl;
    if (data.primaryColor !== undefined) branding.primaryColor = data.primaryColor;
    branding.updatedAt = new Date().toISOString();
    return branding;
  }
}