---
version: beta
name: Teridox
source: Claude Design canvas "Teridox — Redesign 3D Interactive" (https://claude.ai/artifact/AwF2XkodpryhDQeKrgzSPs)
dial: ENERGY 2 / RHYTHM 2 / MOTION 2
---

## Overview

Teridox is a bright, blue, heavy-sans agency site. The identity motif is the 3D Teridox logo:
its four pieces are the site's four destinations (About, Services, Project, Blog), and the home
hero lets you open a page by picking a piece. Everything else stays quiet so the logo is the
one moving, focal thing.

This replaces the earlier terminal/monospace direction. The tokens live in
`src/app/globals.css`; change them there, not per page.

## Colors

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#e9f0ff` | `#050916` | Page ground, a blue tint taken from the logo |
| `--foreground` | `#0a1330` | `#f2f5ff` | Text |
| `--muted-foreground` | `#3f4a6b` | `#b3bdd8` | Secondary text |
| `--surface-card` | `#ffffff` | `#0e1630` | Cards |
| `--surface-soft` | `#f3f6ff` | `#0b1228` | Inputs, side panels |
| `--accent` | `#0b57d0` | `#7db3ff` | Links, labels, primary button |
| `--accent-solid` | `#0b57d0` | `#1b4fb5` | Filled accent card, always with white text |
| `--deep` | `#0a1330` | `#111a3d` | Closing contact band, white text |
| `--tint` | accent at 10% | accent at 14% | Chips, image placeholders |

One hue (blue) plus neutrals. No second accent.

## Typography

Plus Jakarta Sans for everything, loaded with `next/font`. It was chosen for its Indonesian
origin and its sturdy 800 weight, which holds the large tight headlines.

- `.display`: page H1, 800, `clamp(38px, 5.6vw, 84px)`, tracking -0.04em
- `.title`: section H2, 800, `clamp(30px, 3.6vw, 50px)`, tracking -0.03em
- `.lede`: 19px intro paragraph in muted text
- `.label`: 14px bold accent text for categories and field names
- Body: 16px, line-height 1.55

## Shape

Radius marks hierarchy: inputs 14px, chips 10px, cards 28px, the hero stage and contact band
32px, buttons fully round. Do not make cards or inputs pill-shaped.

## Surfaces

Liquid glass, by explicit owner request (overrides antislop R-10, one glass element cap).
- Cards, navbar, hero stage, secondary buttons: translucent milky fill, diagonal sheen, bright
  rim, soft lift, backdrop blur. Defined once in `globals.css` (`--glass-*`).
- Fixed blue light (`.ambient`) sits behind the page so the glass has something to refract.
  Without it the blur shows nothing.
- Tinted glass: `.card-accent` (blue) and `.band` (deep navy), both keeping white text above 4.5:1.
- `prefers-reduced-transparency` and browsers without `backdrop-filter` get solid surfaces.

## Components

`.btn` with `.btn-primary` (accent fill), `.btn-quiet` (card fill, hairline) or `.btn-light`
(white, for accent and dark fills); `.card`, `.card-accent`, `.band`, `.chip`, `.field`.
Shared pieces: `Navbar`, `Footer`, `CtaBand`, `LogoHero`, `PostGrid`, `ContactForm`.

## Motion

Dial MOTION 3, "Premium" archetype, built with `motion` (`motion/react`). One entrance, one
curve, three durations: content rises 24px while fading in, on `cubic-bezier(0.05, 0.7, 0.1, 1)`
(decelerating, no overshoot), over 0.5 / 0.8 / 0.9s. Everything reveals once, when it scrolls
into view, with at most a 0.1s stagger between siblings.

- `src/components/motion/reveal.tsx`: `Reveal` (a block), `RevealLink` (a card that is a link),
  `RevealText` (headline lifting in word by word from behind a mask).
- `src/components/motion/provider.tsx`: `MotionConfig reducedMotion="user"`, the top scroll
  progress bar, and the ambient light that drifts up as the page scrolls.
- `src/app/template.tsx`: each page settles in on navigation.
- Navbar hides while scrolling down and returns on scroll up or keyboard focus.
- Hero stage recedes (shrinks, drifts, fades) as it scrolls away.
- The 3D logo is its own motion: pieces assemble once, sway, tilt toward the pointer. The
  story-section logo starts assembling only when it scrolls into view.

Hover lift on cards uses the CSS `translate` property, because Motion owns `transform` while a
card reveals. `prefers-reduced-motion` removes movement and keeps the fades.

## Copy

- No em dashes. No "seamless", "intelligent", "powerful", "AI-powered".
- Button labels name the action: "Start a project", "Inquire about SaaS Solutions".
- Arrows only on links that continue reading ("Read article →", "All projects →").
- No heading gets a category pill above it.

## Content rules

Testimonials, projects, posts, WhatsApp and social links come from Supabase. If a table is
empty the section says so or is left out. Never fill it with sample content.

## Responsive

Sections use `.wrap` (max 1240px, 16px gutters on phones, 24px above). Grids are
`auto-fit` with `minmax(min(Npx, 100%), 1fr)` so nothing overflows at 320px. The hero puts
the logo beside the headline above 980px and below it at 980px and under. Tap targets are at
least 44px.
