<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Sobre el Proyecto

E-commerce desarrollado con **Laravel 10** como backend API RESTful que incluye:

- Autenticación JWT mediante Laravel Sanctum
- Arquitectura MVC con migraciones de base de datos
- Modelos Eloquent con relaciones (Productos <-> Categorías)
- API Resources para formato de respuesta estandarizado
- Controladores API con validación de datos integrada
- Sistema de roles y permisos con Policies
- Integración con frontend React mediante endpoints para:
  - Gestión de productos (CRUD)
  - Operaciones de carrito
  - Autenticación de usuarios
  - Búsqueda y filtrado

La aplicación sigue un enfoque moderno con:
- Base de datos SQLite para desarrollo
- Sistema de rutas API versionadas
- Validación de requests con Form Requests
- Paginación de resultados
- Manejo de errores estandarizado

## Funcionalidades Actuales

- Autenticación de usuarios (registro/login)
- Gestión de productos y categorías
- Carrito de compras con sesión persistente
- API REST básica para operaciones CRUD
- Sistema de roles básico

## Tiempo de Desarrollo

🕒 **Tiempo invertido**: 4 días de desarrollo activo

## Roadmap y Estimación

🚀 **Próximas características** (Estimado 2-3 semanas):
- Pasarela de pagos integrada
- Panel de administración avanzado
- Sistema de reseñas y valoraciones
- Integración con APIs de transporte
- Notificaciones por email
- Informes y estadísticas

## Estado Actual

✅ Versión funcional básica
🔧 En desarrollo activo

## Instalación

```bash
composer install
cp .env.example .env
php artisan key:generate
```

## Licencia

El framework Laravel es código abierto bajo la [licencia MIT](https://opensource.org/licenses/MIT).

---

*Este documento se actualizará según progrese el desarrollo del proyecto.*
