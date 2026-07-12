# PureHabitat

> Purity for the places that matter most.

Premium lead-generation landing page for **PureHabitat** — an authorized channel
partner for **YOGa Clean Air**. Built to build relationships with the high-value
professionals who already serve affluent clients: **interior designers,
architects, luxury builders and home-automation companies**.

This is **not** an ecommerce site, and it does **not** offer a referral-partner
dashboard. Its single goal is to generate qualified partner leads — one
professional introduction can become many buyers over time.

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
3. Who it's for (interior designers, architects, luxury builders, home-automation companies)
4. Why YOGa Clean Air (benefits, IIT-Delhi verified results, Room Purifier vs ERV vs Y-CAB comparison, tech specs)
5. How it works (5-step referral flow)
6. Partner benefits
7. Resources (brochure download, technical guide, FAQ)
8. Become a partner form (stored in Supabase)
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

## Deployment

Deployed on **Netlify** (connected manually) using Netlify's official Next.js
runtime, which supports SSR and server actions — no static export. Add the
`.env.example` keys under **Site settings → Environment variables** to enable
Supabase and Calendly. The site builds and runs without them: the form confirms
receipt and the demo section shows a contact fallback.

## Roadmap

The focus is **lead generation and outreach**, not a partner-facing dashboard.

- **Phase 1** — Internal lead inbox + partner CRM (identify & organize outreach to designers, architects, builders, home-automation firms), authentication
- **Phase 2** — AI company research, AI outreach generator
- **Phase 3** — Referral tracking, analytics, AI knowledge assistant
