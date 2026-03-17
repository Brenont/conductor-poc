---
date: 2026-03-16
topic: "Home Page UI implementation for Conductor POC"
keywords: [home, page, header, tailwind, routing, design-tokens, dark-mode]
status: complete
related_research: []
---

# Research: Home Page UI — Conductor POC

## Research Question
Implement an improved Home Page UI with centered content, a header with "Sign In" → `/login`, responsive layout, and Tailwind design tokens with dark/light theme support.

## Summary
The project is a minimal Next.js 16.1.6 (App Router) app with React 19 and Tailwind CSS v4. Both the root `page.tsx` and `login/page.tsx` are essentially empty stubs — just `<main><h1>…</h1></main>`. There are no shared components, no UI library, and no existing header or button components. Styling is done entirely with Tailwind v4 and a small set of CSS custom properties defined in `globals.css`. Dark mode is handled via `prefers-color-scheme` media query, not a class-based toggle.

Navigation to `/login` can use Next.js `<Link>` from `next/link` — the route already exists at `src/app/login/page.tsx`.

## Detailed Findings

### Component 1: Root Home Page
- **Location**: `src/app/page.tsx:1-7`
- **Purpose**: Renders the `/` route
- **Current state**: Stub — `<main><h1>Home</h1></main>`, no styling
- **Connections**: Wrapped by `src/app/layout.tsx`

### Component 2: Login Page
- **Location**: `src/app/login/page.tsx:1-7`
- **Purpose**: Renders the `/login` route
- **Current state**: Stub — `<main><h1>Login</h1></main>`, no styling
- **Connections**: Wrapped by `src/app/layout.tsx`

### Component 3: Root Layout
- **Location**: `src/app/layout.tsx:1-34`
- **Purpose**: Wraps all pages; applies Geist fonts via CSS variables
- **Key details**:
  - Applies `${geistSans.variable} ${geistMono.variable} antialiased` on `<body>`
  - No global header — each page owns its own layout
  - Metadata title is still "Create Next App" (generic placeholder)
- **Connections**: Imports `globals.css`

### Component 4: Global CSS / Design Tokens
- **Location**: `src/app/globals.css:1-26`
- **Purpose**: Tailwind v4 import + CSS custom properties for theming
- **Design tokens**:
  - `--background`: `#ffffff` (light) / `#0a0a0a` (dark)
  - `--foreground`: `#171717` (light) / `#ededed` (dark)
  - Exposed as Tailwind colors: `bg-background`, `text-foreground`
  - Fonts: `--font-sans` → `--font-geist-sans`, `--font-mono` → `--font-geist-mono`
- **Dark mode**: `@media (prefers-color-scheme: dark)` — CSS-native, no class toggle needed
- **Tailwind version**: v4 — uses `@import "tailwindcss"` (not `@tailwind base/components/utilities`)

### Component 5: Package / Tech Stack
- **Location**: `package.json:1-26`
- **Stack**: Next.js 16.1.6, React 19.2.3, Tailwind CSS v4 (`@tailwindcss/postcss`), TypeScript 5
- **No UI library**: No shadcn/ui, radix, headlessui, or any component library installed
- **No icon library**: No lucide, heroicons, etc.

## Architecture Insights
- **App Router only** — no `pages/` directory. Navigation uses `next/link`.
- **No shared components directory** exists yet. Any new Header or Button components would need to be created (e.g., `src/components/` or colocated).
- **Tailwind v4 syntax**: utility classes work as expected; `bg-background` and `text-foreground` map to the CSS vars. For responsive design, standard Tailwind breakpoint prefixes (`sm:`, `md:`) apply.
- **Dark mode** is automatic via media query — no extra configuration needed; just use `bg-background` / `text-foreground` tokens.

## Code References
- `src/app/page.tsx:1-7` — current Home stub (to be replaced)
- `src/app/login/page.tsx:1-7` — Login route target for "Sign In" button
- `src/app/layout.tsx:1-34` — Root layout, font setup, no global nav
- `src/app/globals.css:1-26` — All design tokens and Tailwind setup
- `package.json:11-25` — Dependencies confirming no UI library

## Data Flow
User navigates to `/` → `layout.tsx` wraps → `page.tsx` renders. "Sign In" button click → Next.js `<Link href="/login">` → `login/page.tsx`.

## Configuration & Setup
- Tailwind v4 configured via `postcss.config.mjs` + `@tailwindcss/postcss`
- No `tailwind.config.js` — v4 uses CSS-based config in `globals.css`
- Fonts loaded via `next/font/google` (Geist Sans, Geist Mono)

## Next Steps for Planning
- The Home page (`src/app/page.tsx`) needs a full replacement — no content to preserve
- A header component is needed (none exists); can be inline in `page.tsx` or extracted to `src/components/`
- Use `<Link href="/login">` from `next/link` for the Sign In button
- Use `bg-background`, `text-foreground` Tailwind tokens (not arbitrary hex values)
- Responsive layout: `flex flex-col min-h-screen` pattern with a header + centered `<main>`
- No dark mode toggle needed — it's handled automatically via CSS media query
