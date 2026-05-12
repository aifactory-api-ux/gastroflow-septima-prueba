# MASTER DEVELOPMENT PLAN

> Fuente de verdad única. Los nombres de clases, fields, rutas y variables
> definidos en §1 son los ÚNICOS válidos — el coder no puede inventar nombres.

> ⚠️ **ORDEN DE IMPLEMENTACIÓN GLOBAL — NO NEGOCIABLE:**
> 1. Implementa **TODOS** los ítems marcados 🔴 TEST (de todos los waves) antes de escribir cualquier ítem 🟢 PROD.
> 2. Una vez escritos todos los tests, implementa los ítems 🟢 PROD.
> 3. Si no hay ítems 🔴 TEST, implementa los 🟢 PROD directamente.
> Razón: el código de producción debe ser escrito sabiendo qué contratos deben satisfacer los tests.

---

# §1 Contratos Globales

## §1.1 Especificación Técnica — Stack, Modelos, Estructura, Env Vars

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

## §1.2 Contrato API (OpenAPI 3.1)
> Ref obligatoria para tests de endpoints: usa los paths, schemas y status codes exactos de aquí.

```yaml
openapi: 3.1.0
info:
  title: Derived API Contract
  version: 1.0.0
paths:
  /api/auth/login:
    post:
      operationId: post_api_auth_login
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/branding:
    get:
      operationId: get_api_branding
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    put:
      operationId: put_api_branding
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/categories:
    get:
      operationId: get_api_categories
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    post:
      operationId: post_api_categories
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/categories/:id:
    delete:
      operationId: delete_api_categories_id
      responses:
        '204':
          description: Derived from SPEC.md
    put:
      operationId: put_api_categories_id
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/media/upload:
    post:
      operationId: post_api_media_upload
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/products:
    get:
      operationId: get_api_products
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    post:
      operationId: post_api_products
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/products/:id:
    delete:
      operationId: delete_api_products_id
      responses:
        '204':
          description: Derived from SPEC.md
    put:
      operationId: put_api_products_id
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
```

## §1.3 Archivos de Test y Scripts a Crear (TDD — complemento de la estructura §1.1)
> La FILE STRUCTURE de §1.1 fue generada antes de los specs TDD — no incluye `tests/` ni `run_tests.sh`.
> Los siguientes archivos son OBLIGATORIOS. Créalos en los paths exactos indicados.
> ⚠️  NUNCA usar archivos `.spec.*` co-ubicados con el source.

**Scripts de ejecución (crear y hacer chmod +x):**
- `backend/src/run_tests.sh`
- `frontend/run_tests.sh`

**Archivos de test (crear en los paths exactos):**
- `backend/src/config/tests/test_database_config.py`
- `backend/src/config/tests/test_rabbitmq_config.py`
- `backend/src/config/tests/test_redis_config.py`
- `backend/src/modules/auth/tests/test_auth_controller.py`
- `backend/src/modules/auth/tests/test_auth_service.py`
- `backend/src/modules/auth/tests/test_login_dto.ts`
- `backend/src/modules/auth/tests/test_token_response_dto.ts`
- `backend/src/modules/branding/tests/test_branding_controller.py`
- `backend/src/modules/branding/tests/test_branding_entity.ts`
- `backend/src/modules/branding/tests/test_branding_service.py`
- `backend/src/modules/category/tests/test_category_controller.py`
- `backend/src/modules/category/tests/test_category_entity.ts`
- `backend/src/modules/category/tests/test_category_service.py`
- `backend/src/modules/media/tests/test_media_controller.py`
- `backend/src/modules/media/tests/test_media_service.py`
- `backend/src/modules/product/tests/test_product_controller.py`
- `backend/src/modules/product/tests/test_product_entity.ts`
- `backend/src/modules/product/tests/test_product_service.py`
- `backend/src/modules/shared/tests/test_constants.ts`
- `backend/src/modules/shared/tests/test_types.py`
- `backend/src/modules/shared/tests/test_utils.py`
- `frontend/tests/components/CTAButton.test.tsx`
- `frontend/tests/components/Card.test.tsx`
- `frontend/tests/components/CategoryCarousel.test.tsx`
- `frontend/tests/components/ImageUpload.test.tsx`
- `frontend/tests/components/InputField.test.tsx`
- `frontend/tests/components/Modal.test.tsx`
- `frontend/tests/components/PrimaryNavigation.test.tsx`
- `frontend/tests/components/ProductList.test.tsx`
- `frontend/tests/hooks/useAuth.test.tsx`
- `frontend/tests/hooks/useBranding.test.tsx`
- `frontend/tests/hooks/useCategories.test.tsx`
- `frontend/tests/hooks/useMediaUpload.test.tsx`
- `frontend/tests/hooks/useProducts.test.tsx`
- `frontend/tests/pages/AdminDashboard.test.tsx`
- `frontend/tests/pages/AdminGestionCategorias.test.tsx`
- `frontend/tests/pages/AdminGestionMedios.test.tsx`
- `frontend/tests/pages/AdminGestionProductos.test.tsx`
- `frontend/tests/pages/AdminIdentidadVisual.test.tsx`
- `frontend/tests/pages/AdminLogin.test.tsx`
- `frontend/tests/pages/ClienteMenuDigital.test.tsx`
- `frontend/tests/styles/tokens.test.ts`
- `frontend/tests/types/auth.test.ts`
- `frontend/tests/types/branding.test.ts`
- `frontend/tests/types/category.test.ts`
- `frontend/tests/types/product.test.ts`
- `frontend/tests/utils/api.test.ts`

---

# §2 Plan de Implementación

> **REGLA TDD OBLIGATORIA**
> 1. Escribe el ítem 🔴 TEST completo antes de tocar el ítem 🟢 PROD.
> 2. Corre los tests: deben fallar (RED). Si pasan sin código de producción, el test está mal.
> 3. Escribe el código de producción mínimo para que pasen (GREEN).
> 4. Si los tests fallan después del paso 3, corrige SOLO producción — nunca los tests.

## Wave 1

### 🟢 PROD — run_tests.sh — backend/src
> Crea el archivo `backend/src/run_tests.sh` con el siguiente contenido EXACTO (no lo modifiques ni resumas):
**Archivos:**
  - `backend/src/run_tests.sh`

**Detalle:**
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")"
echo ">>> [backend/src] Installing Python test dependencies..."
pip install pytest pytest-cov pytest-asyncio httpx anyio aiosqlite     fastapi sqlalchemy pyjwt passlib bcrypt python-multipart -q 2>/dev/null || true
# Install project deps declared in requirements.txt if present
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt -q 2>/dev/null || true
fi
echo ">>> [backend/src] Running tests..."
# Override DB URLs to SQLite in-memory so tests run without a live database
export DATABASE_URL="sqlite+aiosqlite:///:memory:"
export ASYNC_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export DB_URL="sqlite:///:memory:"
export TEST_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export SECRET_KEY="test-secret-key"
export JWT_SECRET="test-secret-key"
# Add service dir + parent dirs to PYTHONPATH so both relative and package imports work
# This handles: microservice layout (from routes import ...) and
#               monolith layout (from app.routers.auth import ...)
export PYTHONPATH="$(pwd):$(dirname $(pwd)):$(dirname $(dirname $(pwd))):${PYTHONPATH:-}"
mkdir -p coverage
python -m pytest tests/ --tb=short -q \
  --cov=. --cov-report=term-missing \
  --cov-report=json:coverage/coverage.json \
  --no-header 2>&1 | tee /tmp/test_out_backend_src.txt
echo ">>> [backend/src] Done."
```

Luego ejecuta: `chmod +x backend/src/run_tests.sh`

### 🟢 PROD — run_tests.sh — frontend
> Crea el archivo `frontend/run_tests.sh` con el siguiente contenido EXACTO (no lo modifiques ni resumas):
**Archivos:**
  - `frontend/run_tests.sh`

**Detalle:**
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")"
echo ">>> [frontend] Installing JS test dependencies..."
npm install -D jest ts-jest @types/jest jest-environment-jsdom --silent 2>/dev/null || true
echo ">>> [frontend] Running tests..."
npx jest --coverage --passWithNoTests 2>&1 | tee /tmp/test_out_frontend.txt
echo ">>> [frontend] Done."
```

Luego ejecuta: `chmod +x frontend/run_tests.sh`

