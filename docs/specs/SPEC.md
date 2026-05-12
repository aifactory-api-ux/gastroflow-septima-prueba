# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.x
  - NestJS v10.x
  - TypeScript v5.x
  - PostgreSQL 15
  - Redis 7.x
  - RabbitMQ 3.x
- **Frontend**
  - React v18.x
  - Vite v4.x
  - TypeScript v5.x
  - Lucide Icons (for iconography)
- **Infrastructure**
  - Docker 24.x
  - docker-compose 2.x
  - Kubernetes 1.28+ (manifests provided)
- **Other**
  - Prettier, ESLint (TypeScript/React)
  - dotenv

---

## 2. DATA CONTRACTS

### Backend (NestJS DTOs/Entities)

```typescript
// backend/src/modules/auth/dto/login.dto.ts
export class LoginDto {
  email: string;
  password: string;
}

// backend/src/modules/auth/dto/token-response.dto.ts
export class TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

// backend/src/modules/category/category.entity.ts
export class Category {
  id: string; // UUID
  name: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// backend/src/modules/product/product.entity.ts
export class Product {
  id: string; // UUID
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string; // UUID
  available: boolean;
  order: number;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// backend/src/modules/branding/branding.entity.ts
export class Branding {
  id: string; // UUID
  restaurantName: string;
  logoUrl: string | null;
  primaryColor: string; // HEX, e.g. "#E67E22"
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}
```

### Frontend (TypeScript interfaces)

