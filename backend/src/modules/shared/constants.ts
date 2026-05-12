export const ROLES = ['admin', 'user'] as const;
export const DEFAULT_ROLE = 'user';

export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshsecretkey';
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gastroflow.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

export const MEDIA_UPLOAD_PATH = process.env.MEDIA_UPLOAD_PATH || '/uploads';
export const MEDIA_BASE_URL = process.env.MEDIA_BASE_URL || 'http://localhost:23001/uploads';

export const BRAND_PRIMARY_COLOR = process.env.BRAND_PRIMARY_COLOR || '#E67E22';
export const BRAND_LOGO_URL = process.env.BRAND_LOGO_URL || '';