---
date: 2026-03-16T12:00:00
topic: "Sign In Page — Supabase Auth, Radix UI, centralized theme"
keywords: [login, supabase, radix-ui, theme, auth, next.js]
status: complete
related_research: []
---

# Research: Sign In Page Implementation

## Research Question
Implement a `/login` route with a full sign-in page using Supabase Auth, Radix UI components, and a centralized theme config.

## Summary
The project is a minimal Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 app. The `/login` route already exists as a stub. Neither Supabase nor Radix UI packages are currently installed — both must be added. The only theme system present is CSS custom properties defined in `globals.css`, mapped into Tailwind v4 via an `@theme inline` block. There is no separate theme config file; `globals.css` is the theme source of truth. Light/dark mode is handled via `@media (prefers-color-scheme: dark)` on `:root`.

## Detailed Findings

### Component 1: Existing `/login` Route
- **Location**: `src/app/login/page.tsx:1-7`
- **Purpose**: Stub page — renders a `<main>` with an `<h1>Login</h1>`, nothing else.
- **Key Functions/Classes**: `Login` default export component
- **Connections**: Accessible at `/login` via Next.js App Router file-based routing.
- **Implementation Notes**: Must be replaced with the full sign-in form.

### Component 2: Home Page
- **Location**: `src/app/page.tsx:1-7`
- **Purpose**: Stub home page — `<main>` with `<h1>Home</h1>`.
- **Connections**: Post-login redirect target should be `/` (this page).

### Component 3: Root Layout
- **Location**: `src/app/layout.tsx:1-34`
- **Purpose**: Wraps all pages. Loads Geist Sans and Geist Mono via `next/font/google`, applies `antialiased`, sets `lang="en"`.
- **Key Notes**: No auth context provider here yet. Supabase session provider would need to be added here if using SSR session management.

### Component 4: Theme System (globals.css)
- **Location**: `src/app/globals.css:1-26`
- **Purpose**: Defines all design tokens as CSS custom properties; maps them into Tailwind v4 via `@theme inline`.
- **Current tokens**:
  - `--background`: `#ffffff` (light) / `#0a0a0a` (dark)
  - `--foreground`: `#171717` (light) / `#ededed` (dark)
  - `--color-background`: mapped from `--background`
  - `--color-foreground`: mapped from `--foreground`
  - `--font-sans`: Geist Sans variable
  - `--font-mono`: Geist Mono variable
- **Light/Dark**: Handled via `@media (prefers-color-scheme: dark)` on `:root`
- **Implementation Notes**: Additional tokens (e.g. `--color-primary`, `--color-border`, `--color-muted`, `--color-error`) need to be added here before building the form. No hardcoded hex in components — use `bg-background`, `text-foreground`, and new Tailwind utility classes mapped from CSS vars.

### Component 5: Package Dependencies
- **Location**: `package.json`
- **Current deps**: `next@16.1.6`, `react@19.2.3`, `react-dom@19.2.3`, `tailwindcss@^4`, `typescript@^5`
- **Missing — must install**:
  - `@supabase/supabase-js` — Supabase client
  - `@supabase/ssr` — SSR-compatible Supabase helpers for Next.js App Router
  - `@radix-ui/react-label` — accessible `<Label>` component
  - `@radix-ui/react-slot` — used by many Radix primitives (optional but common)
  - No pre-built Radix input or button primitive exists — `@radix-ui/react-form` or plain HTML `<input>`/`<button>` with Radix `Label` is the standard pattern

### Component 6: Next.js Config
- **Location**: `next.config.ts:1-7`
- **Purpose**: Empty config, no special settings.
- **Notes**: No environment variable exposure configured yet. Supabase requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars.

## Architecture Insights
- **App Router only** — no `pages/` directory. Auth callbacks and middleware belong in `app/` and `middleware.ts`.
- **Tailwind v4** — uses `@theme inline` in CSS instead of `tailwind.config.js`. Tokens are defined in `globals.css` and become Tailwind utility classes automatically (e.g. `bg-background`, `text-foreground`).
- **No auth infrastructure** — no Supabase client file, no middleware, no session provider exists yet.
- **CSS-var-based theming** — the pattern is: define `--color-*` in `@theme inline` in `globals.css`, then use Tailwind class `bg-[color-name]` or `text-[color-name]` in components.

## Code References
- `src/app/login/page.tsx:1-7` — stub login page to replace
- `src/app/page.tsx:1-7` — post-login redirect target (`/`)
- `src/app/layout.tsx:20-34` — root layout, location for future session provider
- `src/app/globals.css:3-13` — CSS vars and `@theme inline` block (theme source of truth)
- `package.json` — no Supabase or Radix UI packages present

## Data Flow
Form submit → Supabase `signInWithPassword({ email, password })` → success: `router.push('/')` / failure: display error message in UI state

## Configuration & Setup
- **Env vars needed**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (`.env.local`)
- **Supabase client**: create `src/lib/supabase/client.ts` using `@supabase/ssr` `createBrowserClient`
- **Middleware**: optional for session refresh — `middleware.ts` at project root using `@supabase/ssr` `createServerClient`

## Testing Strategy
No tests exist in the project. No testing framework is installed.

## Known Limitations or Issues
- No existing design tokens beyond `--background` / `--foreground` — new tokens (primary color, border, error, muted) must be added to `globals.css` before building the form.
- Radix UI has no `Input` primitive — `<input>` HTML element styled with Tailwind is the standard approach. `@radix-ui/react-label` provides the accessible `<Label>`.
- `@radix-ui/react-form` is an alternative that provides form field validation primitives, but it's more complex — plain HTML `<form>` with `@radix-ui/react-label` is simpler and fits the minimal scope.

## Next Steps for Planning
1. Install: `@supabase/supabase-js`, `@supabase/ssr`, `@radix-ui/react-label`
2. Add new CSS vars to `globals.css` (primary, border, muted, error colors for light+dark)
3. Create `src/lib/supabase/client.ts` (browser Supabase client)
4. Implement `src/app/login/page.tsx` — client component with form state, Supabase call, error/loading handling
5. Optionally add `middleware.ts` for session refresh
6. Document required env vars in `.env.local.example`
