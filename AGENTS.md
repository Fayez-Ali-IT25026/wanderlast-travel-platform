<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Travel front end: a single Next.js 16.4.3 App Router app under `src/`. No monorepo, no test framework, no CI, no formatter, README is empty.

## Commands

- `npm run dev` — dev server (Turbopack).
- `npm run lint` — bare `eslint` over the repo (flat config in `eslint.config.mjs`, `eslint-config-next/core-web-vitals` + `/typescript`). Focus it: `npm run lint -- src/path/file.tsx`.
- `npx tsc --noEmit` — typecheck; there is no script for it. `npm run build` also typechecks.
- `npm run build` — production build; currently **passes**. For prerender failures, re-run as `npx next build --debug-prerender` to get real stack traces.
- No test runner is installed — don't go looking for `npm test` or invent one.
- Suggested order: `lint` → `tsc --noEmit` → `build`.

## Known-red baselines (check here before blaming your change)

- `npx tsc --noEmit` **passes**; `npm run build` **passes** (both fixed 2026-10-27).
- `npm run lint` exits 1: `react-hooks/set-state-in-effect` errors at `src/hooks/use-mobile.ts:14` and `src/components/ui/carousel.tsx:98`, plus ~11 unused-var warnings (e.g. `Image` in `src/app/page.tsx`, `error` in the signin/signup pages, several imports in `src/app/destinations/[id]/page.tsx` that `BookingCard` replaced, `Separator`/`date` in `BookingCard.tsx`).
- Uncommitted work: `src/app/bookings/` + `src/components/booking/` (now build-clean: `/bookings` wraps its session+fetch in `<Suspense>`, redirects signed-out users to `/signin`), modified `src/app/destinations/[id]/page.tsx`, and `react-icons` in `package.json`.
- A past build error echoed the whole `MONGODB_URL` (password included) into logs — redact `.env` values before pasting any output.

## External backend (runtime dependency, not in this repo)

All data comes from a service hardcoded at `http://localhost:8000` — no env var anywhere. Grep `localhost:8000` for the current ~9 call sites; endpoints: `GET /destination`, `GET /destination/:id`, `POST /add-destination`, `PUT|DELETE /destination/:id`, `POST /booking`, `GET|DELETE /my-booking/:id`.

- `/destinations`, `/destinations/[id]`, `/destinations/[id]/edit` are server components fetching with `cache: "no-store"` inside `<Suspense>` (skeleton fallbacks); without the service they throw at request time. `/bookings` follows the same pattern (and redirects to `/signin` when there's no session).

## Auth (committed, still rough)

- better-auth with the MongoDB adapter. `src/lib/auth.ts` constructs `new MongoClient(process.env.MONGODB_URL!)` **at module load** and connects to db `wanderlast`; the HTTP handler is mounted at `src/app/api/auth/[...all]/route.ts`.
- `.env` (gitignored via `.env*`) holds `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. Never commit or quote these.
- Client side: `src/lib/auth-client.ts` passes `baseURL: process.env.BETTER_AUTH_URL`. That var has **no `NEXT_PUBLIC_` prefix**, so the browser bundle gets `undefined` and better-auth falls back to same-origin `/api/auth` — which is correct here. Don't "fix" it by exposing the var to the client.
- Sign-up / sign-in pages live under the `(auth)` route group → URLs `/signup`, `/signin`. Server-side session: `auth.api.getSession({ headers: await headers() })` (see `/bookings`).
- `src/lib/auth.ts` contains a large commented-out duplicate of its own config — dead code, don't resurrect it.

## Routing / layout gotchas

- `src/app/layout.tsx` renders `Navbar` and `Footer` around every route; pages must not render them again.
- Existing routes: `/`, `/destinations`, `/destinations/[id]`, `/destinations/[id]/edit`, `/add-destination`, `/bookings`, `/signup`, `/signin`.
- Links that 404 today: Footer `/profile`, `/help`, `/terms`, `/privacy`; signin page → `/forgot-password`. Navbar's own links all resolve (its `/profile` entry is commented out); the real sign-in route is `/signin`, never `/login`.
- The shared `Destination` type lives in `src/data/destinations.ts`.

## Toolchain quirks

- **Tailwind v4 is CSS-first**: there is no `tailwind.config.*`. Theme and custom variants live in `src/app/globals.css` (`@theme`, `@custom-variant`), and CSS is processed via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add a Tailwind or PostCSS config file.
- **shadcn/ui**: style `base-nova`, components in `src/components/ui`, aliases defined in `components.json`. Path alias `@/*` → `src/*`.
- **React Compiler is enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`): component bodies must be pure — no side effects or prop/state mutation during render.
- **Cache Components + Partial Prefetching are on** (`cacheComponents: true`, `partialPrefetching: true` in `next.config.ts`): any dynamic data read during prerender must be inside `<Suspense>`, behind `"use cache"`, or opted out with `export const instant = false`. Top-level `await fetch(...)` in a page fails the build with `blocking-prerender-dynamic`.
- `images.remotePatterns` allows any https host, so remote `next/image` URLs work without config changes.
