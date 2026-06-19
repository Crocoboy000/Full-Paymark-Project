# Paymark — Modern Financial Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v11-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS 11" />
  <img src="https://img.shields.io/badge/Next.js-v16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/Prisma-v7-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Turborepo-v2-EF4444?style=flat-square&logo=turborepo&logoColor=white" alt="Turborepo 2" />
  <img src="https://img.shields.io/badge/pnpm-v9-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm 9" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

**Paymark** is a full-stack financial management application that combines a powerful NestJS API backend with a rich Next.js frontend. Manage accounts, transfer money, track income and expenses through an interactive dashboard, and add funds via Stripe — all wrapped in a polished dark-themed UI with smooth animations.

---

## Architecture

```
paymark/
├── apps/
│   ├── api/          # NestJS 11 backend — REST API on port 8000
│   └── web/          # Next.js 16 frontend — App Router on port 3000
├── packages/
│   ├── types/        # @paymark/types — shared TypeScript enums & interfaces
│   ├── validations/  # @paymark/validations — Zod 4 schemas + inferred types
│   ├── ui/           # @repo/ui — shared React components
│   ├── eslint-config/# @repo/eslint-config — shared ESLint flat configs
│   └── typescript-config/ — shared tsconfig presets
└── turbo.json        # Turborepo 2 task orchestration
```

---

## Features

### Authentication & User Management
- JWT-based registration and login (Passport strategies)
- Bcrypt password hashing
- Protected route guards on both API and frontend
- Auto-generated welcome notification on signup

### Account Management
- Five account types: Checking, Savings, Credit, Investment, Cash
- Full CRUD operations with ownership enforcement
- User search by email for inter-account transfers

### Transactions & Transfers
- Income, expense, and transfer transaction types
- Real-time balance validation (insufficient funds protection)
- Atomic database operations via Prisma `$transaction`
- Automatic notifications for sends and receives
- 30-day income/expense history for charting

### Dashboard & Analytics
- Summary cards: total balance, income, expenses, net worth
- Interactive revenue chart (Recharts area chart)
- Recent activity feed
- Account cards with individual balances
- Quick action shortcuts

### Stripe Payment Integration
- Add funds via Stripe Checkout session
- Webhook handling for `checkout.session.completed`
- Automatic INCOME transaction and notification on payment

### Notifications
- Real-time notification generation on key events
- Unread count badge
- Mark individual or all notifications as read

### Landing & Marketing
- Animated hero section with GSAP
- Brand showcase, testimonials, pricing tiers
- FAQ accordion, newsletter CTA
- Full SEO: JSON-LD structured data, sitemap, Open Graph, Twitter cards
- PWA-ready with manifest and icons

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework (API)** | NestJS 11, Express adapter |
| **Framework (Web)** | Next.js 16 (App Router), React 19 |
| **Database** | PostgreSQL 16 via Prisma 7 ORM |
| **Validation** | Zod 4 (shared schemas in `@paymark/validations`) |
| **Auth** | Passport.js (JWT + local strategies) |
| **Payments** | Stripe (Checkout Sessions + Webhooks) |
| **Styling** | Tailwind CSS 4, shadcn/ui primitives |
| **Animations** | GSAP 3.15, Lenis 1.3 (smooth scroll), Motion 12 |
| **State (Client)** | Zustand 5 (local state), TanStack React Query 5 (server state) |
| **Charts** | Recharts 3 |
| **Forms** | TanStack React Form 1 |
| **HTTP** | Axios with interceptors (auto token injection, 401 redirect) |
| **Package Manager** | pnpm 9 — workspaces |
| **Monorepo** | Turborepo 2 |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9 (`npm install -g pnpm@9`)
- **PostgreSQL** >= 14 running locally or remotely
- **Stripe account** (for payment features)

### 1. Clone & Install

```bash
git clone <repo-url>
cd paymark
pnpm install
```

### 2. Environment Variables

Each app has a `.env.example` file. Copy it to `.env` and fill in the values.

**`apps/api/.env`**

```env
PORT=8000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/paymark
JWT_ACCESS_SECRET=<64-byte-hex-string>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_API_VERSION=2025-02-24.acacia
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:3000
```

**`apps/web/.env`**

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Database Setup

```bash
cd apps/api
npx prisma migrate dev
npx prisma generate
```

### 4. Run Development Servers

```bash
# From root — runs both API (8000) and Web (3000) concurrently
pnpm dev

# Or individually
pnpm exec turbo dev --filter=api
pnpm exec turbo dev --filter=web
```

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Run all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all workspaces |
| `pnpm test` | Run all tests |
| `pnpm format` | Format code with Prettier |
| `pnpm exec turbo check-types` | TypeScript type checking |

---

## API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Log in, receive JWT | No |
| `GET` | `/auth/me` | Get current user profile | JWT |
| `POST` | `/account` | Create an account | JWT |
| `GET` | `/account` | List user accounts | JWT |
| `GET` | `/account/search?email=` | Search users by email | JWT |
| `GET` / `PATCH` / `DELETE` | `/account/:id` | CRUD on single account | JWT |
| `POST` | `/transactions` | Create a transaction | JWT |
| `POST` | `/transactions/transfer` | Transfer between accounts | JWT |
| `GET` | `/transactions/recent` | Recent transactions | JWT |
| `GET` | `/transactions/overview` | 30-day chart data | JWT |
| `GET` | `/dashboard/summary` | Balance summary stats | JWT |
| `GET` | `/dashboard/overview` | Dashboard overview | JWT |
| `GET` | `/notification` | List notifications | JWT |
| `GET` | `/notification/unread-count` | Unread count | JWT |
| `PATCH` | `/notification/:id/read` | Mark as read | JWT |
| `PATCH` | `/notification/read-all` | Mark all as read | JWT |
| `POST` | `/stripe/create-checkout-session` | Create Stripe checkout | JWT |
| `POST` | `/stripe/verify-session` | Verify payment session | JWT |
| `POST` | `/stripe/webhook` | Stripe webhook handler | Stripe sig |

---

## Project Structure

### `apps/api/src/`
```
src/
├── main.ts                     # Bootstrap (CORS, raw body for webhooks)
├── app.module.ts               # Root module
├── auth/                       # Authentication (register, login, JWT, guards)
├── user/                       # User CRUD
├── account/                    # Financial accounts CRUD
├── transaction/                # Transactions and transfers
├── dashboard/                  # Dashboard summary and overview
├── notification/               # Notifications
└── stripe/                     # Stripe checkout + webhook
```

### `apps/web/`
```
app/
├── layout.tsx                  # Root layout (SEO, fonts, smooth scroll)
├── page.tsx                    # Landing page
├── (auth)/                     # Login & Register pages
├── dashboard/                  # Dashboard, accounts, transfer, wallet
├── providers.tsx               # TanStack Query provider
components/
├── ui/                         # Button, Input, FormField, Toast, etc.
├── layout/                     # Navbar, Footer
├── features/                   # Auth forms, dashboard widgets, transfer form
└── sections/                   # Landing page sections
hooks/                          # React Query hooks
services/                       # Axios API services
store/                          # Zustand stores (auth, dashboard, transfer)
lib/                            # API client, Stripe, utilities
```

---

## Deployment

### API

```bash
cd apps/api
pnpm build
node dist/apps/api/src/main.js
```

Requires PostgreSQL and environment variables to be configured in production.

### Web

```bash
cd apps/web
pnpm build
pnpm start
```

Deploy as a standalone Next.js app. The `next build` output is in `.next/`.

---

## License

MIT
