export class Branding {
  id: string;
  restaurantName: string;
  logoUrl: string | null;
  primaryColor: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: {
    id: string;
    restaurantName: string;
    logoUrl?: string | null;
    primaryColor: string;
    createdAt: string;
    updatedAt: string;
  }) {
    if (!data.id || !data.restaurantName || !data.primaryColor) {
      throw new Error('Missing required fields: id, restaurantName, primaryColor');
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(data.primaryColor)) {
      throw new Error('Primary color must be a valid HEX color');
    }
    this.id = data.id;
    this.restaurantName = data.restaurantName;
    this.logoUrl = data.logoUrl ?? null;
    this.primaryColor = data.primaryColor;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}