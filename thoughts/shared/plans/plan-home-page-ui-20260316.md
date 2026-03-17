---
date: 2026-03-16
topic: "Home Page UI"
research_doc: "thoughts/shared/research/research-home-page-ui-20260316.md"
status: ready
---

# Implementation Plan: Home Page UI

## Goal
Replace the stub `/` route with a polished Home Page featuring a full-width header (with a "Sign In" button that links to `/login`) and centered "Welcome to Conductor POC" content, using only existing Tailwind v4 design tokens.

## Research Summary
- `src/app/page.tsx` is an empty stub — full replacement needed
- No shared components exist; a `src/components/` directory will be introduced
- Design tokens: `bg-background`, `text-foreground` (auto dark/light via `prefers-color-scheme`)
- Fonts: `font-sans` maps to Geist Sans via CSS var
- Navigation uses Next.js `<Link href="/login">` from `next/link`
- No UI library or icon library installed

---

## Implementation Phases

### Phase 1: Header Component
**Status**: ✅ Complete

**Files to create/modify:**
- `src/components/Header.tsx` (new file)

**Changes:**
1. Create `src/components/` directory
2. Implement `Header` component:
   - Semantic `<header>` element, full-width, `bg-background` background with a subtle bottom border (`border-b border-foreground/10`)
   - Inner container with `max-w-screen-lg mx-auto px-4 flex items-center justify-between h-14`
   - Left side: app name / logo text ("Conductor POC") using `text-foreground font-semibold`
   - Right side: "Sign In" `<Link href="/login">` styled as a button (`rounded-md px-4 py-1.5 text-sm font-medium bg-foreground text-background hover:opacity-80 transition-opacity`)
   - Import `Link` from `next/link`

**Testing/Verification:**
- [ ] TypeScript compiles without errors: `npm run build` (or check in IDE)
- [ ] Component renders with logo text on left, Sign In button on right

**Success Criteria:**
- `Header.tsx` exists, exports a default `Header` component
- No TypeScript errors
- Uses only `bg-background`, `text-foreground`, `bg-foreground`, `text-background` tokens

**Estimated Complexity**: Low

---

### Phase 2: Home Page Layout
**Status**: ✅ Complete

**Dependencies**: Phase 1

**Files to modify:**
- `src/app/page.tsx` (full replacement)

**Changes:**
1. Replace stub with full Home page:
   - Outer wrapper: `<div className="flex flex-col min-h-screen bg-background text-foreground">`
   - Include `<Header />` at top
   - `<main className="flex flex-1 flex-col items-center justify-center px-4 text-center">`
   - `<h1>` with "Welcome to Conductor POC" — large, prominent (`text-4xl sm:text-5xl font-bold tracking-tight`)
   - `<p>` subtitle — e.g. "A proof-of-concept for multi-agent collaboration" (`mt-4 text-lg text-foreground/70 max-w-md`)
   - Import `Header` from `@/components/Header`

**Testing/Verification:**
- [ ] `npm run build` passes with no errors
- [ ] Navigating to `/` renders header + centered title
- [ ] Viewport resize shows responsive layout on mobile and desktop

**Success Criteria:**
- Root route displays "Welcome to Conductor POC" centered on screen
- Header is visible at top with Sign In button
- No hardcoded hex colors

**Estimated Complexity**: Low

---

### Phase 3: Navigation & Routing Verification
**Status**: ✅ Complete

**Dependencies**: Phases 1, 2

**Files to verify (no changes expected):**
- `src/app/login/page.tsx` — confirms `/login` route exists

**Changes:**
- None expected; this phase is a verification gate
- If the Login page stub is too bare to confirm routing works visually, add a temporary `<p>Login page</p>` label (already has `<h1>Login</h1>`)

**Testing/Verification:**
- [ ] Clicking "Sign In" on Home page navigates to `/login`
- [ ] Browser back button returns to `/`
- [ ] Keyboard: Tab to Sign In button, press Enter → navigates to `/login`

**Success Criteria:**
- "Sign In" `<Link>` reliably routes to `/login`
- Keyboard navigation works (no `onClick` workaround needed — `<Link>` handles this)

**Estimated Complexity**: Low

---

### Phase 4: Metadata & Accessibility Polish
**Status**: ✅ Complete

**Dependencies**: Phase 2

**Files to modify:**
- `src/app/layout.tsx` (lines 15-18) — update metadata title/description

**Changes:**
1. Update `metadata` in `layout.tsx`:
   - `title`: `"Conductor POC"`
   - `description`: `"A proof-of-concept for multi-agent collaboration"`
2. Verify semantic HTML in `page.tsx`:
   - Confirm `<header>`, `<main>`, `<h1>` hierarchy is correct (only one `<h1>` per page)
   - Confirm Sign In button/link has descriptive text (it does: "Sign In")
3. Confirm `lang="en"` on `<html>` in `layout.tsx` (already present)

**Testing/Verification:**
- [ ] Browser tab shows "Conductor POC" as title
- [ ] Accessibility: run browser DevTools accessibility audit (no critical violations)
- [ ] Heading hierarchy: page has exactly one `<h1>`

**Success Criteria:**
- Page `<title>` is "Conductor POC"
- No accessibility errors for heading hierarchy or missing labels
- Semantic structure: `<header>` → `<main>` → `<h1>`

**Estimated Complexity**: Low

---

## Risks and Considerations
- Tailwind v4 uses `@theme inline` for color tokens — `bg-foreground` and `text-background` should resolve correctly, but verify during Phase 2 that inverted colors (for the button) render as expected
- No icon library: the header logo is text-only; that's fine per requirements
- `src/components/` is a new directory — ensure tsconfig `paths` alias `@/*` maps to `src/*` (standard Next.js scaffold has this by default)

## Overall Verification
After all phases:
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Manual: `/` → header + centered title visible
- [ ] Manual: click Sign In → lands on `/login`
- [ ] Manual: keyboard Tab + Enter on Sign In → lands on `/login`
- [ ] Manual: dark mode (system pref) → colors invert correctly, readable contrast

## Notes
- Dark mode is automatic — no toggle needed
- Keep all phases minimal; the Login page itself is out of scope for this issue
