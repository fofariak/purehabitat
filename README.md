# PureHabitat

> Purity for the places that matter most.

Lead-generation site for **PureHabitat** — an authorized channel partner for
**YOGa Clean Air**, installing and servicing across India.

## Terminology (important)

PureHabitat is the **channel partner** of YOGa Clean Air. The professionals we
recruit are therefore **not** called partners — they join the **Referral
Network** and are referred to as *referrers* or *members*. Reserve the word
"partner" for the PureHabitat ↔ YOGa relationship only. This rule is documented
at the top of `src/lib/content.ts`, which is the single source of truth for all
copy.

## The two audiences

The page forks immediately below the hero, because the two groups can't be
offered the same thing:

| | Who | What they get | CTA / anchor |
| --- | --- | --- | --- |
| **Refer & earn** | Interior designers, architects, luxury builders, home-automation, HVAC, MEP/PMC consultants | A referral reward on every completed installation | `#join` |
| **For your own space** | Homeowners, gym & studio owners, schools, hospitals, offices, hotels | A free on-site Indoor Air Quality assessment + live before/after demo | `#assessment` |

Both anchors land on the same section (`enquiry-form.tsx`); the form reads the
hash and opens the matching branch. Users can also flip between them with the
segmented control at the top of the form.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** design system with light/dark mode (`next-themes`)
- **shadcn/ui**-style component primitives (Radix UI)
- **Supabase** for enquiry storage
- **Calendly** (optional) for demo booking
- Social preview card generated at build time via `next/og`
  (`src/app/opengraph-image.tsx`)

## Landing page sections

1. Hero — "Hospital-grade clean air for the spaces that matter."
2. **Work with us** — the two-track audience fork
3. The system — ventilation + purification (Clean Air Bubble)
4. **Completed projects** — walkthrough video, 10+ spaces, pan-India coverage marquee
5. Brand moment
6. Why refer
7. Who refers with us (+ HVAC / MEP / PMC strip)
8. Where it works — homes, schools, offices, clinics, gyms, hospitality
9. Why YOGa Clean Air (benefits, IIT-Delhi verified results, Room Purifier vs ERV vs Y-CAB, tech specs)
10. How it works — tabbed, one 5-step path per audience
11. Network benefits
12. Resources (brochure download, technical guide, FAQ)
13. **Enquiry form** — dual-mode, stored in Supabase
14. Book a demo (Calendly or WhatsApp fallback)
15. FAQ
16. Contact

All product claims come from the official YOGa brochure and the Y-CAB vs ERV
document — see `src/lib/content.ts`.

## Adding the site video

The **Completed projects** section resolves its video source in this order —
first match wins:

1. **`NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID`** *(recommended)* — upload to YouTube as
   **Unlisted** (it won't appear in search or on your channel, but anyone with
   the link can watch). Copy the id from the URL — in
   `https://youtu.be/dQw4w9WgXcQ` the id is `dQw4w9WgXcQ` — and set the variable
   in Netlify under **Site settings → Environment variables**. Nothing from
   YouTube loads until a visitor presses play.
2. **`NEXT_PUBLIC_SHOWCASE_VIDEO_URL`** — any direct `.mp4` URL (Supabase
   Storage, Cloudinary, Bunny, S3). Use this if you want no YouTube branding.
3. **`public/video/showcase.mp4`** — self-hosted in the repo. Simplest, but only
   sensible under ~20 MB; larger files bloat the repo and eat Netlify bandwidth.
   Compress first: `ffmpeg -i input.mov -vcodec h264 -crf 28 -vf scale=1280:-2 -acodec aac public/video/showcase.mp4`

**Poster frame (do this either way):** export one good still from the video at
1600×900 and save it as `public/img/showcase-poster.jpg`. Until it exists the
player falls back to a branded gradient — it looks fine, but a real still
converts better.

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
| `NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID` | (optional) YouTube id for the project video |
| `NEXT_PUBLIC_SHOWCASE_VIDEO_URL` | (optional) direct `.mp4` URL for the project video |

> ⚠️ **Configure Supabase before sending traffic.** Without those credentials the
> form still tells the visitor "thanks", but the lead is only written to the
> server log — you will lose it. `src/app/actions.ts` logs a loud warning when
> this happens.

## Supabase setup

Run `supabase/schema.sql` in the Supabase SQL editor to create the `enquiries`
table with row-level security (anonymous insert, authenticated read). One table
holds both branches, split by `enquiry_type` (`'refer'` / `'own'`).

This replaces the earlier `partner_applications` table — the migration SQL is
commented at the bottom of the schema file.

## Deployment

Deployed on **Netlify** (connected manually) using Netlify's official Next.js
runtime, which supports SSR and server actions — no static export. Add the
environment variables above under **Site settings → Environment variables**.

## Roadmap

The focus is **lead generation and outreach**, not a member-facing dashboard.

- **Phase 1** — Internal lead inbox + outreach CRM (identify & organize outreach
  to designers, architects, builders, home-automation and HVAC firms),
  authentication, email/WhatsApp notification on new enquiries
- **Phase 2** — AI company research, AI outreach generator
- **Phase 3** — Referral tracking, analytics, AI knowledge assistant

## Known gaps

Tracked, not yet built:

- No email/WhatsApp alert when an enquiry is submitted (checked in Supabase manually)
- No UTM / source capture on the form, so channel attribution is unavailable
- The referral reward is described but not quantified anywhere on the page
- No customer testimonials or named project references
