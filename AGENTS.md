<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Travel front end: a single Next.js 16.4.3 App Router app under `src/`. No monorepo, no test framework, no CI, README is empty.

## Commands

- `npm run dev` — dev server (Turbopack).
- `npm run lint` — runs bare `eslint` over the repo (flat config in `eslint.config.mjs`, `eslint-config-next/core-web-vitals` + `/typescript`).
- `npx tsc --noEmit` — typecheck; there is no script for it. `npm run build` also typechecks.
- `npm run build` — production build. **Currently fails** (see below).
- No test runner is installed — don't go looking for `npm test` or invent one.

## Known-red baselines (check here before blaming your change)

- `npx tsc --noEmit` passes.
- `npm run lint` exits 1: `react-hooks/set-state-in-effect` errors at `src/hooks/use-mobile.ts:14` and `src/components/ui/carousel.tsx:98`, plus unused-var warnings in `src/app/page.tsx:5` (`Image`) and `src/app/(auth)/signup/page.tsx:43` (`error`).
- `npm run build` **fails at prerender of `/signup`**: `src/lib/auth-client.ts` passes `baseURL: process.env.MONGODB_URL` to `createAuthClient`, so better-auth tries to use the Mongo connection string as its base URL (`BetterAuthError: Invalid base URL`). The build only breaks while `.env` defines `MONGODB_URL`; without it, prerender got further in the past. Fix that line (better-auth's default `window.location.origin` / same-origin `/api/auth` is correct here) before diagnosing any other build failure.
- Build error output echoes the **entire `.env` MongoDB URI including its password** — redact before pasting logs anywhere.

## External backend (runtime dependency, not in this repo)

Five call sites hit a service hardcoded at `http://localhost:8000` — no env var anywhere:

- `src/app/destinations/page.tsx` → `GET /destination`
- `src/app/destinations/[id]/page.tsx` → `GET /destination/:id`
- `src/app/destinations/[id]/edit/page.tsx` → `GET /destination/:id`
- `src/app/add-destination/page.tsx` → `POST /add-destination`
- `src/components/DestinationActions.tsx` (client) → `DELETE /destination/:id`; `src/app/destinations/[id]/edit/EditForm.tsx` (client) → `PUT /destination/:id`

Without that service running, `/destinations` and `/destinations/[id]` throw at request time (list/view pages are server components with `cache: "no-store"` fetches inside `<Suspense>`).

## Auth (partially built, uncommitted)

- better-auth with the MongoDB adapter. `src/lib/auth.ts` constructs `new MongoClient(process.env.MONGODB_URL!)` **at module load** and connects to db `wanderlast`; the HTTP handler is mounted at `src/app/api/auth/[...all]/route.ts`.
- `MONGODB_URL` comes from a local `.env` (gitignored via `.env*`). Never commit it or quote its value.
- Client side: `src/lib/auth-client.ts` (`better-auth/react`); sign-up / sign-in pages live under the `(auth)` route group → URLs `/signup`, `/signin`.
- `src/lib/auth.ts` contains a large commented-out duplicate of its own config — dead code, don't resurrect it.

## Routing / layout gotchas

- `src/app/layout.tsx` renders `Navbar` and `Footer` around every route; pages must not render them again.
- Existing routes: `/`, `/destinations`, `/destinations/[id]`, `/destinations/[id]/edit`, `/add-destination`, `/signup`, `/signin`.
- Links that 404 today: Navbar `/bookings`, `/profile`, `/login` (the real sign-in route is `/signin`, not `/login`); Footer `/help`, `/terms`, `/privacy`; `signin` page → `/forgot-password`.
- The shared `Destination` type lives in `src/data/destinations.ts`.

## Toolchain quirks

- **Tailwind v4 is CSS-first**: there is no `tailwind.config.*`. Theme and custom variants live in `src/app/globals.css` (`@theme`, `@custom-variant`), and CSS is processed via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add a Tailwind or PostCSS config file.
- **shadcn/ui**: style `base-nova`, components in `src/components/ui`, aliases defined in `components.json`. Path alias `@/*` → `src/*`.
- **React Compiler is enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`): component bodies must be pure — no side effects or prop/state mutation during render.
- **Cache Components + Partial Prefetching are on** (`cacheComponents: true`, `partialPrefetching: true` in `next.config.ts`): any dynamic data read during prerender must be inside `<Suspense>`, behind `"use cache"`, or opted out with `export const instant = false`. Top-level `await fetch(...)` in a page fails the build with `blocking-prerender-dynamic`.
- `images.remotePatterns` allows any https host, so remote `next/image` URLs work without config changes.
