<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Travel front end: a single Next.js 16.4.3 App Router app under `src/`. No monorepo, no test framework, no CI, README is empty.

## Commands

- `npm run dev` — dev server (Turbopack).
- `npm run lint` — runs bare `eslint` over the repo (flat config, `eslint-config-next`).
- `npx tsc --noEmit` — typecheck; there is no script for it. `npm run build` also typechecks.
- `npm run build` — production build. **Currently fails** (see below).
- No test runner is installed — don't go looking for `npm test` or invent one.

## Known-red baselines (check here before blaming your change)

- `npx tsc --noEmit` passes.
- `npm run lint` exits 1 on pre-existing problems: `react-hooks/set-state-in-effect` errors at `src/hooks/use-mobile.ts:14` and `src/components/ui/carousel.tsx:98`, plus an unused `Image` import warning in `src/app/page.tsx`.
- `npm run build` passes (verified with the backend down). With `cacheComponents: true`, any page doing an uncached `fetch` or awaiting `params` must keep it inside a `<Suspense>` boundary — see `src/app/destinations/[id]/page.tsx` for the pattern (async child behind `<Suspense>` with a skeleton fallback). Top-level `await fetch(...)` in a page fails the build with `blocking-prerender-dynamic`.

## External backend (runtime dependency, not in this repo)

Three pages call a service hardcoded at `http://localhost:8000` — no env var anywhere:

- `src/app/destinations/page.tsx` → `GET /destination`
- `src/app/add-destination/page.tsx` → `POST /add-destination`
- `src/app/destinations/[id]/page.tsx` → `GET /destination/:id`

Without that service running, `/destinations` and `/destinations/[id]` throw at request time.

## Routing / layout gotchas

- `src/app/layout.tsx` already renders `Navbar` and `Footer` around every route. `src/app/destinations/page.tsx` renders them again — a duplicate-chrome bug, not the pattern to copy for new pages.
- The Navbar links to `/bookings`, `/profile`, `/login`, `/signup`, which have no routes yet (404). Existing routes: `/`, `/destinations`, `/destinations/[id]`, `/add-destination`.
- The shared `Destination` type lives in `src/data/destinations.ts`.

## Toolchain quirks

- **Tailwind v4 is CSS-first**: there is no `tailwind.config.*`. Theme and custom variants live in `src/app/globals.css` (`@theme`, `@custom-variant`), and CSS is processed via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add a Tailwind or PostCSS config file.
- **shadcn/ui**: style `base-nova`, components in `src/components/ui`, aliases defined in `components.json`. Path alias `@/*` → `src/*`.
- **React Compiler is enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`): component bodies must be pure — no side effects or prop/state mutation during render.
- **Cache Components + Partial Prefetching are on** (`cacheComponents: true`, `partialPrefetching: true` in `next.config.ts`): any dynamic data read during prerender must be inside `<Suspense>`, behind `"use cache"`, or opted out with `export const instant = false`.
- `images.remotePatterns` allows any https host, so remote `next/image` URLs work without config changes.