### 🔴 TEST — Tests: frontend/src/styles/tokens.ts
> Ref: §1.1 (modelos de `frontend/src/styles/tokens.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/styles/tokens.test.ts`

**Casos de prueba (implementar todos):**
- `design_tokens_exported_as_expected`: Design tokens file must export all required tokens as per UI/UX contract (e.g. colors, spacing, typography).
  - Expected: `{'exports': ['colors', 'spacing', 'typography'], 'fields': ['primary', 'secondary', 'background', 'fontSize', 'fontFamily']}`
- `design_tokens_values_are_valid`: All design token values must conform to expected formats (e.g. HEX for colors, px/rem for spacing, string for font families).
  - Expected: `{'colorFormat': 'HEX', 'spacingFormat': 'px|rem', 'typographyFormat': 'string'}`
- `design_tokens_missing_token_returns_undefined`: Accessing a non-existent design token should return undefined.
  - Input: `{'token': 'nonExistentToken'}`
  - Expected: `{'value': 'undefined'}`

### 🔴 TEST — Tests: frontend/src/types/auth.ts
> Ref: §1.1 (modelos de `frontend/src/types/auth.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/types/auth.test.ts`

**Casos de prueba (implementar todos):**
- `LoginDto_interface_has_required_fields`: LoginDto interface must have required fields: email and password, both as strings.
  - Expected: `{'fields': {'email': 'string', 'password': 'string'}}`
- `TokenResponseDto_interface_has_required_fields`: TokenResponseDto interface must have required fields: accessToken and refreshToken, both as strings.
  - Expected: `{'fields': {'accessToken': 'string', 'refreshToken': 'string'}}`
- `LoginDto_missing_field_type_error`: Omitting a required field from LoginDto should result in a TypeScript type error.
  - Input: `{'object': {'email': 'user@example.com'}}`
  - Expected: `{'typescriptError': True}`

### 🔴 TEST — Tests: frontend/src/types/category.ts
> Ref: §1.1 (modelos de `frontend/src/types/category.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/types/category.test.ts`

**Casos de prueba (implementar todos):**
- `Category_interface_has_all_fields`: Category interface must have all required fields as per SPEC.md.
  - Expected: `{'fields': {'id': 'string', 'name': 'string', 'description': 'string|null', 'imageUrl': 'string|null', 'order': 'number', 'createdAt': 'string', 'updatedAt': 'string'}}`
- `Category_interface_accepts_null_description_and_imageUrl`: Category interface must allow description and imageUrl to be null.
  - Input: `{'description': None, 'imageUrl': None}`
  - Expected: `{'valid': True}`
- `Category_interface_missing_required_field_type_error`: Omitting a required field from Category should result in a TypeScript type error.
  - Input: `{'object': {'id': 'uuid', 'name': 'Test'}}`
  - Expected: `{'typescriptError': True}`

### 🔴 TEST — Tests: frontend/src/types/product.ts
> Ref: §1.1 (modelos de `frontend/src/types/product.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/types/product.test.ts`

**Casos de prueba (implementar todos):**
- `Product_interface_has_all_fields`: Product interface must have all required fields as per SPEC.md.
  - Expected: `{'fields': {'id': 'string', 'name': 'string', 'description': 'string|null', 'price': 'number', 'imageUrl': 'string|null', 'categoryId': 'string', 'available': 'boolean', 'order': 'number', 'createdAt': 'string', 'updatedAt': 'string'}}`
- `Product_interface_accepts_null_description_and_imageUrl`: Product interface must allow description and imageUrl to be null.
  - Input: `{'description': None, 'imageUrl': None}`
  - Expected: `{'valid': True}`
- `Product_interface_missing_required_field_type_error`: Omitting a required field from Product should result in a TypeScript type error.
  - Input: `{'object': {'id': 'uuid', 'name': 'Test Product'}}`
  - Expected: `{'typescriptError': True}`

### 🔴 TEST — Tests: frontend/src/types/branding.ts
> Ref: §1.1 (modelos de `frontend/src/types/branding.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/types/branding.test.ts`

**Casos de prueba (implementar todos):**
- `Branding_interface_has_all_fields`: Branding interface must have all required fields as per SPEC.md.
  - Expected: `{'fields': {'id': 'string', 'restaurantName': 'string', 'logoUrl': 'string|null', 'primaryColor': 'string', 'createdAt': 'string', 'updatedAt': 'string'}}`
- `Branding_interface_accepts_null_logoUrl`: Branding interface must allow logoUrl to be null.
  - Input: `{'logoUrl': None}`
  - Expected: `{'valid': True}`
- `Branding_interface_missing_required_field_type_error`: Omitting a required field from Branding should result in a TypeScript type error.
  - Input: `{'object': {'id': 'uuid', 'restaurantName': 'Test Restaurant'}}`
  - Expected: `{'typescriptError': True}`

### 🔴 TEST — Tests: frontend/src/utils/api.ts
> Ref: §1.1 (modelos de `frontend/src/utils/api.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/utils/api.test.ts`

**Casos de prueba (implementar todos):**
- `api_utility_fetches_data_successfully`: API utility function should fetch data from a valid endpoint and return the expected response.
  - Input: `{'url': '/api/categories'}`
  - Expected: `{'status': 200, 'dataType': 'object|array'}`
- `api_utility_handles_network_error`: API utility function should handle network errors and return a rejected promise or error object.
  - Input: `{'url': '/api/invalid-endpoint'}`
  - Expected: `{'error': True}`
- `api_utility_handles_non_2xx_status`: API utility function should handle non-2xx HTTP status codes and return an error or throw.
  - Input: `{'url': '/api/products/invalid-id'}`
  - Expected: `{'error': True, 'status': 404}`

### 🔴 TEST — Tests: backend/src/modules/auth/dto/login.dto.ts
> Ref: §1.1 (modelos de `backend/src/modules/auth/dto/login.dto.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/auth/tests/test_login_dto.ts`

**Casos de prueba (implementar todos):**
- `LoginDto_accepts_valid_email_and_password`: LoginDto should accept valid email and password fields as strings.
  - Input: `{'email': 'user@example.com', 'password': 'ValidPass123'}`
  - Expected: `{'valid': True}`
- `LoginDto_missing_email_raises_validation_error`: LoginDto should raise a validation error if email is missing.
  - Input: `{'password': 'ValidPass123'}`
  - Expected: `{'validationError': True, 'missingField': 'email'}`
- `LoginDto_empty_password_raises_validation_error`: LoginDto should raise a validation error if password is empty.
  - Input: `{'email': 'user@example.com', 'password': ''}`
  - Expected: `{'validationError': True, 'field': 'password'}`

### 🔴 TEST — Tests: backend/src/modules/auth/dto/token-response.dto.ts
> Ref: §1.1 (modelos de `backend/src/modules/auth/dto/token-response.dto.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/auth/tests/test_token_response_dto.ts`

**Casos de prueba (implementar todos):**
- `TokenResponseDto_accepts_valid_tokens`: TokenResponseDto should accept valid accessToken and refreshToken fields as strings.
  - Input: `{'accessToken': 'access.jwt.token', 'refreshToken': 'refresh.jwt.token'}`
  - Expected: `{'valid': True}`
- `TokenResponseDto_missing_accessToken_raises_validation_error`: TokenResponseDto should raise a validation error if accessToken is missing.
  - Input: `{'refreshToken': 'refresh.jwt.token'}`
  - Expected: `{'validationError': True, 'missingField': 'accessToken'}`
- `TokenResponseDto_empty_refreshToken_raises_validation_error`: TokenResponseDto should raise a validation error if refreshToken is empty.
  - Input: `{'accessToken': 'access.jwt.token', 'refreshToken': ''}`
  - Expected: `{'validationError': True, 'field': 'refreshToken'}`

### 🔴 TEST — Tests: backend/src/modules/category/category.entity.ts
> Ref: §1.1 (modelos de `backend/src/modules/category/category.entity.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/category/tests/test_category_entity.ts`

**Casos de prueba (implementar todos):**
- `Category_entity_accepts_all_fields`: Category entity should accept all required fields as per SPEC.md.
  - Input: `{'id': 'uuid', 'name': 'Category Name', 'description': 'A description', 'imageUrl': 'https://example.com/image.png', 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'valid': True}`
- `Category_entity_accepts_null_description_and_imageUrl`: Category entity should allow description and imageUrl to be null.
  - Input: `{'id': 'uuid', 'name': 'Category Name', 'description': None, 'imageUrl': None, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'valid': True}`
- `Category_entity_missing_required_field_raises_validation_error`: Category entity should raise a validation error if a required field is missing.
  - Input: `{'name': 'Category Name'}`
  - Expected: `{'validationError': True}`

### 🔴 TEST — Tests: backend/src/modules/product/product.entity.ts
> Ref: §1.1 (modelos de `backend/src/modules/product/product.entity.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/product/tests/test_product_entity.ts`

**Casos de prueba (implementar todos):**
- `Product_entity_accepts_all_fields`: Product entity should accept all required fields as per SPEC.md.
  - Input: `{'id': 'uuid', 'name': 'Product Name', 'description': 'A description', 'price': 9.99, 'imageUrl': 'https://example.com/image.png', 'categoryId': 'uuid', 'available': True, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'valid': True}`
- `Product_entity_accepts_null_description_and_imageUrl`: Product entity should allow description and imageUrl to be null.
  - Input: `{'id': 'uuid', 'name': 'Product Name', 'description': None, 'price': 9.99, 'imageUrl': None, 'categoryId': 'uuid', 'available': True, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'valid': True}`
- `Product_entity_missing_required_field_raises_validation_error`: Product entity should raise a validation error if a required field is missing.
  - Input: `{'name': 'Product Name'}`
  - Expected: `{'validationError': True}`

### 🔴 TEST — Tests: backend/src/modules/branding/branding.entity.ts
> Ref: §1.1 (modelos de `backend/src/modules/branding/branding.entity.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/branding/tests/test_branding_entity.ts`

**Casos de prueba (implementar todos):**
- `Branding_entity_accepts_all_fields`: Branding entity should accept all required fields as per SPEC.md.
  - Input: `{'id': 'uuid', 'restaurantName': 'Test Restaurant', 'logoUrl': 'https://example.com/logo.png', 'primaryColor': '#E67E22', 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'valid': True}`
- `Branding_entity_accepts_null_logoUrl`: Branding entity should allow logoUrl to be null.
  - Input: `{'id': 'uuid', 'restaurantName': 'Test Restaurant', 'logoUrl': None, 'primaryColor': '#E67E22', 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'valid': True}`
- `Branding_entity_missing_required_field_raises_validation_error`: Branding entity should raise a validation error if a required field is missing.
  - Input: `{'restaurantName': 'Test Restaurant'}`
  - Expected: `{'validationError': True}`

### 🔴 TEST — Tests: backend/src/modules/shared/constants.ts
> Ref: §1.1 (modelos de `backend/src/modules/shared/constants.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/shared/tests/test_constants.ts`

**Casos de prueba (implementar todos):**
- `constants_exports_roles_and_shared_values`: constants.ts must export all required shared constants such as roles and any other shared values.
  - Expected: `{'exports': ['ROLES', 'DEFAULT_ROLE']}`
- `constants_roles_are_strings`: All roles in constants.ts must be strings and match expected values (e.g. 'admin', 'user').
  - Expected: `{'rolesType': 'string', 'rolesValues': ['admin', 'user']}`
- `constants_missing_export_returns_attribute_error`: Accessing a non-existent constant should raise an AttributeError or undefined.
  - Input: `{'constant': 'NON_EXISTENT'}`
  - Expected: `{'error': True}`

### 🔴 TEST — Tests: backend/src/modules/shared/utils.ts
> Ref: §1.1 (modelos de `backend/src/modules/shared/utils.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/shared/tests/test_utils.py`

**Casos de prueba (implementar todos):**
- `test_hash_password_returns_different_value_than_plaintext`: hash_password utility must return a hashed string different from the original plaintext password
  - Input: `{'password': 'MySecret123!'}`
  - Expected: `{'not_equal_to_input': True}`
- `test_verify_password_returns_true_for_correct_password`: verify_password utility must return True when given the correct plaintext and its hash
  - Input: `{'password': 'MySecret123!', 'hash': '<hash_of_MySecret123!>'}`
  - Expected: `{'result': True}`
- `test_verify_password_returns_false_for_incorrect_password`: verify_password utility must return False when given an incorrect plaintext for a hash
  - Input: `{'password': 'WrongPassword', 'hash': '<hash_of_MySecret123!>'}`
  - Expected: `{'result': False}`
- `test_hash_password_empty_string`: hash_password utility must handle empty string input and return a valid hash
  - Input: `{'password': ''}`
  - Expected: `{'is_string': True, 'not_equal_to_input': True}`
- `test_verify_password_with_invalid_hash_format_raises_error`: verify_password utility must raise an error or return False if the hash format is invalid
  - Input: `{'password': 'test', 'hash': 'not_a_real_hash'}`
  - Expected: `{'result': False}`

### 🔴 TEST — Tests: backend/src/modules/shared/types.ts
> Ref: §1.1 (modelos de `backend/src/modules/shared/types.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/shared/tests/test_types.py`

**Casos de prueba (implementar todos):**
- `test_login_dto_type_accepts_valid_fields`: LoginDto type must accept objects with both email and password fields as strings
  - Input: `{'email': 'user@example.com', 'password': 'Password123'}`
  - Expected: `{'type_check': True}`
- `test_login_dto_type_missing_email_field`: LoginDto type must reject objects missing the email field
  - Input: `{'password': 'Password123'}`
  - Expected: `{'type_check': False}`
- `test_category_type_accepts_null_description_and_imageUrl`: Category type must accept description and imageUrl as null values
  - Input: `{'id': 'uuid-123', 'name': 'Beverages', 'description': None, 'imageUrl': None, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'type_check': True}`
- `test_product_type_missing_required_field`: Product type must reject objects missing required fields such as name or price
  - Input: `{'id': 'uuid-123', 'description': 'desc', 'price': 10.5, 'imageUrl': None, 'categoryId': 'uuid-cat', 'available': True, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'type_check': False}`
- `test_branding_type_primaryColor_hex_format`: Branding type must only accept primaryColor values in HEX format (e.g., #E67E22)
  - Input: `{'id': 'uuid-123', 'restaurantName': 'Testaurant', 'logoUrl': None, 'primaryColor': '#E67E22', 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}`
  - Expected: `{'type_check': True}`

### 🔴 TEST — Tests: backend/src/config/database.config.ts
> Ref: §1.1 (modelos de `backend/src/config/database.config.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/config/tests/test_database_config.py`

**Casos de prueba (implementar todos):**
- `test_database_config_valid_env_vars`: Database config must load successfully when all required environment variables are present and valid
  - Input: `{'env': {'POSTGRES_HOST': 'localhost', 'POSTGRES_PORT': '25432', 'POSTGRES_USER': 'user', 'POSTGRES_PASSWORD': 'pass', 'POSTGRES_DB': 'db'}}`
  - Expected: `{'config_loaded': True}`
- `test_database_config_missing_required_env_var`: Database config must raise an error if a required environment variable (e.g., POSTGRES_PASSWORD) is missing
  - Input: `{'env': {'POSTGRES_HOST': 'localhost', 'POSTGRES_PORT': '25432', 'POSTGRES_USER': 'user', 'POSTGRES_DB': 'db'}}`
  - Expected: `{'raises_error': True}`
- `test_database_config_invalid_port_type`: Database config must raise an error if POSTGRES_PORT is not a valid integer
  - Input: `{'env': {'POSTGRES_HOST': 'localhost', 'POSTGRES_PORT': 'not_a_number', 'POSTGRES_USER': 'user', 'POSTGRES_PASSWORD': 'pass', 'POSTGRES_DB': 'db'}}`
  - Expected: `{'raises_error': True}`
- `test_database_config_accepts_custom_db_name`: Database config must accept a custom database name via POSTGRES_DB
  - Input: `{'env': {'POSTGRES_HOST': 'localhost', 'POSTGRES_PORT': '25432', 'POSTGRES_USER': 'user', 'POSTGRES_PASSWORD': 'pass', 'POSTGRES_DB': 'custom_db'}}`
  - Expected: `{'config_loaded': True, 'db_name': 'custom_db'}`

### 🔴 TEST — Tests: backend/src/config/redis.config.ts
> Ref: §1.1 (modelos de `backend/src/config/redis.config.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/config/tests/test_redis_config.py`

**Casos de prueba (implementar todos):**
- `test_redis_config_valid_env_vars`: Redis config must load successfully when all required environment variables are present and valid
  - Input: `{'env': {'REDIS_HOST': 'localhost', 'REDIS_PORT': '26379'}}`
  - Expected: `{'config_loaded': True}`
- `test_redis_config_missing_host_env_var`: Redis config must raise an error if REDIS_HOST is missing
  - Input: `{'env': {'REDIS_PORT': '26379'}}`
  - Expected: `{'raises_error': True}`
- `test_redis_config_invalid_port_type`: Redis config must raise an error if REDIS_PORT is not a valid integer
  - Input: `{'env': {'REDIS_HOST': 'localhost', 'REDIS_PORT': 'not_a_number'}}`
  - Expected: `{'raises_error': True}`
- `test_redis_config_accepts_default_port`: Redis config must use the default port 26379 if REDIS_PORT is not set
  - Input: `{'env': {'REDIS_HOST': 'localhost'}}`
  - Expected: `{'config_loaded': True, 'port': 26379}`

### 🔴 TEST — Tests: backend/src/config/rabbitmq.config.ts
> Ref: §1.1 (modelos de `backend/src/config/rabbitmq.config.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/config/tests/test_rabbitmq_config.py`

**Casos de prueba (implementar todos):**
- `test_rabbitmq_config_valid_env_vars`: RabbitMQ config must load successfully when all required environment variables are present and valid
  - Input: `{'env': {'RABBITMQ_HOST': 'localhost', 'RABBITMQ_PORT': '25672', 'RABBITMQ_USER': 'user', 'RABBITMQ_PASSWORD': 'pass'}}`
  - Expected: `{'config_loaded': True}`
- `test_rabbitmq_config_missing_user_env_var`: RabbitMQ config must raise an error if RABBITMQ_USER is missing
  - Input: `{'env': {'RABBITMQ_HOST': 'localhost', 'RABBITMQ_PORT': '25672', 'RABBITMQ_PASSWORD': 'pass'}}`
  - Expected: `{'raises_error': True}`
- `test_rabbitmq_config_invalid_port_type`: RabbitMQ config must raise an error if RABBITMQ_PORT is not a valid integer
  - Input: `{'env': {'RABBITMQ_HOST': 'localhost', 'RABBITMQ_PORT': 'not_a_number', 'RABBITMQ_USER': 'user', 'RABBITMQ_PASSWORD': 'pass'}}`
  - Expected: `{'raises_error': True}`
- `test_rabbitmq_config_accepts_default_port`: RabbitMQ config must use the default port 25672 if RABBITMQ_PORT is not set
  - Input: `{'env': {'RABBITMQ_HOST': 'localhost', 'RABBITMQ_USER': 'user', 'RABBITMQ_PASSWORD': 'pass'}}`
  - Expected: `{'config_loaded': True, 'port': 25672}`

### 🔴 TEST — Tests: frontend/src/components/PrimaryNavigation.tsx
> Ref: §1.1 (modelos de `frontend/src/components/PrimaryNavigation.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/PrimaryNavigation.test.tsx`

**Casos de prueba (implementar todos):**
- `renders all navigation links as per Figma spec`: PrimaryNavigation should render all navigation links with correct labels and icons as defined in the UI/UX contract.
  - Expected: `{'elements': [{'role': 'link', 'label': 'Dashboard'}, {'role': 'link', 'label': 'Categories'}, {'role': 'link', 'label': 'Products'}, {'role': 'link', 'label': 'Branding'}]}`
- `highlights active navigation link`: PrimaryNavigation should visually highlight the active link based on the current route.
  - Input: `{'currentRoute': '/categories'}`
  - Expected: `{'element': {'role': 'link', 'label': 'Categories', 'active': True}}`
- `renders fallback UI when no navigation items provided`: PrimaryNavigation should render a fallback UI or nothing if navigation items are empty or undefined.
  - Input: `{'navigationItems': []}`
  - Expected: `{'elements': []}`

### 🔴 TEST — Tests: frontend/src/components/CTAButton.tsx
> Ref: §1.1 (modelos de `frontend/src/components/CTAButton.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/CTAButton.test.tsx`

**Casos de prueba (implementar todos):**
- `renders button with correct label and style`: CTAButton should render with the provided label and primary styling as per Figma.
  - Input: `{'label': 'Save', 'variant': 'primary'}`
  - Expected: `{'element': {'role': 'button', 'label': 'Save', 'class': 'cta-primary'}}`
- `calls onClick handler when clicked`: CTAButton should call the provided onClick handler when the button is clicked.
  - Input: `{'onClick': 'mockFn'}`
  - Expected: `{'onClickCalled': True}`
- `renders disabled state when disabled prop is true`: CTAButton should render as disabled and not call onClick when disabled prop is true.
  - Input: `{'disabled': True, 'onClick': 'mockFn'}`
  - Expected: `{'element': {'role': 'button', 'disabled': True}, 'onClickCalled': False}`

### 🔴 TEST — Tests: frontend/src/components/Card.tsx
> Ref: §1.1 (modelos de `frontend/src/components/Card.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/Card.test.tsx`

**Casos de prueba (implementar todos):**
- `renders children inside card container`: Card should render its children inside a styled container as per Figma.
  - Input: `{'children': '<div>Content</div>'}`
  - Expected: `{'element': {'role': 'region', 'children': ['Content']}}`
- `applies custom className if provided`: Card should apply the custom className prop to the container.
  - Input: `{'className': 'custom-card'}`
  - Expected: `{'element': {'class': 'custom-card'}}`
- `renders with default padding and border`: Card should render with default padding and border styles if no overrides are provided.
  - Expected: `{'element': {'style': {'padding': 'default', 'border': 'default'}}}`

### 🔴 TEST — Tests: frontend/src/components/InputField.tsx
> Ref: §1.1 (modelos de `frontend/src/components/InputField.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/InputField.test.tsx`

**Casos de prueba (implementar todos):**
- `renders input with label and placeholder`: InputField should render with the provided label and placeholder text.
  - Input: `{'label': 'Email', 'placeholder': 'Enter your email'}`
  - Expected: `{'element': {'role': 'textbox', 'label': 'Email', 'placeholder': 'Enter your email'}}`
- `shows validation error message when error prop is set`: InputField should display the error message when the error prop is provided.
  - Input: `{'error': 'Email is required'}`
  - Expected: `{'element': {'role': 'alert', 'text': 'Email is required'}}`
- `renders as disabled when disabled prop is true`: InputField should render as disabled when the disabled prop is true.
  - Input: `{'disabled': True}`
  - Expected: `{'element': {'role': 'textbox', 'disabled': True}}`

### 🔴 TEST — Tests: frontend/src/components/ImageUpload.tsx
> Ref: §1.1 (modelos de `frontend/src/components/ImageUpload.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/ImageUpload.test.tsx`

**Casos de prueba (implementar todos):**
- `renders file input and upload button`: ImageUpload should render a file input and an upload button as per Figma.
  - Expected: `{'elements': [{'role': 'button', 'label': 'Upload'}, {'role': 'textbox', 'type': 'file'}]}`
- `calls onUpload with file URL after successful upload`: ImageUpload should call onUpload with the uploaded image URL after a successful /api/media/upload POST.
  - Input: `{'file': 'test.png'}`
  - Expected: `{'apiCall': {'url': '/api/media/upload', 'method': 'POST', 'status_code': 201, 'response': {'url': 'https://cdn.example.com/test.png'}}, 'onUploadCalledWith': 'https://cdn.example.com/test.png'}`
- `shows error message on upload failure`: ImageUpload should display an error message if the upload API returns an error.
  - Input: `{'file': 'test.png'}`
  - Expected: `{'apiCall': {'url': '/api/media/upload', 'method': 'POST', 'status_code': 400}, 'element': {'role': 'alert', 'text': 'Upload failed'}}`

### 🔴 TEST — Tests: frontend/src/components/Modal.tsx
> Ref: §1.1 (modelos de `frontend/src/components/Modal.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/Modal.test.tsx`

**Casos de prueba (implementar todos):**
- `renders modal with children when open`: Modal should render its children and be visible when open prop is true.
  - Input: `{'open': True, 'children': '<div>Modal Content</div>'}`
  - Expected: `{'element': {'role': 'dialog', 'visible': True, 'children': ['Modal Content']}}`
- `does not render modal when open is false`: Modal should not render or be visible when open prop is false.
  - Input: `{'open': False}`
  - Expected: `{'element': {'role': 'dialog', 'visible': False}}`
- `calls onClose when close button is clicked`: Modal should call the onClose handler when the close button is clicked.
  - Input: `{'open': True, 'onClose': 'mockFn'}`
  - Expected: `{'onCloseCalled': True}`

### 🔴 TEST — Tests: frontend/src/components/CategoryCarousel.tsx
> Ref: §1.1 (modelos de `frontend/src/components/CategoryCarousel.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/CategoryCarousel.test.tsx`

**Casos de prueba (implementar todos):**
- `renders all categories as carousel items`: CategoryCarousel should render each category as a carousel item with name and image.
  - Input: `{'categories': [{'id': '1', 'name': 'Pizza', 'imageUrl': 'pizza.png', 'description': None, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}, {'id': '2', 'name': 'Pasta', 'imageUrl': 'pasta.png', 'description': None, 'order': 2, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}]}`
  - Expected: `{'elements': [{'role': 'img', 'alt': 'Pizza'}, {'role': 'img', 'alt': 'Pasta'}, {'role': 'button', 'label': 'Pizza'}, {'role': 'button', 'label': 'Pasta'}]}`
- `calls onSelectCategory with category id when item clicked`: CategoryCarousel should call onSelectCategory with the correct category id when a category is clicked.
  - Input: `{'categories': [{'id': '1', 'name': 'Pizza', 'imageUrl': 'pizza.png', 'description': None, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}], 'onSelectCategory': 'mockFn'}`
  - Expected: `{'onSelectCategoryCalledWith': '1'}`
- `renders empty state when categories array is empty`: CategoryCarousel should render an empty state or fallback UI when categories prop is an empty array.
  - Input: `{'categories': []}`
  - Expected: `{'element': {'role': 'status', 'text': 'No categories available'}}`

### 🔴 TEST — Tests: frontend/src/components/ProductList.tsx
> Ref: §1.1 (modelos de `frontend/src/components/ProductList.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/ProductList.test.tsx`

**Casos de prueba (implementar todos):**
- `renders all products with name, price, and image`: ProductList should render each product with its name, price, and image as per Figma.
  - Input: `{'products': [{'id': '1', 'name': 'Margherita', 'description': None, 'price': 10, 'imageUrl': 'margherita.png', 'categoryId': '1', 'available': True, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}, {'id': '2', 'name': 'Pepperoni', 'description': None, 'price': 12, 'imageUrl': 'pepperoni.png', 'categoryId': '1', 'available': True, 'order': 2, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}]}`
  - Expected: `{'elements': [{'role': 'img', 'alt': 'Margherita'}, {'role': 'img', 'alt': 'Pepperoni'}, {'role': 'heading', 'text': 'Margherita'}, {'role': 'heading', 'text': 'Pepperoni'}, {'role': 'text', 'text': '$10'}, {'role': 'text', 'text': '$12'}]}`
- `renders unavailable product with disabled state`: ProductList should render unavailable products with a disabled or visually distinct state.
  - Input: `{'products': [{'id': '3', 'name': 'Out of Stock', 'description': None, 'price': 15, 'imageUrl': 'outofstock.png', 'categoryId': '1', 'available': False, 'order': 3, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}]}`
  - Expected: `{'element': {'role': 'heading', 'text': 'Out of Stock', 'class': 'unavailable'}}`
- `renders empty state when products array is empty`: ProductList should render an empty state or fallback UI when products prop is an empty array.
  - Input: `{'products': []}`
  - Expected: `{'element': {'role': 'status', 'text': 'No products available'}}`

### 🔴 TEST — Tests: frontend/src/pages/AdminLogin.tsx
> Ref: §1.1 (modelos de `frontend/src/pages/AdminLogin.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/pages/AdminLogin.test.tsx`

**Casos de prueba (implementar todos):**
- `renders login form with email and password fields`: The AdminLogin page must render a form with email and password input fields and a submit button.
  - Expected: `{'elements': ["input[name='email']", "input[name='password']", "button[type='submit']"]}`
- `submits valid credentials and receives tokens`: Submitting the login form with valid email and password must call POST /api/auth/login and store accessToken and refreshToken from the response.
  - Input: `{'email': 'admin@example.com', 'password': 'ValidPass123'}`
  - Expected: `{'api_call': {'url': '/api/auth/login', 'method': 'POST', 'body': {'email': 'admin@example.com', 'password': 'ValidPass123'}, 'response': {'status_code': 201, 'body': {'accessToken': 'string', 'refreshToken': 'string'}}}, 'local_storage': ['accessToken', 'refreshToken']}`
- `shows error on invalid credentials`: Submitting the login form with invalid credentials must display an error message when the API returns 401.
  - Input: `{'email': 'admin@example.com', 'password': 'wrongpass'}`
  - Expected: `{'api_call': {'url': '/api/auth/login', 'method': 'POST', 'body': {'email': 'admin@example.com', 'password': 'wrongpass'}, 'response': {'status_code': 401}}, 'ui': {'error_message': True}}`
- `shows validation error if email is missing`: Submitting the login form without an email must show a validation error and not call the API.
  - Input: `{'email': '', 'password': 'ValidPass123'}`
  - Expected: `{'ui': {'validation_error': 'Email is required'}, 'api_call': {'called': False}}`
- `shows validation error if password is missing`: Submitting the login form without a password must show a validation error and not call the API.
  - Input: `{'email': 'admin@example.com', 'password': ''}`
  - Expected: `{'ui': {'validation_error': 'Password is required'}, 'api_call': {'called': False}}`
- `disables submit button while loading`: The submit button must be disabled while the login request is in progress.
  - Input: `{'email': 'admin@example.com', 'password': 'ValidPass123'}`
  - Expected: `{'ui': {'button_disabled_during_loading': True}}`

### 🔴 TEST — Tests: frontend/src/pages/AdminDashboard.tsx
> Ref: §1.1 (modelos de `frontend/src/pages/AdminDashboard.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/pages/AdminDashboard.test.tsx`

**Casos de prueba (implementar todos):**
- `renders dashboard with branding and navigation links`: The AdminDashboard page must display the restaurantName from /api/branding and navigation links to Categorías and Productos.
  - Expected: `{'api_call': {'url': '/api/branding', 'method': 'GET', 'response': {'status_code': 200, 'body': {'restaurantName': 'Test Restaurant', 'logoUrl': None, 'primaryColor': '#E67E22', 'id': 'uuid', 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}}}, 'ui': {'text': ['Test Restaurant'], 'links': ['/admin/categorias', '/admin/productos']}}`
- `shows loading state while fetching branding`: The AdminDashboard page must show a loading indicator while the branding data is being fetched.
  - Expected: `{'ui': {'loading_indicator': True}}`
- `shows error message if branding fetch fails`: If the /api/branding request fails, the AdminDashboard page must display an error message.
  - Expected: `{'api_call': {'url': '/api/branding', 'method': 'GET', 'response': {'status_code': 500}}, 'ui': {'error_message': True}}`
- `updates branding when PUT /api/branding succeeds`: Submitting the branding form with valid data must call PUT /api/branding and update the displayed branding info on success.
  - Input: `{'restaurantName': 'Updated Name', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#123456'}`
  - Expected: `{'api_call': {'url': '/api/branding', 'method': 'PUT', 'body': {'restaurantName': 'Updated Name', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#123456'}, 'response': {'status_code': 200, 'body': {'restaurantName': 'Updated Name', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#123456', 'id': 'uuid', 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-02T00:00:00Z'}}}, 'ui': {'text': ['Updated Name']}}`
- `shows validation error if restaurantName is empty`: Submitting the branding form with an empty restaurantName must show a validation error and not call the API.
  - Input: `{'restaurantName': '', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#123456'}`
  - Expected: `{'ui': {'validation_error': 'Restaurant name is required'}, 'api_call': {'called': False}}`

### 🔴 TEST — Tests: frontend/src/pages/AdminGestionCategorias.tsx
> Ref: §1.1 (modelos de `frontend/src/pages/AdminGestionCategorias.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/pages/AdminGestionCategorias.test.tsx`

**Casos de prueba (implementar todos):**
- `renders list of categories from API`: The AdminGestionCategorias page must fetch and display a list of categories from GET /api/categories.
  - Expected: `{'api_call': {'url': '/api/categories', 'method': 'GET', 'response': {'status_code': 200, 'body': [{'id': 'uuid1', 'name': 'Bebidas', 'description': 'Bebidas frías y calientes', 'imageUrl': None, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}]}}, 'ui': {'text': ['Bebidas']}}`
- `creates new category with valid data`: Submitting the new category form with valid data must call POST /api/categories and add the new category to the list.
  - Input: `{'name': 'Postres', 'description': 'Dulces y postres', 'imageUrl': 'https://cdn/postres.png', 'order': 2}`
  - Expected: `{'api_call': {'url': '/api/categories', 'method': 'POST', 'body': {'name': 'Postres', 'description': 'Dulces y postres', 'imageUrl': 'https://cdn/postres.png', 'order': 2}, 'response': {'status_code': 201, 'body': {'id': 'uuid2', 'name': 'Postres', 'description': 'Dulces y postres', 'imageUrl': 'https://cdn/postres.png', 'order': 2, 'createdAt': '2024-01-02T00:00:00Z', 'updatedAt': '2024-01-02T00:00:00Z'}}}, 'ui': {'text': ['Postres']}}`
- `shows validation error if name is missing when creating category`: Submitting the new category form without a name must show a validation error and not call the API.
  - Input: `{'name': '', 'description': 'Dulces y postres'}`
  - Expected: `{'ui': {'validation_error': 'Name is required'}, 'api_call': {'called': False}}`
- `updates category with valid data`: Editing a category and submitting valid data must call PUT /api/categories/:id and update the category in the list.
  - Input: `{'id': 'uuid1', 'name': 'Bebidas Actualizadas', 'description': 'Actualizado'}`
  - Expected: `{'api_call': {'url': '/api/categories/uuid1', 'method': 'PUT', 'body': {'name': 'Bebidas Actualizadas', 'description': 'Actualizado'}, 'response': {'status_code': 200, 'body': {'id': 'uuid1', 'name': 'Bebidas Actualizadas', 'description': 'Actualizado', 'imageUrl': None, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-03T00:00:00Z'}}}, 'ui': {'text': ['Bebidas Actualizadas']}}`
- `deletes category and removes it from the list`: Clicking delete on a category must call DELETE /api/categories/:id and remove the category from the UI on success.
  - Input: `{'id': 'uuid1'}`
  - Expected: `{'api_call': {'url': '/api/categories/uuid1', 'method': 'DELETE', 'response': {'status_code': 204, 'body': {'success': True}}}, 'ui': {'category_removed': 'uuid1'}}`
- `shows error message if GET /api/categories fails`: If the GET /api/categories request fails, the page must display an error message.
  - Expected: `{'api_call': {'url': '/api/categories', 'method': 'GET', 'response': {'status_code': 500}}, 'ui': {'error_message': True}}`

### 🔴 TEST — Tests: frontend/src/pages/AdminGestionProductos.tsx
> Ref: §1.1 (modelos de `frontend/src/pages/AdminGestionProductos.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/pages/AdminGestionProductos.test.tsx`

**Casos de prueba (implementar todos):**
- `renders list of products from API`: The AdminGestionProductos page must fetch and display a list of products from GET /api/products.
  - Expected: `{'api_call': {'url': '/api/products', 'method': 'GET', 'response': {'status_code': 200, 'body': [{'id': 'prod1', 'name': 'Café', 'description': 'Café espresso', 'price': 2.5, 'imageUrl': None, 'categoryId': 'uuid1', 'available': True, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-01T00:00:00Z'}]}}, 'ui': {'text': ['Café']}}`
- `creates new product with valid data`: Submitting the new product form with valid data must call POST /api/products and add the new product to the list.
  - Input: `{'name': 'Tarta', 'description': 'Tarta de queso', 'price': 4.0, 'imageUrl': 'https://cdn/tarta.png', 'categoryId': 'uuid2', 'available': True, 'order': 2}`
  - Expected: `{'api_call': {'url': '/api/products', 'method': 'POST', 'body': {'name': 'Tarta', 'description': 'Tarta de queso', 'price': 4.0, 'imageUrl': 'https://cdn/tarta.png', 'categoryId': 'uuid2', 'available': True, 'order': 2}, 'response': {'status_code': 201, 'body': {'id': 'prod2', 'name': 'Tarta', 'description': 'Tarta de queso', 'price': 4.0, 'imageUrl': 'https://cdn/tarta.png', 'categoryId': 'uuid2', 'available': True, 'order': 2, 'createdAt': '2024-01-02T00:00:00Z', 'updatedAt': '2024-01-02T00:00:00Z'}}}, 'ui': {'text': ['Tarta']}}`
- `shows validation error if name or price is missing when creating product`: Submitting the new product form without a name or price must show a validation error and not call the API.
  - Input: `{'name': '', 'price': None, 'categoryId': 'uuid2'}`
  - Expected: `{'ui': {'validation_error': 'Name and price are required'}, 'api_call': {'called': False}}`
- `updates product with valid data`: Editing a product and submitting valid data must call PUT /api/products/:id and update the product in the list.
  - Input: `{'id': 'prod1', 'name': 'Café Descafeinado', 'price': 2.8}`
  - Expected: `{'api_call': {'url': '/api/products/prod1', 'method': 'PUT', 'body': {'name': 'Café Descafeinado', 'price': 2.8}, 'response': {'status_code': 200, 'body': {'id': 'prod1', 'name': 'Café Descafeinado', 'description': 'Café espresso', 'price': 2.8, 'imageUrl': None, 'categoryId': 'uuid1', 'available': True, 'order': 1, 'createdAt': '2024-01-01T00:00:00Z', 'updatedAt': '2024-01-03T00:00:00Z'}}}, 'ui': {'text': ['Café Descafeinado']}}`
- `deletes product and removes it from the list`: Clicking delete on a product must call DELETE /api/products/:id and remove the product from the UI on success.
  - Input: `{'id': 'prod1'}`
  - Expected: `{'api_call': {'url': '/api/products/prod1', 'method': 'DELETE', 'response': {'status_code': 204, 'body': {'success': True}}}, 'ui': {'product_removed': 'prod1'}}`
- `shows error message if GET /api/products fails`: If the GET /api/products request fails, the page must display an error message.
  - Expected: `{'api_call': {'url': '/api/products', 'method': 'GET', 'response': {'status_code': 500}}, 'ui': {'error_message': True}}`

### 🔴 TEST — Tests: frontend/src/pages/AdminIdentidadVisual.tsx
> Ref: §1.1 (modelos de `frontend/src/pages/AdminIdentidadVisual.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/pages/AdminIdentidadVisual.test.tsx`

**Casos de prueba (implementar todos):**
- `renders branding form with current branding values`: Should render the branding form pre-filled with current restaurantName, logoUrl, and primaryColor from GET /api/branding
  - Input: `{'branding': {'id': 'uuid-1', 'restaurantName': 'Test Restaurant', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#E67E22', 'createdAt': '2024-06-01T12:00:00Z', 'updatedAt': '2024-06-01T12:00:00Z'}}`
  - Expected: `{'fields': {'restaurantName': 'Test Restaurant', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#E67E22'}}`
- `updates branding on valid form submit`: Submitting the form with valid restaurantName and primaryColor should call PUT /api/branding and update the UI with new branding values
  - Input: `{'form': {'restaurantName': 'New Name', 'primaryColor': '#123456'}}`
  - Expected: `{'api_call': {'method': 'PUT', 'url': '/api/branding', 'body': {'restaurantName': 'New Name', 'primaryColor': '#123456'}}, 'ui_update': {'restaurantName': 'New Name', 'primaryColor': '#123456'}}`
- `shows validation error for empty restaurantName`: Submitting the form with empty restaurantName should display a validation error and not call PUT /api/branding
  - Input: `{'form': {'restaurantName': '', 'primaryColor': '#E67E22'}}`
  - Expected: `{'validation_error': 'restaurantName is required', 'api_call': False}`
- `shows error message on failed branding update`: If PUT /api/branding returns an error (e.g. 400), an error message should be displayed to the user
  - Input: `{'form': {'restaurantName': 'Valid Name', 'primaryColor': '#E67E22'}, 'api_error': {'status': 400, 'message': 'Invalid color'}}`
  - Expected: `{'error_message': 'Invalid color'}`
- `shows loading indicator while branding is being updated`: A loading indicator should be shown while the branding update request is in progress
  - Input: `{'form': {'restaurantName': 'Valid Name', 'primaryColor': '#E67E22'}, 'api_delay': True}`
  - Expected: `{'loading_indicator': True}`

### 🔴 TEST — Tests: frontend/src/pages/AdminGestionMedios.tsx
> Ref: §1.1 (modelos de `frontend/src/pages/AdminGestionMedios.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/pages/AdminGestionMedios.test.tsx`

**Casos de prueba (implementar todos):**
- `renders image upload form and current media list`: Should render an upload form and display a list of uploaded images (media URLs)
  - Input: `{'media': [{'url': 'https://cdn/image1.png'}, {'url': 'https://cdn/image2.jpg'}]}`
  - Expected: `{'media_list': ['https://cdn/image1.png', 'https://cdn/image2.jpg']}`
- `uploads image and displays new image in media list`: Uploading a valid image file should call POST /api/media/upload and display the new image in the list
  - Input: `{'file': {'name': 'logo.png', 'type': 'image/png', 'size': 102400}, 'api_response': {'url': 'https://cdn/newlogo.png'}}`
  - Expected: `{'api_call': {'method': 'POST', 'url': '/api/media/upload', 'form_field': 'file'}, 'media_list': ['https://cdn/newlogo.png']}`
- `shows validation error for non-image file upload`: Uploading a non-image file should display a validation error and not call POST /api/media/upload
  - Input: `{'file': {'name': 'document.pdf', 'type': 'application/pdf', 'size': 204800}}`
  - Expected: `{'validation_error': 'Only image files are allowed', 'api_call': False}`
- `shows error message on failed image upload`: If POST /api/media/upload fails (e.g. 500), an error message should be displayed
  - Input: `{'file': {'name': 'logo.png', 'type': 'image/png', 'size': 102400}, 'api_error': {'status': 500, 'message': 'Upload failed'}}`
  - Expected: `{'error_message': 'Upload failed'}`
- `shows loading indicator during image upload`: A loading indicator should be shown while the image upload request is in progress
  - Input: `{'file': {'name': 'logo.png', 'type': 'image/png', 'size': 102400}, 'api_delay': True}`
  - Expected: `{'loading_indicator': True}`

### 🔴 TEST — Tests: frontend/src/pages/ClienteMenuDigital.tsx
> Ref: §1.1 (modelos de `frontend/src/pages/ClienteMenuDigital.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/pages/ClienteMenuDigital.test.tsx`

**Casos de prueba (implementar todos):**
- `renders public menu with branding, category carousel, and product list`: Should render the restaurant branding, a category carousel, and a product list for the selected category using GET /api/branding, /api/categories, and /api/products
  - Input: `{'branding': {'id': 'uuid-1', 'restaurantName': 'Test Restaurant', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#E67E22', 'createdAt': '2024-06-01T12:00:00Z', 'updatedAt': '2024-06-01T12:00:00Z'}, 'categories': [{'id': 'cat-1', 'name': 'Starters', 'description': 'Appetizers', 'imageUrl': None, 'order': 1, 'createdAt': '2024-06-01T12:00:00Z', 'updatedAt': '2024-06-01T12:00:00Z'}], 'products': [{'id': 'prod-1', 'name': 'Soup', 'description': 'Hot soup', 'price': 5.5, 'imageUrl': None, 'categoryId': 'cat-1', 'available': True, 'order': 1, 'createdAt': '2024-06-01T12:00:00Z', 'updatedAt': '2024-06-01T12:00:00Z'}]}`
  - Expected: `{'branding': {'restaurantName': 'Test Restaurant', 'logoUrl': 'https://cdn/logo.png', 'primaryColor': '#E67E22'}, 'category_carousel': [{'id': 'cat-1', 'name': 'Starters'}], 'product_list': [{'id': 'prod-1', 'name': 'Soup', 'price': 5.5, 'available': True}]}`
- `filters products by selected category`: Selecting a category in the carousel should fetch and display only products for that category using GET /api/products?categoryId
  - Input: `{'categories': [{'id': 'cat-1', 'name': 'Starters', 'description': None, 'imageUrl': None, 'order': 1, 'createdAt': '2024-06-01T12:00:00Z', 'updatedAt': '2024-06-01T12:00:00Z'}, {'id': 'cat-2', 'name': 'Mains', 'description': None, 'imageUrl': None, 'order': 2, 'createdAt': '2024-06-01T12:00:00Z', 'updatedAt': '2024-06-01T12:00:00Z'}], 'selected_category': 'cat-2', 'products': [{'id': 'prod-2', 'name': 'Steak', 'description': 'Grilled steak', 'price': 15.0, 'imageUrl': None, 'categoryId': 'cat-2', 'available': True, 'order': 1, 'createdAt': '2024-06-01T12:00:00Z', 'updatedAt': '2024-06-01T12:00:00Z'}]}`
  - Expected: `{'product_list': [{'id': 'prod-2', 'name': 'Steak', 'price': 15.0, 'available': True}]}`
- `shows empty state when no categories exist`: If GET /api/categories returns an empty array, the menu should display an empty state message
  - Input: `{'categories': []}`
  - Expected: `{'empty_state': 'No categories available'}`
- `shows error message if products fetch fails`: If GET /api/products returns an error (e.g. 500), an error message should be displayed
  - Input: `{'api_error': {'endpoint': '/api/products', 'status': 500, 'message': 'Server error'}}`
  - Expected: `{'error_message': 'Server error'}`
- `shows loading indicator while fetching menu data`: A loading indicator should be shown while branding, categories, or products are being fetched
  - Input: `{'api_delay': True}`
  - Expected: `{'loading_indicator': True}`

### 🟢 PROD — Foundation — shared types, interfaces, DB schemas, config (1/2)
> Create all shared code and configuration for backend and frontend. Includes: TypeScript interfaces, backend DTOs/entities, shared config/constants, utility functions, and the complete PostgreSQL schema with indexes. All files that will be imported by other items must be declared here.
**Archivos:**
  - `frontend/src/styles/tokens.ts`  
  - `frontend/src/types/auth.ts`  
  - `frontend/src/types/category.ts`  
  - `frontend/src/types/product.ts`  
  - `frontend/src/types/branding.ts`  
  - `frontend/src/utils/api.ts`  
  - `backend/src/modules/auth/dto/login.dto.ts`  
  - `backend/src/modules/auth/dto/token-response.dto.ts`  
  - `backend/src/modules/category/category.entity.ts`  
  - `backend/src/modules/product/product.entity.ts`  
  - `backend/src/modules/branding/branding.entity.ts`  
  - `backend/src/modules/shared/constants.ts`


### 🟢 PROD — Foundation — shared types, interfaces, DB schemas, config (2/2)
> Create all shared code and configuration for backend and frontend. Includes: TypeScript interfaces, backend DTOs/entities, shared config/constants, utility functions, and the complete PostgreSQL schema with indexes. All files that will be imported by other items must be declared here.
**Archivos:**
  - `backend/src/modules/shared/utils.ts`  
  - `backend/src/modules/shared/types.ts`  
  - `backend/src/config/database.config.ts`  
  - `backend/src/config/redis.config.ts`  
  - `backend/src/config/rabbitmq.config.ts`


### 🟢 PROD — Infrastructure & Deployment
> Complete Docker orchestration for local deployment. Includes: docker-compose.yml (all services with healthchecks and depends_on), .env.example (all variables), .gitignore, .dockerignore, run.sh (startup script), README.md (setup and usage), docs/architecture.md (system diagram and component descriptions).
**Archivos:**
  - `docker-compose.yml`  
  - `run.sh`  
  - `README.md`


## Wave 2

### 🔴 TEST — Tests: backend/src/modules/auth/auth.controller.ts
> Ref: §1.1 (modelos de `backend/src/modules/auth/auth.controller.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/auth/tests/test_auth_controller.py`

**Casos de prueba (implementar todos):**
- `test_login_valid_credentials_returns_201_with_tokens`: POST /api/auth/login with valid email and password returns 201 and a TokenResponseDto with accessToken and refreshToken fields.
  - Input: `{'email': 'admin@example.com', 'password': 'AdminPass123'}`
  - Expected: `{'status_code': 201, 'json': {'accessToken': 'string', 'refreshToken': 'string'}}`
- `test_login_invalid_password_returns_401`: POST /api/auth/login with correct email but wrong password returns 401 Unauthorized.
  - Input: `{'email': 'admin@example.com', 'password': 'WrongPassword'}`
  - Expected: `{'status_code': 401}`
- `test_login_nonexistent_email_returns_401`: POST /api/auth/login with an email not present in the database returns 401 Unauthorized.
  - Input: `{'email': 'notfound@example.com', 'password': 'AnyPassword'}`
  - Expected: `{'status_code': 401}`
- `test_login_missing_email_returns_422`: POST /api/auth/login with missing email field returns 422 Unprocessable Entity.
  - Input: `{'password': 'SomePassword'}`
  - Expected: `{'status_code': 422}`
- `test_login_missing_password_returns_422`: POST /api/auth/login with missing password field returns 422 Unprocessable Entity.
  - Input: `{'email': 'admin@example.com'}`
  - Expected: `{'status_code': 422}`
- `test_login_empty_email_and_password_returns_422`: POST /api/auth/login with empty email and password fields returns 422 Unprocessable Entity.
  - Input: `{'email': '', 'password': ''}`
  - Expected: `{'status_code': 422}`
- `test_login_invalid_email_format_returns_422`: POST /api/auth/login with invalid email format returns 422 Unprocessable Entity.
  - Input: `{'email': 'not-an-email', 'password': 'SomePassword'}`
  - Expected: `{'status_code': 422}`

### 🔴 TEST — Tests: backend/src/modules/auth/auth.service.ts
> Ref: §1.1 (modelos de `backend/src/modules/auth/auth.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/auth/tests/test_auth_service.py`

**Casos de prueba (implementar todos):**
- `test_validate_user_returns_user_on_correct_credentials`: validateUser(email, password) returns user object when credentials are correct and password is hashed.
  - Input: `{'email': 'admin@example.com', 'password': 'AdminPass123'}`
  - Expected: `{'user': {'email': 'admin@example.com'}}`
- `test_validate_user_returns_none_on_wrong_password`: validateUser(email, password) returns None when password is incorrect.
  - Input: `{'email': 'admin@example.com', 'password': 'WrongPassword'}`
  - Expected: `{'user': None}`
- `test_validate_user_returns_none_on_nonexistent_email`: validateUser(email, password) returns None when email does not exist.
  - Input: `{'email': 'notfound@example.com', 'password': 'AnyPassword'}`
  - Expected: `{'user': None}`
- `test_login_issues_jwt_tokens_on_success`: login(email, password) issues valid JWT accessToken and refreshToken on successful authentication.
  - Input: `{'email': 'admin@example.com', 'password': 'AdminPass123'}`
  - Expected: `{'accessToken': 'jwt', 'refreshToken': 'jwt'}`
- `test_login_fails_on_invalid_credentials`: login(email, password) raises authentication error on invalid credentials.
  - Input: `{'email': 'admin@example.com', 'password': 'WrongPassword'}`
  - Expected: `{'raises': 'AuthenticationError'}`
- `test_password_is_hashed_on_admin_seed`: Admin user seeded at startup has a hashed password, not plaintext.
  - Expected: `{'password_is_hashed': True}`
- `test_rbac_enforces_admin_role_on_protected_action`: RBAC logic enforces that only users with role 'admin' can perform admin-only actions.
  - Input: `{'user_role': 'user'}`
  - Expected: `{'raises': 'ForbiddenError'}`

### 🔴 TEST — Tests: backend/src/modules/category/category.controller.ts
> Ref: §1.1 (modelos de `backend/src/modules/category/category.controller.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/category/tests/test_category_controller.py`

**Casos de prueba (implementar todos):**
- `test_get_categories_returns_all_categories_ordered`: GET /api/categories returns 200 and a list of all categories ordered by the 'order' field ascending.
  - Expected: `{'status_code': 200, 'body_type': 'list', 'fields': ['id', 'name', 'description', 'imageUrl', 'order', 'createdAt', 'updatedAt'], 'order_by': 'order'}`
- `test_post_category_valid_payload_creates_category`: POST /api/categories with valid payload returns 201 and the created category object with all fields populated.
  - Input: `{'name': 'Beverages', 'description': 'Drinks and refreshments', 'imageUrl': 'https://cdn.example.com/cat1.png', 'order': 1}`
  - Expected: `{'status_code': 201, 'fields': ['id', 'name', 'description', 'imageUrl', 'order', 'createdAt', 'updatedAt'], 'body': {'name': 'Beverages', 'description': 'Drinks and refreshments', 'imageUrl': 'https://cdn.example.com/cat1.png', 'order': 1}}`
- `test_post_category_missing_name_returns_422`: POST /api/categories with missing 'name' field returns 422 Unprocessable Entity.
  - Input: `{'description': 'No name provided'}`
  - Expected: `{'status_code': 422}`
- `test_post_category_invalid_order_type_returns_422`: POST /api/categories with non-integer 'order' returns 422 Unprocessable Entity.
  - Input: `{'name': 'Desserts', 'order': 'first'}`
  - Expected: `{'status_code': 422}`
- `test_post_category_duplicate_name_returns_400`: POST /api/categories with a duplicate 'name' returns 400 Bad Request.
  - Input: `{'name': 'Snacks'}`
  - Expected: `{'status_code': 400}`
- `test_get_categories_empty_returns_empty_list`: GET /api/categories when no categories exist returns 200 and an empty list.
  - Expected: `{'status_code': 200, 'body': []}`

### 🔴 TEST — Tests: backend/src/modules/category/category.service.ts
> Ref: §1.1 (modelos de `backend/src/modules/category/category.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/category/tests/test_category_service.py`

**Casos de prueba (implementar todos):**
- `test_update_category_valid_payload_updates_category`: PUT /api/categories/:id with valid payload updates the category and returns 200 with updated fields.
  - Input: `{'id': 'cat-1', 'payload': {'name': 'Updated Name', 'description': 'Updated description', 'imageUrl': 'https://cdn.example.com/new.png', 'order': 2}}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'name', 'description', 'imageUrl', 'order', 'createdAt', 'updatedAt'], 'body': {'id': 'cat-1', 'name': 'Updated Name', 'description': 'Updated description', 'imageUrl': 'https://cdn.example.com/new.png', 'order': 2}}`
- `test_update_category_nonexistent_id_returns_404`: PUT /api/categories/:id with a non-existent id returns 404 Not Found.
  - Input: `{'id': 'cat-999', 'payload': {'name': 'Does Not Exist'}}`
  - Expected: `{'status_code': 404}`
- `test_update_category_invalid_image_url_returns_422`: PUT /api/categories/:id with invalid 'imageUrl' (not a URL) returns 422 Unprocessable Entity.
  - Input: `{'id': 'cat-2', 'payload': {'imageUrl': 'not-a-url'}}`
  - Expected: `{'status_code': 422}`
- `test_delete_category_existing_id_returns_204_and_removes_category`: DELETE /api/categories/:id with existing id returns 204 and category is removed from DB.
  - Input: `{'id': 'cat-3'}`
  - Expected: `{'status_code': 204}`
- `test_delete_category_nonexistent_id_returns_404`: DELETE /api/categories/:id with non-existent id returns 404 Not Found.
  - Input: `{'id': 'cat-404'}`
  - Expected: `{'status_code': 404}`
- `test_update_category_partial_payload_only_updates_specified_fields`: PUT /api/categories/:id with partial payload only updates specified fields and leaves others unchanged.
  - Input: `{'id': 'cat-4', 'payload': {'name': 'Partial Update'}}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'name', 'description', 'imageUrl', 'order', 'createdAt', 'updatedAt'], 'body': {'id': 'cat-4', 'name': 'Partial Update', 'description': 'Desc', 'order': 5}}`

### 🔴 TEST — Tests: backend/src/modules/product/product.controller.ts
> Ref: §1.1 (modelos de `backend/src/modules/product/product.controller.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/product/tests/test_product_controller.py`

**Casos de prueba (implementar todos):**
- `test_get_products_returns_all_products`: GET /api/products returns a 200 status and a list of all products with correct fields.
  - Input: `{'method': 'GET', 'url': '/api/products'}`
  - Expected: `{'status_code': 200, 'body_type': 'array', 'fields': ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'available', 'order', 'createdAt', 'updatedAt']}`
- `test_get_products_with_categoryId_filter_returns_filtered_products`: GET /api/products?categoryId=<uuid> returns only products matching the given categoryId.
  - Input: `{'method': 'GET', 'url': '/api/products', 'query': {'categoryId': 'existing-category-uuid'}}`
  - Expected: `{'status_code': 200, 'body_type': 'array', 'all_items': {'categoryId': 'existing-category-uuid'}}`
- `test_post_products_valid_payload_creates_product`: POST /api/products with valid payload returns 201 and the created product with all fields populated.
  - Input: `{'method': 'POST', 'url': '/api/products', 'json': {'name': 'Test Product', 'description': 'A test product', 'price': 9.99, 'imageUrl': 'https://example.com/image.png', 'categoryId': 'existing-category-uuid', 'available': True, 'order': 1}}`
  - Expected: `{'status_code': 201, 'fields': ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'available', 'order', 'createdAt', 'updatedAt'], 'values': {'name': 'Test Product', 'price': 9.99, 'categoryId': 'existing-category-uuid', 'available': True, 'order': 1}}`
- `test_post_products_missing_required_field_returns_422`: POST /api/products missing required field 'name' returns 422 Unprocessable Entity.
  - Input: `{'method': 'POST', 'url': '/api/products', 'json': {'price': 9.99, 'categoryId': 'existing-category-uuid'}}`
  - Expected: `{'status_code': 422}`
- `test_post_products_invalid_price_type_returns_422`: POST /api/products with non-numeric price returns 422 Unprocessable Entity.
  - Input: `{'method': 'POST', 'url': '/api/products', 'json': {'name': 'Invalid Price Product', 'price': 'not-a-number', 'categoryId': 'existing-category-uuid'}}`
  - Expected: `{'status_code': 422}`
- `test_post_products_invalid_categoryId_returns_400`: POST /api/products with non-existent categoryId returns 400 Bad Request.
  - Input: `{'method': 'POST', 'url': '/api/products', 'json': {'name': 'Product', 'price': 10.0, 'categoryId': 'non-existent-uuid'}}`
  - Expected: `{'status_code': 400}`
- `test_put_products_id_valid_payload_updates_product`: PUT /api/products/:id with valid payload updates the product and returns 200 with updated fields.
  - Input: `{'method': 'PUT', 'url': '/api/products/existing-product-uuid', 'json': {'name': 'Updated Product Name', 'price': 19.99, 'available': False}}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'available', 'order', 'createdAt', 'updatedAt'], 'values': {'id': 'existing-product-uuid', 'name': 'Updated Product Name', 'price': 19.99, 'available': False}}`
- `test_put_products_id_nonexistent_returns_404`: PUT /api/products/:id for non-existent product returns 404 Not Found.
  - Input: `{'method': 'PUT', 'url': '/api/products/non-existent-uuid', 'json': {'name': 'Should Not Exist'}}`
  - Expected: `{'status_code': 404}`
- `test_put_products_id_invalid_price_type_returns_422`: PUT /api/products/:id with invalid price type returns 422 Unprocessable Entity.
  - Input: `{'method': 'PUT', 'url': '/api/products/existing-product-uuid', 'json': {'price': 'not-a-number'}}`
  - Expected: `{'status_code': 422}`
- `test_delete_products_id_existing_product_returns_success_true`: DELETE /api/products/:id for existing product returns 200 and { success: true }.
  - Input: `{'method': 'DELETE', 'url': '/api/products/existing-product-uuid'}`
  - Expected: `{'status_code': 200, 'fields': ['success'], 'values': {'success': True}}`

### 🔴 TEST — Tests: backend/src/modules/product/product.service.ts
> Ref: §1.1 (modelos de `backend/src/modules/product/product.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/product/tests/test_product_service.py`

**Casos de prueba (implementar todos):**
- `test_create_product_with_valid_data_returns_product`: Creating a product with valid data returns a Product entity with all fields set.
  - Input: `{'name': 'Service Product', 'description': 'Created by service', 'price': 12.5, 'imageUrl': 'https://example.com/img.png', 'categoryId': 'existing-category-uuid', 'available': True, 'order': 2}`
  - Expected: `{'fields': ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'available', 'order', 'createdAt', 'updatedAt'], 'values': {'name': 'Service Product', 'price': 12.5, 'categoryId': 'existing-category-uuid', 'available': True, 'order': 2}}`
- `test_create_product_missing_required_field_raises_validation_error`: Creating a product without required field 'name' raises a validation error.
  - Input: `{'price': 10.0, 'categoryId': 'existing-category-uuid'}`
  - Expected: `{'raises': 'ValidationError'}`
- `test_create_product_with_invalid_categoryId_raises_error`: Creating a product with a non-existent categoryId raises a NotFound or IntegrityError.
  - Input: `{'name': 'Invalid Category', 'price': 10.0, 'categoryId': 'non-existent-uuid'}`
  - Expected: `{'raises': 'NotFoundError'}`
- `test_update_product_with_valid_data_updates_fields`: Updating an existing product with valid data updates the fields and returns the updated Product.
  - Input: `{'id': 'existing-product-uuid', 'update_data': {'name': 'Updated Name', 'price': 20.0, 'available': False}}`
  - Expected: `{'fields': ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'available', 'order', 'createdAt', 'updatedAt'], 'values': {'id': 'existing-product-uuid', 'name': 'Updated Name', 'price': 20.0, 'available': False}}`
- `test_update_product_nonexistent_raises_not_found`: Updating a non-existent product raises a NotFoundError.
  - Input: `{'id': 'non-existent-uuid', 'update_data': {'name': 'Should Not Exist'}}`
  - Expected: `{'raises': 'NotFoundError'}`
- `test_delete_product_existing_returns_true`: Deleting an existing product returns True and removes the product from the database.
  - Input: `{'id': 'existing-product-uuid'}`
  - Expected: `{'result': True}`
- `test_delete_product_nonexistent_returns_false`: Deleting a non-existent product returns False.
  - Input: `{'id': 'non-existent-uuid'}`
  - Expected: `{'result': False}`
- `test_get_products_ordering_by_order_field`: Retrieving products returns them ordered by the 'order' field ascending.
  - Expected: `{'ordered_by': 'order', 'direction': 'asc'}`
- `test_create_product_with_null_optional_fields_succeeds`: Creating a product with null optional fields (description, imageUrl, order, available) succeeds and sets those fields to null or default.
  - Input: `{'name': 'Null Optionals', 'price': 5.0, 'categoryId': 'existing-category-uuid'}`
  - Expected: `{'fields': ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'available', 'order', 'createdAt', 'updatedAt'], 'values': {'description': None, 'imageUrl': None, 'order': None, 'available': True}}`
- `test_create_product_with_negative_price_raises_validation_error`: Creating a product with negative price raises a validation error.
  - Input: `{'name': 'Negative Price', 'price': -1.0, 'categoryId': 'existing-category-uuid'}`
  - Expected: `{'raises': 'ValidationError'}`

### 🔴 TEST — Tests: backend/src/modules/branding/branding.controller.ts
> Ref: §1.1 (modelos de `backend/src/modules/branding/branding.controller.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/branding/tests/test_branding_controller.py`

**Casos de prueba (implementar todos):**
- `test_get_branding_returns_branding_object`: GET /api/branding returns the current Branding object with all required fields.
  - Expected: `{'status_code': 200, 'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt']}`
- `test_put_branding_updates_fields_and_returns_updated_branding`: PUT /api/branding with valid restaurantName, logoUrl, and primaryColor updates the branding and returns the updated Branding object.
  - Input: `{'restaurantName': 'Testaurant', 'logoUrl': 'http://localhost/media/logo.png', 'primaryColor': '#E67E22'}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt'], 'values': {'restaurantName': 'Testaurant', 'logoUrl': 'http://localhost/media/logo.png', 'primaryColor': '#E67E22'}}`
- `test_put_branding_missing_all_fields_returns_400`: PUT /api/branding with no fields in the body returns 400 Bad Request.
  - Expected: `{'status_code': 400}`
- `test_put_branding_invalid_primary_color_returns_422`: PUT /api/branding with invalid primaryColor (not a HEX string) returns 422 Unprocessable Entity.
  - Input: `{'primaryColor': 'orange'}`
  - Expected: `{'status_code': 422}`
- `test_get_branding_when_no_branding_exists_returns_default`: GET /api/branding when no branding exists returns a default Branding object with null or default values.
  - Expected: `{'status_code': 200, 'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt']}`

### 🔴 TEST — Tests: backend/src/modules/branding/branding.service.ts
> Ref: §1.1 (modelos de `backend/src/modules/branding/branding.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/branding/tests/test_branding_service.py`

**Casos de prueba (implementar todos):**
- `test_get_branding_returns_existing_branding`: BrandingService.get_branding returns the existing Branding entity from the database.
  - Expected: `{'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt']}`
- `test_update_branding_updates_fields`: BrandingService.update_branding updates restaurantName, logoUrl, and primaryColor fields and returns the updated Branding entity.
  - Input: `{'restaurantName': 'Updated Name', 'logoUrl': 'http://localhost/media/newlogo.png', 'primaryColor': '#123456'}`
  - Expected: `{'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt'], 'values': {'restaurantName': 'Updated Name', 'logoUrl': 'http://localhost/media/newlogo.png', 'primaryColor': '#123456'}}`
- `test_update_branding_with_invalid_primary_color_raises_validation_error`: BrandingService.update_branding with invalid primaryColor (not HEX) raises a validation error.
  - Input: `{'primaryColor': 'notAHex'}`
  - Expected: `{'exception': 'ValidationError'}`
- `test_update_branding_with_partial_fields_only_updates_specified_fields`: BrandingService.update_branding with only restaurantName updates only the restaurantName field, leaving others unchanged.
  - Input: `{'restaurantName': 'Partial Update'}`
  - Expected: `{'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt'], 'values': {'restaurantName': 'Partial Update'}}`
- `test_get_branding_when_none_exists_returns_default_branding`: BrandingService.get_branding returns a default Branding entity if none exists in the database.
  - Expected: `{'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt']}`

### 🔴 TEST — Tests: backend/src/modules/media/media.controller.ts
> Ref: §1.1 (modelos de `backend/src/modules/media/media.controller.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/media/tests/test_media_controller.py`

**Casos de prueba (implementar todos):**
- `test_post_media_upload_valid_image_returns_url`: POST /api/media/upload with a valid image file in 'file' field returns 201 and a JSON object with the uploaded image URL.
  - Input: `{'file': 'test_image.png'}`
  - Expected: `{'status_code': 201, 'fields': ['url']}`
- `test_post_media_upload_missing_file_returns_400`: POST /api/media/upload without the 'file' field returns 400 Bad Request.
  - Expected: `{'status_code': 400}`
- `test_post_media_upload_invalid_file_type_returns_422`: POST /api/media/upload with a non-image file (e.g., .txt) returns 422 Unprocessable Entity.
  - Input: `{'file': 'not_an_image.txt'}`
  - Expected: `{'status_code': 422}`
- `test_post_media_upload_large_file_returns_413`: POST /api/media/upload with a file exceeding the maximum allowed size returns 413 Payload Too Large.
  - Input: `{'file': 'large_image.jpg'}`
  - Expected: `{'status_code': 413}`
- `test_post_media_upload_duplicate_filename_returns_unique_url`: POST /api/media/upload with a file that has the same name as an existing file returns a unique URL for the new upload.
  - Input: `{'file': 'duplicate_name.png'}`
  - Expected: `{'status_code': 201, 'fields': ['url']}`

### 🔴 TEST — Tests: backend/src/modules/media/media.service.ts
> Ref: §1.1 (modelos de `backend/src/modules/media/media.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/modules/media/tests/test_media_service.py`

**Casos de prueba (implementar todos):**
- `test_save_image_file_saves_file_and_returns_url`: MediaService.save_image_file saves a valid image file to local storage and returns the correct URL.
  - Input: `{'file': 'test_image.png'}`
  - Expected: `{'fields': ['url']}`
- `test_save_image_file_with_invalid_file_type_raises_validation_error`: MediaService.save_image_file with a non-image file raises a validation error.
  - Input: `{'file': 'not_an_image.txt'}`
  - Expected: `{'exception': 'ValidationError'}`
- `test_save_image_file_with_large_file_raises_file_too_large_error`: MediaService.save_image_file with a file exceeding the maximum allowed size raises a FileTooLargeError.
  - Input: `{'file': 'large_image.jpg'}`
  - Expected: `{'exception': 'FileTooLargeError'}`
- `test_save_image_file_with_duplicate_filename_saves_with_unique_name`: MediaService.save_image_file with a filename that already exists saves the new file with a unique name and returns the new URL.
  - Input: `{'file': 'duplicate_name.png'}`
  - Expected: `{'fields': ['url']}`
- `test_serve_image_returns_file_content`: MediaService.serve_image returns the correct file content for a valid image filename.
  - Input: `{'filename': 'test_image.png'}`
  - Expected: `{'content_type': 'image/png'}`

### 🔴 TEST — Tests: frontend/src/hooks/useAuth.ts
> Ref: §1.1 (modelos de `frontend/src/hooks/useAuth.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useAuth.test.tsx`

**Casos de prueba (implementar todos):**
- `should login successfully and store tokens`: When login is called with valid email and password, it should call POST /api/auth/login, receive accessToken and refreshToken, and store them in localStorage.
  - Input: `{'email': 'user@example.com', 'password': 'ValidPass123'}`
  - Expected: `{'status_code': 201, 'fields': ['accessToken', 'refreshToken'], 'side_effects': ['tokens stored in localStorage']}`
- `should return error on invalid credentials`: When login is called with invalid credentials, it should return an error and not store any tokens.
  - Input: `{'email': 'user@example.com', 'password': 'WrongPass'}`
  - Expected: `{'status_code': 401, 'fields': [], 'side_effects': ['no tokens stored in localStorage']}`
- `should handle missing email validation error`: When login is called without an email, it should return a validation error and not attempt the API call.
  - Input: `{'password': 'ValidPass123'}`
  - Expected: `{'status_code': 422, 'fields': [], 'side_effects': ['no API call made', 'no tokens stored in localStorage']}`
- `should clear tokens on logout`: When logout is called, it should remove accessToken and refreshToken from localStorage.
  - Expected: `{'side_effects': ['tokens removed from localStorage']}`
- `should initialize auth state from localStorage`: On hook initialization, if tokens exist in localStorage, auth state should reflect logged-in status.
  - Input: `{'localStorage': {'accessToken': 'abc', 'refreshToken': 'def'}}`
  - Expected: `{'authState': 'logged-in'}`

### 🔴 TEST — Tests: frontend/src/hooks/useCategories.ts
> Ref: §1.1 (modelos de `frontend/src/hooks/useCategories.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useCategories.test.tsx`

**Casos de prueba (implementar todos):**
- `should fetch categories successfully`: When useCategories is used, it should fetch categories from GET /api/categories and return an array of Category objects.
  - Expected: `{'status_code': 200, 'fields': ['id', 'name', 'description', 'imageUrl', 'order', 'createdAt', 'updatedAt']}`
- `should handle API error when fetching categories`: If GET /api/categories returns an error, the hook should set an error state.
  - Input: `{'apiError': 500}`
  - Expected: `{'error': True}`
- `should add a new category successfully`: When addCategory is called with valid data, it should POST to /api/categories and update the categories list.
  - Input: `{'category': {'name': 'Drinks', 'description': 'Beverages', 'imageUrl': None, 'order': 1}}`
  - Expected: `{'status_code': 201, 'fields': ['id', 'name', 'description', 'imageUrl', 'order', 'createdAt', 'updatedAt'], 'side_effects': ['categories list updated']}`
- `should handle validation error when adding category`: When addCategory is called with missing name, it should return a validation error and not update the categories list.
  - Input: `{'category': {'description': 'No name'}}`
  - Expected: `{'status_code': 422, 'side_effects': ['categories list unchanged']}`
- `should update a category successfully`: When updateCategory is called with valid data, it should PUT to /api/categories/:id and update the categories list.
  - Input: `{'id': 'cat-123', 'update': {'name': 'Updated Name'}}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'name', 'description', 'imageUrl', 'order', 'createdAt', 'updatedAt'], 'side_effects': ['categories list updated']}`
- `should delete a category successfully`: When deleteCategory is called with a valid id, it should DELETE /api/categories/:id and remove the category from the list.
  - Input: `{'id': 'cat-123'}`
  - Expected: `{'status_code': 204, 'side_effects': ['category removed from list']}`
- `should handle error when deleting non-existent category`: When deleteCategory is called with an invalid id, it should return an error and not change the categories list.
  - Input: `{'id': 'non-existent'}`
  - Expected: `{'status_code': 404, 'side_effects': ['categories list unchanged']}`

### 🔴 TEST — Tests: frontend/src/hooks/useProducts.ts
> Ref: §1.1 (modelos de `frontend/src/hooks/useProducts.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useProducts.test.tsx`

**Casos de prueba (implementar todos):**
- `should fetch products successfully`: When useProducts is used, it should fetch products from GET /api/products and return an array of Product objects.
  - Expected: `{'status_code': 200, 'fields': ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'available', 'order', 'createdAt', 'updatedAt']}`
- `should fetch products by categoryId`: When useProducts is called with a categoryId, it should fetch only products in that category.
  - Input: `{'categoryId': 'cat-123'}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'categoryId']}`
- `should handle API error when fetching products`: If GET /api/products returns an error, the hook should set an error state.
  - Input: `{'apiError': 500}`
  - Expected: `{'error': True}`
- `should add a new product successfully`: When addProduct is called with valid data, it should POST to /api/products and update the products list.
  - Input: `{'product': {'name': 'Latte', 'price': 3.5, 'categoryId': 'cat-123'}}`
  - Expected: `{'status_code': 201, 'fields': ['id', 'name', 'price', 'categoryId', 'createdAt', 'updatedAt'], 'side_effects': ['products list updated']}`
- `should handle validation error when adding product`: When addProduct is called with missing name or price, it should return a validation error and not update the products list.
  - Input: `{'product': {'categoryId': 'cat-123'}}`
  - Expected: `{'status_code': 422, 'side_effects': ['products list unchanged']}`
- `should update a product successfully`: When updateProduct is called with valid data, it should PUT to /api/products/:id and update the products list.
  - Input: `{'id': 'prod-123', 'update': {'name': 'Updated Product'}}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'name', 'price', 'categoryId', 'createdAt', 'updatedAt'], 'side_effects': ['products list updated']}`
- `should delete a product successfully`: When deleteProduct is called with a valid id, it should DELETE /api/products/:id and remove the product from the list.
  - Input: `{'id': 'prod-123'}`
  - Expected: `{'status_code': 204, 'side_effects': ['product removed from list']}`
- `should handle error when deleting non-existent product`: When deleteProduct is called with an invalid id, it should return an error and not change the products list.
  - Input: `{'id': 'non-existent'}`
  - Expected: `{'status_code': 404, 'side_effects': ['products list unchanged']}`

### 🔴 TEST — Tests: frontend/src/hooks/useBranding.ts
> Ref: §1.1 (modelos de `frontend/src/hooks/useBranding.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useBranding.test.tsx`

**Casos de prueba (implementar todos):**
- `should fetch branding successfully`: When useBranding is used, it should fetch branding data from GET /api/branding and return a Branding object.
  - Expected: `{'status_code': 200, 'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt']}`
- `should handle API error when fetching branding`: If GET /api/branding returns an error, the hook should set an error state.
  - Input: `{'apiError': 500}`
  - Expected: `{'error': True}`
- `should update branding successfully`: When updateBranding is called with valid data, it should PUT to /api/branding and update the branding state.
  - Input: `{'branding': {'restaurantName': 'Cafe X', 'primaryColor': '#E67E22'}}`
  - Expected: `{'status_code': 200, 'fields': ['id', 'restaurantName', 'logoUrl', 'primaryColor', 'createdAt', 'updatedAt'], 'side_effects': ['branding state updated']}`
- `should handle validation error when updating branding`: When updateBranding is called with invalid primaryColor (not HEX), it should return a validation error and not update branding state.
  - Input: `{'branding': {'primaryColor': 'not-a-hex'}}`
  - Expected: `{'status_code': 422, 'side_effects': ['branding state unchanged']}`

### 🔴 TEST — Tests: frontend/src/hooks/useMediaUpload.ts
> Ref: §1.1 (modelos de `frontend/src/hooks/useMediaUpload.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useMediaUpload.test.tsx`

**Casos de prueba (implementar todos):**
- `should upload image successfully`: When uploadMedia is called with a valid image file, it should POST to /api/media/upload and return the uploaded image URL.
  - Input: `{'file': 'valid-image.png'}`
  - Expected: `{'status_code': 201, 'fields': ['url']}`
- `should handle API error during upload`: If POST /api/media/upload returns an error, the hook should set an error state.
  - Input: `{'file': 'valid-image.png', 'apiError': 500}`
  - Expected: `{'error': True}`
- `should handle missing file validation error`: When uploadMedia is called without a file, it should return a validation error and not attempt the API call.
  - Expected: `{'status_code': 422, 'side_effects': ['no API call made']}`
- `should handle unsupported file type error`: When uploadMedia is called with an unsupported file type, it should return a validation error and not attempt the API call.
  - Input: `{'file': 'malicious.exe'}`
  - Expected: `{'status_code': 422, 'side_effects': ['no API call made']}`

### 🟢 PROD — Backend — Auth & User Management (NestJS)
> Implement authentication endpoints and admin user management. Includes: POST /api/auth/login (JWT), token issuance, password hashing, admin user seed, RBAC enforcement, and healthcheck endpoint.
**Archivos:**
  - `backend/src/modules/auth/auth.controller.ts`  
  - `backend/src/modules/auth/auth.service.ts`


### 🟢 PROD — Backend — Categories Module (NestJS)
> Implement CRUD endpoints for categories. Includes: GET/POST/PUT/DELETE /api/categories, input validation, ordering, image URL support, and DB integration.
**Archivos:**
  - `backend/src/modules/category/category.controller.ts`  
  - `backend/src/modules/category/category.service.ts`


### 🟢 PROD — Backend — Products Module (NestJS)
> Implement CRUD endpoints for products. Includes: GET/POST/PUT/DELETE /api/products, filtering by categoryId, input validation, ordering, image URL, and DB integration.
**Archivos:**
  - `backend/src/modules/product/product.controller.ts`  
  - `backend/src/modules/product/product.service.ts`


### 🟢 PROD — Backend — Branding & Media Modules (NestJS)
> Implement branding and media endpoints. Includes: GET/PUT /api/branding (restaurant name, logo, primary color), POST /api/media/upload (multipart image upload, local storage), and public image serving.
**Archivos:**
  - `backend/src/modules/branding/branding.controller.ts`  
  - `backend/src/modules/branding/branding.service.ts`  
  - `backend/src/modules/media/media.controller.ts`  
  - `backend/src/modules/media/media.service.ts`


### 🟢 PROD — Frontend — Design Tokens, Types, API Hooks, Utilities
> Implement design tokens, TypeScript types, API utility, and React hooks for data fetching and state management. All hooks/components must use the shared types and tokens.
**Archivos:**
  - `frontend/src/hooks/useAuth.ts`  
  - `frontend/src/hooks/useCategories.ts`  
  - `frontend/src/hooks/useProducts.ts`  
  - `frontend/src/hooks/useBranding.ts`  
  - `frontend/src/hooks/useMediaUpload.ts`


## Wave 3

### 🟢 PROD — Backend — App Module, Main Entrypoint, Dockerfile
> Wire up all backend modules, configure NestJS app, connect to DB/Redis/RabbitMQ, run migrations/seeds on startup, expose healthcheck, and provide Dockerfile for containerization.
**Archivos:**
  - `backend/src/app.module.ts`  
  - `backend/src/main.ts`


### 🟢 PROD — Frontend — UI Components (Admin & Client)
> Implement all UI components as per Figma and UI/UX contract. Includes: PrimaryNavigation, CTAButton, Card, InputField, ImageUpload, Modal, CategoryCarousel, ProductList.
**Archivos:**



## Wave 4

### 🟢 PROD — Frontend — Admin Pages (Login, Dashboard, Categorías, Productos)
> Implement admin panel pages as per Figma: AdminLogin, AdminDashboard, AdminGestionCategorias, AdminGestionProductos. Wire up hooks, components, and API integration.
**Archivos:**



### 🟢 PROD — Frontend — Branding, Media, and Client Menu Pages
> Implement AdminGestionMedios, AdminIdentidadVisual, and ClienteMenuDigital pages. Includes branding config, image management, and public menu view with category carousel and product list.
**Archivos:**



## Wave 5

### 🟢 PROD — Frontend — App Entrypoint, Routing, Dockerfile
> Implement React app entrypoint, routing, and Dockerfile for containerization. Includes: main.tsx, App.tsx, Vite config, public/index.html, tsconfig.json, Dockerfile.
**Archivos:**
  - `frontend/src/main.tsx`  
  - `frontend/src/App.tsx`  
  - `frontend/vite.config.ts`  
  - `frontend/tsconfig.json`  
  - `frontend/public/index.html`


---

# §3 Reglas de Infraestructura (obligatorias)

## §3.1 Dockerfiles
- `WORKDIR /app` en todos los Dockerfiles — paths portables, nunca UUIDs ni `/workspace/...`
- El `docker build` debe funcionar en cualquier máquina sin modificaciones

## §3.2 Base de Datos — Auto-Init Obligatorio
Si el proyecto usa base de datos relacional (PostgreSQL, MySQL, SQLite, MariaDB, etc.),
el backend DEBE ejecutar esta secuencia automáticamente al arrancar el contenedor:

1. **Esperar a que la DB esté lista** — retry loop o wait-for-it, nunca asumir que está disponible
2. **Correr migraciones** — `alembic upgrade head` / `prisma migrate deploy` / `knex migrate:latest` / etc.
3. **Seed de datos de ejemplo** — solo si la tabla principal está vacía (idempotente, nunca duplica al reiniciar)
   - Insertar **3–5 registros realistas** por entidad principal
   - El seed usa los mismos modelos/schemas del proyecto — nunca SQL crudo hardcodeado
   - Patrón Python: `if db.query(Model).count() == 0: db.add_all([...]); db.commit()`
   - Patrón Node: `const count = await prisma.model.count(); if (count === 0) { await prisma.model.createMany({...}) }`

Resultado: después de `./run.sh` la app tiene datos de ejemplo listos, sin pasos manuales.

## §3.3 Puertos de Servicio
- Rango obligatorio para **todos** los puertos del host en docker-compose.yml: **21000–65000**.
- Aplica a TODOS los servicios: backends, frontends Y bases de datos / infraestructura.
- El puerto interno del contenedor se mantiene en el default de la tecnología:
  | Tecnología | Puerto interno | Ejemplo host mapping |
  |-----------|---------------|----------------------|
  | PostgreSQL | 5432 | `'25432:5432'` |
  | MySQL      | 3306 | `'23306:3306'` |
  | Redis      | 6379 | `'26379:6379'` |
  | MongoDB    | 27017 | `'37017:27017'` |
  | Backend API | (PORT TABLE §1.1) | `'23001:23001'` |
- NUNCA exponer 3000, 5000, 5432, 6379, 8000, 8080, 8443 en el lado del host.
- El Tech Lead remapeará automáticamente cualquier puerto fuera del rango 21000–65000.

## §3.4 Frontend con Vite / React / Vue
- `index.html` en la RAÍZ del proyecto (mismo nivel que `package.json` y `vite.config.js`)
- NUNCA solo en `public/` — Vite requiere el entry point en la raíz
- Entry point: `<script type='module' src='/src/main.jsx'></script>`

## §3.5 Variables de Entorno
- Vite: `import.meta.env.VITE_NOMBRE` con fallback → `|| 'http://localhost:PUERTO'` (PUERTO del PORT TABLE §1.1)
- Nunca hardcodear URLs, tokens ni secrets en código fuente

## §3.6 Criterios de Finalización
- Todos los archivos listados en §2 deben existir en disco
- Código completo y funcional — sin TODOs ni stubs
- Tests corriendo y pasando antes del commit final
- `git add -A && git commit -m 'feat: implement project'`

## §3.7 Configuración de Test Tooling (requerida por ítems 🔴 TEST del §2)

### pytest
- Test files → `{service_root}/tests/test_*.py` (never co-located with source)
- `requirements.txt` MUST include: `pytest`, `pytest-cov`, `pytest-asyncio`, `httpx`
- Run: `python -m pytest tests/ --tb=short -q --cov=. --cov-report=term-missing`

### vitest
- Test files → `{frontend_root}/tests/*.test.{js,jsx,ts,tsx}` (never `.spec.*` co-located with source)
- `package.json` MUST include in `devDependencies`: `vitest`, `@vitest/coverage-v8`, `jsdom`
- For React projects also add: `@testing-library/react`, `@testing-library/jest-dom`
- `package.json` MUST include script: `"test": "vitest run --coverage"`
- `vite.config.*` MUST include `test` section:
  ```js
  test: { globals: true, environment: 'jsdom', include: ['tests/**/*.test.{js,jsx,ts,tsx}'] }
  ```
- Create `{frontend_root}/tests/setup.js` with: `import '@testing-library/jest-dom'`
- Run: `npx vitest run --coverage`