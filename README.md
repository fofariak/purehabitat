# PureHabitat

> Purity for the places that matter most.

Premium partner-program landing page for **PureHabitat** — an authorized channel
partner for **YOGa Clean Air**. Built to recruit a referral network of architects,
interior designers, luxury builders, HVAC consultants, smart-home integrators and
luxury real-estate consultants.

This is **not** an ecommerce site. Its single goal is to turn design & building
professionals into referral partners.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** design system with light/dark mode (`next-themes`)
- **shadcn/ui**-style component primitives (Radix UI)
- **Framer Motion** for animation
- **Supabase** for partner application storage
- **Calendly** (optional) for demo booking

## Landing page sections

1. Hero — "Help your clients build healthier luxury homes."
2. Why partner with PureHabitat
3. Why YOGa Clean Air (benefits, IIT-Delhi verified results, Room Purifier vs ERV vs Y-CAB comparison, tech specs)
4. How it works (5-step referral flow)
5. Partner benefits
6. Resources (brochure download, technical guide, FAQ)
7. Become a partner form (stored in Supabase)
8. Book a demo (Calendly or contact fallback)
9. FAQ
10. Contact

All product claims come from the official YOGa brochure and the Y-CAB vs ERV
document — see `src/lib/content.ts` (single source of truth for copy/data).

## Getting started

> **Note:** this repo ships with a self-contained Node runtime in `.tooling/`
> (gitignored). For normal development, install Node 18.18+ (ideally the Node 24
> LTS) via [nvm](https://github.com/nvm-sh/nvm) or nodejs.org, then:

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

If `npm` complains that `~/.npm` is root-owned, either fix ownership
(`sudo chown -R $(id -u):$(id -g) ~/.npm`) or use a local cache
(`npm_config_cache=./.npm-cache npm install`).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | (optional) server-side insert key |
| `NEXT_PUBLIC_CALENDLY_URL` | (optional) Calendly scheduling URL |

The site runs fine without these — the partner form confirms receipt and the
demo section shows a contact fallback until Supabase / Calendly are connected.

## Supabase setup

Run `supabase/schema.sql` in the Supabase SQL editor to create the
`partner_applications` table with row-level security (anonymous insert,
authenticated read).

## Deploying to Netlify

The repo includes `netlify.toml` and uses Netlify's official Next.js runtime
(SSR + server actions supported — no static export).

1. In Netlify, **Add new site → Import from Git** and pick `fofariak/purehabitat`.
2. Netlify auto-detects the settings from `netlify.toml`
   (build command `npm run build`, publish `.next`, Node 20, Next.js plugin).
3. Add environment variables under **Site settings → Environment variables**
   (same keys as `.env.example`) before the first build if you want Supabase /
   Calendly live:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional)
   - `NEXT_PUBLIC_CALENDLY_URL` (optional)
4. Deploy. Every push to `main` triggers an automatic production deploy.

The site builds and runs without any env vars — the form confirms receipt and
the demo section shows the contact fallback until Supabase / Calendly are set.

## Roadmap

- **Phase 1** — Partner CRM, Partner Dashboard, Authentication
- **Phase 2** — AI Company Research, AI Outreach Generator
- **Phase 3** — Referral Tracking, Analytics, AI Knowledge Assistant
