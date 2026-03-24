# Luli Arte — Portfolio & Tienda Online

Portfolio y tienda online para artista visual. Built with Next.js 14, Supabase, Stripe y Resend.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS + Framer Motion
- **Base de datos**: Supabase (PostgreSQL + Storage)
- **Pagos**: Stripe
- **Prints**: Printful API
- **Emails**: Resend + React Email
- **Deploy**: Vercel

## Requisitos

- Node.js 18+
- npm o pnpm
- Cuenta en [supabase.com](https://supabase.com)
- Cuenta en [Stripe](https://stripe.com)
- Cuenta en [Resend](https://resend.com)

## Setup local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
cp .env.example .env.local
```

| Variable | Dónde obtenerla |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key (secreto) |
| `STRIPE_SECRET_KEY` | [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Mismo lugar |
| `STRIPE_WEBHOOK_SECRET` | Ver sección Webhooks más abajo |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys) |
| `ARTIST_EMAIL` | Email del artista para recibir encargos y contactos |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio en producción (ej: `https://luliarte.com`) |

### 3. Supabase — Configuración

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a SQL Editor y ejecutar el contenido de `src/lib/supabase/schema.sql`
3. Crear bucket de Storage llamado `obras` con acceso público
4. Copiar URL y keys a `.env.local`
5. Subir imágenes desde Storage → obras/
6. Agregar obras desde Table Editor → obras

### 4. Correr en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Stripe — Configuración de Webhooks

### En desarrollo (Stripe CLI)

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Escuchar eventos y redirigir al servidor local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copiar el webhook secret que muestra el CLI a `STRIPE_WEBHOOK_SECRET` en `.env.local`.

### En producción

1. Ir a [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Agregar endpoint: `https://tudominio.com/api/webhooks/stripe`
3. Seleccionar evento: `checkout.session.completed`
4. Copiar el Signing Secret a la variable de entorno en Vercel

## Resend — Dominio de emails

Para producción, verificar el dominio en [resend.com/domains](https://resend.com/domains) y actualizar el campo `from` en:

- `src/app/api/encargos/route.ts`
- `src/app/api/contact/route.ts`
- `src/app/api/webhooks/stripe/route.ts`

Reemplazar `noreply@yourdomain.com` con `noreply@tudominio.com`.

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Configurar todas las variables de entorno en el dashboard de Vercel → Settings → Environment Variables.

## Estructura del proyecto

```
src/
  app/                    # Rutas Next.js (App Router)
    api/                  # Route Handlers (checkout, webhooks, emails)
    portfolio/            # Galería y detalle de obras
    tienda/               # Tienda, detalle de producto, confirmación
    encargos/             # Formulario de encargos
    sobre-mi/             # Página del artista
    contacto/             # Formulario de contacto
  components/             # Componentes React
    layout/               # Header, Footer, CartDrawer, etc.
    ui/                   # Componentes reutilizables (Button, Badge, etc.)
    home/                 # Componentes de la home
    portfolio/            # Componentes de la galería
    tienda/               # Componentes de la tienda
    encargos/             # Formulario de encargos
    contacto/             # Formulario de contacto
  lib/                    # Clientes y utilidades
    supabase/             # Cliente, queries, types, schema SQL
    stripe/               # Cliente Stripe
    resend/               # Cliente Resend + templates de email
  store/                  # Estado global (Zustand)
  types/                  # TypeScript types
  hooks/                  # Custom hooks
```

## Base de datos — Gestión de contenido

Acceder a [supabase.com](https://supabase.com) → Table Editor para:

- **obras**: agregar/editar obras, marcarlas como disponibles en tienda, definir precio
- **encargos**: ver solicitudes recibidas, cambiar estado
- **artista**: editar bio, foto_url, exposiciones

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con obra destacada |
| `/portfolio` | Galería completa con filtros |
| `/portfolio/[slug]` | Detalle de obra |
| `/tienda` | Tienda de originales y prints |
| `/tienda/[slug]` | Producto con opciones de compra |
| `/tienda/confirmacion` | Post-pago |
| `/encargos` | Formulario de encargos personalizados |
| `/sobre-mi` | Biografía del artista |
| `/contacto` | Formulario de contacto |
