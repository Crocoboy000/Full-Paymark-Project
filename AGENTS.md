# Paymark monorepo - AGENTS.md

## Package manager & toolchain
- **pnpm** (v9.0.0) required — never use npm/yarn.
- **Turborepo** (v2) drives all root commands: `pnpm exec turbo <task>` or global `turbo <task>`.
- Root scripts: `build`, `dev`, `lint`, `test`, `format`, `check-types` — all delegate to turbo (except `format` runs prettier directly).

## Monorepo layout
```
apps/
  api/    – NestJS (v11) backend, port 8000, CORS to http://localhost:3000
  web/    – Next.js 16 (App Router) frontend, port 3000
packages/
  types/          – @paymark/types (shared TS type definitions)
  validations/    – @paymark/validations (Zod v4 schemas)
  ui/            – @repo/ui (React component library, raw TSX exports)
  eslint-config/  – @repo/eslint-config
  typescript-config/ – @repo/typescript-config
```

Package exports point directly to **source `.ts`/`.tsx` files** (no separate compilation step for intra-monorepo consumption).

## Key commands
| Command | What it does |
|---|---|
| `pnpm install` | Install all dependencies |
| `pnpm exec turbo build` or `pnpm build` | Build all (depends on ^build) |
| `pnpm exec turbo dev` or `pnpm dev` | Run all dev servers concurrently |
| `pnpm exec turbo dev --filter=web` | Dev only the web app |
| `pnpm exec turbo dev --filter=api` | Dev only the API |
| `pnpm exec turbo lint` | Lint everything |
| `pnpm exec turbo test` | Test everything (only api has real tests) |
| `pnpm format` | Prettier write on `*.{ts,tsx,md}` |
| `pnpm exec turbo check-types` | Typecheck (only ui package configured) |

## API (NestJS)
- Entry: `apps/api/src/main.ts`
- Dev: `pnpm exec turbo dev --filter=api` runs `nest start --watch --entry-file src/main.ts`
- Tests: `jest` with `ts-jest`, test files match `*.spec.ts` in `src/`; E2E tests in `test/` with `jest --config ./test/jest-e2e.json`
- Run single test: `cd apps/api && pnpm jest -- <pattern>` (or via turbo filtering)
- Prisma: PostgreSQL, schema at `apps/api/prisma/schema.prisma`, uses `@prisma/adapter-pg` + `pg` pool
- Prisma commands must be run from `apps/api/`: `npx prisma generate`, `npx prisma migrate dev`
- `DATABASE_URL` env var required (check `apps/api/.env`)
- Auth: Passport (JWT + local strategies), full JWT guard applied globally via `APP_GUARD`

## Web (Next.js)
- Entry: `apps/web/app/` (App Router)
- Dev: `pnpm exec turbo dev --filter=web`
- Stack: shadcn/ui, Tailwind CSS v4, TanStack React Query + React Form, Zustand, GSAP, Motion, Lenis
- No tests configured for the web app

## Packages
- `@paymark/types` – shared TS interfaces/types/enums; `main` points to `src/index.ts`. **Single source of truth** for domain types shared between API and web. Do not hand-write types that duplicate `@paymark/validations` inferred types (e.g. `CreateAccountInput` lives in validations).
- `@paymark/validations` – Zod v4 schemas; inferred types exported alongside schemas. When a type can be derived from a Zod schema, define it here and import from validations, not from types.
- `@repo/ui` – React components (raw `.tsx`); exports `./*` → `./src/*.tsx`; `check-types` runs `tsc --noEmit`
- `@repo/eslint-config` – ESM package; exports `./base`, `./next-js`, `./react-internal`

### Type ownership rules
- `AccountType`, `TransactionTypeEnum`, `TransactionStatus`, `TransactionCategory` enums → `@paymark/types`
- `CreateAccountInput`, `CreateTransactionInput`, `CreateTransferInput`, `LoginDto`, `RegisterInput` → `@paymark/validations` (derived from Zod schemas)
- Domain models missing from types that exist in Prisma schema → add to `@paymark/types` (e.g. `Account`, `Notification`)
- UI-only types (`NavItem`, `FAQItem`, etc.) stay local to `apps/web/`

## Code style
- **Single quotes**, trailing commas everywhere (enforced by `apps/api/.prettierrc`; root `format` script applies globally)
- ESLint: `@typescript-eslint/no-explicit-any: off`, floating promises warn (API config)
- Web uses `eslint-config-next` (core-web-vitals + typescript)
- **No CI** configured yet — no `.github/` workflows

## Notable quirks
- `turbo.json` `build` outputs include `.next/**` but exclude cache; `dev` is persistent (no caching)
- `nest-cli.json` has `entryFile: "apps/api/src/main"` — NestJS CLI expects this relative path, not the default
- `UserService` is registered in both `AppModule` providers AND `PrismaModule` providers (duplicate registration)
- Prettier config only exists in `apps/api/.prettierrc` — root uses defaults
