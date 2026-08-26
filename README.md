# Lumora — Event & Space Decoration Platform

**Lumora** is a modern decoration-booking platform for Dhaka. Clients browse
professionally curated decoration packages — home interiors, weddings, birthdays,
corporate events, and more — book a slot, and get matched with expert decorators
who bring the vision to life.

## What it does

- **Browse & book services** — category-filtered decoration packages with pricing, photos, and coverage map
- **Decorator marketplace** — meet vetted decorators, view ratings, and request custom work
- **Auth** — Firebase email/password + Google sign-in, protected routes
- **Booking & payments** — create bookings, track status, Stripe checkout
- **Dashboards** — client, admin (analytics + service management), and decorator (projects, earnings, schedule)
- **Polished UI** — responsive, animation-rich (Framer Motion + GSAP), soft sky/cream design system

## Tech Stack

React 19 · Vite 7 · React Router 7 · Tailwind CSS 4 + DaisyUI · Framer Motion · GSAP · Firebase Auth · React Leaflet · Axios · Stripe · Recharts

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

Requires a Firebase project (auth config in `src/utilits/firebase.config.js`) and a
backend API (see `.env` for `VITE_IMAGEBB_API_KEY`, Stripe, etc.).

## License & Disclaimer

This software is proprietary and confidential to Lumora. All rights reserved.
No part of this codebase may be copied, modified, distributed, or used without
prior written permission from the copyright holder. Brand names, service marks,
and visual assets shown here belong to their respective owners and are used for
demonstration only. Provided "as is", without warranty of any kind.

---

Built with care for Lumora.
