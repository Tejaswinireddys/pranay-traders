# Pranay Traders — Wood Charcoal Trading Website

A modern, mobile-friendly business website for **Pranay Traders**, a wood charcoal trading company based in Andhra Pradesh, India. Built for wholesalers, retailers, hotels, restaurants, BBQ users, industrial buyers and bulk customers.

## Features

- **Home, About, Products, Gallery, Updates, Contact** pages
- **Owner admin panel** (`/#/admin`) with password login
  - Create posts with photo uploads (stock updates, new arrivals, delivery photos, announcements)
  - Manage gallery photos
  - View customer inquiries submitted from the contact form
- **Product inquiry form** + **WhatsApp** quick inquiry button
- **Social links** (LinkedIn, Instagram) and Google Maps location
- SEO-optimized metadata, dark/light theme, fast-loading optimized images

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + shadcn/ui + wouter (hash routing)
- **Backend:** Express + SQLite (better-sqlite3) + Drizzle ORM
- **Data model:** posts, gallery items, inquiries (see `shared/schema.ts`)

## Getting Started

```bash
npm install
npm run dev        # starts Express + Vite on port 5000
```

Create the database tables on first run:

```bash
npx drizzle-kit push
```

## Build

```bash
npm run build
NODE_ENV=production node dist/index.cjs
```

## Admin Access

Default admin password: `pranay@2024` (override with the `ADMIN_PASSWORD` environment variable).

## Contact

- **Phone / WhatsApp:** +91 99486 82259
- **Email:** pranaytradersap@gmail.com · contact@pranaytraders.com
- **Location:** Andhra Pradesh, India
- **Instagram:** @pranaytraders_ap
