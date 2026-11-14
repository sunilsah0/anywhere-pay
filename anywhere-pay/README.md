# SunilPay: Anywhere. Anytime. Without restrictions.

> **PROTOTYPE. NOT A REAL PAYMENT SYSTEM.** SunilPay moves no real money, links no real accounts, collects no personal or financial data, and is not a bank, payment institution or money transmitter. Rates, fees and routes are simulated. It is not affiliated with or endorsed by UPI/NPCI, Fonepay, Swish, Vipps MobilePay, Wero/EPI, Pix, or any other payment system named.

"Without restrictions" is the long-term **vision**, not a claim about what the prototype does today.

## What

A web and mobile prototype (one codebase) that shows how a single app could connect the world's national payment systems. A user picks a home country and a destination, chooses a payment type, and the app compares the possible routes: a direct rail link, a licensed local partner payout, or a card fallback.

Supported payment types: **P2P** (person to person), **P2M** (person to merchant), **B2B** (business to business), **B2P** (business to person), **P2B** (person to business).

The prototype covers 31 countries, including the USA, Australia, Japan, China, Nepal, India, South Africa, UAE, Germany, France and Sweden.

## Why

- Travellers from one country usually cannot use another country's instant payment app. The one thing that works almost everywhere is a card, which is usually the most expensive route.
- Instant systems such as UPI (India), Fonepay (Nepal), Swish (Sweden), Pix (Brazil) and others are fast and cheap, but each is built for its own country.
- Cross-border links exist only where operators sign agreements. UPI and Fonepay are linked (QR payments since 2024, remittance link reported in 2026). Europe's Wero and the EuroPA alliance are building links between European wallets. Sweden's central bank (the Riksbank) has encouraged linking Swish with its Nordic and European counterparts.
- Cross-border transfers are still costly. For example, the World Bank reported an average total cost of about 7.3% for Sweden to India in Q3 2025.

SunilPay explores the idea of a neutral **connector layer** that sits above these systems instead of replacing them.

## Where

- Intended context: travellers and the diaspora moving between countries, starting with corridors such as Sweden, India and Nepal.
- Runs in any modern browser, and as an Android app. iOS and store releases are out of scope for now.
- Live link: add your Vercel address here.

## How

- **App:** Expo (React Native) with Expo Router, TypeScript, one codebase for web and mobile.
- **Routing logic:** `src/routes.ts` holds the country list, simulated rates and the table of confirmed live links. The function `plans()` returns the routes sorted by fee.
- **UI:** `src/app/index.tsx` is a scroll-driven landing page (parallax glow, scroll reveals, country marquee). `src/components/Demo.tsx` is the interactive demo. Demo history is stored only on the user's device (AsyncStorage).
- **Hosting:** web on Vercel, Android builds with Expo EAS.

Run locally:

```bash
npm install
npx expo start      # press w for the browser
```

Add a country: add one line to `COUNTRIES` in `src/routes.ts` (name, currency, rough rate, payment system name).

## When

- Nov 2026: prototype built as a learning and portfolio project.
- Planned: a small backend so rates and link status can be updated without rebuilding the app; sandbox integrations with licensed payment providers.
- Not planned until a licensed partner is in place: real accounts, real money, public app-store release of a payment product.

## Novelty (honest)

This is not the first system to link payment networks. NPCI International, EPI/Wero and EuroPA already do this at the scheme level. What this prototype explores:

1. **An honest link map.** Each country pair is marked live or needs-partner, and only links confirmed in public sources are shown as live.
2. **Side-by-side route comparison** (direct link, local partner, card) with the fee visible before paying.
3. **One flow for all five payment types** (P2P, P2M, B2B, B2P, P2B).
4. **A beginner-built, open prototype** with one codebase for web and mobile, intended as a starting point for discussion with licensed partners.

## Limits and what real life requires

- Payment and e-money licences (for example from Finansinspektionen in Sweden) or a licensed partner in each region.
- Anti-money-laundering and customer identity checks, fraud controls, and agreements with each payment system operator.
- Clear rules on who pays the fees in cross-border links (the Nepal and India QR rollout shows this matters).
- Store rules: Apple expects financial apps to be submitted by a legal entity, and Google applies a closed-testing requirement to new personal developer accounts.

## Sources

Riksbank Payments Report 2026 and staff memo on mobile payments in Europe; EPI/EMPSA announcements on the EuroPA interoperability MoU (Feb 2026); NPCI International and Fonepay announcements; World Bank Remittance Prices Worldwide; EU Instant Payments Regulation and PSD3/PSR reporting.

## Author

Sunil 

