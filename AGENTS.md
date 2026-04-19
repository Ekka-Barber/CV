# CV Builder - Agent Guidelines

## Project Overview

Arabic-first CV/Resume builder with ATS optimization, RTL support, and bilingual templates. Built with React 19, TypeScript, Vite, Tailwind CSS 4, and Zustand.

## Build & Development Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Typecheck + production build
npm run preview      # Preview production build
npx tsc --noEmit     # Typecheck only (faster feedback)
```

No test framework configured yet. When adding tests, prefer Vitest.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CVPreview/       # Resume preview renderer
│   └── Layout/          # Header, Logo
├── features/            # Feature-specific code
│   └── wizard/          # CV creation wizard
│       └── steps/       # Individual wizard steps
├── i18n/                # Internationalization
│   └── locales/         # ar.ts, en.ts translations
├── pages/               # Route-level page components
│   ├── auth/            # SignIn, SignUp
│   └── landing/         # Landing page sections
├── services/            # API clients
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── utils/               # Helper functions
```

## Code Style Guidelines

### Imports

```typescript
// 1. External packages (React first)
import { useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

// 2. Internal absolute imports (use @ alias)
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/i18n/useTranslation";
import type { Resume, Experience } from "@/types/resume";

// 3. Relative imports (same directory)
import { getThemeClasses } from "./LandingPage.styles";
```

### Naming Conventions

- **Components**: PascalCase (`EditorPage`, `StepContact`)
- **Functions**: camelCase (`handleUpdate`, `createEmptyResume`)
- **Constants**: SCREAMING_SNAKE_CASE (`STORAGE_KEY`, `STEPS`)
- **Types/Interfaces**: PascalCase (`Resume`, `AppState`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS classes**: Use Tailwind utilities; custom classes in kebab-case

### TypeScript

- Use `type` for unions/primitives, `interface` for objects
- Prefer `import type { X }` for type-only imports
- Always type function parameters and return values
- Use `const` assertions for readonly arrays: `["a", "b"] as const`
- Avoid `any`; use `unknown` with type guards

```typescript
// Good
interface Contact {
  fullName: string;
  email: string;
  phone?: string;
}

// Good - type for unions
type LanguageMode = "AR" | "EN" | "BILINGUAL";
```

### React Patterns

- Use function components with hooks
- Memoize callbacks with `useCallback` when passed to children
- Use `useMemo` for expensive computations
- Combine Zustand selectors to reduce re-renders:

```typescript
// Good - single subscription
const { locale, guestResumes, updateResume } = useAppStore((s) => ({
  locale: s.locale,
  guestResumes: s.guestResumes,
  updateResume: s.updateGuestResume,
}));

// Bad - multiple subscriptions
const locale = useAppStore((s) => s.locale);
const guestResumes = useAppStore((s) => s.guestResumes);
```

- Use `lazy()` + `Suspense` for route-level code splitting
- Keep components under 250 lines; split into smaller components if larger

### Styling

- Use Tailwind CSS classes; avoid inline styles except for dynamic values
- Use CSS variables for theming: `var(--color-primary)`, `var(--color-accent)`
- RTL support: use `dir="rtl"` attribute, `dir={lang === "ar" ? "rtl" : "ltr"}`

### Error Handling

- Use `try/catch` for async operations
- Return error objects from API calls: `{ data?: T; error?: string }`
- Show user-friendly error messages, log technical details
- Use ErrorBoundary for React error boundaries

### State Management

- Zustand store in `src/store/useAppStore.ts`
- Persist guest data to localStorage with cache layer
- Use `structuredClone()` for deep copying (not `JSON.parse/stringify`)
- Initialize localStorage reads lazily via `initializeStore()` in main.tsx

### File Organization

- One component per file
- Export component as named export: `export function MyComponent() {}`
- Keep related code together (component + styles + context)
- Lazy load wizard steps and pages

## Performance Guidelines

- Use `useCallback` for event handlers passed to children
- Use `useMemo` for filtered/derived arrays
- Combine store subscriptions into single selector
- Lazy load routes with `React.lazy()`
- Cache localStorage reads in module-level variables

## Internationalization

- Translation keys use dot notation: `"wizard.steps.experience"`
- Access via `useTranslation(locale)` hook: `const { t } = useTranslation(locale)`
- Support both Arabic (ar) and English (en) locales
- RTL layouts handled via `dir` attribute

## Backend Integration

- API client in `src/services/api.ts`
- Use `/api` prefix for all endpoints
- Include credentials for auth: `credentials: "include"`
- Return `{ data?, error? }` pattern for all API calls
