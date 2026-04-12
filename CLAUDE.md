# CV Builder - AI Coding Guidelines

## Approach
- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.

## Project Overview
Arabic-first CV/Resume builder with RTL support, bilingual templates, and ATS optimization. Built with React 19 + TypeScript.

## Tech Stack
- **Language**: TypeScript (strict mode, noUnusedLocals, noUnusedParameters)
- **Framework**: React 19
- **Build**: Vite 7.3
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite)
- **State**: Zustand 5
- **Routing**: React Router DOM v7
- **Backend**: Supabase (auth), deployed on Vercel
- **Path alias**: `@/*` -> `src/*`

## Commands
- `npm run dev` - Start dev server (port 5173)
- `npm run build` - Type-check + production build
- `npm run preview` - Preview production build

## Code Style
- Arabic-first RTL layout — always consider RTL when styling
- Use path alias `@/` for imports
- Prefer Vitest if adding tests
- Follow existing AGENTS.md guidelines for conventions
