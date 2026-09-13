# Capivo

Capivo is a modern Next.js demo app for Nigerian SMEs, focused on inventory, sales, receipts, reconciliation, alerts, users, and security workflows. The frontend already includes a strong visual system and mock data/state management, and it is now being prepared for easy backend integration.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Project structure

- `src/app` — app pages, layout, and global styles
- `src/components` — shared UI components, views, modals, and widgets
- `src/context` — auth, language, voice, and app state providers
- `src/lib` — shared utilities, including backend-ready API helpers
- `src/types` — shared TypeScript interfaces used across the app

## Backend-ready setup

A shared API helper is available in `src/lib/api.ts` and uses `NEXT_PUBLIC_API_BASE_URL` from a local environment file.

### Environment file

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Suggested backend contracts

The frontend is already organized around typed data models in `src/types/index.ts`, so the backend can connect cleanly to these flows:

- Auth
  - `POST /api/auth/login`
  - `POST /api/auth/register`
- Dashboard
  - `GET /api/dashboard/summary`
- Inventory
  - `GET /api/inventory`
  - `POST /api/inventory`
- Sales
  - `GET /api/sales`
  - `POST /api/sales`
- Receipts
  - `GET /api/receipts`
  - `POST /api/receipts`
- Alerts
  - `GET /api/alerts`
- Reconciliation
  - `GET /api/reconciliation`
- Users / branches
  - `GET /api/users`
  - `POST /api/users`

## Frontend integration notes

- Keep API calls centralized in `src/lib/api.ts`.
- Match the existing interfaces in `src/types/index.ts` when shaping the response payloads.
- The current auth and app-state providers in `src/context/AuthContext.tsx` and `src/context/AppStateContext.tsx` are the right places to swap mock logic for real API requests.
- Use the existing UI state patterns for loading, toast messages, and modal behavior when wiring backend data.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

This project uses Next.js 16 and a custom styling system with CSS variables and reusable component patterns. The current version is a strong demo foundation, and the UI is being refined for cleaner alignment and easier backend integration.
