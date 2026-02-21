# ATS CV Builder

A bilingual (Arabic/English) React + TypeScript web app for building ATS-friendly resumes. Professional, clean, enterprise-like design—no purple, no AI aesthetics.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4
- **State:** Zustand
- **Routing:** React Router 7
- **Fonts:** IBM Plex Sans (EN), IBM Plex Sans Arabic (AR)

## Design

- **Primary:** Deep Navy (#1e3a5f)
- **Secondary:** Slate / Gray
- **Background:** Off-white (#f8fafc)
- **Accent:** Teal (#0d9488)
- No purple, no gradients, no AI look

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run typecheck
```

## Routes

| Route | Page |
|-------|------|
| `/` | Landing |
| `/auth/sign-in` | Sign In |
| `/auth/sign-up` | Sign Up |
| `/app` | Dashboard (CV list) |
| `/app/resume/:id/wizard` | CV Wizard (10 steps) |
| `/app/resume/:id/editor` | Editor + Live Preview |
| `/app/resume/:id/ats` | ATS Analyzer |
| `/app/resume/:id/export` | Export (PDF/DOCX) |

## Guest Mode

- Click "Start Now" on landing or "Continue as Guest" on auth pages.
- CVs are stored in `localStorage`.
- Export requires sign-in (modal prompt).

## Backend API (Stub)

The frontend expects these endpoints (not implemented here):

- Auth: `/api/auth/signin`, `/api/auth/signup`, `/api/auth/signout`, `/api/auth/me`
- Resumes: CRUD + duplicate
- AI: `/api/ai/generate`
- ATS: `/api/ats/analyze`, `/api/ats/apply`
- Export: `/api/export/pdf`, `/api/export/docx`
