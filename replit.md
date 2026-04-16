# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

---

## Nurture Next — Tax & CPA Services Platform

**Artifact**: `artifacts/cpal-pro` (React + Vite, frontend-only)
**Route**: `/` (preview path)
**Workflow**: `artifacts/nurture-next: web`

### Brand Identity
- **Color palette**: Navy `#0B1120` (bg dark) · Cream `#F5F0E8` (bg light) · Gold `#C9A84C` (accent) · Teal `#00C2A8` (primary CTA)
- **Typography**: Playfair Display (h1/h2/h3, loaded from Google Fonts) · DM Sans (body, default font via CSS)
- **Utility classes**: `.bg-navy`, `.bg-cream`, `.text-gold`, `.text-teal`, `.gold-rule`, `.font-display`, `.grain-overlay`
- **Theme**: Light default (cream background), dark mode (navy background) — toggled via ThemeProvider

### Pages (all frontend-only, no API calls)
| Path | File | Description |
|------|------|-------------|
| `/` | `home.tsx` | Landing: navy hero, trust bar, stats, services, how-it-works, why-us, testimonials, pricing, FAQ, CTA |
| `/services` | `services.tsx` | Service cards with filter tabs (All/Tax/GST/Business/Legal) |
| `/how-it-works` | `how-it-works.tsx` | Alternating timeline, 4 steps, CPA sidebar |
| `/get-started` | `get-started.tsx` | Multi-step form (3 steps): Details → Service → Upload |
| `/dashboard` | `dashboard.tsx` | Client portal with tabs: Overview, Documents, Messages, Settings |
| `/contact` | `contact.tsx` | Contact form + time slot picker (day/time grid) |
| `/login` | `login.tsx` | Dark navy page, glass morphism card, Google SSO button (UI) |
| `/signup` | `signup.tsx` | Matching dark navy page |

### Key Components
- `Logo.tsx` — Uses NURTURE_NEXT.png brand asset for sitewide logo rendering
- `Layout.tsx` — Navbar (scrolls to navy bg on scroll), footer with gold rule divider
- `ThemeProvider.tsx` — Dark/light mode, localStorage key `nurture-next-theme`
- `ThemeToggle.tsx` — Theme toggle button

### Tech
- **Router**: wouter
- **Animation**: framer-motion (staggerChildren on hero, whileInView cards)
- **UI**: shadcn/ui components (Button, Input, Select, Toast, etc.)
- **Icons**: lucide-react