```typescript
// frontend/src/types/auth.ts
export interface LoginDto {
  email: string;
  password: string;
}
export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

// frontend/src/types/category.ts
export interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// frontend/src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  available: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// frontend/src/types/branding.ts
export interface Branding {
  id: string;
  restaurantName: string;
  logoUrl: string | null;
  primaryColor: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## 3. API ENDPOINTS

### Auth

- **POST /api/auth/login**
  - Request: `LoginDto`
  - Response: `TokenResponseDto`

### Categories

- **GET /api/categories**
  - Response: `Category[]`
- **POST /api/categories**
  - Request: `{ name: string; description?: string; imageUrl?: string; order?: number }`
  - Response: `Category`
- **PUT /api/categories/:id**
  - Request: `{ name?: string; description?: string; imageUrl?: string; order?: number }`
  - Response: `Category`
- **DELETE /api/categories/:id**
  - Response: `{ success: boolean }`

### Products

- **GET /api/products**
  - Query: `categoryId?: string`
  - Response: `Product[]`
- **POST /api/products**
  - Request: `{ name: string; description?: string; price: number; imageUrl?: string; categoryId: string; available?: boolean; order?: number }`
  - Response: `Product`
- **PUT /api/products/:id**
  - Request: `{ name?: string; description?: string; price?: number; imageUrl?: string; categoryId?: string; available?: boolean; order?: number }`
  - Response: `Product`
- **DELETE /api/products/:id**
  - Response: `{ success: boolean }`

### Branding

- **GET /api/branding**
  - Response: `Branding`
- **PUT /api/branding**
  - Request: `{ restaurantName?: string; logoUrl?: string; primaryColor?: string }`
  - Response: `Branding`

### Media

- **POST /api/media/upload**
  - Request: `multipart/form-data` with file field `file`
  - Response: `{ url: string }`

---

## 4. FILE STRUCTURE

### PORT TABLE

| Service         | Listening Port | Path                        |
|-----------------|---------------|-----------------------------|
| api             | 23001         | backend/                    |
| postgres        | 25432         | docker-compose service only |
| redis           | 26379         | docker-compose service only |
| rabbitmq        | 25672         | docker-compose service only |
| frontend        | 24000         | frontend/                   |

### FILE TREE

```
.
├── docker-compose.yml                # Multi-service orchestration (all ports 21000+)
├── .env.example                      # Template for all required env vars
├── .gitignore                        # Ignore node_modules, build, .env, etc.
├── README.md                         # Project overview and setup
├── run.sh                            # Root-level startup script
├── backend/
│   ├── Dockerfile                    # Backend service Dockerfile (EXPOSE 23001)
│   ├── src/
│   │   ├── main.ts                   # NestJS entrypoint
│   │   ├── app.module.ts             # Root NestJS module
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── login.dto.ts
│   │   │   │   │   └── token-response.dto.ts
│   │   │   ├── category/
│   │   │   │   ├── category.controller.ts
│   │   │   │   ├── category.service.ts
│   │   │   │   ├── category.entity.ts
│   │   │   ├── product/
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   ├── product.entity.ts
│   │   │   ├── branding/
│   │   │   │   ├── branding.controller.ts
│   │   │   │   ├── branding.service.ts
│   │   │   │   ├── branding.entity.ts
│   │   │   ├── media/
│   │   │   │   ├── media.controller.ts
│   │   │   │   ├── media.service.ts
│   │   │   ├── shared/
│   │   │   │   ├── constants.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── types.ts
│   │   ├── config/
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   └── rabbitmq.config.ts
│   │   └── main.ts
│   └── test/
│       └── (test files)
├── frontend/
│   ├── Dockerfile                    # Frontend service Dockerfile (EXPOSE 24000)
│   ├── vite.config.ts                # Vite config (entry: src/main.tsx)
│   ├── tsconfig.json                 # TypeScript config
│   ├── public/
│   │   └── index.html                # HTML entrypoint (script src="/src/main.tsx")
│   ├── src/
│   │   ├── main.tsx                  # React entrypoint
│   │   ├── App.tsx                   # App root
│   │   ├── styles/
│   │   │   └── tokens.ts             # Design tokens (verbatim from UI/UX contract)
│   │   ├── types/
│   │   │   ├── auth.ts
│   │   │   ├── category.ts
│   │   │   ├── product.ts
│   │   │   └── branding.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useCategories.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useBranding.ts
│   │   │   └── useMediaUpload.ts
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── PrimaryNavigation.tsx
│   │   │   │   ├── CTAButton.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── InputField.tsx
│   │   │   │   ├── ImageUpload.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── CategoryCarousel.tsx
│   │   │   │   └── ProductList.tsx
│   │   ├── pages/
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminGestionCategorias.tsx
│   │   │   └── AdminGestionProductos.tsx
│   │   └── utils/
│   │       └── api.ts
│   └── test/
│       └── (test files)
├── k8s/
│   ├── backend-deployment.yaml        # Kubernetes deployment for backend
│   ├── frontend-deployment.yaml       # Kubernetes deployment for frontend
│   ├── postgres-deployment.yaml       # Kubernetes deployment for PostgreSQL
│   ├── redis-deployment.yaml          # Kubernetes deployment for Redis
│   ├── rabbitmq-deployment.yaml       # Kubernetes deployment for RabbitMQ
│   └── ingress.yaml                   # Ingress configuration
```

---

## 5. ENVIRONMENT VARIABLES

| Name                    | Type   | Description                                         | Example Value              |
|-------------------------|--------|-----------------------------------------------------|---------------------------|
| NODE_ENV                | string | Node environment                                    | production                |
| PORT                    | number | Backend API port (NestJS)                           | 23001                     |
| FRONTEND_PORT           | number | Frontend port (Vite/React)                          | 24000                     |
| DATABASE_URL            | string | PostgreSQL connection string                        | postgres://user:pass@postgres:5432/gastroflow |
| REDIS_URL               | string | Redis connection string                             | redis://redis:6379        |
| RABBITMQ_URL            | string | RabbitMQ connection string                          | amqp://rabbitmq:5672      |
| JWT_SECRET              | string | JWT signing secret                                  | supersecretjwtkey         |
| JWT_EXPIRES_IN          | string | JWT expiration (e.g. 1d, 12h)                       | 1d                        |
| REFRESH_TOKEN_SECRET    | string | JWT refresh token secret                            | refreshsecretkey          |
| REFRESH_TOKEN_EXPIRES_IN| string | Refresh token expiration                            | 7d                        |
| ADMIN_EMAIL             | string | Default admin email                                 | admin@gastroflow.com      |
| ADMIN_PASSWORD          | string | Default admin password                              | changeme123               |
| MEDIA_UPLOAD_PATH       | string | Local path for uploaded images                      | /uploads                  |
| MEDIA_BASE_URL          | string | Public base URL for uploaded images                 | http://localhost:23001/uploads |
| BRAND_PRIMARY_COLOR     | string | Default brand primary color (HEX)                   | #E67E22                   |
| BRAND_LOGO_URL          | string | Default logo URL                                    | http://.../logo.png       |

---

## 6. IMPORT CONTRACTS

### Backend

- `from src/modules/auth/auth.service import AuthService`
- `from src/modules/auth/dto/login.dto import LoginDto`
- `from src/modules/auth/dto/token-response.dto import TokenResponseDto`
- `from src/modules/category/category.service import CategoryService`
- `from src/modules/category/category.entity import Category`
- `from src/modules/product/product.service import ProductService`
- `from src/modules/product/product.entity import Product`
- `from src/modules/branding/branding.service import BrandingService`
- `from src/modules/branding/branding.entity import Branding`
- `from src/modules/media/media.service import MediaService`
- `from src/modules/shared/constants import JWT_SECRET, JWT_EXPIRES_IN`
- `from src/modules/shared/utils import generateUUID, hashPassword`
- `from src/config/database.config import databaseConfig`
- `from src/config/redis.config import redisConfig`
- `from src/config/rabbitmq.config import rabbitmqConfig`

### Frontend

- `import { LoginDto, TokenResponseDto } from '../types/auth'`
- `import { Category } from '../types/category'`
- `import { Product } from '../types/product'`
- `import { Branding } from '../types/branding'`
- `import { useAuth } from '../hooks/useAuth'`
- `import { useCategories } from '../hooks/useCategories'`
- `import { useProducts } from '../hooks/useProducts'`
- `import { useBranding } from '../hooks/useBranding'`
- `import { useMediaUpload } from '../hooks/useMediaUpload'`
- `import { tokens } from '../styles/tokens'`
- `import PrimaryNavigation from '../components/ui/PrimaryNavigation'`
- `import CTAButton from '../components/ui/CTAButton'`
- `import Card from '../components/ui/Card'`
- `import InputField from '../components/ui/InputField'`
- `import ImageUpload from '../components/ui/ImageUpload'`
- `import Modal from '../components/ui/Modal'`
- `import CategoryCarousel from '../components/ui/CategoryCarousel'`
- `import ProductList from '../components/ui/ProductList'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitives

