# Paul van der Merwe Electrical — Website

A fast, mobile-first marketing site for **Paul van der Merwe Electrical**, built with
Next.js. Dark, electric brand identity (black + yellow) with an interactive 3D lightning
hero and a WhatsApp-based quote request flow.

## Highlights

- ⚡ **Interactive 3D lightning** hero (Three.js) — glowing procedural bolts with pointer
  parallax. Scales down on mobile, pauses off-screen, and is skipped under
  `prefers-reduced-motion`.
- 📱 **Mobile-first** and fully responsive.
- 💬 **WhatsApp quote form** — pick services + enter details, and it opens WhatsApp with a
  pre-filled message ready to send.
- 🔍 **SEO-ready** — full metadata, Open Graph/Twitter cards, `LocalBusiness` JSON-LD,
  `sitemap.xml`, `robots.txt`, and a web manifest.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) for the lightning field
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## Editing business details

All business content — phone, email, services, hours, offer, trading area — lives in one
file: [`src/lib/site.ts`](src/lib/site.ts). Update it there and every section, the SEO
metadata, and the WhatsApp link update together.

> **Before going live:** set the real domain in `site.url`, and confirm the WhatsApp number
> in `site.whatsapp` (international format, e.g. `27767530027`).

## Assets to add later

- Real photos of Paul / recent work (hero + services).
- A final logo — the current mark in `src/components/Logo.tsx` and `src/app/icon.svg` is a
  clean vector recreation of the lightning-bulb concept and can be swapped anytime.
