# Reporte de Cobertura de Pruebas
Fecha: 2026-05-12 | Proyecto: MenuDigital | Modo: TDD

## 1. Resumen Ejecutivo
| Capa | Framework | Estado | Cobertura | Tests Pasados | Tests Fallidos |
|------|-----------|--------|-----------|---------------|----------------|
| Backend | pytest | FAIL | 0% | 0 | 0 |
| Frontend | jest | FAIL | 0% | 0 | 26 |

**Evaluación general:** El proyecto presenta fallos críticos en la ejecución de tests. El backend no encuentra el directorio de tests, y el frontend tiene errores de configuración de Jest/Babel que impiden la ejecución de todos los test suites. No se puede evaluar la cobertura real hasta que se resuelvan los problemas de infraestructura.

## 2. KPIs de Calidad
| Indicador | Valor | Umbral | Estado |
|-----------|-------|--------|--------|
| Cobertura global (promedio) | 0% | ≥90% | FAIL |
| Tests totales ejecutados | 0 | - | - |
| Tests fallidos | 0 | 0 | OK* |
| Capas sin cobertura | 2 | 0 | FAIL |

*Nota: Los tests técnicamente no "fallaron" sino que no se ejecutaron debido a errores de configuración.

## 3. Detalle por Capa — Backend
No hay datos de cobertura disponibles. El directorio `tests/` no fue encontrado en la ruta esperada `backend/src/tests/`.

```
ERROR: file or directory not found: tests/
```

## 4. Detalle por Capa — Frontend
No hay datos de cobertura disponibles. Todos los 26 test suites fallaron al intentar ejecutarse debido a errores de parseo de JSX/TypeScript.

| Archivo | %Stmts | %Branch | %Funcs | %Lines | Sin cubrir |
|---------|--------|---------|--------|--------|------------|
| N/A | N/A | N/A | N/A | N/A | N/A |

## 5. Tests Fallidos
| Test | Capa | Error | Prioridad |
|------|------|-------|-----------|
| tests/pages/AdminLogin.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/pages/ClienteMenuDigital.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/components/ProductList.test.tsx | Frontend | SyntaxError: Missing initializer in const declaration | ALTA |
| tests/pages/AdminIdentidadVisual.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/hooks/useProducts.test.tsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| tests/hooks/useAuth.test.tsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| tests/pages/AdminGestionProductos.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/components/CategoryCarousel.test.tsx | Frontend | SyntaxError: Missing initializer in const declaration | ALTA |
| tests/pages/AdminGestionCategorias.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/hooks/useBranding.test.tsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| tests/hooks/useCategories.test.tsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| tests/types/product.test.ts | Frontend | SyntaxError: Missing initializer in const declaration | ALTA |
| tests/components/Modal.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/hooks/useMediaUpload.test.tsx | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| tests/utils/api.test.ts | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| tests/components/Card.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/styles/tokens.test.ts | Frontend | SyntaxError: Cannot use import statement outside a module | ALTA |
| tests/types/auth.test.ts | Frontend | SyntaxError: Missing initializer in const declaration | ALTA |
| tests/components/PrimaryNavigation.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/pages/AdminDashboard.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |
| tests/pages/AdminGestionMedios.test.tsx | Frontend | SyntaxError: Support for the experimental syntax 'jsx' isn't currently enabled | ALTA |

Backend: El directorio `tests/` no fue encontrado. Todos los tests de backend requieren configuración del path de tests.

## 6. Líneas Sin Cubrir (top 10 por impacto)
| Archivo | Líneas | Motivo probable |
|---------|--------|-----------------|
| N/A | N/A | No hay datos de cobertura - los tests no se ejecutaron |

## 7. Análisis de Calidad
### Fortalezas
- El proyecto tiene una estructura de directorios de tests claramente definida
- Existe configuración de Jest en el frontend
- Se identificaron 26 archivos de test en el frontend y configuración de pytest en el backend

### Áreas de Mejora
- **Backend**: El directorio de tests está en una ubicación no reconocida por el script run_tests.sh. Se requiere mover los tests o actualizar la configuración de pytest
- **Frontend**: Jest no está configurado para procesar archivos TSX/TS con la sintaxis correcta. Faltan presets de Babel (@babel/preset-react, @babel/preset-typescript) en la configuración
- Los hooks y utilidades usan import statements que Jest no puede procesar sin transformadores adecuados

## 8. Recomendaciones (priorizadas)
1. **ALTA:** Configurar Jest con los presets de Babel correctos (@babel/preset-react, @babel/preset-typescript) en el archivo de configuración del frontend
2. **ALTA:** Verificar la ubicación del directorio de tests del backend y actualizar el script run_tests.sh o mover los tests a la ruta esperada
3. **MEDIA:** Agregar transformIgnorePatterns en Jest config para procesar node_modules que contengan código ES6+
4. **BAJA:** Implementar coverage reporting con vitest si se migra a Vitest para mayor compatibilidad con Vite

## 9. Output Completo de Tests
### Backend
```
>>> [backend/src] Installing Python test dependencies...
>>> [backend/src] Running tests...
/usr/local/lib/python3.11/site-packages/pytest_asyncio/plugin.py:208: PytestDeprecationWarning: The configuration option "asyncio_default_fixture_loop_scope" is unset.
The event loop scope for asynchronous fixtures will default to the fixture caching scope. Future versions of pytest-asyncio will default the loop scope for asynchronous fixtures to function scope. Set the default fixture loop scope explicitly in order to avoid unexpected behavior in the future. Valid fixture loop scopes are: "function", "class", "module", "package", "session"

  warnings.warn(PytestDeprecationWarning(_DEFAULT_FIXTURE_LOOP_SCOPE_UNSET))

no tests ran in 0.03s
ERROR: file or directory not found: tests/

>>> [backend/src] Done.
```

### Frontend
```
>>> [frontend] Installing JS test dependencies...
>>> [frontend] Running tests...
FAIL tests/pages/AdminLogin.test.tsx
  ● Test suite failed to run

    Jest encountered an unexpected token
    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.
    Details:
    SyntaxError: /workspace/0f28af24-856a-43ae-b772-10c4ebd02c19/frontend/tests/pages/AdminLogin.test.tsx: Support for the experimental syntax 'jsx' isn't currently enabled (14:14):
       12 |   describe('renders login form with email and password fields', () => {
       13 |     it('The AdminLogin page must render a form with email and password input fields and a submit button', () => {
    > 14 |       render(<AdminLogin />);
          |              ^
       15 |       expect(screen.getByRole('textbox', { name: /email/i })).toBeTruthy();

    Add @babel/preset-react to the 'presets' section of your Babel config to enable transformation.

[... 26 test suites failed with similar errors ...]

Test Suites: 26 failed, 26 total
Tests:       0 total
Snapshots:   0 total
Time:        22.903 s
Ran all test suites.
>>> [frontend] Done.
```

## 10. Metadata
| Campo | Valor |
|-------|-------|
| Generado | 2026-05-12 22:32 UTC |
| Modo | TDD (tests escritos antes del código) |
| Umbral configurado | ≥90% |
| Herramientas | pytest v8+ / jest v29+ |