- `useAuth() → { user, login, logout, loading, error, accessToken }`
- `useCategories() → { categories, loading, error, createCategory, updateCategory, deleteCategory }`
- `useProducts() → { products, loading, error, createProduct, updateProduct, deleteProduct }`
- `useBranding() → { branding, loading, error, updateBranding }`
- `useMediaUpload() → { uploadImage, uploading, uploadError, uploadedUrl, removeImage }`

### Component Props/Inputs

- **PrimaryNavigation**
  - Props: `{ active: 'dashboard' | 'categories' | 'products' | 'media' | 'branding', onNavigate: (section: string) => void, onLogout: () => void }`
- **CTAButton**
  - Props: `{ children: React.ReactNode, onClick: () => void, variant?: 'primary' | 'secondary', disabled?: boolean, loading?: boolean, type?: 'button' | 'submit' }`
- **Card**
  - Props: `{ children: React.ReactNode, imageUrl?: string, title?: string, description?: string, actions?: React.ReactNode }`
- **InputField**
  - Props: `{ label: string, value: string, onChange: (value: string) => void, type?: string, error?: string, disabled?: boolean, placeholder?: string, name?: string }`
- **ImageUpload**
  - Props: `{ value: string | null, onChange: (url: string | null) => void, label?: string, disabled?: boolean, error?: string }`
- **Modal**
  - Props: `{ open: boolean, title: string, children: React.ReactNode, onClose: () => void, onConfirm?: () => void, confirmLabel?: string, cancelLabel?: string, loading?: boolean }`
- **CategoryCarousel**
  - Props: `{ categories: Category[], activeCategoryId: string, onSelect: (categoryId: string) => void }`
- **ProductList**
  - Props: `{ products: Product[], categories: Category[], onProductClick?: (product: Product) => void, activeCategoryId?: string }`

---

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React).
- The project is TypeScript-only (no `.js` or `.jsx` files).
- Entry point: `/src/main.tsx` (as referenced in `public/index.html` via `<script type="module" src="/src/main.tsx"></script>`).

---

## 9. DESIGN TOKENS

```typescript
export const tokens = {
  colors: {
    primary: "#E67E22",
    "primary-light": "#FBE9D7",
    "primary-dark": "#8A4C14",
    background: "#FFFFFF",
    surface: "#F8F9FA",
    "text-primary": "#212529",
    "text-secondary": "#6C757D",
    border: "#DEE2E6",
    error: "#DC3545",
    success: "#28A745"
  },
  typography: {
    "font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    headings: {
      h1: "bold 28px/1.2",
      h2: "bold 22px/1.3",
      h3: "semibold 18px/1.4",
      h4: "semibold 16px/1.4"
    },
    body: "regular 16px/1.5",
    small: "regular 14px/1.5",
    caption: "regular 12px/1.4"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px"
  },
  "border-radius": {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px"
  },
  shadows: {
    card: "0 2px 8px rgba(0,0,0,0.08)",
    elevated: "0 4px 16px rgba(0,0,0,0.12)",
    modal: "0 8px 32px rgba(0,0,0,0.2)"
  },
  iconography: "Iconos lineales de 24x24px con trazo de 2px, usando la librería Lucide Icons. Color hereda del texto circundante o del color primario para acentos.",
  "image-style": "Imágenes de productos en formato 4:3 o 1:1, con bordes redondeados (8px) y sombra suave. Logo del restaurante centrado en la cabecera, altura máxima 60px.",
  motion: {
    "duration-fast": "150ms",
    "duration-normal": "300ms",
    easing: "ease-in-out"
  }
};
```
**All React components must import tokens from this file. No hardcoded hex values or invented colors are allowed.**