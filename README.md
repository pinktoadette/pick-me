# 💌 Pick Me

A tiny, no-pressure invite game for two people who already know each other. One
person sets up a few hidden cards; the other taps one at random and it flips to
reveal the plan. Chance picks it — so nobody has to own the decision. Built to
take the anxiety out of asking someone out.

## Features

- **Step-by-step wizard** to build a deck (who → cards → details → secret word).
- **Cards can be anything** — an activity alone, or with an optional date and/or
  place.
- **A sticker for "yes"** — the sender picks a cute sticker that's revealed the
  moment the other person taps *Works for me*.
- **No dead-end decline** — "send my own cards back" turns a pass into a playful
  counter-invite (you build your own deck and volley it back).
- **Kawaii throughout** — floating sticker decorations, card-flip animation, a
  custom favicon and share/OG image.

See [`docs/design-and-architecture.md`](docs/design-and-architecture.md) for the
psychology, UX rationale, and the security/architecture reasoning. The original
concept is in [`docs/card-pick-app-spec.md`](docs/card-pick-app-spec.md).

## How the sender learns the answer

Two paths, and you can use either or both:

1. **Link-passing (always on, zero infra).** When the receiver taps their answer,
   the app builds a reply link they send back. Opening it shows the outcome.
2. **Live waiting page (optional, one KV row).** On the "deck ready" screen the
   sender can tap **"Wait for their answer here"** — a page that auto-refreshes
   and shows the result the moment it lands, no resend needed.

Path 2 needs a small key-value store. Without it, the app quietly falls back to
path 1 — nothing breaks.

### Turning on the live waiting page

1. In your Vercel project: **Storage → Create Database → KV** (Upstash Redis).
   Connect it to the project. Vercel injects `KV_REST_API_URL` and
   `KV_REST_API_TOKEN` automatically.
2. Redeploy. That's it — the waiting page goes live.

The KV row only ever holds the **already-encrypted** reply blob keyed by a random
room id, with a 60-day TTL. No names, no plaintext, no personal data.

## How it works (minimal backend, zero personal data)

- The entire game state is **encrypted in the browser** (Web Crypto: PBKDF2 →
  AES-GCM) and packed into the **URL fragment** (`#…`), which never touches a
  server.
- **Two-factor access:** the *link* is something you have; the *unlock phrase*
  (agreed out-of-band) is something you know. Neither is useful alone, so a
  guessed/forwarded code can't open the deck.
- It's **link-passing** ("play by mail"): each turn produces a fresh link the
  other person opens. "Send the deck back" = literally handing the link back.
- `localStorage` remembers the phrase + progress per device so a closed tab
  resumes where it left off.

No database. No auth service. No server code. Just a static Next.js app.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

The fastest path:

```bash
npm i -g vercel
vercel
```

…and follow the prompts. Or push this folder to a GitHub repo and click
**Import Project** at [vercel.com/new](https://vercel.com/new) — it auto-detects
Next.js, no configuration needed.

## Stack

- Next.js (App Router), React — no other runtime dependencies
- Plain CSS (`app/globals.css`) with the palette as CSS variables at the top
- All logic is client-side: `lib/crypto.js` (encryption) and `lib/util.js`
- Share image generated at `app/opengraph-image.js` via `next/og`

## Credits

Sticker art by [barnstudio · Flaticon](https://www.flaticon.com/free-stickers/cute).
